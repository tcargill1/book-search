import React, { useEffect, useRef }from 'react';
import "../styles/search_results_list.css";
import { SearchResultName } from "./search_result";

export const SearchResultsList = ({  results, onClose  }) => {
    const resultsRef = useRef(null); // Used for interacting with search bar

    // Handle clicks outside of search results
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (resultsRef.current && !resultsRef.current.contains(event.target)) {
                onClose(); //Hides search results if clicks outside
            }
        };
        
        // Mouse added depending on if search bar is being used, depending on onClose
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);

    return (
        // Renders ongoing results list while searching
        <div className="results-list" ref={resultsRef}>
            {results.map((result, id) => {
                return <SearchResultName result={result} key={id}/>;
            })}  
        </div>
    );
};