"use client";

import React, { useRef, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { 
  Float, 
  PerspectiveCamera, 
  Environment, 
  Stars, 
  QuadraticBezierLine,
  Html
} from "@react-three/drei";
import * as THREE from "three";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Shield } from "lucide-react";
import Link from "next/link";

// --- Constants ---
const EARTH_RADIUS = 10;
const ATMOSPHERE_RADIUS = 10.2;
const ARC_COUNT = 12;

// --- Components ---

/**
 * Atmosphere Shader Material
 */
const AtmosphereMaterial = () => {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = clock.getElapsedTime();
    }
  });

  const shaderArgs = useMemo(() => ({
    uniforms: {
      uTime: { value: 0 },
      uColor: { value: new THREE.Color("#3b82f6") },
    },
    vertexShader: `
      varying vec3 vNormal;
      varying vec3 vEyeVector;
      void main() {
        vNormal = normalize(normalMatrix * normal);
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        vEyeVector = normalize(mvPosition.xyz);
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: `
      varying vec3 vNormal;
      varying vec3 vEyeVector;
      uniform vec3 uColor;
      void main() {
        float fresnel = pow(1.0 + dot(vEyeVector, vNormal), 3.0);
        gl_FragColor = vec4(uColor, fresnel * 0.6);
      }
    `,
    transparent: true,
    side: THREE.BackSide,
  }), []);

  return <shaderMaterial ref={materialRef} args={[shaderArgs]} />;
};

/**
 * Procedural Earth Component
 */
function Earth() {
  const earthRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (earthRef.current) {
      earthRef.current.rotation.y += delta * 0.05; // Slow rotation
    }
  });

  return (
    <group ref={earthRef}>
      {/* The main sphere */}
      <mesh>
        <sphereGeometry args={[EARTH_RADIUS, 64, 64]} />
        <meshStandardMaterial 
          color="#050505" 
          roughness={0.7} 
          metalness={0.2}
          emissive="#1d4ed8"
          emissiveIntensity={0.05}
        />
        {/* Subtle Grid Overlay */}
        <mesh>
          <sphereGeometry args={[EARTH_RADIUS + 0.01, 64, 64]} />
          <meshBasicMaterial 
            color="#3b82f6" 
            wireframe 
            transparent 
            opacity={0.03} 
          />
        </mesh>
      </mesh>

      {/* Atmospheric Glow */}
      <mesh scale={[1.02, 1.02, 1.02]}>
        <sphereGeometry args={[EARTH_RADIUS, 64, 64]} />
        <AtmosphereMaterial />
      </mesh>

      <DataArcs />
    </group>
  );
}

/**
 * Dynamic Data Arcs (Beziér Curves)
 */
function DataArcs() {
  const arcs = useMemo(() => {
    return Array.from({ length: ARC_COUNT }).map(() => {
      const startPhi = Math.random() * Math.PI * 2;
      const startTheta = Math.acos(2 * Math.random() - 1);
      
      const endPhi = startPhi + (Math.random() - 0.5) * 1.5;
      const endTheta = startTheta + (Math.random() - 0.5) * 1.5;

      const start = new THREE.Vector3().setFromSphericalCoords(EARTH_RADIUS, startTheta, startPhi);
      const end = new THREE.Vector3().setFromSphericalCoords(EARTH_RADIUS, endTheta, endPhi);
      
      // Calculate mid point for bezier curve height
      const mid = start.clone().lerp(end, 0.5).normalize().multiplyScalar(EARTH_RADIUS * 1.2);

      return { start, end, mid, color: Math.random() > 0.5 ? "#60a5fa" : "#818cf8" };
    });
  }, []);

  return (
    <group>
      {arcs.map((arc, i) => (
        <ArcLine key={i} {...arc} />
      ))}
    </group>
  );
}

function ArcLine({ start, end, mid, color }: any) {
  const lineRef = useRef<any>(null);
  const [opacity, setOpacity] = useState(0);

  useFrame(({ clock }) => {
    // Pulse effect
    const t = clock.getElapsedTime() + Math.random() * 10;
    const newOpacity = Math.max(0, Math.sin(t * 0.5) * 0.4);
    setOpacity(newOpacity);
  });

  return (
    <QuadraticBezierLine
      ref={lineRef}
      start={start}
      end={end}
      mid={mid}
      color={color}
      lineWidth={1}
      transparent
      opacity={opacity}
    />
  );
}

/**
 * Main Hero Component
 */
export default function GlobeHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  
  // Parallax / Scroll animations for text
  const textY = useTransform(scrollY, [0, 500], [0, -250]);
  const textOpacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <div ref={containerRef} className="relative w-full h-[150vh] bg-black overflow-hidden font-sans">
      {/* 3D Scene Layer - Sticky at the bottom half */}
      <div className="sticky top-0 h-screen w-full z-30 pointer-events-none">
        <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.05)_0%,transparent_70%)]" />
        
        <Canvas 
          className="w-full h-full"
          camera={{ position: [0, 0, 20], fov: 45 }}
        >
          <color attach="background" args={["#000000"]} />
          <PerspectiveCamera makeDefault position={[0, -5, 18]} />
          
          <ambientLight intensity={0.2} />
          <pointLight position={[10, 10, 10]} intensity={1.5} color="#3b82f6" />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#818cf8" />
          
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
          
          <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
            <Earth />
          </Float>
          
          <Environment preset="night" />
        </Canvas>

        {/* Bottom Horizon Fade - Blends the Earth bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-[40vh] bg-gradient-to-t from-black via-black/80 to-transparent z-40" />
      </div>

      {/* Hero Content - Lower z-index so it scrolls behind Earth */}
      <div className="relative z-20 flex flex-col items-center pt-[25vh] px-6 text-center">
        <motion.div
          style={{ y: textY, opacity: textOpacity }}
          className="max-w-5xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 mb-12 rounded-full border border-blue-500/20 bg-blue-500/5 backdrop-blur-md"
          >
            <Shield className="w-4 h-4 text-blue-400" />
            <span className="text-[10px] font-bold text-blue-400 uppercase tracking-[0.3em]">
              Next-Gen Infrastructure
            </span>
          </motion.div>

          <h1 className="text-7xl md:text-[120px] font-bold tracking-tighter text-white leading-[0.85] mb-12">
            Unbreakable <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-400 text-glow-blue">
              Equilibrium
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-white/40 text-xl md:text-2xl font-medium leading-relaxed mb-20">
            Secure your global footprint with <span className="text-blue-300/60">Stasis</span>. 
            Real-time telemetry, AI-driven mitigation, and immutable compliance.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link 
              href="/signup" 
              className="group h-16 px-12 rounded-full bg-white text-black font-bold text-lg hover:scale-105 transition-all shadow-2xl flex items-center justify-center gap-3"
            >
              Start Experience
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <button className="h-16 px-12 rounded-full border border-white/10 text-white font-bold text-lg hover:bg-white/5 transition-all">
              Platform Overview
            </button>
          </div>
        </motion.div>
      </div>

      {/* Extra Scroll Space to allow content to hide behind earth */}
      <div className="h-[100vh]" />
    </div>
  );
}
