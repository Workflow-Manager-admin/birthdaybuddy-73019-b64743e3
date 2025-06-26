import React from "react";

interface BalloonsProps {
  noPointer?: boolean;
}

// Simple animated SVG balloons
// PUBLIC_INTERFACE
export function Balloons({ noPointer }: BalloonsProps) {
  // Use 5 festively colored, varied-position balloons, animate them floating upward with CSS.
  return (
    <div
      className="pointer-events-none absolute top-[-10%] left-0 w-full flex justify-evenly z-0"
      aria-hidden
      style={{
        filter: "drop-shadow(0 4px 12px #fbbf2488)",
        userSelect: "none",
        pointerEvents: noPointer ? "none" : undefined,
      }}
    >
      {[0, 1, 2, 3, 4].map((ix) => (
        <span
          key={ix}
          className={`balloon-animation balloon-${ix}`}
          style={{
            display: "inline-block",
            margin: "0 9px",
            animationDelay: `${0.3 * ix}s`,
          }}
        >
          <svg width={56 + ix * 4} height={130} viewBox="0 0 56 120" fill="none">
            <ellipse
              cx="28"
              cy="52"
              rx="24"
              ry="36"
              fill={["#fbbf24", "#86a8e7", "#f472b6", "#a0e1e0", "#818cf8"][ix]}
              opacity="0.93"
            />
            <rect
              x="23"
              y="88"
              width="10"
              height="24"
              rx="5"
              fill={["#ffe1a1", "#b0c6f7", "#fde3f1", "#c1f5f7", "#c2c6fa"][ix]}
              opacity="0.77"
            />
            <path
              d="M28 112C31 120 40 128 28 120C16 128 25 120 28 112Z"
              stroke="#aaa"
              strokeWidth={1.5}
              fill="none"
            />
          </svg>
        </span>
      ))}
    </div>
  );
}
