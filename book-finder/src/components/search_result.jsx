import React from 'react';
import "./search_result.css";

export const SearchResultName = ({ result }) => {
    return <div className="search-result-name">{result.volumeInfo.title}</div>
}
