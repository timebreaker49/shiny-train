import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Quotes = () => {
    const [quotes, setQuotes] = useState([{id:'', quote: '', author: ''}]);


    console.log("thing things");
    useEffect(() => {categories()}, [])
    const categories = () => {
        axios.get('api/quotes')
        .then(res => {
            setQuotes(res.data);
        })
        .catch(err => console.log(err));
    }

    return (
        <div>
            <h1>Some quotes</h1>
            <ul>{quotes.map(quote => 
                <li key={quote.id}>{quote.quote} ~{quote.author}</li>
            )}</ul>
        </div>
    );        
}

export default Quotes;