import React, {useState, useEffect} from 'react';
import axios from 'axios';
import '../styles/search_history.css'


export const SearchHistory = () => {
    const [history, setHistory] = useState([]); // For storing history and updating it in array
    const [showHistory, setToggleHistory] = useState(false); // For toggling history based on button being pressed
    
    // Function that updates the history of searches from flask database
    const fetchHistory = async () => {
        const response = await axios.get('https://book-search-4tcm.onrender.com/get-history');
        setHistory(response.data);
    };
    
    // useEffect used to show updated history if showHistory is true
    useEffect (() => {
        if (showHistory) {
            fetchHistory();
        }
    
    }, {showHistory});

    // Function that toggles search history on display 
    const toggleHistory = () => {
        setToggleHistory(!showHistory); 
        if (!showHistory) {
            fetchHistory();
        }
    }

    // Button text that changes depending on if showHistory is true
    let buttonText;
    if (showHistory) {
        buttonText = "Hide Search History"
    }
    else {
        buttonText = "Show Search History"
    }

    return (
        // Renders a history button and maps the history based on id and query
        <div className="button">
            <button className="history-button" onClick={toggleHistory}>
                {buttonText}
            </button>
            {showHistory && (
                <ul>
                    {history.map((item) => (
                        <li key={item.id}>{item.query}</li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default SearchHistory