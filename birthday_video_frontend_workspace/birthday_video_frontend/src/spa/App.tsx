import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./LandingPage";
import VideoPage from "./VideoPage";

// PUBLIC_INTERFACE
export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-indigo-100 flex flex-col">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/video" element={<VideoPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}
