import React, { useEffect, useRef } from "react";

interface ConfettiCanvasProps {
  noPointer?: boolean;
}

// Simple falling confetti using canvas animation
// PUBLIC_INTERFACE
export function ConfettiCanvas({ noPointer }: ConfettiCanvasProps) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    let animationFrame = 0;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = window.innerWidth;
    const H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;

    const colors = ["#fbbf24", "#f472b6", "#818cf8", "#19dacd", "#fff", "#d946ef", "#a3e635"];
    const confettiCount = 90;
    const confetti: { x: number; y: number; r: number; d: number; color: string; tilt: number; tiltAngleIncremental: number; tiltAngle: number; }[] = [];

    for (let i = 0; i < confettiCount; i++) {
      confetti.push({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 8 + 6,
        d: Math.random() * confettiCount,
        color: colors[Math.floor(Math.random() * colors.length)],
        tilt: Math.floor(Math.random() * 10) - 10,
        tiltAngleIncremental: Math.random() * 0.07 + 0.02,
        tiltAngle: 0
      });
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      for (let i = 0; i < confettiCount; i++) {
        ctx.beginPath();
        ctx.lineWidth = confetti[i].r;
        ctx.strokeStyle = confetti[i].color;
        ctx.moveTo(confetti[i].x + confetti[i].tilt + confetti[i].r / 3, confetti[i].y);
        ctx.lineTo(confetti[i].x + confetti[i].tilt, confetti[i].y + confetti[i].tilt + confetti[i].r / 3);
        ctx.stroke();
      }
      update();
      animationFrame = requestAnimationFrame(draw);
    }

    function update() {
      for (let i = 0; i < confettiCount; i++) {
        confetti[i].y += (Math.cos(0.01 + confetti[i].d) + 2 + confetti[i].r / 7) / 2.3;
        confetti[i].x += Math.sin(0.01);
        confetti[i].tiltAngle += confetti[i].tiltAngleIncremental;
        confetti[i].tilt = Math.sin(confetti[i].tiltAngle - i) * 12;

        if (confetti[i].y > H + 30) {
          confetti[i].y = -10;
          confetti[i].x = Math.random() * W;
        }
      }
    }

    draw();
    return () => cancelAnimationFrame(animationFrame);
    // eslint-disable-next-line
  }, []);

  return (
    <canvas
      ref={ref}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", pointerEvents: noPointer ? "none" : undefined, }}
      aria-hidden
    />
  );
}
