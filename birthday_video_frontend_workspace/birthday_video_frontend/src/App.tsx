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
const App: React.FC = () => {
  const [friendName, setFriendName] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  // On mount or location/page change, sync name from URL or localStorage
  useEffect(() => {
    // 1. Try to load from URL query param
    const nameInQuery = getFriendNameFromQuery(location.search);
    if (nameInQuery) {
      setFriendName(nameInQuery);
      localStorage.setItem(FRIEND_NAME_KEY, nameInQuery);
      return;
    }
    // 2. Fallback to localStorage
    const storedName = localStorage.getItem(FRIEND_NAME_KEY);
    if (storedName) {
      setFriendName(storedName);
    }
  }, [location]);

  // Handler for name form submission
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
