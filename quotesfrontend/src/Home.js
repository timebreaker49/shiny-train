import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddQuoteModal from './AddQuoteModal';
import DeleteQuoteModal from './DeleteQuoteModal';

const Quotes = () => {
    const [quotes, setQuotes] = useState([{id:'', quote: '', author: ''}]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedQuoteId, setSelectedQuoteId] = useState('');

    useEffect(() => {categories()}, [showAddModal, showDeleteModal])
    const categories = () => {
        axios.get('api/quotes')
        .then(res => {
            setQuotes(res.data);
        })
        .catch(err => console.log(err));
    }

    return (
        <div className='App'>
            <h1>Hey, You're Awesome</h1>
            {quotes.map(quote => 
                <div key={quote.id}>
                    <li>{quote.quote} ~{quote.author}</li>
                    <button className='deleteButton' 
                        onClick={() => {
                            setShowDeleteModal(!showDeleteModal);
                            setSelectedQuoteId(quote.id);
                        }}>
                        Delete
                    </button>
                        {showDeleteModal ? <DeleteQuoteModal quoteId={selectedQuoteId} setShowDeleteModal={setShowDeleteModal} /> : null}
                </div>
            )}
            <button className='newQuoteButton' 
                onClick={() => setShowAddModal(!showAddModal)}>
                Add Quote
            </button>
                {showAddModal ? <AddQuoteModal setShowAddModal={setShowAddModal} /> : null}
        </div>
    );        
}

export default Quotes;