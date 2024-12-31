import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(query); 
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center mb-8">
      <input
        type="text"
        placeholder="Search for books..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border border-gray-300 p-2 rounded-xl w-full sm:w-96 mb-8 h-10"
      />
      <button
        type="submit"
        className="text-white w-123px h-36px flex-shrink-0 rounded-10px border border-transparent px-6 py-3 text-xl font-bold font-family-inter bg-blue-500 cursor-pointer transition-border-colors duration-200 text-center align-middle flex items-center"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;