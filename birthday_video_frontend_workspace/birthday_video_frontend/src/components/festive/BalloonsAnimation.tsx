import React, { useEffect, useRef } from "react";

const balloonColors = [
  "#fbbf24", // accent
  "#f472b6", // primary
  "#818cf8", // secondary
  "#f87171", "#34d399", "#fde68a",
];

// PUBLIC_INTERFACE
/**
 * Animated floating balloons overlay as SVG elements
 */
const BalloonsAnimation: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    // Animate balloons' cy (y position)
    const svg = svgRef.current;
    if (!svg) return;

    const balloons = Array.from(
      svg.querySelectorAll("ellipse.balloon")
    ) as SVGElement[];

    let frame = 0;
    let animationId: number;

    // Animate balloons upward in wavy pattern
    function animate() {
      frame += 1;
      balloons.forEach((balloon, i) => {
        const t = frame / 37 + i;
        const baseY = 600 + (i % 2) * 36;
        balloon.setAttribute(
          "cy",
          String(
            baseY -
              ((t * 30 + i * 35) % 750) +
              Math.sin((frame + i * 80) * 0.012) * 10
          )
        );
        balloon.setAttribute(
          "cx",
          String(100 + i * 185 + Math.cos((frame + i * 65) * 0.009) * 25)
        );
      });
      animationId = requestAnimationFrame(animate);
    }
    animate();

    return () => cancelAnimationFrame(animationId);
  }, []);

  // Render SVG balloons
  return (
    <svg
      ref={svgRef}
      width="1200"
      height="800"
      style={{
        position: "fixed",
        left: "50%",
        top: "0",
        transform: "translateX(-50%)",
        pointerEvents: "none",
        zIndex: 2,
        opacity: 0.91,
      }}
      aria-hidden="true"
    >
      {Array.from({ length: 6 }).map((_, i) => (
        <g key={i}>
          <ellipse
            className="balloon"
            cx={100 + i * 185}
            cy={600 + (i % 2) * 36}
            rx={36 + (i % 2) * 5}
            ry={50 + ((i % 3) * 4)}
            fill={balloonColors[i % balloonColors.length]}
            stroke="#fff"
            strokeWidth="4"
            opacity="0.86"
          />
          {/* String line */}
          <path
            d={`M${100 + i * 185},${650 + (i % 2) * 36} q9,36 2,92`}
            stroke="#9ca3af"
            strokeWidth="2"
            fill="none"
            opacity="0.45"
          />
        </g>
      ))}
    </svg>
  );
};

export default BalloonsAnimation;
