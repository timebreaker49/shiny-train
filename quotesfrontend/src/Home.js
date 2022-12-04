import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddQuoteModal from './AddQuoteModal';

const Quotes = () => {
    const [quotes, setQuotes] = useState([{id:'', quote: '', author: ''}]);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {categories()}, [showModal])
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
                <li key={quote.id}>{quote.quote} ~{quote.author}</li>
            )}
            <button onClick={() => setShowModal(!showModal)}>Button here!</button>
                {showModal ? <AddQuoteModal setShowModal={setShowModal} /> : null}
        </div>
    );        
}

export default Quotes;