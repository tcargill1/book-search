import React, { useEffect, useRef }from 'react';
import "./search_results_list.css";
import { SearchResultName } from "./search_result";

export const SearchResultsList = ({  results,onClose  }) => {
    const resultsRef = useRef(null);

    // Handle clicks outside of search results
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (resultsRef.current && !resultsRef.current.contains(event.target)) {
                onClose(); //Hides search results if clicks outside
            }
        };
    
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);

    return (
        <div className="results-list" ref={resultsRef}>
            {results.map((result, id) => {
                return <SearchResultName result={result} key={id}/>;
            })}  
        </div>
    );
};