import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import SearchBar from './SearchBar';
import Logo from '../assets/Logo.png'

const BookDetails = () => {
    const { bookId } = useParams(); 
    const [book, setBook] = useState(null);
    const [showMoreSubjects, setShowMoreSubjects] = useState(false);

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

  /*neaten display of subjects when they are too many */
  const maxSubjectsToDisplay = 7; 
  const displayedSubjects = book.subjects?.slice(0, maxSubjectsToDisplay).map((subject) => subject.name);
  const allSubjects = book.subjects?.map((subject) => subject.name).join(', ');

  const toggleShowMore = () => {
    setShowMoreSubjects(!showMoreSubjects);
  };

  const coverImageUrl = 
    book.cover_i 
      ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` 
      : 'https://via.placeholder.com/150x225?text=No+Cover'; // Placeholder image

  return (
    <div className="w-full">
      <div className="flex justify-center mb-8"> 
        <img src={Logo} alt="Book Library Logo" className="w-24 h-24" /> 
      </div>
      <SearchBar />
      <div className="p-4 bg-white rounded-lg shadow-md mx-auto max-w-2xl sm:max-w-3xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl">
          <img 
              src={coverImageUrl}
              alt={book.title} 
              className="w-48 h-64 object-cover mr-4"  
          />
          <h2 className="text-2xl font-bold mb-4">{book.title}</h2>
          <p className="text-gray-600">by {book.authors?.[0]?.name || 'Unknown Author'}</p>
          <p className="text-gray-600">Published: {book.publish_date || 'Unknown'}</p>
          <p className="text-gray-600">Pages: {book.number_of_pages || 'Unknown'}</p>
          <p className="text-gray-500">ISBN: {bookId}</p> 
          <p className="text-gray-500">Pages: {book.number_of_pages || 'Unknown'}</p>
          <p className="text-gray-500">Subjects: {showMoreSubjects ? allSubjects : displayedSubjects.join(', ')}</p>
          {book.subjects && book.subjects.length > maxSubjectsToDisplay && (
          <button 
            onClick={toggleShowMore}
            className="text-blue-500 hover:underline"
          >
            {showMoreSubjects ? 'Show Less' : 'Show More'}
          </button>
            )}
          <p className="mt-4">{book.description || 'No description available.'}</p> 
          {/* Add more details as needed */}
      </div>
      <Link to="/">Back to Home</Link>
      <p>"The world belongs to those who read" - Rick Holland</p>
    </div>
  );
};

export default BookDetails;