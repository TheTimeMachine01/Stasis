"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

// Lazy load the globe
const Globe = dynamic(() => import("react-globe.gl"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center w-full h-full">
      <div className="w-16 h-16 border-t-2 border-blue-500/40 rounded-full animate-spin" />
    </div>
  ),
});

export default function GlobeHero() {
  const globeRef = useRef<any>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Wait for globe to be ready then set initial view
    setTimeout(() => {
      if (globeRef.current) {
        // Point of view to see the horizon curve
        globeRef.current.pointOfView({ lat: 20, lng: 0, altitude: 1.6 });
        // Disable scroll zoom
        const controls = globeRef.current.controls();
        if (controls) {
          controls.enableZoom = false;
          controls.autoRotate = true;
          controls.autoRotateSpeed = 0.4;
        }
      }
    }, 1000);
  }, []);

  // Simulated threat arcs
  const arcsData = useMemo(() => {
    return [...Array(15).keys()].map(() => ({
      startLat: (Math.random() - 0.5) * 160,
      startLng: (Math.random() - 0.5) * 360,
      endLat: 20, 
      endLng: 0,
      color: ["#3b82f6", "#a855f7", "#22d3ee"][Math.floor(Math.random() * 3)],
    }));
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative w-full h-screen overflow-hidden font-sans flex flex-col items-center bg-transparent">
      {/* Background Glows for Depth */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.08)_0%,transparent_70%)]" />
      </div>

      {/* Hero Content Overlay - Centered at the top half */}
      <div className="relative z-20 flex flex-col items-center pt-[12vh] pointer-events-none px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-5xl"
        >
          {/* Main Heading precisely matching the layout */}
          <h1 className="text-[60px] md:text-[110px] font-bold tracking-tighter text-white leading-[0.9] mb-10 text-glow-white">
            Unbreakable <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-500">Equilibrium</span>
          </h1>
          
          {/* Description text */}
          <p className="max-w-3xl mx-auto text-white/50 text-lg md:text-2xl font-medium leading-relaxed mb-16">
            Experience the <span className="text-blue-400">fluidity of data</span>. A security-inspired visualization <br className="hidden md:block" />
            running entirely on <span className="text-indigo-400">high-performance</span> infrastructure for <br className="hidden md:block" />
            maximum compatibility and defense.
          </p>

          {/* Start Experience Button - Rounded-Full White */}
          <div className="flex items-center justify-center pointer-events-auto">
            <Link 
              href="/signup" 
              className="group relative flex items-center gap-4 px-12 py-5 rounded-full bg-white text-black font-bold text-xl transition-all hover:scale-105 active:scale-95 shadow-[0_0_60px_rgba(255,255,255,0.2)]"
            >
              Start Experience
              <ArrowRight className="w-6 h-6 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </motion.div>
      </div>

      {/* 3D Globe - Positioned as a huge horizon at the bottom */}
      <div className="absolute bottom-[-75%] left-1/2 -translate-x-1/2 w-[220vw] aspect-square z-10 select-none opacity-100">
        <Globe
          ref={globeRef}
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
          bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
          backgroundColor="rgba(0,0,0,0)"
          arcsData={arcsData}
          arcColor="color"
          arcDashLength={0.5}
          arcDashGap={4}
          arcDashAnimateTime={3000}
          atmosphereColor="#60a5fa"
          atmosphereAltitude={0.25}
          showAtmosphere={true}
        />
      </div>

      {/* Horizon Atmosphere Glow - CSS refinement to make the globe pop */}
      <div className="absolute bottom-0 left-0 right-0 h-[45vh] z-[11] pointer-events-none bg-gradient-to-t from-blue-500/20 via-transparent to-transparent" />
      
      {/* Top Gradient to blend navbar */}
      <div className="absolute top-0 left-0 right-0 h-[20vh] z-15 pointer-events-none bg-gradient-to-b from-black/80 to-transparent" />
    </div>
  );
}
