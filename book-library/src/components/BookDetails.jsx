import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BookDetails = () => {
    const { bookId } = useParams(); 
    const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(`https://openlibrary.org/api/books?bibkeys=ISBN:${bookId}&format=json&jscmd=data`);
        setBook(response.data[`ISBN:${bookId}`]); 
        // console.log(response.data);
      } catch (error) {
        console.error('Error fetching book details:', error);
        // Handle error (e.g., display an error message)
      }
    };

    if (bookId) {
      fetchBookDetails();
    }
  }, [bookId]);

  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full">
        <div className="p-4 bg-white rounded-lg shadow-md mx-auto max-w-2xl sm:max-w-3xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl">
            <img 
                src={`https://covers.openlibrary.org/b/id/${book.cover_i || 'OLID-L.jpg'}-M.jpg`} //replace
                alt={book.title} 
                className="w-full h-48 object-cover" 
            />
            <h2 className="text-2xl font-bold mb-4">{book.title}</h2>
            <p className="text-gray-600">by {book.authors?.[0]?.name || 'Unknown Author'}</p>
            <p className="text-gray-600">Published: {book.publish_date || 'Unknown'}</p>
            <p className="text-gray-600">Pages: {book.number_of_pages || 'Unknown'}</p>
            {/* Add more details as needed */}
        </div>
    </div>
  );
};

export default BookDetails;