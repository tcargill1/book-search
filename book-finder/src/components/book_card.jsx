import React from 'react';
import '../styles/book_card.css';

const BookCard = ({ book }) => {

    // Function that opens window to book info when clicked
    const handleButtonClick = () => {
        return (window.open(book.volumeInfo.infoLink, '_blank', ))
    }

    return (
        // Returns book card to app
        <div className="book-card">
         
            <h3 className="book-title">{book.volumeInfo.title}</h3>
            
            <img className="book-thumbnail" src={book.volumeInfo.imageLinks.thumbnail} alt="No images available"></img>
            
            <p className="book-description"> {book.volumeInfo.description}</p>
            
            <p className="book-authors">{book.volumeInfo.authors}</p>
            
            <p className="book-publisher">{book.volumeInfo.publisher}</p>

            <button className = "button" onClick={handleButtonClick}>
                More here
            </button>

        </div>
    )
}

export default BookCard;