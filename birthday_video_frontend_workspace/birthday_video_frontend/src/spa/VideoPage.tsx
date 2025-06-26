import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { RemotionPlayer } from "./remotion/RemotionPlayer";
import { Balloons } from "./ui/Balloons";
import { ConfettiCanvas } from "./ui/ConfettiCanvas";
import { ArrowLeftIcon } from "./icons/ArrowLeftIcon";

// PUBLIC_INTERFACE
export default function VideoPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [name, setName] = useState<string | null>(null);

  // On mount, load name from query or localStorage
  useEffect(() => {
    let foundName = searchParams.get("name");
    if (!foundName) {
      foundName = localStorage.getItem("birthdayName") || "";
    }
    setName(foundName || "");
  }, [searchParams]);

  // If name missing, redirect back to form
  useEffect(() => {
    if (name !== null && !name) {
      navigate("/", { replace: true });
    }
  }, [name, navigate]);

  if (!name) return null;

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 to-indigo-200 overflow-hidden font-festive">
      {/* Animated festive elements */}
      <Balloons />
      <ConfettiCanvas />
      <button
        className="absolute top-8 left-4 flex items-center px-4 py-2 rounded-xl bg-white bg-opacity-80 hover:bg-pink-50 text-pink-600 font-semibold shadow transition"
        onClick={() => navigate("/")}
      >
        <ArrowLeftIcon className="h-5 w-5 mr-1" aria-hidden /> Start Over
      </button>
      {/* Remotion Player */}
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
