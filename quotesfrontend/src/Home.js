import React, { useEffect, useState } from 'react';
import { Col, Row } from 'reactstrap';
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
    
    useEffect(() => {
        getTags()
        getQuotes();
    }, [ showAddModal, showDeleteModal, showEditModal, selectedTag ]);
    
    useEffect(() => {
        if (Object.keys(mapped).length === 0) {
            if (quotes.length > 0) {
                let quoteToImgMap = {};
                for (let q in quotes) {
                    let idx = Math.floor(Math.random() * imgSrc.length);
                    quoteToImgMap = {...quoteToImgMap, ...{[quotes[q].id]:idx}};
                }
                setMapped(quoteToImgMap);
            }
        }
    }, [quotes, mapped]);

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
                                    Edit Quote
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