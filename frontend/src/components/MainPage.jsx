import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db, signOut } from "../firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Music, LogOut, Play } from "lucide-react";

const MainPage = () => {
    const [user, setUser] = useState(null);
    const [songs, setSongs] = useState([]);
    const [loading, setLoading] = useState(true);
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
        if (user) fetchSongs();
    }, [user]);

    const fetchSongs = async () => {
        try {
            const q = query(collection(db, "songs"), orderBy("created_at", "desc"));
            const snapshot = await getDocs(q);
            const data = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));

            // ✅ If Firestore has no songs, use fallback demo data
            if (data.length === 0) {
                console.log("No songs found in Firestore — using demo data.");
                const demoSongs = [
                    {
                        id: "1",
                        title: "Blinding Lights",
                        artist: "The Weeknd",
                        album: "After Hours",
                        genre: "Pop",
                        duration: 200,
                    },
                    {
                        id: "2",
                        title: "Shape of You",
                        artist: "Ed Sheeran",
                        album: "÷ (Divide)",
                        genre: "Pop",
                        duration: 233,
                    },
                    {
                        id: "3",
                        title: "Levitating",
                        artist: "Dua Lipa",
                        album: "Future Nostalgia",
                        genre: "Pop",
                        duration: 203,
                    },
                    {
                        id: "4",
                        title: "Smells Like Teen Spirit",
                        artist: "Nirvana",
                        album: "Nevermind",
                        genre: "Rock",
                        duration: 301,
                    },
                    {
                        id: "5",
                        title: "Bohemian Rhapsody",
                        artist: "Queen",
                        album: "A Night at the Opera",
                        genre: "Rock",
                        duration: 354,
                    },
                    {
                        id: "6",
                        title: "Stay",
                        artist: "The Kid LAROI & Justin Bieber",
                        album: "Stay (Single)",
                        genre: "Pop",
                        duration: 141,
                    },
                    {
                        id: "7",
                        title: "Someone Like You",
                        artist: "Adele",
                        album: "21",
                        genre: "Soul",
                        duration: 285,
                    },
                    {
                        id: "8",
                        title: "Uptown Funk",
                        artist: "Mark Ronson ft. Bruno Mars",
                        album: "Uptown Special",
                        genre: "Funk",
                        duration: 270,
                    },
                    {
                        id: "9",
                        title: "Bad Guy",
                        artist: "Billie Eilish",
                        album: "When We All Fall Asleep, Where Do We Go?",
                        genre: "Alternative",
                        duration: 194,
                    },
                    {
                        id: "10",
                        title: "Believer",
                        artist: "Imagine Dragons",
                        album: "Evolve",
                        genre: "Alternative Rock",
                        duration: 204,
                    },
                    {
                        id: "11",
                        title: "Happier Than Ever",
                        artist: "Billie Eilish",
                        album: "Happier Than Ever",
                        genre: "Alternative",
                        duration: 298,
                    },
                    {
                        id: "12",
                        title: "Sunflower",
                        artist: "Post Malone & Swae Lee",
                        album: "Spider-Man: Into the Spider-Verse",
                        genre: "Hip-Hop",
                        duration: 158,
                    },
                    {
                        id: "13",
                        title: "As It Was",
                        artist: "Harry Styles",
                        album: "Harry’s House",
                        genre: "Pop",
                        duration: 167,
                    },
                    {
                        id: "14",
                        title: "Blowin’ in the Wind",
                        artist: "Bob Dylan",
                        album: "The Freewheelin’ Bob Dylan",
                        genre: "Folk",
                        duration: 174,
                    },
                    {
                        id: "15",
                        title: "Lose Yourself",
                        artist: "Eminem",
                        album: "8 Mile (Soundtrack)",
                        genre: "Hip-Hop",
                        duration: 326,
                    },
                ];

                setSongs(demoSongs);
            } else {
                setSongs(data);
            }
        } catch (error) {
            console.error("Error loading songs:", error);
            alert("Error loading songs: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        await signOut(auth);
        navigate("/auth");
    };

    const formatDuration = (seconds) => {
        if (!seconds) return "0:00";
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, "0")}`;
    };

    if (loading) {
        return (
            <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-purple-800 via-purple-600 to-blue-700">
                <div className="text-xl text-white">Loading...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-600 to-blue-500 text-white">
            {/* Header */}
            <header className="w-full backdrop-blur-md bg-black/10 border-b border-white/10 sticky top-0 z-20">
                <div className="w-full px-8 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Music className="h-8 w-8 text-white" />
                        <h1 className="text-2xl font-bold">LyricCal</h1>
                    </div>
                    <Button
                        variant="outline"
                        className="text-white border-white/30 hover:bg-white/5"
                        onClick={() => navigate("/search")}
                    >
                        Search
                    </Button>

                    <Button
                        variant="outline"
                        className="text-white border-white/30 hover:bg-white/5"
                        onClick={handleLogout}
                    >
                        <LogOut className="h-4 w-4 mr-2" />
                        Logout
                    </Button>
                </div>
            </header>

            {/* Main */}
            <main className="w-full px-8 py-10">
                {/* remove max-width so it fills full width */}
                <div className="w-full">

                    <div className="mb-8">
                        <h2 className="text-3xl font-bold mb-2">Recommended for You</h2>
                        <p className="text-white/80">Discover your next favorite song</p>
                    </div>

                    {/* Grid of songs */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
                        {songs.map((song) => (
                            <Card
                                key={song.id}
                                className="group overflow-hidden hover:shadow-2xl transition-all duration-300 bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl"
                            >
                                <div className="relative aspect-square bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                                    <Music className="h-24 w-24 text-white/20" />
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                                        <Button
                                            size="lg"
                                            className="opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100 rounded-full"
                                        >
                                            <Play className="h-6 w-6" />
                                        </Button>
                                    </div>
                                </div>

                                <div className="p-4 space-y-2">
                                    <h3 className="font-bold text-lg truncate">{song.title}</h3>
                                    <p className="text-sm text-white/80 truncate">{song.artist}</p>
                                    {song.album && (
                                        <p className="text-xs text-white/70 truncate">{song.album}</p>
                                    )}
                                    <div className="flex items-center justify-between pt-2">
                                        <span className="text-xs bg-white/10 text-white px-2 py-1 rounded-full">
                                            {song.genre || "Music"}
                                        </span>
                                        <span className="text-xs text-white/70">
                                            {formatDuration(song.duration)}
                                        </span>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default MainPage;
