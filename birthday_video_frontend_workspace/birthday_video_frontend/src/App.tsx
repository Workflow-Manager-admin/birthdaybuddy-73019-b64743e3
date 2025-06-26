import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import NameForm from "./components/NameForm";
import VideoPage from "./components/VideoPage";

const FRIEND_NAME_KEY = "birthdaybuddy/friendName";

function getFriendNameFromQuery(search: string): string | null {
  const params = new URLSearchParams(search);
  return params.get("name");
}

// PUBLIC_INTERFACE
/**
 * Main SPA App: Implements routing for landing (name input), and video.
 * Always shows NameForm at '/', and only shows VideoPage at '/video'.
 */
const App: React.FC = () => {
  const [friendName, setFriendName] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Loads name from query (for /video) or localStorage for prefilling form only.
  useEffect(() => {
    if (location.pathname === "/video") {
      // On video page, prefer ?name= in URL, fallback to localStorage
      const nameInQuery = getFriendNameFromQuery(location.search);
      if (nameInQuery && nameInQuery.trim().length > 0) {
        setFriendName(nameInQuery);
        // Persist to localStorage for form prefill later
        localStorage.setItem(FRIEND_NAME_KEY, nameInQuery);
      } else {
        // No name in query - fallback to storage (but still require for video page)
        const stored = localStorage.getItem(FRIEND_NAME_KEY);
        setFriendName(stored);
      }
    } else if (location.pathname === "/") {
      // On landing page (always), just load from localStorage to prefill input, don't redirect.
      const stored = localStorage.getItem(FRIEND_NAME_KEY);
      setFriendName(stored);
    }
  }, [location.pathname, location.search]);

  // Name input submission (from Page 1): trigger navigation to /video with query
  const handleSubmitFriendName = (newName: string) => {
    setFriendName(newName);
    localStorage.setItem(FRIEND_NAME_KEY, newName);
    navigate(`/video?name=${encodeURIComponent(newName)}`);
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <NameForm
            onSubmitFriendName={handleSubmitFriendName}
            lastEnteredName={friendName ?? ""}
          />
        }
      />
      <Route
        path="/video"
        element={
          <VideoPage
            // Always require a name for video; 'Friend' fallback is a last resort
            friendName={
              getFriendNameFromQuery(location.search) ||
              friendName ||
              "Friend"
            }
            onBack={() => navigate("/")}
          />
        }
      />
      <Route
        path="*"
        element={
          <div className="min-h-screen flex flex-col items-center justify-center bg-pink-100">
            <h1 className="text-5xl font-bold text-secondary mb-6">
              404 – Not Found
            </h1>
            <button
              onClick={() => navigate("/")}
              className="px-6 py-2 rounded-full bg-accent text-white font-semibold shadow hover:bg-primary transition"
            >
              Go Home
            </button>
          </div>
        }
      />
    </Routes>
  );
};

export default App;
