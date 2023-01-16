import React, { useEffect, useState } from 'react';
import { Col, Row } from 'reactstrap';
import axios from 'axios';
import AddQuoteModal from './AddQuoteModal';
import DeleteQuoteModal from './DeleteQuoteModal';
import EditQuoteModal from './EditQuoteModal';
import './Home.css';

const Quotes = () => {
    const [quotes, setQuotes] = useState([{id:'', quote: '', author: '', tags: []}]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedQuote, setSelectedQuote] = useState({id:'', quote: '', author: '', tags: []});
    const [selectedTag, setSelectedTag] = useState('');
    const [tags, setTags] = useState([]);
    const [deleteMultiple, setDeleteMultiple] = useState(false); 
    const [checkedState, setCheckedState] = useState([]);
    const [toBeDeleted, setToBeDeleted] = useState([]);
    const [toggleEdit, setToggleEdit] = useState(false);
    const [editRadio, setEditRadio] = useState([]);


    useEffect(() => {
        getTags()
        getQuotes();
    }, [ showAddModal, showDeleteModal, showEditModal, selectedTag ]);

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
                            <div key={id} id='quoteRow'>
                                <Row>
                                    <Row>
                                        <Col sm={8}>
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
                                                <li className='quoteAndAuthor'>{index+1}. {quote} ~{author}</li>
                                            </span>
                                        </Col>                                                     
                                    </Row>
                                </Row>
                            </div>
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