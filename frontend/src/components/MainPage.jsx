import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { Music, LogOut, Search, Menu, Play, Home } from "lucide-react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { Link } from "react-router-dom";

const MainPage = () => {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    // User inputs
    const [songQuery, setSongQuery] = useState("");
    const [artistQuery, setArtistQuery] = useState("");
    const [numRecs, setNumRecs] = useState(5);

    // Model output
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSearch = async () => {
        setLoading(true);
        setError("");
        setRecommendations([]);

        try {
            const response = await fetch("http://localhost:5000/recommend", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    song: songQuery,
                    artist: artistQuery,
                    num_recs: parseInt(numRecs, 10)
                }),
            });

            if (!response.ok) throw new Error("Model error");

            const data = await response.json();
            setRecommendations(data.recommendations || []);
        } catch (err) {
            console.error(err);
            setError("Unable to generate recommendations.");
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate("/auth");
        } catch (err) {
            console.error("Logout failed:", err);
        }
    };

    return (
        <div className="min-h-screen w-full bg-gradient-to-b from-purple-900 via-purple-800 to-purple-700 text-white">
            {/* Header Bar */}
            <header className="w-full px-6 md:px-8 py-4 border-b border-white/10">
                <div className="flex items-center justify-between">
                    {/* Left: Logo */}
                    <span className="relative inline-block font-extrabold tracking-tight text-2xl md:text-3xl">
                        {/* 텍스트 */}
                        <Link to="/">
                            <span className="text-white">Lyric</span>
                            <span className="bg-gradient-to-r from-purple-300 to-pink-400 bg-clip-text text-transparent">
                                Cal
                            </span>
                        </Link>

                    </span>

                    {/* Right: Menu Button + Dropdown */}
                    <div className="relative">
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                            <Menu className="h-6 w-6 text-white" />
                        </button>
                        {menuOpen && (
                            <React.Fragment>
                                {/*Background overlay - clicking closes menu */}
                                <div
                                    className="fixed inset-0 z-10"
                                    onClick={() => setMenuOpen(false)}
                                />

                                {/* Dropdown Menu */}
                                <div className="absolute right-0 mt-2 w-30 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg shadow-lg z-20">
                                    <button
                                        onClick={() => {
                                            navigate("/");
                                            setMenuOpen(false);
                                        }}
                                        className="hover:cursor-pointer px-4 py-2 text-sm text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-colors flex items-center gap-2"
                                    >
                                        <Home className="h-4 w-4" />
                                        Home
                                    </button>
                                    <button
                                        onClick={() => {
                                            handleLogout();
                                            setMenuOpen(false);
                                        }}
                                        className="hover:cursor-pointer px-4 py-2 text-sm text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-colors flex items-center gap-2"
                                    >
                                        <LogOut className="h-4 w-4" />
                                        Logout
                                    </button>
                                </div>
                            </React.Fragment>
                        )}
                    </div>

                </div>
            </header>

            {/* MAIN */}
            <main className="w-full px-6 md:px-8 py-8 max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Song Recommendation</h2>

                {/* INPUT FIELDS */}
                <div className="space-y-4 mb-8">
                    <input
                        type="text"
                        placeholder="Enter song title"
                        value={songQuery}
                        onChange={(e) => setSongQuery(e.target.value)}
                        className="w-full px-5 py-3 bg-white/15 rounded-xl text-white placeholder-white/60"
                    />

                    <input
                        type="text"
                        placeholder="Enter artist name"
                        value={artistQuery}
                        onChange={(e) => setArtistQuery(e.target.value)}
                        className="w-full px-5 py-3 bg-white/15 rounded-xl text-white placeholder-white/60"
                    />

                    <input
                        type="number"
                        min="1"
                        max="20"
                        value={numRecs}
                        onChange={(e) => setNumRecs(e.target.value)}
                        className="w-full px-5 py-3 bg-white/15 rounded-xl text-white placeholder-white/60"
                        placeholder="Number of recommendations"
                    />

                    <button
                        onClick={handleSearch}
                        disabled={loading}
                        className="hover:cursor-pointer w-full px-5 py-3 bg-purple-600 hover:bg-purple-500 rounded-xl font-semibold"
                    >
                        {loading ? "Loading..." : "Get Recommendations"}
                    </button>
                </div>

                {/* ERRORS */}
                {error && (
                    <div className="text-red-300 mb-4">
                        {error}
                    </div>
                )}

                {/* RECOMMENDATIONS */}
                <h3 className="text-2xl font-bold mb-4">Results</h3>

                {recommendations.length === 0 && !loading && (
                    <p className="text-white/70">No recommendations yet.</p>
                )}

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {recommendations.map((song, i) => (
                        <div
                            key={i}
                            className="bg-white/10 rounded-xl p-3 backdrop-blur-md border border-white/20"
                        >
                            <div className="relative aspect-square bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center rounded-lg">
                                <Music className="h-12 w-12 text-white/40" />
                            </div>
                            <h4 className="font-bold text-sm mt-3 truncate">{song.title}</h4>
                            <p className="text-xs text-white/70 truncate">{song.artist}</p>
                            {song.mood && (
                                <span className="inline-block mt-2 px-2 py-1 text-xs bg-purple-500/30 rounded-full">
                                    {song.mood}
                                </span>
                            )}
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default MainPage;
