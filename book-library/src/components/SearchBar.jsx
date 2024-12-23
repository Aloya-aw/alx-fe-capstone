import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(query); 
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search for books..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border border-gray-300 p-2 rounded"
      />
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;