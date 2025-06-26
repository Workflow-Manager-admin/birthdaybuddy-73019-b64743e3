import React from "react";
import { Player } from "@remotion/player";
import { BirthdayVideo } from "./compositions/BirthdayVideo";

// PUBLIC_INTERFACE
export interface RemotionPlayerProps {
  name: string;
}

export const RemotionPlayer: React.FC<RemotionPlayerProps> = ({ name }) => {
  return (
    <Player
      component={BirthdayVideo}
      inputProps={{ name }}
      durationInFrames={180}
      fps={30}
      compositionWidth={1280}
      compositionHeight={720}
      controls
      loop
      autoPlay
      style={{
        width: "100%",
        maxWidth: 960,
        margin: "auto",
        background: "transparent",
      }}
      className="border-0 rounded-2xl"
    />
  );
};
