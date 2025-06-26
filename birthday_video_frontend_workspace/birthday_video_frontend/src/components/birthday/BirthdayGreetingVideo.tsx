import {
  AbsoluteFill,
  Sequence,
  Audio,
  interpolate,
  useFrame,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { FONT_FAMILY } from "../../HelloWorld/constants";
import ConfettiAnimation from "../festive/ConfettiAnimation";
import BalloonsAnimation from "../festive/BalloonsAnimation";
import birthdaySong from "../../assets/happy-birthday-music.mp3";

// PUBLIC_INTERFACE
/**
 * Remotion video composition for animated birthday greeting
 */
export const BirthdayGreetingVideo: React.FC<{
  friendName: string;
  theme: {
    primary: string;
    secondary: string;
    accent: string;
  };
}> = ({ friendName, theme }) => {
  const videoConfig = useVideoConfig();
  const frame = useCurrentFrame();

  // Animate opacity for the name text
  const nameOpacity = interpolate(frame, [12, 28], [0, 1]);
  // Animate scale for punchy pop-in
  const nameScale = interpolate(
    frame,
    [18, 28, 33],
    [0.6, 1.25, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill
      className="flex flex-col items-center justify-center"
      style={{
        background: `linear-gradient(135deg, ${theme.primary} 30%, ${theme.accent} 80%, ${theme.secondary} 100%)`,
        fontFamily: FONT_FAMILY,
      }}
    >
      {/* Music */}
      <Audio src={birthdaySong} />
      {/* Confetti overlays */}
      <ConfettiAnimation />
      {/* Balloons float up */}
      <BalloonsAnimation />
      {/* Greeting */}
      <div
        style={{
          position: "absolute",
          top: "28%",
          left: 0,
          width: "100%",
          textAlign: "center",
          zIndex: 20,
        }}
      >
        <span
          style={{
            fontSize: 64,
            fontWeight: 800,
            color: "#fff",
            textShadow:
              "0 4px 18px rgba(80,0,60,0.17), 0 1px 1.5px #818cf8",
            marginBottom: 10,
            letterSpacing: "0.04em",
            opacity: nameOpacity,
            transform: `scale(${nameScale})`,
            display: "inline-block",
            fontFamily:
              "'Baloo 2', 'Chewy', cursive, 'Comic Sans MS', sans-serif",
          }}
        >
          Happy Birthday {friendName || "Friend"}!
        </span>
        <div
          style={{
            color: theme.accent,
            fontWeight: 600,
            fontSize: 32,
            marginTop: 24,
            textShadow: "0 2px 10px rgba(0,0,0,0.07)",
            opacity: Math.max(0, nameOpacity - 0.12),
          }}
        >
          🎂 Wishing you all the joy & fun! 🎶
        </div>
      </div>
    </AbsoluteFill>
  );
};
