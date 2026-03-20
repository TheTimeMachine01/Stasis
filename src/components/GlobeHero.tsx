"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { motion } from "framer-motion";
import { Shield, Zap, Globe as GlobeIcon, Activity } from "lucide-react";
import { cn } from "@/lib/utils";

// Lazy load the globe to keep initial bundle size small
const Globe = dynamic(() => import("react-globe.gl"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center w-full h-full bg-slate-950">
      <div className="w-24 h-24 border-t-2 border-cyan-500 rounded-full animate-spin shadow-[0_0_15px_rgba(34,211,238,0.4)]" />
    </div>
  ),
});

export default function GlobeHero() {
  const globeRef = useRef<any>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Simulated threat arcs
  const arcsData = useMemo(() => {
    return [...Array(20).keys()].map(() => ({
      startLat: (Math.random() - 0.5) * 180,
      startLng: (Math.random() - 0.5) * 360,
      endLat: 34.0522, // Target: Stasis Core
      endLng: -118.2437,
      color: ["#22d3ee", "#06b6d4", "#0ea5e9"][Math.floor(Math.random() * 3)],
    }));
  }, []);

  // Sensing ring at user location
  const ringsData = useMemo(() => [{
    lat: 51.5074,
    lng: -0.1278,
    maxR: 5,
    propagationSpeed: 1,
    repeatPeriod: 2000
  }], []);

  if (!mounted) return null;

  return (
    <div className="relative w-full h-screen overflow-hidden bg-slate-950">
      {/* Hero Content Overlay */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center"
        >
          <div className="inline-flex items-center px-3 py-1 mb-6 rounded-full glass border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-widest animate-pulse pointer-events-auto">
            <Shield className="w-3 h-3 mr-2" />
            Vanguard Protocol Active
          </div>
          
          <h1 className="text-6xl md:text-8xl font-syne font-bold mb-6 tracking-tight text-white leading-tight">
            Unbreakable <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
              Equilibrium
            </span>
          </h1>
          
          <p className="max-w-xl mx-auto text-slate-400 text-lg md:text-xl font-sans mb-10 leading-relaxed">
            Real-time digital infrastructure defense with immersive visualization and proactive zero-lag security.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pointer-events-auto">
            <Link href="/signup" className="px-8 py-4 rounded-xl bg-cyan-500 text-slate-950 font-bold text-lg transition-all hover:scale-105 hover:bg-cyan-400 glow-cyan">
              Join the Equilibrium
            </Link>
            <Link href="/login" className="px-8 py-4 rounded-xl glass text-white font-semibold text-lg transition-all hover:bg-white/10">
              Access Core
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Stats Cards */}
      <div className="absolute bottom-10 left-0 right-0 z-10 px-6 flex flex-wrap justify-center gap-6 pointer-events-none">
        <StatCard icon={<Activity className="w-5 h-5 text-cyan-400" />} label="Active Threats Blocked" value="1,240,432" />
        <StatCard icon={<Zap className="w-5 h-5 text-yellow-400" />} label="System Latency" value="0.24ms" />
        <StatCard icon={<GlobeIcon className="w-5 h-5 text-blue-400" />} label="Protected Nodes" value="48,102" />
      </div>

      {/* Floating UI Elements */}
      <div className="absolute top-1/4 left-10 z-10 hidden lg:block pointer-events-none">
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="glass p-4 rounded-2xl w-48 border-l-4 border-cyan-400"
        >
          <div className="text-xs text-slate-400 uppercase font-mono mb-1">Status</div>
          <div className="text-cyan-400 font-bold flex items-center">
            <div className="w-2 h-2 rounded-full bg-cyan-400 mr-2 animate-ping" />
            STABLE
          </div>
        </motion.div>
      </div>

      {/* 3D Globe */}
      <div className="absolute inset-0 z-0">
        <Globe
          ref={globeRef}
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
          bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
          backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
          backgroundColor="#020617"
          arcsData={arcsData}
          arcColor="color"
          arcDashLength={0.4}
          arcDashGap={4}
          arcDashAnimateTime={2000}
          ringsData={ringsData}
          ringColor={() => "#22d3ee"}
          ringMaxRadius="maxR"
          ringPropagationSpeed="propagationSpeed"
          ringRepeatPeriod="repeatPeriod"
          atmosphereColor="#06b6d4"
          atmosphereAltitude={0.15}
        />
      </div>

      {/* Gradient Overlay for Depth */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-slate-950 via-transparent to-slate-950/50" />
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(2,6,23,0.8)_100%)]" />
    </div>
  );
}

function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.8 }}
      className="glass px-6 py-4 rounded-2xl border-white/5 flex items-center gap-4 pointer-events-auto hover:bg-white/10 transition-colors"
    >
      <div className="p-3 rounded-xl bg-white/5">{icon}</div>
      <div>
        <div className="text-slate-500 text-xs font-mono uppercase tracking-wider">{label}</div>
        <div className="text-white text-xl font-bold font-mono tracking-tight">{value}</div>
      </div>
    </motion.div>
  );
}
