import React, { useRef, useEffect } from "react";
import { Player } from "@remotion/player";
import { BirthdayGreetingVideo } from "./birthday/BirthdayGreetingVideo";
import ConfettiAnimation from "./festive/ConfettiAnimation";
import BalloonsAnimation from "./festive/BalloonsAnimation";
import birthdaySong from "../assets/happy-birthday-music.mp3";

// The SPA only, so Player is available. Must route user back if no name.
const VIDEO_DURATION = 180; // frames
const VIDEO_FPS = 30;

// PUBLIC_INTERFACE
/**
 * Remotion Player video page
 */
const VideoPage: React.FC<{
  friendName: string;
  onBack: () => void;
}> = ({ friendName, onBack }) => {
  // Restart confetti/balloons on mount
  const confettiKey = useRef(Math.random());
  const balloonsKey = useRef(Math.random());

  useEffect(() => {
    confettiKey.current = Math.random();
    balloonsKey.current = Math.random();
  }, [friendName]);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-primary via-accent to-secondary">
      {/* Festive background effects */}
      <ConfettiAnimation key={confettiKey.current} />
      <BalloonsAnimation key={balloonsKey.current} />
      {/* Remotion video + audio */}
      <div className="relative z-10 flex flex-col items-center">
        <div className="flex flex-col items-center w-full max-w-3xl py-12">
          <Player
            component={BirthdayGreetingVideo}
            durationInFrames={VIDEO_DURATION}
            fps={VIDEO_FPS}
            compositionHeight={720}
            compositionWidth={1280}
            controls
            autoPlay
            inputProps={{
              friendName,
              theme: {
                primary: "#f472b6",
                secondary: "#818cf8",
                accent: "#fbbf24",
              },
            }}
            style={{
              borderRadius: "1.6rem",
              boxShadow:
                "0 6px 36px 0 rgba(250,182,255, 0.20), 0 1.5px 7.5px rgba(130,122,255,0.08)",
            }}
            loop={false}
          />
          {/* Accessible background audio for SPA (for festive effect immediately) */}
          <audio
            src={birthdaySong}
            autoPlay
            controls={false}
            loop={false}
            style={{
              display: "none",
            }}
          />
          <button
            onClick={onBack}
            className="mt-8 px-6 py-2 rounded-full bg-secondary text-white font-semibold shadow hover:bg-accent transition"
          >
            ← Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoPage;
