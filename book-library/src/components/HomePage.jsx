import React from 'react';
import SearchBar from './SearchBar';
import { useNavigate } from 'react-router-dom';
import background from '../assets/background.png';
import logo from '../assets/logo.png';

const HomePage = () => {
    const navigate = useNavigate(); 

    const handleSearch = (query) => {
        navigate(`/search?q=${query}`); 
    };
    return (
    <div className="container mx-auto px-4 py-8">
        <img src={logo} alt="Record Reads logo" />
        <img src={background} alt='background image'/>
        <h1 className="text-3xl font-bold text-center mb-8">Browse the largest collection of books on the internet!</h1>
        <SearchBar onSearch={handleSearch} /> 
        <p>"The world belongs to those who read." - Rick Holland</p>
    </div>
    );
};

export default HomePage;