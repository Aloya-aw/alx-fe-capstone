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
        className="border border-gray-300 p-2 rounded-xl w-full sm:w-96 mb-8 h-10 focus:outline-none focus:ring focus:ring-[#0084FF] font-Inter"
      />
      <button
        type="submit"
        className="text-white dark:text-[#101720] w-[123px] h-[36px] flex-shrink-0 rounded-[10px] border border-transparent px-8 text-xl font-bold font-Inter bg-[#0084FF] cursor-pointer transition-border-colors duration-200 text-center align-middle flex items-center hover:bg-black"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;