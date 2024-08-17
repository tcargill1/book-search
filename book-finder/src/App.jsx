import React from 'react';
import {  SearchBar  } from './components/search_bar.jsx';
import {  SearchResultsList  } from './components/search_results_list.jsx';
import BookCard from './components/book_card.jsx';
import {  useState  } from 'react';
import './app.css';

function App() {
  const [results, setResults] = useState([]);
  const [finalResults, setFinalResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const handleSearch = (newResults) => {
    setResults(newResults);
    setShowResults(true);
  }

  const handleFinalSearch = () => {
    setFinalResults(results);
    setShowResults(false);
  }

  const handleCloseRequests = () => {
    setShowResults(false);
  }
  return (
    <div className="App">
      <div className="search-bar-container">
        <SearchBar setResults = {handleSearch} onSearch={handleFinalSearch} />
        {showResults && results.length > 0 && (<SearchResultsList results = {results} onClose={handleCloseRequests}/>)}
      </div>

      {
        finalResults?.length > 0
        ? (
            <div className="container">
                {finalResults.map((book) => (
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
