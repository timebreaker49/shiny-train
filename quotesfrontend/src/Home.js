import React, { useEffect, useState } from 'react';
import { Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Row } from 'reactstrap';
import axios from 'axios';
import AddQuoteModal from './AddQuoteModal';
import DeleteQuoteModal from './DeleteQuoteModal';
import EditQuoteModal from './EditQuoteModal';
import Card from 'react-bootstrap/Card';
import imgSrc from './ImageSrcs';
import './Home.css';

const Quotes = () => {
    const [tags, setTags] = useState([]);
    const [quotes, setQuotes] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedQuote, setSelectedQuote] = useState();
    const [selectedTag, setSelectedTag] = useState('');
    const [deleteMultiple, setDeleteMultiple] = useState(false); 
    const [checkedState, setCheckedState] = useState([]);
    const [toBeDeleted, setToBeDeleted] = useState([]);
    const [toggleEdit, setToggleEdit] = useState(false);
    const [editRadio, setEditRadio] = useState([]);
    const [mapped, setMapped] = useState({});
    const [sort, setSort] = useState('');
    const [dropdownOpen, setDropdownOpen] = useState(false);
    
    useEffect(() => {
        getTags()
        getQuotes();
    }, [ showAddModal, showDeleteModal, showEditModal, selectedTag ]);
    
    // mapping random image to quote id
    useEffect(() => {
        if (Object.keys(mapped).length === 0) {
            if (quotes.length > 0) {
                let quoteToImgMap = {};
                // shuffling image sources
                let shuffled = shuffleArray([...imgSrc]);
                let counter = 0;
                for (let quote in quotes) {
                    // resetting shuffled array to map over if multiple of length
                    // getting index of shuffled val from src array
                    // mapping quote.id : randomized idx
                    if (quote % imgSrc.length === 0 && quote > 0) {
                        shuffled = shuffleArray([...imgSrc]);
                        counter = 0;
                    }
                    let srcIdx = imgSrc.indexOf(shuffled[counter++]);
                    quoteToImgMap = {...quoteToImgMap, ...{ [quotes[quote].id]: srcIdx }};
                }
                setMapped(quoteToImgMap);
            }
        }
    }, [quotes, mapped]);

    const shuffleArray = input => {
        return input
            .map(value => ({ value, sort: Math.random()}))
            .sort((a,b) => a.sort - b.sort)
            .map(({value}) => value)
    }

    useEffect(() => {
        if (deleteMultiple) {
            if (checkedState.length === 0) {
                setCheckedState(new Array(quotes.length).fill(false));
            }
        }
    },[ deleteMultiple, checkedState.length, quotes.length ]);

    useEffect(() => {
        if (toggleEdit) {
            setEditRadio(new Array(quotes.length).fill(false));
        }
    }, [toggleEdit, quotes.length]);


    const getQuotes = () => {
        if (selectedTag === '' || selectedTag === "all") {
            getAllQuotes();
        } else {
            getQuotesByTag(selectedTag);
        }
    }

    const getAllQuotes = () => {
        axios.get('api/quotes')
        .then(res => {
            setQuotes(res.data);
        })
        .catch(err => console.log(err.response.data));
    }

    const getQuotesByTag = (name) => {
        axios.post('tagged/', {tags: [name]})
        .then(res => {
            console.log(JSON.stringify(res.data));
            setQuotes(res.data);
        })
        .catch(err => (err.response.data));
    }
    
    const getTags =  () => {
        axios.get('api/tags')
        .then(res => {
            var tagList = [];
            res.data.map(tag => 
                tagList.push(tag.name)
            );
            setTags(["all", ...tagList]);
        })
        .catch(err => console.log(err.response.data));
    }

    const handleOnChange = position => {
        const updateCheckedState = checkedState.map((item, index) => 
            index === position ? !item : item
        );
        setCheckedState(updateCheckedState);
    }

    const deleteSelected = () => {
        if (checkedState.indexOf(true) !== -1) {
            let idArray = [];
            checkedState.forEach((element, index) => {
                if (element === true) {
                    idArray.push(quotes[index].id);
                }
            });
            setToBeDeleted(idArray);
            setShowDeleteModal(!showDeleteModal);
        }
    }

    const editOnChange = id => {
        let selected = quotes.find(quote => quote.id === id);
        setSelectedQuote(selected);
    }

    const handleToggleEdit = () => {
        if (deleteMultiple) setDeleteMultiple(false);
        setToggleEdit(!toggleEdit);
        if (toggleEdit === false) {
            setSelectedQuote({id:'', quote: '', author: '', tags: []});
        }
    }

    const handleDropdownChange = e => {
        setSort(e.target.value);
        const sortedQuotes = quotes;
        switch(e.target.value) {
            case 'Name ↓':
                sortedQuotes.sort((a,b) => a.author.localeCompare(b.author));
                break;
            case 'Name ↑':
                sortedQuotes.sort((a,b) => b.author.localeCompare(a.author));
                break;
            default:
                return null;
        }
        setQuotes(sortedQuotes);
    }
    

    return (
        <div className='App'>
            <h1>Hey, You're Awesome</h1>
            <Row>
                <Col sm={2}>
                    <div>
                        <h3>Categories</h3>
                        {tags.map(tag =>
                            <div key={tag}>
                                <button 
                                    className='tagName' 
                                    onClick={() => {
                                        setSelectedTag(tag);
                                    }}
                                >
                                    {tag}
                                </button>   
                            </div>)
                        }                        
                    </div>
                    <Row>
                        <div>
                            <button className='newQuoteButton' 
                                onClick={() => {
                                    setShowAddModal(!showAddModal)
                                }}>
                                Add Quote
                            </button>
                        </div>
                    </Row>
                    <Row>
                        <div>
                            <button className='toggleEditButton'
                                onClick={() => handleToggleEdit()}> 
                                Edit Quote
                            </button>
                        </div>
                    </Row>
                    <Row>
                        <div>
                            <button className='deleteMultipleButton' 
                                onClick={() => {
                                    if (toggleEdit) setToggleEdit(false);
                                    setDeleteMultiple(!deleteMultiple);
                                }}>
                                Delete Quote(s)
                            </button>
                        </div>
                    </Row>
                    <Row>
                        <Dropdown 
                            direction="down" 
                            isOpen={dropdownOpen} 
                            toggle={() => setDropdownOpen(!dropdownOpen)} >
                            <DropdownToggle 
                                caret 
                                className='sortDropdownText'>
                                    {sort === '' ? 'Sort' : `Sort by: ${sort}`}
                            </DropdownToggle>
                            <DropdownMenu name="sortType">
                                <DropdownItem 
                                    name="NameDesc" 
                                    value="Name ↓" 
                                    onClick={e => handleDropdownChange(e)}>
                                        Name ↓
                                </DropdownItem>
                                <DropdownItem 
                                    name="NameAsc" 
                                    value="Name ↑" 
                                    onClick={e => handleDropdownChange(e)}>
                                        Name ↑
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </Row>
                </Col>
                <Col sm={10}>  
                    {deleteMultiple ? 
                        <Row>
                            <div>
                                <button 
                                    className='deleteButton'
                                    onClick={() => {
                                        deleteSelected();                               
                                    }}>
                                    Bulk Delete
                                </button>
                            </div>
                        </Row>                    
                        : null
                    }
                    {toggleEdit ?
                        <Row>
                            <div>
                                <button
                                    className='editButton'
                                    onClick={() => {
                                        if (selectedQuote.id !== '') {
                                            setShowEditModal(!showEditModal);
                                        }
                                    }} >
                                    Edit Selection
                                </button>
                            </div>
                        </Row>
                        : null
                    }
                    <Row>
                        {quotes.map(({id, author, quote, tags}, index) => 
                            <Col xs={6} lg={4} key={id} id='quoteRow'>
                                <span className='checkAndQuote'>
                                    {deleteMultiple ? 
                                        <input 
                                            className='deleteCheckbox'
                                            type='checkbox' 
                                            onChange={() => handleOnChange(index)}
                                            value={id}
                                            checked={checkedState[index] ?? []} 
                                        /> : null
                                    }
                                    {toggleEdit ? 
                                        <input 
                                            className='editRadioButton'
                                            type='radio' 
                                            name='editRadioButton'
                                            onChange={() => editOnChange(id)}
                                            value={id}
                                        /> : null
                                    }  
                                    {/* <li className='quoteAndAuthor'>{index+1}. {quote} ~{author}</li> */}
                                    <Card style={{ width: '24rem' }}>
                                        <Card.Img variant="top" src={imgSrc[mapped[id]]} />
                                        <Card.Body>
                                            <Card.Title>{index+1}. "{quote}"</Card.Title>
                                            <Card.Text>~ {author}</Card.Text>
                                        </Card.Body>
                                    </Card>
                                </span>
                            </Col>                                                     
                        )}
                    </Row>
                </Col>
            </Row>
            {showDeleteModal ? 
                <DeleteQuoteModal 
                    toBeDeleted={toBeDeleted}
                    setShowDeleteModal={setShowDeleteModal}
                /> : null
            }
            {showEditModal ? 
                <EditQuoteModal 
                    setShowEditModal={setShowEditModal}
                    quote={selectedQuote}
                /> : null
            }        
            {showAddModal ? 
                <AddQuoteModal 
                    setShowAddModal={setShowAddModal} 
                /> : null}
        </div>
    );        
}

export default Quotes;