import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import BookCard from './components/BookCard';
import BookDetails from './components/BookDetails';

function App() {
  const [books, setBooks] = useState([]);

  const handleSearch = async (query) => {
    try {
      const response = await axios.get(`https://openlibrary.org/search.json?q=${query}`);
      setBooks(response.data.docs); 
    } catch (error) {
      console.error('Error fetching books:', error);
      // Handle error (e.g., display an error message)
    }
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
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {books.map((book) => (
                  <BookCard key={book.key} book={book} />
                ))}
              </div>
            } 
          />
          <Route path="/book/:bookId" element={<BookDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;