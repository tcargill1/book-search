import { useState, useEffect } from 'react';

const ScrollList = (callback) => {
    const [isFetching, setFetching]= useState(false);

    useEffect(() => {
        if (!isFetching) return;
        callback(() => {
            console.log("called back");
        });
    }, [isFetching]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
      }, []);
    
    const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
        setFetching(true);
    }

    return [isFetching, setFetching]
};

export default ScrollList;