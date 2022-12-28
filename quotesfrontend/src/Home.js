import React, { useEffect, useState } from 'react';
import { Col, Row } from 'reactstrap';
import axios from 'axios';
import AddQuoteModal from './AddQuoteModal';
import DeleteQuoteModal from './DeleteQuoteModal';
import EditQuoteModal from './EditQuoteModal';
import css from './Home.css';

const Quotes = () => {
    const [quotes, setQuotes] = useState([{id:'', quote: '', author: '', tags: []}]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedQuoteId, setSelectedQuoteId] = useState('');
    const [selectedQuote, setSelectedQuote] = useState({id:'', quote: '', author: '', tags: []});
    const [selectedTag, setSelectedTag] = useState('');
    const [tags, setTags] = useState([]);

    useEffect(() => {
        getTags()
        getQuotes();
    }, [ showAddModal, showDeleteModal, showEditModal, selectedTag ]);


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
            res.data.map(tag => {
                tagList.push(tag.name);
            });
            setTags(["all", ...tagList]);
        })
        .catch(err => console.log(err.response.data));
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
                                <a className='tagName' onClick={() => {
                                    setSelectedTag(tag);
                                }}>
                                    {tag}
                                </a>   
                            </div>)
                        }
                    </div>
                </Col>
                <Col sm={10}>  
                    <Row>
                        {quotes.map(quote => 
                            <div key={quote.id} id='quoteRow'>
                                <Row>
                                    <Row>
                                        <Col sm={8}>
                                            <li className='quoteAndAuthor'>{quote.quote} ~{quote.author} </li>
                                            <button className='editButton'
                                                onClick={() => {
                                                    setShowEditModal(!showEditModal);
                                                    setSelectedQuote({
                                                        id: quote.id, 
                                                        author: quote.author,
                                                        quote: quote.quote,
                                                        tags: quote.tags
                                                    });
                                                }}> 
                                                Edit
                                            </button>
                                            <button className='deleteButton' 
                                                onClick={() => {
                                                    setShowDeleteModal(!showDeleteModal);
                                                    setSelectedQuoteId(quote.id);
                                                }}>
                                                Delete
                                            </button>
                                        </Col>                                                     
                                    </Row>
                                </Row>
                            </div>
                        )}
                    </Row>
                    <button className='newQuoteButton' 
                        onClick={() => {
                            setShowAddModal(!showAddModal)
                        }}>
                        Add Quote
                    </button>
                </Col>
            </Row>
            {showDeleteModal ? 
                <DeleteQuoteModal 
                    quoteId={selectedQuoteId} 
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