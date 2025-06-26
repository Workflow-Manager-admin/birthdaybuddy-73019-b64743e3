import React from "react";
import { AbsoluteFill, Sequence, Audio, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { z } from "zod";
import { Balloons } from "../../ui/Balloons";
import { ConfettiCanvas } from "../../ui/ConfettiCanvas";

// Free happy birthday tune (creative commons): add to assets/audio/
const bgMusic = require("../../assets/audio/happy-birthday-tune.mp3");

// Festive Font Family
const FONT_FAMILY = "'Quicksand', 'Comic Sans MS', cursive, sans-serif";

interface BirthdayVideoProps {
  name: string;
}

// PUBLIC_INTERFACE
export const BirthdayVideo: React.FC<BirthdayVideoProps> = ({ name }) => {
  const frame = useCurrentFrame();
  const { durationInFrames, width, height, fps } = useVideoConfig();

  const greeting = `Happy Birthday, ${name}!`;
  const wishes = `Wishing you a fantastic year ahead! 🎈`;

  // Fade in
  const opacity = interpolate(frame, [0, 15], [0, 1], { extrapolateLeft: "clamp" });
  // Up+down wiggle for name
  const y =
    30 * Math.sin(((frame - 10) / durationInFrames) * 4 * Math.PI);

  return (
    <AbsoluteFill className="bg-gradient-to-br from-pink-200 to-yellow-100 flex items-center justify-center relative">
      {/* Background music */}
      <Audio src={bgMusic} />
      {/* Balloons and Confetti */}
      <Balloons noPointer />
      <ConfettiCanvas noPointer />
      {/* Greeting */}
      <AbsoluteFill style={{ opacity, pointerEvents: "none" }} className="flex flex-col items-center justify-center">
        <div
          className="text-6xl sm:text-7xl font-extrabold text-pink-500 drop-shadow-lg"
          style={{
            fontFamily: FONT_FAMILY,
            transform: `translateY(${y}px)`,
            letterSpacing: 1.5,
            textShadow: "0 4px 24px rgba(255, 182, 193, 0.55)",
            marginBottom: 30,
          }}
        >
          {greeting}
        </div>
        <div
          className="text-2xl md:text-3xl text-indigo-500 font-semibold mb-6"
          style={{ fontFamily: FONT_FAMILY, textShadow: "0 2px 8px #fbbf24cc" }}
        >
          {wishes}
        </div>
        <div className="mt-10">
          <span role="img" aria-label="cake" className="text-4xl">
            🎂
          </span>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
