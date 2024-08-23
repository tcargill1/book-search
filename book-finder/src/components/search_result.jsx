import React from 'react';
import "../styles/search_result.css";

// Function to show the name of books for ongoing search results
export const SearchResultName = ({ result }) => {
    return <div className="search-result-name">{result.volumeInfo.title}</div>
}
