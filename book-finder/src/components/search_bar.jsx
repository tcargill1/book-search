import React, {useState} from 'react';
import { FaSearch } from "react-icons/fa";
import '../styles/search_bar.css';

// Get google books api
const BASE_URL = 'https://www.googleapis.com/books/v1/volumes';
const API_KEY = process.env.REACT_APP_API_BOOK_KEY;

// Return api as a url
const get_books_url = (query) => {
  return `${BASE_URL}?q=${query}&key=${API_KEY}`;
}

// Search bar function exported to app using the ongoing results and when it's searched
export const SearchBar = ({ setResults, onSearch }) => {
    // Variables to update search input
    const [search_input, set_search_input] = useState("");

    // Function to filter books to make sure it has all these elements 
    const filterBooks = (books) => {
        return books.filter(book =>
            book.volumeInfo &&
            book.volumeInfo.title &&
            book.volumeInfo.authors &&
            book.volumeInfo.imageLinks &&
            book.volumeInfo.imageLinks.thumbnail
        );
    }

    // Function that fetches the data using the google books api based on the search, filters books, and sets results
    const fetchData = (query) => {
        fetch(get_books_url(query)).then((response) => response.json())
        .then((json) => {
            const books = json.items || [];
            const filteredBooks = filterBooks(books);
            setResults(filteredBooks);
        });
    }
    
    // Function that sets new results based on a change in the search bar
    const handleChange = (value) => {
        set_search_input(value);
        if (value.trim() === "") {
            setResults([]);
        } 
        else {
            fetchData(value);
        }
    }

    // Function that saves each search by fetching the flask database and posting it there
    const saveSearch = (query) => {
        fetch('https://book-search-4tcm.onrender.com/save-search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query }),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log('Search saved:', data)
        })
    }

    // Function that saves search and displays the cards
    const handleSearch = () => {
        saveSearch(search_input);
        onSearch(); 
    }

    // Function that handles the enter key when used on the search bar for the final search
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch(); 
        }
    };

    // Renders a search bar that stores a search_input based on enter or ongoing typing
    return (
        <div className="search_bar">
            <FaSearch id="search-icon" onClick={handleSearch} />
            <input placeholder="Type to search..." 
            value={search_input}
            onChange={(e) => handleChange(e.target.value)}
            onKeyUp = {handleKeyPress}/>
        </div>
    );
};