import React, { useEffect, useRef } from "react";

// PUBLIC_INTERFACE
/**
 * Confetti canvas overlay using vanilla JS
 */
const ConfettiAnimation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Minimal confetti animation
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d")!;
    let particles: any[] = [];
    let animationFrameId: number;

    // Color themes
    const colors = [
      "#f472b6", "#818cf8", "#fbbf24", "#f87171", "#4ade80", "#facc15",
    ];
    // Confetti particles setup
    function randomConfettiPiece() {
      const w = canvas.width, h = canvas.height;
      return {
        x: Math.random() * w,
        y: Math.random() * -h * 0.2,
        r: Math.random() * 8 + 7,
        d: Math.random() * 120 + 80,
        color: colors[Math.floor(Math.random() * colors.length)],
        tilt: Math.random() * 24 - 6,
        tiltAngle: 0.4 + Math.random(),
        angle: Math.random() * Math.PI * 2,
        speed: 2 + Math.random() * 1.1
      };
    }

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      // Reset particles or they'll look stretched
      particles = Array.from({length: 60}, randomConfettiPiece);
    }
    resize();

    window.addEventListener("resize", resize);

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p, i) => {
        ctx.beginPath();
        ctx.ellipse(
          p.x, p.y, p.r*0.6, p.r,
          p.angle, 0, 2*Math.PI
        );
        ctx.fillStyle = p.color;
        ctx.globalAlpha = 0.67;
        ctx.fill();
        ctx.globalAlpha = 1;
      });
    }

    function update() {
      particles.forEach((p) => {
        p.y += p.speed;
        p.x += Math.sin(p.angle) * 1.2;
        p.angle += 0.008;
        if (p.y > canvas.height) {
          // Respawn at the top
          p.x = Math.random() * canvas.width;
          p.y = Math.random() * -canvas.height * 0.06;
        }
      });
    }

    function animate() {
      update();
      draw();
      animationFrameId = requestAnimationFrame(animate);
    }
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        pointerEvents: "none",
        width: "100vw",
        height: "100vh",
        zIndex: 3,
      }}
      aria-hidden="true"
      width={window.innerWidth}
      height={window.innerHeight}
    />
  );
};

export default ConfettiAnimation;
