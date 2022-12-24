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
    const [tags, setTags] = useState([]);

    useEffect(() => {
        categories()
    }, [ showAddModal, showDeleteModal, showEditModal ]);
    
    const categories = () => {
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
    
    useEffect(() => {
        axios.get('api/tags')
        .then(res => {
            var tagList = [];
            res.data.map(tag => {
                tagList.push(tag.name);
            });
            setTags(["all", ...tagList]);
        })
        .catch(err => console.log(err.response.data));
    }, []);


    return (
        <div className='App'>
            <h1>Hey, You're Awesome</h1>
            <div>
                <h3>Categories</h3>
                {tags.map(tag =>
                    <div key={tag}>
                        <a onClick={() => {
                            tag === "all" ? categories() : getQuotesByTag(tag);
                        }}>
                            {tag}
                        </a>   
                    </div>)
                }
            </div>
            {quotes.map(quote => 
                <div key={quote.id} id='quoteRow'>
                    <Row>
                        <Row>
                            <Col sm={8}>
                                <li>{quote.quote} ~{quote.author} </li>
                            </Col>
                            <Col sm={2}>
                                <button className='deleteButton' 
                                onClick={() => {
                                    setShowDeleteModal(!showDeleteModal);
                                    setSelectedQuoteId(quote.id);
                                }}>
                                Delete
                                </button>
                            </Col>
                            <Col sm={2}>
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
                            </Col>                                                     
                        </Row>
                    </Row>
                </div>
            )}
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
            <button className='newQuoteButton' 
                onClick={() => setShowAddModal(!showAddModal)}>
                Add Quote
            </button>
            {showAddModal ? <AddQuoteModal setShowAddModal={setShowAddModal} /> : null}
        </div>
    );        
}

export default Quotes;