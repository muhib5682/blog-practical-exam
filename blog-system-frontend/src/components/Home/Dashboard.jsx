import { useState, useEffect } from "react";
import CreatePost from "./CreatePost";
import PostList from "./PostList";
import { FiSun, FiMoon } from "react-icons/fi";

const Dashboard = () => {
  const [user, setUser] = useState({ username: "", email: "" });
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [dark, setDark] = useState(false);

  const toggleDarkMode = () => {
    setDark(!dark);
    document.documentElement.classList.toggle("dark");
  };

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        if (userData && typeof userData === "object") {
          setUser(userData);
        }
      }
    } catch (error) {
      console.error("Invalid user data", error);
      localStorage.removeItem("user");
    }
  }, []);

  const getInitial = () => {
    return user.username ? user.username.charAt(0).toUpperCase() : "";
  };

const handleSearchChange = async (e) => {
  const value = e.target.value;
  setSearchQuery(value);

  if (value.trim().length > 1) {
    try {
      const res = await fetch(`http://localhost:3000/posts/search?keyword=${value}`);
      const data = await res.json();
      setSearchResults(data);
      setShowModal(true);
    } catch (err) {
      console.error("Search failed:", err);
    }
  } else {
    setShowModal(false);
  }
};


  return (
    <div className="min-h-screen bg-gray-100 w-full z-50 bg-white dark:bg-gray-900 text-gray-800 dark:text-white">
      
  <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm px-6 py-3 flex justify-between items-center border-b border-gray-200 dark:border-gray-700">
  
  <h1 className="text-2xl font-bold text-emerald-600 dark:text-yellow-400 tracking-tight">
    Yegna<span className="text-blue-600">Blog</span>
  </h1>

  
  <div className="flex items-center gap-4">
    {/* Search input */}
    <div className="relative hidden sm:block">
      <input
        type="text"
        placeholder="Search blog posts..."
        value={searchQuery}
        onChange={handleSearchChange}
        className="pl-10 pr-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 
                   bg-gray-50 dark:bg-zinc-800 text-sm text-gray-800 dark:text-white 
                   focus:outline-none focus:ring-2 focus:ring-blue-500 transition w-64"
      />
      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
        <svg className="w-5 h-5 text-gray-400 dark:text-gray-300" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 100-15 7.5 7.5 0 000 15z" />
        </svg>
      </div>
    </div>

    {/* profile dropdown */}
    <div className="relative">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-emerald-600 text-white text-lg font-semibold hover:opacity-90 transition"
        title={user.username}
      >
        {getInitial()}
        
       </button>
      {showDropdown && (
        <div
          className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-lg ring-1 ring-black/10 dark:ring-white/10 p-4 animate-fade-in z-30"
        >
           <button
                  onClick={toggleDarkMode}
                  className="text-xl text-gray-700 dark:text-gray-200 hover:text-yellow-400"
                >
                  {dark ? <FiSun /> : <FiMoon />}
                </button>
          <div className="text-center space-y-1">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{user.username}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{user.email}</p>
            
          </div>

          <div className="mt-4 border-t border-gray-200 dark:border-gray-700 pt-3">
            <button
              onClick={() => {
                localStorage.clear();
                window.location.href = '/login';
              }}
              className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md transition text-sm font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  </div>

  {/* animation */}
  <style>
    {`
      @keyframes fade-in {
        0% { opacity: 0; transform: translateY(-10px); }
        100% { opacity: 1; transform: translateY(0); }
      }
      .animate-fade-in {
        animation: fade-in 0.2s ease-out forwards;
      }
    `}
  </style>
</header>

     {showModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center z-50 pt-24">
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg max-w-2xl w-full p-6 relative">
      <button
        onClick={() => setShowModal(false)}
        className="absolute top-3 right-3 text-gray-400 hover:text-red-600 text-xl font-bold"
      >
        &times;
      </button>
      <h2 className="text-xl font-semibold text-blue-600 dark:text-yellow-400 mb-4">
        🔍 Search Results for "{searchQuery}"
      </h2>
      {searchResults.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">No results found.</p>
      ) : (
        <ul className="space-y-4 max-h-[400px] overflow-y-auto">
          {searchResults.map((post) => (
            <li
              key={post.id}
              className="border border-gray-200 dark:border-gray-700 p-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            >
              <h3 className="text-lg font-semibold text-blue-700 dark:text-yellow-300">{post.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                {post.content.length > 120 ? post.content.slice(0, 120) + '...' : post.content}
              </p>
              <div className="flex justify-between mt-2 text-xs text-gray-400">
              
                <span>{new Date(post.createdAt).toLocaleDateString()}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  </div>
)}

      {/* main dashboard contents */}
      <main className="p-6 ">
        <PostList/>
        <CreatePost/>
      </main>
    </div>
  );
};

export default Dashboard;
