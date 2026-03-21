"use client";

import React, { useRef, useMemo, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { 
  Float, 
  PerspectiveCamera, 
  Environment, 
  QuadraticBezierLine,
  useTexture
} from "@react-three/drei";
import * as THREE from "three";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Shield } from "lucide-react";
import Link from "next/link";

/**
 * TWEAKABLE CONFIGURATION
 * Adjust these values to change the layout without breaking the logic.
 */
const CONFIG = {
  EARTH_RADIUS: 40,
  GLOBE_Y: -40.8,              
  HEADING_OFFSET: "-mt-64",    
  SUB_CONTENT_OFFSET: "mt-12", 
  CONTAINER_HEIGHT: "130vh",   
  GLOBE_SCROLL_HEIGHT: "130vh", 
  ARC_COUNT: 20,
};

// --- Components ---

/**
 * Cinematic Earth Shader
 */
const EarthMaterial = ({ lights, normal }: { lights: THREE.Texture, normal: THREE.Texture }) => {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  
  const shaderArgs = useMemo(() => ({
    uniforms: {
      uLightsMap: { value: lights },
      uNormalMap: { value: normal },
      uRimColor: { value: new THREE.Color("#4dabff") },
    },
    vertexShader: `
      varying vec3 vNormal;
      varying vec3 vEyeVector;
      varying vec2 vUv;
      void main() {
        vUv = uv;
        vNormal = normalize(normalMatrix * normal);
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        vEyeVector = normalize(mvPosition.xyz);
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: `
      varying vec3 vNormal;
      varying vec3 vEyeVector;
      varying vec2 vUv;
      uniform sampler2D uLightsMap;
      uniform sampler2D uNormalMap;
      uniform vec3 uRimColor;

      void main() {
        vec3 texColor = texture2D(uLightsMap, vUv).rgb;
        
        // Extract city lights (brightest spots)
        float lightIntensity = pow(texColor.r, 4.0) * 15.0;
        vec3 cityColors = vec3(1.0, 0.85, 0.5) * lightIntensity;
        
        // Atmosphere/Rim effect
        float fresnel = pow(1.0 + dot(vEyeVector, vNormal), 5.0);
        vec3 rim = uRimColor * fresnel * 0.8;
        
        // Deep ocean/continent base from texture
        vec3 base = texColor * 0.4;
        
        // Combined final color
        vec3 finalColor = base + cityColors + rim;
        
        gl_FragColor = vec4(finalColor, 1.0);
      }
    `,
  }), [lights, normal]);

  return <shaderMaterial ref={materialRef} args={[shaderArgs]} />;
};

/**
 * Cloud Shader
 */
const CloudMaterial = ({ clouds }: { clouds: THREE.Texture }) => {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  
  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = clock.getElapsedTime() * 0.002;
    }
  });

  const shaderArgs = useMemo(() => ({
    uniforms: {
      uTime: { value: 0 },
      uCloudMap: { value: clouds },
    },
    vertexShader: `
      varying vec2 vUv;
      varying vec3 vNormal;
      varying vec3 vEyeVector;
      void main() {
        vUv = uv;
        vNormal = normalize(normalMatrix * normal);
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        vEyeVector = normalize(mvPosition.xyz);
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: `
      varying vec2 vUv;
      varying vec3 vNormal;
      varying vec3 vEyeVector;
      uniform sampler2D uCloudMap;
      uniform float uTime;

      void main() {
        vec2 offsetUv = vUv + vec2(uTime, uTime * 0.2);
        vec4 cloudColor = texture2D(uCloudMap, offsetUv);
        float alpha = smoothstep(0.2, 0.8, cloudColor.r);
        float horizonFade = pow(dot(vEyeVector, vNormal), 0.8);
        gl_FragColor = vec4(vec3(0.9, 0.95, 1.0), alpha * 0.35 * horizonFade);
      }
    `,
    transparent: true,
    depthWrite: false,
  }), [clouds]);

  return <shaderMaterial ref={materialRef} args={[shaderArgs]} />;
};

/**
 * Outer Atmospheric Glow
 */
const AtmosphereMaterial = () => {
  const shaderArgs = useMemo(() => ({
    uniforms: {
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
        float fresnel = pow(1.0 + dot(vEyeVector, vNormal), 6.0);
        gl_FragColor = vec4(uColor, fresnel * 0.25);
      }
    `,
    transparent: true,
    side: THREE.BackSide,
  }), []);

  return <shaderMaterial args={[shaderArgs]} />;
};

function Earth() {
  const earthRef = useRef<THREE.Group>(null);
  const cloudRef = useRef<THREE.Mesh>(null);
  
  const textures = useTexture({
    lights: "/earth-lights.png",
    normal: "https://threejs.org/examples/textures/planets/earth_normal_2048.jpg",
    clouds: "https://threejs.org/examples/textures/planets/earth_clouds_1024.png"
  });

  useFrame((state, delta) => {
    if (earthRef.current) earthRef.current.rotation.y += delta * 0.015;
    if (cloudRef.current) cloudRef.current.rotation.y += delta * 0.005; 
  });

  return (
    <group ref={earthRef} position={[0, CONFIG.GLOBE_Y, 0]}>
      {/* 1. Planet Surface */}
      <mesh>
        <sphereGeometry args={[CONFIG.EARTH_RADIUS, 128, 128]} />
        <EarthMaterial lights={textures.lights} normal={textures.normal} />
      </mesh>
      
      {/* 2. Cloud Layer (Slightly larger) */}
      <mesh ref={cloudRef} scale={[1.0015, 1.0015, 1.0015]}>
        <sphereGeometry args={[CONFIG.EARTH_RADIUS, 128, 128]} />
        <CloudMaterial clouds={textures.clouds} />
      </mesh>
      
      {/* 3. Global Atmospheric Glow */}
      <mesh scale={[1.004, 1.004, 1.004]}>
        <sphereGeometry args={[CONFIG.EARTH_RADIUS, 128, 128]} />
        <AtmosphereMaterial />
      </mesh>

      <DataArcs />
    </group>
  );
}

function DataArcs() {
  const arcs = useMemo(() => {
    return Array.from({ length: CONFIG.ARC_COUNT }).map(() => {
      const startPhi = Math.random() * Math.PI * 2;
      const startTheta = Math.acos(2 * Math.random() - 1);
      const endPhi = startPhi + (Math.random() - 0.5) * 0.6;
      const endTheta = startTheta + (Math.random() - 0.5) * 0.6;
      const start = new THREE.Vector3().setFromSphericalCoords(CONFIG.EARTH_RADIUS, startTheta, startPhi);
      const end = new THREE.Vector3().setFromSphericalCoords(CONFIG.EARTH_RADIUS, endTheta, endPhi);
      const mid = start.clone().lerp(end, 0.5).normalize().multiplyScalar(CONFIG.EARTH_RADIUS * 1.015);
      return { start, end, mid, color: Math.random() > 0.5 ? "#3b82f6" : "#6366f1" };
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
  const [opacity, setOpacity] = useState(0);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() + Math.random() * 10;
    setOpacity(Math.max(0, Math.sin(t * 0.5) * 0.15));
  });

  return (
    <QuadraticBezierLine
      start={start}
      end={end}
      mid={mid}
      color={color}
      lineWidth={0.4}
      transparent
      opacity={opacity}
    />
  );
}

export default function GlobeHero() {
  const { scrollY } = useScroll();
  const headingOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const subContentOpacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <div 
      className="relative w-full bg-transparent font-sans overflow-x-hidden"
      style={{ height: CONFIG.CONTAINER_HEIGHT }}
    >
      {/* LAYER 1: FIXED HEADING */}
      <div className="fixed inset-0 z-10 flex flex-col items-center justify-center px-6 text-center pointer-events-none">
        <motion.div
          style={{ opacity: headingOpacity }}
          className={`max-w-7xl mx-auto ${CONFIG.HEADING_OFFSET}`}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-5 py-2 mb-10 rounded-full border border-blue-500/10 bg-blue-500/5 backdrop-blur-xl shadow-2xl"
          >
            <Shield className="w-3.5 h-3.5 text-blue-400" />
            <span className="text-[10px] font-bold text-blue-400 uppercase tracking-[0.6em]">
              Stasis Defense Network
            </span>
          </motion.div>

          <h1 className="text-8xl md:text-[140px] lg:text-[170px] font-bold tracking-tighter text-white leading-[0.75] drop-shadow-2xl">
            Unbreakable <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-500 to-cyan-400 text-glow-blue">
              Equilibrium
            </span>
          </h1>
        </motion.div>
      </div>

      {/* LAYER 2: SCROLLING GLOBE */}
      <div className="relative z-30 pointer-events-none">
        <div className="relative w-full" style={{ height: CONFIG.GLOBE_SCROLL_HEIGHT }}>
          <Canvas 
            className="w-full h-full"
            camera={{ position: [0, 0, 20], fov: 45 }}
            gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
            style={{ height: CONFIG.GLOBE_SCROLL_HEIGHT }}
          >
            <Suspense fallback={null}>
              <PerspectiveCamera makeDefault position={[0, 0, 22]} />
              <ambientLight intensity={0.05} />
              <Float speed={0.3} rotationIntensity={0.04} floatIntensity={0.08}>
                <Earth />
              </Float>
              <Environment preset="night" />
            </Suspense>
          </Canvas>
          <div className="absolute bottom-0 left-0 right-0 h-[80vh] bg-gradient-to-t from-black via-black/20 to-transparent z-40" />
        </div>
      </div>

      {/* LAYER 3: FIXED SUB-CONTENT */}
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center px-6 text-center pointer-events-none">
        <motion.div
          style={{ opacity: subContentOpacity }}
          className={`max-w-7xl mx-auto flex flex-col items-center ${CONFIG.SUB_CONTENT_OFFSET}`}
        >
          <div className="h-[40vh]" />
          <p className="max-w-2xl mx-auto text-white/40 text-lg md:text-2xl font-medium leading-relaxed mb-16 drop-shadow-2xl">
            Securing global footprint with <span className="text-blue-300/60 font-semibold italic">Stasis</span>.<br />
            Automated intelligence, global telemetry.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pointer-events-auto">
            <Link 
              href="/signup" 
              className="group h-14 px-10 rounded-full bg-white text-black font-bold text-base hover:scale-105 transition-all shadow-[0_0_40px_rgba(255,255,255,0.15)] flex items-center justify-center gap-3"
            >
              Start Experience
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <button className="h-14 px-10 rounded-full border border-white/20 text-white font-bold text-base hover:bg-white/10 transition-all backdrop-blur-sm">
              Platform Overview
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
