import React from 'react';
import { Link } from 'react-router-dom'; //to create a link to the /book/:bookId route

const BookCard = ({ book }) => {  //a functional component that receives a book object as a prop
  return (
    <Link to={`/book/${book.isbn[0]}`} className="bg-white rounded-lg shadow-md overflow-hidden"> 
      <img 
        src={`https://covers.openlibrary.org/b/id/${book.cover_i || 'OLID-L.jpg'}-M.jpg`} //replace
        alt={book.title} 
        className="w-full h-48 object-cover" 
      />
      <div className="p-4">
        <h3 className="text-lg font-bold">{book.title}</h3>
        <p className="text-gray-600">by {book.author_name?.[0] || 'Unknown Author'}</p> 
        {/* ?.[0] is optional chaining. It safely accesses the first element of the array if it exists, otherwise returns undefined. */}
      </div>
    </Link>
  );
};

export default BookCard;