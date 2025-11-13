// src/components/SearchPage.jsx
import { useState } from "react";
import { Button } from "./ui/Button";
import { Card } from "./ui/Card";
import { Music, LogOut, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { auth, signOut } from "../firebase";

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  // Handle search button click
  const handleSearch = () => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    // TODO: Replace with real API logic later
    setResults([]);
  };

  // Logout logic
  const handleLogout = async () => {
    await signOut(auth);
    navigate("/auth");
  };

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-purple-600 via-purple-600 to-blue-500 text-white">

      {/* --- Header (same design as MainPage) --- */}
      <header className="w-full backdrop-blur-md bg-black/10 border-b border-white/10 sticky top-0 z-20">
        <div className="w-full px-8 py-4 flex items-center justify-between">

          {/* Left: Logo + App Name */}
          <div className="flex items-center gap-3">
            <Music className="h-8 w-8 text-white" />
            <h1 className="text-2xl font-bold">LyricCal</h1>
          </div>

          {/* Right: Home + Logout buttons */}
          <div className="flex items-center gap-3">

            {/* Home Button */}
            <Button
              variant="outline"
              className="text-white border-white/30 hover:bg-white/5"
              onClick={() => navigate("/main")}
            >
              <Home className="h-4 w-4 mr-2" />
              Home
            </Button>

            {/* Logout Button */}
            <Button
              variant="outline"
              className="text-white border-white/30 hover:bg-white/5"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* --- Main Content --- */}
      <div className="max-w-4xl mx-auto px-6 pt-20 pb-16 flex flex-col items-center">

        {/* Title + Description */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold tracking-tight mb-4">
            Find songs that match your mood!
          </h1>
          <p className="text-white/80 text-lg">
            Search by title, artist, or lyrics and explore tracks with a similar vibe.
          </p>
        </div>

        {/* Search Bar (Google-style rounded search box) */}
        <div className="w-full max-w-2xl flex items-center gap-3">
          <input
            type="text"
            placeholder="Type a song title, artist name, or part of the lyrics..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 px-5 py-4 rounded-full bg-white/15 backdrop-blur-md text-white 
                       placeholder-white/60 border border-white/20 
                       focus:outline-none focus:ring-2 focus:ring-white/60"
          />
          <Button
            onClick={handleSearch}
            className="px-6 py-3 rounded-full bg-indigo-500 hover:bg-indigo-600 whitespace-nowrap"
          >
            Search
          </Button>
        </div>

        {/* Search Results Section (renders only if result exists) */}
        {results.length > 0 && (
          <div className="w-full mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {results.map((song) => (
              <Card key={song.id}>
                <h3 className="font-bold text-lg truncate">{song.title}</h3>
                <p className="text-sm text-white/80 truncate">{song.artist}</p>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
