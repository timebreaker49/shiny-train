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
        let idArray = [];
        checkedState.forEach((element, index) => {
            if (element === true) {
                idArray.push(quotes[index].id);
            }
        });
        setToBeDeleted(idArray);
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
                            <button className='deleteMultipleButton' 
                                onClick={() => {
                                    setDeleteMultiple(!deleteMultiple);
                                    console.log('Delete clicked!!')
                                }}>
                                Delete Quote(s)
                            </button>
                        </div>
                    </Row>
                </Col>
                <Col sm={10}>  
                    <Row>
                        <div>
                            <button className='deleteButton' 
                                onClick={() => {
                                    deleteSelected();
                                    setShowDeleteModal(!showDeleteModal);                               
                                }}>
                                Delete Selected
                            </button>
                        </div>
                    </Row>
                    <Row>
                        {quotes.map(({id, author, quote, tags}, index) => 
                            <div key={id} id='quoteRow'>
                                <Row>
                                    <Row>
                                        <Col sm={8}>
                                            <li className='quoteAndAuthor'>{index} - {quote} ~{author}</li>
                                            {deleteMultiple ? 
                                                <input 
                                                    type='checkbox' 
                                                    checked={checkedState} 
                                                    onChange={() => handleOnChange(index)}
                                                    value={id}
                                                    checked={checkedState[index] ?? []} 
                                                /> : null
                                            }                                            
                                            <button className='editButton'
                                                onClick={() => {
                                                    setShowEditModal(!showEditModal);
                                                    setSelectedQuote({
                                                        id: id, 
                                                        author: author,
                                                        quote: quote,
                                                        tags: tags
                                                    });
                                                }}> 
                                                Edit
                                            </button>
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