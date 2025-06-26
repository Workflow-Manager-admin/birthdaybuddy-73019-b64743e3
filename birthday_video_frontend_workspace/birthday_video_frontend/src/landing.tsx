import React, { useState } from "react";
import { SparklesIcon } from "./spa/icons/SparklesIcon";
import "./spa/styles.css";

// PUBLIC_INTERFACE
function LandingPage() {
  const [name, setName] = useState("");

  // Submit: redirect (reload) to /video?name=...
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      // No SPA: full reload
      window.location.href = `/video?name=${encodeURIComponent(name.trim())}`;
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-pink-100 to-indigo-100 flex-col">
      <div className="flex-grow flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="bg-white bg-opacity-90 shadow-lg rounded-3xl px-10 py-12 flex flex-col items-center space-y-6 w-full max-w-md mx-auto border border-pink-100"
        >
          <SparklesIcon className="w-14 h-14 text-pink-400 mb-2 animate-bounce" aria-hidden />
          <h1 className="text-3xl font-bold text-pink-500 font-festive mb-3 text-center">
            🎉 Create a Birthday Video! 🎂
          </h1>
          <label className="block w-full text-gray-700 text-lg font-medium text-center mb-2" htmlFor="name">
            Your friend&apos;s name:
          </label>
          <input
            id="name"
            type="text"
            autoFocus
            required
            placeholder="e.g. Alex"
            className="w-full px-5 py-3 rounded-xl border-2 border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-400 bg-pink-50 text-lg transition"
            value={name}
            maxLength={32}
            onChange={(e) => setName(e.target.value)}
          />
          <button
            type="submit"
            className="mt-8 px-8 py-3 rounded-2xl bg-pink-400 hover:bg-pink-500 text-white font-bold text-xl transition-all shadow-lg focus:ring-2 focus:ring-pink-300 active:scale-95"
          >
            Generate Video
          </button>
        </form>
      </div>
    </div>
  );
}

// Mount the app
import { createRoot } from "react-dom/client";
createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <LandingPage />
  </React.StrictMode>
);
