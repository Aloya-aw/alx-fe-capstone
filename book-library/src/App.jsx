import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import BookCard from './components/BookCard';
import BookDetails from './components/BookDetails';

const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

function App() {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 10; // Number of books to display per page

  const handleSearch = debounce(async (query) => {
    try {
      const response = await axios.get(`https://openlibrary.org/search.json?q=${query}&limit=${booksPerPage}&offset=${(currentPage - 1) * booksPerPage}`);
      setBooks(response.data.docs); 
    } catch (error) {
      console.error('Error fetching books:', error);
      // Handle error (e.g., display an error message)
    }
  }, 500); 

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <Router>
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-4">Book Library</h1>
        <SearchBar onSearch={handleSearch} />
        <Routes>
          <Route 
            path="/" 
            element={
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {books.map((book) => (
                    <BookCard key={book.key} book={book} />
                  ))}
                </div>
                {/* Pagination controls (you can customize this) */}
                <div className="mt-4">
                  <button 
                    onClick={() => handlePageChange(currentPage - 1)} 
                    disabled={currentPage === 1} 
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                  >
                    Previous
                  </button>
                  <button 
                    onClick={() => handlePageChange(currentPage + 1)} 
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Next
                  </button>
                </div>
              </>
            } 
          />
          <Route path="/book/:bookId" element={<BookDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;