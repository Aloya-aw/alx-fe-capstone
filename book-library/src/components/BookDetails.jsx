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
    <div className="p-4">
      <h2 className="text-2xl font-bold">{book.title}</h2>
      <p>by {book.authors?.[0]?.name || 'Unknown Author'}</p>
      <p>Published: {book.publish_date || 'Unknown'}</p>
      <p>Pages: {book.number_of_pages || 'Unknown'}</p>
      {/* Add more details as needed */}
    </div>
  );
};

export default BookDetails;