import React from 'react';
import {  SearchBar  } from './components/search_bar.jsx';
import {  SearchResultsList  } from './components/search_results_list.jsx';
import BookCard from './components/book_card.jsx';
import SearchHistory from './components/search_history.jsx'
import {  useState  } from 'react';
import './app.css';

function App() {
  // Variable to store and update results
  const [results, setResults] = useState([]);
  // Variable to store and update final results
  const [finalResults, setFinalResults] = useState([]);
  // Boolean variables for showing results
  const [showResults, setShowResults] = useState(false);

  const handleSearch = (newResults) => {
    // Function that sets and shows moving results while search was being entered
    setResults(newResults);
    setShowResults(true);
  }

  const handleFinalSearch = () => {
    // Function that shows the final results when search is done and stops showing moving results
    setFinalResults(results);
    setShowResults(false);
  }

  const handleCloseRequests = () => {
    // Function that closes moving results when clicked outside search bar
    setShowResults(false);
  }

  return (
    <div className="App">
      <div className="search-bar-container">
        {/*Renders search bar and sets results while typing and the final search when entered */}
        <SearchBar setResults = {handleSearch} onSearch={handleFinalSearch} />

        {/* Renders ongoingsearch results list when showResults is true and search has started*/}
        {showResults && results.length > 0 && (<SearchResultsList results = {results} onClose={handleCloseRequests}/>)}

        {/* Renders search history button to app*/}
        <SearchHistory />
      </div>

      {
        // If there are results after searching for a book, then add each result to a book card
        finalResults?.length > 0
        ? (
            <div className="container">
                {finalResults.map((book) => (
                    // Renders book card with the book id and book
                    <BookCard key={book.id} book={book}/>
                ))}
            </div>
        ) :
        (
            <div className="empty">
              <h2> Start searching for any book, author, or publisher!</h2>
            </div>
        )
      }
    </div>
  );
}

export default App;
