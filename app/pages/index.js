"use client";
import EpisodeList from '../components/EpisodeList';
export default function Home() {


  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-blue-600 text-white py-4 text-center">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold">Rick and Morty Characters</h1>
      </header>

      <EpisodeList />
    </div>
  );
}
