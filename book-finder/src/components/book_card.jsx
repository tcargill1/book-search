import React from 'react';
import './book_card.css';

const BookCard = ({ book }) => {

    const handleButtonClick = () => {
        return (window.open(book.volumeInfo.infoLink, '_blank', ))
    }

    return (
        <div className="book">
            
            <div>
            <h3 className="book-title">{book.volumeInfo.title}</h3>
            </div>

            <div>
                <img className="book-thumbnail" src={book.volumeInfo.imageLinks.thumbnail} alt="No images available"></img>
            </div>

            <button className = "button" onClick={handleButtonClick}>
                More here
            </button>
            
            <div>
                <p className="book-description"> {book.volumeInfo.description}</p>
            </div>

            <div>
                <p className="book-authors">{book.volumeInfo.authors}</p>
            </div>

            <div>
                <p className="book-publisher">{book.volumeInfo.publisher}</p>
            </div>

        </div>
    )
}

export default BookCard;