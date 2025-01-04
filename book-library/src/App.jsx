import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage'; 
import SearchResultsPage from './components/SearchResultsPage'; 
import BookDetails from './components/BookDetails'; 

function App() {
  return (
    <Router>
      <div className="bg-white dark:bg-[#101720] min-h-screen w-full"> 
        <Routes>
          <Route path="/" element={<HomePage />} /> 
          <Route path="/search" element={<SearchResultsPage />} /> 
          <Route path="/book/:bookId" element={<BookDetails />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;