"use client";
import { useEffect, useState } from 'react';
import CharacterList from '../components/CharacterList';
import MainpageList from "../components/MainpageList";
import { FaBars } from 'react-icons/fa';

export default function EpisodeList() {
  const [episodes, setEpisodes] = useState([]);
  const [selectedEpisode, setSelectedEpisode] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [navHeight, setNavHeight] = useState(0);
   // Flag for mobile view navbar toggle
  const [isNavOpen, setIsNavOpen] = useState(false);

  //Calculate navbar height based on window height
  useEffect(() => {
    const handleResize = () => {
      const height = window.innerHeight;
      setNavHeight(height - 100);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    fetch('https://rickandmortyapi.com/api/episode')
      .then((res) => res.json())
      .then((data) => setEpisodes(data.results))
      .catch((err) => console.error(err));
  }, []);



  const handleEpisodeClick = (episode) => {
    if (selectedEpisode && selectedEpisode.id === episode.id) {
      setSelectedEpisode(null);
    } else {
      setSelectedEpisode(episode);
      setCurrentPage(1);
    }
    setIsNavOpen(!isNavOpen);
  };

  // Toggle mobile view navbar
  const toggleNav = () => setIsNavOpen(!isNavOpen); 

  return (
    <div className="flex flex-col md:flex-row flex-1">
      <button className="md:hidden bg-blue-600 text-white p-3" onClick={toggleNav}>
        <FaBars size={24} />
      </button>
      <nav
        className={`bg-blue-200 w-full md:w-1/4 lg:w-1/5 p-4 overflow-y-auto md:block ${isNavOpen ? 'block' : 'hidden'}`}
        style={{ height: `${navHeight}px` }}
      >
        <ul>
          {episodes.map((episode) => (
            <li
              key={episode.id}
              className={`py-2 px-4 bg-blue-100 my-2 rounded cursor-pointer ${selectedEpisode && selectedEpisode.id === episode.id ? 'bg-blue-700 text-white' : ''
                }`}
              onClick={() => handleEpisodeClick(episode)}
            >
              {episode.name}
            </li>
          ))}
        </ul>
      </nav>


      <main className="flex-1 p-6">
        {selectedEpisode ? (
          <CharacterList episode={selectedEpisode.name} episodeId={selectedEpisode.id} currentPage={currentPage} setCurrentPage={setCurrentPage} />
        ) : (
          <MainpageList currentPage={currentPage} setCurrentPage={setCurrentPage} />
        )}
      </main>
    </div>
  );
}


