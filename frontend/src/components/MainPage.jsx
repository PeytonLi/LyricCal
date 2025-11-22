import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db, signOut } from "../firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { Button } from "../components/ui/Button";
import { Music, LogOut, Search, Menu, Play } from "lucide-react";

const MainPage = () => {
    const [user, setUser] = useState(null);
    const [songs, setSongs] = useState([]);
    const [pastListens, setPastListens] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
            if (!currentUser) {
                navigate("/auth");
            } else {
                setUser(currentUser);
            }
        });
        return () => unsubscribe();
    }, [navigate]);

    useEffect(() => {
        if (user) {
            fetchSongs();
            fetchPastListens();
        }
    }, [user]);

    const fetchSongs = async () => {
        try {
            const q = query(collection(db, "songs"), orderBy("created_at", "desc"));
            const snapshot = await getDocs(q);
            const data = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));

            // Demo data if Firestore is empty
            if (data.length === 0) {
                const demoSongs = [
                    { id: "1", title: "Blinding Lights", artist: "The Weeknd", album: "After Hours", genre: "Pop", duration: 200, mood: "energetic" },
                    { id: "2", title: "Shape of You", artist: "Ed Sheeran", album: "÷ (Divide)", genre: "Pop", duration: 233, mood: "happy" },
                    { id: "3", title: "Levitating", artist: "Dua Lipa", album: "Future Nostalgia", genre: "Pop", duration: 203, mood: "energetic" },
                    { id: "4", title: "Smells Like Teen Spirit", artist: "Nirvana", album: "Nevermind", genre: "Rock", duration: 301, mood: "angry" },
                    { id: "5", title: "Bohemian Rhapsody", artist: "Queen", album: "A Night at the Opera", genre: "Rock", duration: 354, mood: "epic" },
                    { id: "6", title: "Stay", artist: "The Kid LAROI & Justin Bieber", album: "Stay (Single)", genre: "Pop", duration: 141, mood: "sad" },
                    { id: "7", title: "Someone Like You", artist: "Adele", album: "21", genre: "Soul", duration: 285, mood: "sad" },
                    { id: "8", title: "Uptown Funk", artist: "Mark Ronson ft. Bruno Mars", album: "Uptown Special", genre: "Funk", duration: 270, mood: "happy" },
                    { id: "9", title: "Bad Guy", artist: "Billie Eilish", album: "When We All Fall Asleep, Where Do We Go?", genre: "Alternative", duration: 194, mood: "moody" },
                    { id: "10", title: "Believer", artist: "Imagine Dragons", album: "Evolve", genre: "Alternative Rock", duration: 204, mood: "motivational" },
                ];
                setSongs(demoSongs);
            } else {
                setSongs(data);
            }
        } catch (error) {
            console.error("Error loading songs:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchPastListens = () => {
        // Mock past listens data
        const mockPastListens = [
            { id: "p1", mood: "sad", title: "Someone Like You", artist: "Adele" },
            { id: "p2", mood: "need hype up", title: "Believer", artist: "Imagine Dragons" },
            { id: "p3", mood: "happy", title: "Uptown Funk", artist: "Mark Ronson ft. Bruno Mars" },
            { id: "p4", mood: "energetic", title: "Blinding Lights", artist: "The Weeknd" },
            { id: "p5", mood: "calm", title: "As It Was", artist: "Harry Styles" },
        ];
        setPastListens(mockPastListens);
    };

    const handleLogout = async () => {
        await signOut(auth);
        navigate("/auth");
    };

    const handleSearch = () => {
        // Search logic can be implemented here
        console.log("Searching for:", searchQuery);
    };

    if (loading) {
        return (
            <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-purple-900 via-purple-800 to-purple-700">
                <div className="text-xl text-white">Loading...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen w-full bg-gradient-to-b from-purple-900 via-purple-800 to-purple-700 text-white">
            {/* Header Bar */}
            <header className="w-full px-6 md:px-8 py-4 border-b border-white/10">
                <div className="flex items-center justify-between">
                    {/* Left: Logo */}
                    <span className="relative inline-block font-extrabold tracking-tight text-2xl md:text-3xl">
                        {/* 텍스트 */}
                        <span className="text-white">Lyric</span>
                        <span className="bg-gradient-to-r from-purple-300 to-pink-400 bg-clip-text text-transparent">
                            Cal
                        </span>

                    </span>

                    {/* Right: Buttons and Menu */}
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => navigate("/")}
                            className="px-4 py-2 text-sm text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                        >
                            Back to Intro
                        </button>
                        <button
                            onClick={handleLogout}
                            className="px-4 py-2 text-sm text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-colors flex items-center gap-2"
                        >
                            <LogOut className="h-4 w-4" />
                            Logout
                        </button>
                        <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                            <Menu className="h-6 w-6 text-white" />
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="w-full px-6 md:px-8 py-8 max-w-7xl mx-auto">
                {/* How are you feeling today? Section */}
                <section className="mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">How are you feeling today?</h2>
                    <div className="relative w-full max-w-4xl">
                        <div className="absolute left-5 top-1/2 transform -translate-y-1/2">
                            <Search className="h-5 w-5 text-white/70" />
                        </div>
                        <div className="relative w-full">
                            {/* 검색 아이콘 */}
                            <span className="absolute left-5 top-1/2 -translate-y-1/2 z-20 text-white">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
                                    />
                                </svg>
                            </span>

                            {/* Input */}
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                                placeholder="Type in your mood to find a song that's right for you…"
                                className="
      w-full pl-14 pr-6 py-4 rounded-full
      bg-white/15 backdrop-blur-md text-white
      placeholder-white/60 border border-white/20
      focus:outline-none focus:ring-2 focus:ring-white/60 focus:border-white/40
      transition-all duration-200 text-lg relative z-10
    "
                            />
                        </div>
                    </div>
                </section>

                {/* Past Listens Section */}
                <section className="mb-12">
                    <h3 className="text-2xl md:text-3xl font-bold mb-6">Past Listens</h3>
                    <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                        {pastListens.map((item) => (
                            <div
                                key={item.id}
                                className="flex-shrink-0 w-48 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl overflow-hidden hover:bg-white/15 transition-all duration-300 group"
                            >
                                {/* Thumbnail */}
                                <div className="relative aspect-square bg-gradient-to-br from-purple-500 via-purple-600 to-indigo-600 flex items-center justify-center">
                                    <Music className="h-16 w-16 text-white/30" />
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                                        <button className="opacity-0 group-hover:opacity-100 transition-all duration-300">
                                            <Play className="h-8 w-8 text-white" />
                                        </button>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-4">
                                    <span className="inline-block px-3 py-1 text-xs font-semibold bg-purple-500/30 text-purple-200 rounded-full mb-2">
                                        {item.mood}
                                    </span>
                                    <h4 className="font-bold text-sm truncate mb-1">{item.title}</h4>
                                    <p className="text-xs text-white/70 truncate">{item.artist}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Recommended For You Section */}
                <section>
                    <div className="mb-6">
                        <h3 className="text-2xl md:text-3xl font-bold mb-2">Recommended For You</h3>

                        <div className="flex items-center gap-2 text-lg">
                            <span className="text-white/80">equivalent to</span>

                            {/* Sad pill */}
                            <span className="
      px-4 py-1 
      rounded-full 
      bg-purple-600/40 
      border border-purple-300/40 
      text-white 
      text-sm 
      font-medium
      backdrop-blur-sm
    ">
                                Sad
                            </span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                        {songs.slice(0, 12).map((song) => (
                            <div
                                key={song.id}
                                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl overflow-hidden hover:bg-white/15 transition-all duration-300 group"
                            >
                                {/* Thumbnail */}
                                <div className="relative aspect-square bg-gradient-to-br from-purple-500 via-purple-600 to-indigo-600 flex items-center justify-center">
                                    <Music className="h-12 w-12 text-white/30" />
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                                        <button className="opacity-0 group-hover:opacity-100 transition-all duration-300">
                                            <Play className="h-8 w-8 text-white" />
                                        </button>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-3">
                                    <h4 className="font-bold text-sm truncate mb-1">{song.title}</h4>
                                    <p className="text-xs text-white/70 truncate">{song.artist}</p>
                                    {song.mood && (
                                        <span className="inline-block mt-2 px-2 py-0.5 text-xs bg-purple-500/30 text-purple-200 rounded-full">
                                            {song.mood}
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
};

export default MainPage;
