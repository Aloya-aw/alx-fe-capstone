import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom'; // To access search query parameters
import axios from 'axios';
import BookCard from './BookCard';
import SearchBar from './SearchBar';
import logo from '../assets/logo.png';
import Spinner from './Spinner';
import HomePage from './HomePage';

const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

const SearchResultsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [books, setBooks] = useState([]);
  const query = searchParams.get('q');
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 12; // Number of books to display per page
  const [totalPages, setTotalPages] = useState(0);
  const [noResults, setNoResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchBooks = debounce(async (newQuery, newPage) => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://openlibrary.org/search.json?q=${newQuery || query}&limit=${booksPerPage}&offset=${(newPage - 1) * booksPerPage}`
      );
      setBooks(response.data.docs);
      setTotalPages(Math.ceil(response.data.numFound / booksPerPage));
      setNoResults(response.data.numFound === 0); // Check for no results
    } catch (error) {
      console.error('Error fetching books:', error);
      // Handle error (e.g., display an error message)
      setBooks([]); // Clear books if an error occurs
      setTotalPages(0);
    }
    finally {
      setIsLoading(false); // Set loading to false after fetching (success or error)
    }
  }, 500);

  useEffect(() => {
    if (query) { 
      fetchBooks(query, currentPage); 
    } else {
      // Clear results when no query is provided
      setBooks([]); 
      setTotalPages(0); 
      setIsLoading(false); 
    }
  }, [query, currentPage]);  // Re-fetch on query or page change

  const handleSearch = (newQuery) => {
    setSearchParams({ q: newQuery }); // Update URL query parameter
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    // fetchBooks(query, newPage); // Re-fetch for the new page
  };

  return (
    <div className="container mx-auto px-4 py-8">
        <div className="container mx-auto flex flex-col">
            <img src={logo} alt="Record Reads logo" className="mt-10 w-72 h-20 sm:ml-11 mb-20 mx-auto"/>
        </div>
        <SearchBar onSearch={handleSearch} />
        <h2 className="text-2xl font-bold font-Inter mb-20 mt-16 text-black dark:text-white">Search Results for "{query}"</h2>
        {isLoading && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <Spinner />
        </div>
      )}
        {noResults && !isLoading && ( // Check for no results and not loading
        <div className="text-black dark:text-white font-bold mb-48 mt-28 text-4xl font-Inter flex-col justify-center text-center mx-auto lg:w-[39rem]">
          OOPS! Looks like we don't have "{query}". Please try a different search term.
        </div>
        )}
        {!isLoading && ( // Only render books if not loading
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {books.map((book) => (
            <BookCard key={book.key} book={book} />
          ))}
        </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {books.map((book) => (
            <BookCard key={book.key} book={book} />
            ))}
        </div>
        {totalPages > 1 && !isLoading && ( // Only render pagination if not loading
            <div className="pagination mt-4 flex items-center justify-between">
            {/* pagination controls here */}
            <button onClick={() => handlePageChange(Math.max(currentPage - 1, 1))} disabled={currentPage === 1} className='bg-white dark:bg-[#101720] hover:underline text-[#0084FF] text-xl font-Inter font-bold'>Previous</button>
            <span className="text-gray-900 text-xl font-Inter">Page {currentPage} of {totalPages}</span>
            <button onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))} disabled={currentPage === totalPages} className='bg-white dark:bg-[#101720] hover:underline text-[#0084FF] text-xl font-Inter font-bold'>Next</button>
            </div>
        )}
        <Link to="/" className="text-[#0084FF] flex justify-center mt-28 text-2xl font-Inter font-bold hover:underline">Back to Home</Link>
        <div className='flex-col justify-center shrink-0 text-black dark:text-white text-center mb-28'>
          <p className="mt-36 font-Inter text-4xl">"The world belongs to those who read" - Rick Holland</p>
        </div>
    </div>
  );
};

export default SearchResultsPage;