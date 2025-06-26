import React from "react";
import { RemotionPlayer } from "./spa/remotion/RemotionPlayer";
import { Balloons } from "./spa/ui/Balloons";
import { ConfettiCanvas } from "./spa/ui/ConfettiCanvas";
import { ArrowLeftIcon } from "./spa/icons/ArrowLeftIcon";
import "./spa/styles.css";

// Extract query param utility
function getQueryStringParam(key: string): string | null {
  return new URLSearchParams(window.location.search).get(key);
}

// PUBLIC_INTERFACE
function VideoPage() {
  const name = getQueryStringParam("name")?.trim() || "";

  // If no name, redirect to landing
  if (!name) {
    window.location.replace("/");
    return null;
  }

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 to-indigo-200 overflow-hidden font-festive">
      <Balloons />
      <ConfettiCanvas />
      <a
        href="/"
        className="absolute top-8 left-4 flex items-center px-4 py-2 rounded-xl bg-white bg-opacity-80 hover:bg-pink-50 text-pink-600 font-semibold shadow transition"
      >
        <ArrowLeftIcon className="h-5 w-5 mr-1" aria-hidden /> Start Over
      </a>
      <div className="z-10 max-w-3xl w-full px-2">
        <h2 className="mb-4 text-2xl font-semibold text-center text-pink-600 drop-shadow">
          Happy Birthday Video for <span className="text-indigo-500">{name}</span>
        </h2>
        <div className="rounded-3xl overflow-hidden shadow-md bg-white bg-opacity-70 ring ring-pink-100 ring-opacity-70">
          <RemotionPlayer name={name} />
        </div>
      </div>
    </div>
  );
}

// Mount the app
import { createRoot } from "react-dom/client";
createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <VideoPage />
  </React.StrictMode>
);
