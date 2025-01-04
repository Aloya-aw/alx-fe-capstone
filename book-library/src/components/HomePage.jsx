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
        <div>
            <div className="relative bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${background})` }}>
                <div className="container mx-auto flex flex-col">
                    <img src={logo} alt="Record Reads logo" className="mt-10 w-72 h-20 ml-11"/>
                    <div className="w-full mx-auto flex flex-col items-center justify-center mb-28 mt-12">
                        <h1 className="mx-auto flex sm:w-full flex-col justify-center shrink-0 text-white text-center font-Imprint sm:text-[80px] font-normal leading-[normal] mt-3 text-[40px] w-80">Browse the largest collection of books on the internet!</h1>
                        <SearchBar onSearch={handleSearch} />
                    </div>
                </div>   
            </div>
            <div className='flex-col justify-center shrink-0 text-black text-center mb-28 md:w-[685px] md:mx-auto'>
                <p className="mt-36 font-Inter text-4xl">"The world belongs to those who read." - Rick Holland</p>
            </div>
        </div>
    
    );
};

export default HomePage;