import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Music = () => {
  const [query, setQuery] = useState('');
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  const defaultSearchTerms = ['telugu hits', 'english pop', 'latest songs', 'romantic', 'arijit singh', 'sid sriram', 'taylor swift'];

  // Fetch music data
  const searchMusic = async (searchQuery, pageNum = 1, append = false) => {
    if (!searchQuery) return;
    setLoading(true);
    try {
      const response = await axios.get('https://itunes.apple.com/search', {
        params: {
          term: searchQuery,
          media: 'music',
          limit: 20,
          offset: (pageNum - 1) * 20,
        },
      });
      const results = response.data.results;

      if (append) {
        setSongs((prevSongs) => [...prevSongs, ...results]);
      } else {
        setSongs(results);
      }

      setHasMore(results.length > 0);
      setPage(pageNum + 1);
    } catch (error) {
      console.error('Error fetching music:', error);
    }
    setLoading(false);
  };

  // Handle search manually
  const handleSearch = () => {
    setPage(1);
    searchMusic(query, 1, false);
  };

  // Infinite scroll
  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100 &&
      !loading &&
      hasMore
    ) {
      searchMusic(query, page, true);
    }
  };

  // Load random music on mount
  useEffect(() => {
    const randomTerm = defaultSearchTerms[Math.floor(Math.random() * defaultSearchTerms.length)];
    searchMusic(randomTerm, 1, false);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });

  const getYouTubeSearchUrl = (trackName, artistName) => {
    const q = encodeURIComponent(`${trackName} ${artistName} full song`);
    return `https://www.youtube.com/results?search_query=${q}`;
  };

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
      <h1 className="text-3xl font-bold mb-6 text-center text-indigo-700">
        🎵 Music Explorer (Telugu & English)
      </h1>

      <div className="flex gap-4 mb-6 max-w-md mx-auto">
        <input
          type="text"
          placeholder="Search songs, artists, albums..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border px-4 py-2 rounded w-full"
          onKeyDown={(e) => { if (e.key === 'Enter') handleSearch(); }}
        />
        <button
          onClick={handleSearch}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
        >
          Search
        </button>
      </div>

      {loading && <p className="text-center mb-4">🔄 Loading music...</p>}

      {!loading && songs.length === 0 && (
        <p className="text-center text-gray-600">No results found. Try another search.</p>
      )}

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {songs.map((song) => (
          <div
            key={song.trackId}
            className="bg-white border rounded-lg shadow-md p-4 hover:shadow-lg transition"
          >
            <img
              src={song.artworkUrl100}
              alt={song.trackName}
              className="mb-3 rounded w-full object-cover"
            />
            <h2 className="text-lg font-semibold text-indigo-700">{song.trackName}</h2>
            <p className="text-gray-600">{song.artistName}</p>
            <audio controls src={song.previewUrl} className="w-full mt-2" />
            <a
              href={song.trackViewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline block mt-2"
            >
              View on Apple Music
            </a>
            <a
              href={getYouTubeSearchUrl(song.trackName, song.artistName)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-600 hover:underline block mt-1"
            >
              Search Full Song on YouTube 🎬
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Music;
