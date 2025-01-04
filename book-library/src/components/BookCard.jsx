import React from 'react';
import { Link } from 'react-router-dom'; //to create a link to the /book/:bookId route

const BookCard = ({ book }) => {  //a functional component that receives a book object as a prop
  return (
    <div className="bg-white dark:bg-[#101720] rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-200">
      <Link to={`/book/${book.isbn[0]}`}> 
        <img 
          src={`https://covers.openlibrary.org/b/id/${book.cover_i || 'OLID-L.jpg'}-M.jpg`}
          alt={book.title} 
          className="w-full h-44 object-cover" 
        />
        <div className="p-4">
          <h3 className="text-xl text-[#0084FF] font-bold font-Inter">{book.title}</h3>
          <p className="text-gray-600 text-[20px] font-Inter">by {book.author_name?.[0] || 'Unknown Author'}</p>
          <p className="text-gray-500 text-[20px] font-Inter">Publisher: {book.publishers?.[0] || 'Unknown Publisher'}</p> 
          {/* ?.[0] is optional chaining. It safely accesses the first element of the array if it exists, otherwise returns undefined. */}
        </div>
      </Link>
    </div>
  );
};

export default BookCard;