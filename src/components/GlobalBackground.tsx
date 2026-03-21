"use client";

import React, { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function GlobalBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { scrollY } = useScroll();
  
  // Parallax transforms for three distinct layers
  const y1 = useTransform(scrollY, [0, 5000], [0, -200]);
  const y2 = useTransform(scrollY, [0, 5000], [0, -400]);
  const y3 = useTransform(scrollY, [0, 5000], [0, -800]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const resize = () => {
      canvas.width = window.innerWidth * window.devicePixelRatio;
      canvas.height = window.innerHeight * window.devicePixelRatio;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    // Star data structure
    interface Star {
      x: number;
      y: number;
      size: number;
      opacity: number;
      twinkleSpeed: number;
      color: string;
    }

    const layers: Star[][] = [[], [], []];
    const counts = [400, 200, 100]; // Star counts per layer

    const initStars = () => {
      const colors = ["#ffffff", "#cbd5e1", "#93c5fd", "#fef08a"]; // White, Slate, Blue, Yellow
      for (let l = 0; l < 3; l++) {
        layers[l] = [];
        for (let i = 0; i < counts[l]; i++) {
          layers[l].push({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight * 2, // Double height for scroll coverage
            size: Math.random() * (l + 1) * 0.6,
            opacity: Math.random(),
            twinkleSpeed: 0.005 + Math.random() * 0.02,
            color: colors[Math.floor(Math.random() * colors.length)],
          });
        }
      }
    };

    const draw = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // We don't draw here because we want Framer Motion to handle the Y translation
      // Instead, we'll draw onto 3 separate offscreen canvases or just use the main one 
      // but managed by the React loop for simplicity in this specific architecture.
      // However, for best performance, we'll just draw once and let the CSS/Framer transform it.
    };

    // Static high-res render of stars
    const renderStaticStars = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      layers.forEach((layer, l) => {
        layer.forEach((star) => {
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
          ctx.fillStyle = star.color;
          ctx.globalAlpha = star.opacity * 0.8;
          ctx.fill();
        });
      });
    };

    window.addEventListener("resize", () => {
      resize();
      initStars();
      renderStaticStars();
    });

    resize();
    initStars();
    renderStaticStars();

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-[#020205]">
      {/* Deep Space Gradients (Nebulae) */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] rounded-full bg-blue-900/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-indigo-900/20 blur-[120px]" />
        <div className="absolute top-[20%] right-[10%] w-[40%] h-[40%] rounded-full bg-purple-900/10 blur-[100px]" />
      </div>

      {/* Layered Star Parallax */}
      <motion.div style={{ y: y1 }} className="absolute inset-0 w-full h-[200%]">
        <canvas ref={canvasRef} className="w-full h-full" />
      </motion.div>

      {/* Subtle Scanline/Noise Grain Overlay for "Digital" vibe */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      
      {/* Global Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)]" />
    </div>
  );
}
