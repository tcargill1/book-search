import React, {useState} from 'react';
import { FaSearch } from "react-icons/fa";
import './search_bar.css';

const BASE_URL = 'https://www.googleapis.com/books/v1/volumes';
//const API_KEY = 'AIzaSyAD7cNQBOhaeJilP3ySL7LEEtHpmtHgWTw'
const API_KEY = process.env.REACT_APP_API_BOOK_KEY;

const get_books_url = (query) => {
  return `${BASE_URL}?q=${query}&key=${API_KEY}`;
}

export const SearchBar = ({ setResults, onSearch }) => {
    const [search_input, set_search_input] = useState("");

    const filterBooks = (books) => {
        return books.filter(book =>
            book.volumeInfo &&
            book.volumeInfo.title &&
            book.volumeInfo.authors &&
            book.volumeInfo.imageLinks &&
            book.volumeInfo.imageLinks.thumbnail
        );
    }

    const fetchData = (query) => {
        fetch(get_books_url(query)).then((response) => response.json())
        .then((json) => {
            const books = json.items || [];
            const filteredBooks = filterBooks(books);
            /*console.log('Filtered Books:', filteredBooks);*/
            setResults(filteredBooks)
        });
    }
    
    const handleChange = (value) => {
        set_search_input(value);
        if (value.trim() === "") {
            setResults([]);
        } 
        else {
            fetchData(value);
        }
    }

    const handleSearch = () => {
        onSearch(); // will be replaced with functionality that brings in the cards
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch(); 
        }
    };

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