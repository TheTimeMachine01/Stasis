"use client";

import React, { useState, useEffect } from "react";
import { Activity, Zap, Cpu, HardDrive, Network, Maximize2, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const generateData = (count: number, base: number, variance: number) => {
  return [...Array(count).keys()].map(i => ({
    time: i,
    value: base + Math.random() * variance
  }));
};

export default function VigilPage() {
  const [cpuData, setCpuData] = useState(generateData(30, 30, 40));
  const [memData, setMemData] = useState(generateData(30, 50, 20));
  const [netData, setNetData] = useState(generateData(30, 10, 80));

  useEffect(() => {
    const interval = setInterval(() => {
      setCpuData(prev => [...prev.slice(1), { time: prev[prev.length - 1].time + 1, value: 30 + Math.random() * 50 }]);
      setMemData(prev => [...prev.slice(1), { time: prev[prev.length - 1].time + 1, value: 50 + Math.random() * 20 }]);
      setNetData(prev => [...prev.slice(1), { time: prev[prev.length - 1].time + 1, value: 10 + Math.random() * 80 }]);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-8 max-w-[1600px] mx-auto">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-syne font-bold text-white tracking-tight">Vigil Monitoring</h1>
          <p className="text-slate-400 font-medium font-mono text-xs uppercase tracking-[0.2em] mt-2">Real-time Resource Telemetry</p>
        </div>
        <div className="flex items-center gap-3">
           <button className="p-3 rounded-xl glass border-white/5 text-slate-400 hover:text-white transition-colors">
              <RefreshCw className="w-5 h-5" />
           </button>
           <button className="px-6 py-3 rounded-xl bg-cyan-500 text-slate-950 text-sm font-bold glow-cyan transition-transform hover:scale-105">
              Diagnostic Mode
           </button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricTile title="CPU_LOAD" value={`${Math.round(cpuData[cpuData.length - 1].value)}%`} icon={<Cpu />} data={cpuData} color="#22d3ee" />
        <MetricTile title="MEM_USAGE" value={`${Math.round(memData[memData.length - 1].value)}%`} icon={<HardDrive />} data={memData} color="#8b5cf6" />
        <MetricTile title="NET_TRAFFIC" value={`${Math.round(netData[netData.length - 1].value)} MB/S`} icon={<Network />} data={netData} color="#ec4899" />
        <MetricTile title="LATENCY_CORE" value="0.14MS" icon={<Zap />} data={generateData(30, 0.1, 0.05)} color="#eab308" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
         {/* Main Detailed Chart */}
         <div className="lg:col-span-8 glass rounded-[2.5rem] p-8 border-white/5 relative overflow-hidden bg-gradient-to-br from-slate-900/50 to-transparent">
            <div className="flex items-center justify-between mb-12">
               <div className="flex items-center gap-4">
                  <div className="p-4 rounded-2xl bg-cyan-500/10 text-cyan-400">
                     <Activity className="w-6 h-6" />
                  </div>
                  <div>
                     <h3 className="text-2xl font-syne font-bold text-white">System Pulse Aggregate</h3>
                     <p className="text-[10px] text-slate-500 font-mono uppercase tracking-widest mt-1">Telemetry Stream: VND-CORE-PRIMARY</p>
                  </div>
               </div>
               <button className="p-2 rounded-lg hover:bg-white/5 transition-colors">
                  <Maximize2 className="w-5 h-5 text-slate-500" />
               </button>
            </div>

            <div className="h-[400px] w-full">
               <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={cpuData}>
                     <defs>
                        <linearGradient id="neonGradient" x1="0" y1="0" x2="0" y2="1">
                           <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.4}/>
                           <stop offset="95%" stopColor="#22d3ee" stopOpacity={0}/>
                        </linearGradient>
                     </defs>
                     <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
                     <XAxis dataKey="time" hide />
                     <YAxis hide domain={[0, 100]} />
                     <Tooltip 
                        contentStyle={{ backgroundColor: '#020617', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', backdropFilter: 'blur(10px)' }}
                        itemStyle={{ color: '#22d3ee', fontFamily: 'monospace', fontWeight: 'bold' }}
                     />
                     <Area type="monotone" dataKey="value" stroke="#22d3ee" strokeWidth={4} fillOpacity={1} fill="url(#neonGradient)" animationDuration={1000} />
                  </AreaChart>
               </ResponsiveContainer>
            </div>
         </div>

         {/* Sidebar Stats */}
         <div className="lg:col-span-4 space-y-6">
            <div className="glass rounded-[2.5rem] p-8 border-white/5 bg-slate-900/30">
               <h4 className="text-sm font-syne font-bold text-white uppercase tracking-[0.2em] mb-8">Resource Efficiency</h4>
               <div className="space-y-8">
                  <ProgressItem label="THREAD_UTILIZATION" value={84} color="bg-cyan-500" />
                  <ProgressItem label="STORAGE_CAPACITY" value={32} color="bg-purple-500" />
                  <ProgressItem label="SOCKET_EFFICIENCY" value={98} color="bg-pink-500" />
                  <ProgressItem label="CORE_TEMPERATURE" value={45} color="bg-yellow-500" />
               </div>
            </div>

            <div className="glass rounded-[2.5rem] p-8 border-white/5 bg-gradient-to-tr from-cyan-500/10 to-transparent">
               <h4 className="text-sm font-syne font-bold text-white uppercase tracking-[0.2em] mb-4">Anomaly Detection</h4>
               <p className="text-xs text-slate-400 font-medium leading-relaxed mb-6">
                  Vanguard AI is currently monitoring for out-of-band behavioral patterns.
               </p>
               <div className="flex items-center gap-3 p-4 rounded-2xl bg-cyan-500/5 border border-cyan-500/20">
                  <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
                  <span className="text-[10px] font-mono font-bold text-cyan-400">NO_ANOMALIES_DETECTED</span>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}

function MetricTile({ title, value, icon, data, color }: { title: string, value: string, icon: React.ReactNode, data: any[], color: string }) {
  return (
    <div className="glass p-8 rounded-[2.5rem] border-white/5 relative overflow-hidden group transition-all hover:bg-white/[0.04] hover:-translate-y-1">
      <div className="flex items-start justify-between mb-8 relative z-10">
        <div className="p-3 rounded-2xl bg-white/5 group-hover:bg-white/10 transition-colors" style={{ color }}>
          {React.cloneElement(icon as React.ReactElement<any>, { className: 'w-6 h-6' })}
        </div>
        <div className="text-3xl font-bold text-white font-mono tracking-tighter">{value}</div>
      </div>
      <div className="text-slate-500 text-[10px] font-mono uppercase tracking-[0.3em] font-bold mb-6 relative z-10">{title}</div>
      
      {/* Sparkline */}
      <div className="h-20 w-full absolute bottom-0 left-0 right-0 opacity-40 group-hover:opacity-100 transition-opacity">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <Area type="monotone" dataKey="value" stroke={color} strokeWidth={3} fill={color} fillOpacity={0.1} animationDuration={1000} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function ProgressItem({ label, value, color }: { label: string, value: number, color: string }) {
  return (
    <div className="space-y-3">
       <div className="flex justify-between text-[10px] font-mono font-bold uppercase tracking-widest">
          <span className="text-slate-500">{label}</span>
          <span className="text-white">{value}%</span>
       </div>
       <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden p-[2px]">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${value}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className={cn("h-full rounded-full", color)} 
          />
       </div>
    </div>
  );
}
