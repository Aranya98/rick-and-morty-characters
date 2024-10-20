"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';

const MainpageList = ({currentPage, setCurrentPage}) => {
  const [mainCharacters,setMainCharacters] = useState([]);
  const [charactersPerPage, setCharactersPerPage] = useState(0);

  //Fetching main page characters
  useEffect(() => {
    const fetchCharacters = async () => {
            const characterResponse = await axios.get(
        `https://rickandmortyapi.com/api/character`
      );
      const MainPageCharacterResponses = characterResponse.data.results;
    setMainCharacters(MainPageCharacterResponses);
    };

    fetchCharacters();
  }, []);
  

    // Calculate how many characters can fit on one page based on window height
  useEffect(() => {
    const calculateCharactersPerPage = () => {
      const characterCardHeight = 250;
      const windowHeight = window.innerHeight;
      const availableHeight = windowHeight - 100; 
      
      const itemsPerPage = Math.floor(availableHeight / characterCardHeight) * 4;
      setCharactersPerPage(itemsPerPage || 8);
    };

    calculateCharactersPerPage();
    window.addEventListener('resize', calculateCharactersPerPage);

    return () => {
      window.removeEventListener('resize', calculateCharactersPerPage);
    };
  }, []);

  // Calculate total number of pages and number of characters for the current page
  const totalPages = Math.ceil(mainCharacters.length / charactersPerPage);
  const currentCharacters = mainCharacters.slice(
    (currentPage - 1) * charactersPerPage,
    currentPage * charactersPerPage
  );

  // Handle how to control pagination
  const goToPage = (pageNum) => {
    if (pageNum >= 1 && pageNum <= totalPages) {
      setCurrentPage(pageNum);
    }
  };

  return (
    <div>
      <div className="w-full md:w-4/4 p-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {currentCharacters.map((character) => (
          <div key={character.id} className="bg-blue-100 rounded-lg p-4 shadow-lg">
            <img src={character.image} alt={character.name} className="w-full h-40 object-cover rounded-t-lg" />
            <div className="mt-2">
              <h3 className="font-bold">{character.name}</h3>
            </div>
          </div>
        ))}
      </div>

      {/*  How to Control Pagination */}
      {totalPages > 1 && (
        <div className="mt-6 flex justify-center items-center space-x-2">
          <button
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 cursor-pointer "
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>

          {/* Numeric Page Buttons */}
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              className={`px-4 py-2 rounded  cursor-pointer ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300 hover:bg-gray-400'}`}
              onClick={() => goToPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}

          <button
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400  cursor-pointer"
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default MainpageList;

