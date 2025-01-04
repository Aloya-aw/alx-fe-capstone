import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import SearchBar from './SearchBar';
import Logo from '../assets/Logo.png'
import Spinner from './Spinner';

const BookDetails = () => {
    const { bookId } = useParams(); 
    const [book, setBook] = useState(null);
    const [showMoreSubjects, setShowMoreSubjects] = useState(false);
    const navigate = useNavigate();

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(`https://openlibrary.org/api/books?bibkeys=ISBN:${bookId}&format=json&jscmd=data`);
        setBook(response.data[`ISBN:${bookId}`]); 
        console.log(response.data);
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
    return (
      <div className="flex justify-center items-center min-h-screen"> 
        <Spinner />
      </div>
    )
  }

  const handleSearch = (query) => {
    navigate(`/search?q=${query}`); // Construct search URL and navigate
  };


  /*neaten display of subjects when they are too many */
  const maxSubjectsToDisplay = 7; 
  const displayedSubjects = book.subjects?.slice(0, maxSubjectsToDisplay).map((subject) => subject.name);
  const allSubjects = book.subjects?.map((subject) => subject.name).join(', ');

  const toggleShowMore = () => {
    setShowMoreSubjects(!showMoreSubjects);
  };

 const coverImageUrl = 
    book?.cover_i 
      ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` 
      : 'https://via.placeholder.com/150x225?text=No+Cover'; // Placeholder image

  return (
    <div className="w-full font-Inter">
      <div className="container mx-auto flex flex-col">
        <img src={Logo} alt="Record Reads logo" className="mt-10 w-72 h-20 sm:ml-11 mb-20 mx-auto"/>
      </div>
      <SearchBar onSearch={handleSearch}/>
      <div className="p-4 bg-white dark:bg-[#101720] rounded-lg shadow-md mx-auto max-w-lg sm:max-w-3xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl">
          <img 
              src={coverImageUrl}
              alt={book.title} 
              className="w-48 h-64 object-cover mr-4"  
          />
          <h2 className="sm:text-5xl text-xl font-bold mb-6 mt-4">{book.title}</h2>
          <p className="text-gray-600 sm:text-3xl text-base mb-2 sm:mb-3.5">by {book.authors?.[0]?.name || 'Unknown Author'}</p>
          <p className="mt-4 text-gray-800 sm:text-3xl text-base mb-3 sm:mb-5 dark:text-[#b1b1b3]">{book.description || 'No description available.'}</p>
          <p className="text-gray-600 text-base sm:text-3xl mb-3 sm:mb-5">ISBN: {bookId}</p>
          <p className="text-gray-600 text-base sm:text-3xl mb-3 sm:mb-5">Published: {book.publish_date || 'Unknown'}</p> 
          <p className="text-gray-500 text-base sm:text-3xl mb-3 sm:mb-5">Pages: {book.number_of_pages || 'Unknown'}</p>
          <p className="text-gray-500 text-base sm:text-3xl mb-3 sm:mb-5">Subjects: {showMoreSubjects ? allSubjects : displayedSubjects.join(', ')}</p>
          {book.subjects && book.subjects.length > maxSubjectsToDisplay && (
          <button 
            onClick={toggleShowMore}
            className="text-blue-500 hover:underline text-sm sm:text-xl font-Inter"
          >
            {showMoreSubjects ? 'Show Less' : 'Show More'}
          </button>
            )}
      </div>
      <Link to="/" className="text-[#0084FF] flex justify-center mt-28 text-2xl font-Inter font-bold hover:underline">Back to Home</Link>
      <div className='flex-col justify-center shrink-0 text-black dark:text-white text-center mb-28'>
        <p className="mt-36 font-Inter text-4xl">"The world belongs to those who read" - Rick Holland</p>
      </div>
    </div>
  );
};

export default BookDetails;