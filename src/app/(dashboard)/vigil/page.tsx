"use client";

import React, { useState, useEffect } from "react";
import { Activity, Zap, Cpu, HardDrive, Network, Maximize2, RefreshCw, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

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
    <div className="space-y-8 max-w-[1600px] mx-auto pb-10">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-syne font-bold text-white tracking-tight">Vigil Monitoring</h1>
          <div className="flex items-center gap-2 mt-2">
            <Badge variant="outline" className="text-cyan-500 border-cyan-500/30 font-mono text-[10px] uppercase tracking-widest bg-cyan-500/5">Live Telemetry</Badge>
            <p className="text-slate-500 font-medium font-mono text-[10px] uppercase tracking-[0.2em]">Real-time Resource Stream</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
           <Button variant="outline" size="icon" className="rounded-xl border-white/5 bg-white/5 text-slate-400 hover:text-white h-11 w-11">
              <RefreshCw className="w-5 h-5" />
           </Button>
           <Button className="rounded-xl bg-cyan-500 text-slate-950 font-bold glow-cyan hover:scale-105 transition-transform h-11 px-6">
              Diagnostic Mode
           </Button>
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
         <Card className="lg:col-span-8 rounded-[2rem] border-white/5 bg-slate-900/40 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 blur-[100px] -mr-32 -mt-32 rounded-full" />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 p-8 pb-0 relative z-10">
               <div className="flex items-center gap-4">
                  <div className="p-4 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                     <Activity className="w-6 h-6" />
                  </div>
                  <div>
                     <CardTitle className="text-2xl font-syne font-bold text-white">System Pulse Aggregate</CardTitle>
                     <CardDescription className="text-[10px] text-slate-500 font-mono uppercase tracking-widest mt-1">Telemetry Stream: VND-CORE-PRIMARY</CardDescription>
                  </div>
               </div>
               <Button variant="ghost" size="icon" className="text-slate-500 hover:text-white rounded-xl h-10 w-10">
                  <Maximize2 className="w-5 h-5" />
               </Button>
            </CardHeader>

            <CardContent className="p-8 relative z-10">
               <div className="h-[400px] w-full">
                  <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
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
            </CardContent>
         </Card>

         {/* Sidebar Stats */}
         <div className="lg:col-span-4 space-y-6">
            <Card className="rounded-[2rem] p-8 border-white/5 bg-slate-900/40">
               <CardTitle className="text-sm font-syne font-bold text-white uppercase tracking-[0.2em] mb-8 flex items-center gap-2">
                 <Cpu className="w-4 h-4 text-slate-500" />
                 Resource Efficiency
               </CardTitle>
               <CardContent className="p-0 space-y-8">
                  <ProgressItem label="THREAD_UTILIZATION" value={84} color="bg-cyan-500" />
                  <ProgressItem label="STORAGE_CAPACITY" value={32} color="bg-purple-500" />
                  <ProgressItem label="SOCKET_EFFICIENCY" value={98} color="bg-pink-500" />
                  <ProgressItem label="CORE_TEMPERATURE" value={45} color="bg-yellow-500" />
               </CardContent>
            </Card>

            <Card className="rounded-[2rem] p-8 border-white/5 bg-gradient-to-tr from-cyan-500/10 to-transparent">
               <CardHeader className="p-0 mb-4">
                  <CardTitle className="text-sm font-syne font-bold text-white uppercase tracking-[0.2em]">Anomaly Detection</CardTitle>
               </CardHeader>
               <CardContent className="p-0">
                  <CardDescription className="text-xs text-slate-400 font-medium leading-relaxed mb-6">
                     Vanguard AI is currently monitoring for out-of-band behavioral patterns across all core clusters.
                  </CardDescription>
                  <div className="flex items-center gap-3 p-4 rounded-2xl bg-cyan-500/5 border border-cyan-500/20">
                     <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
                     <span className="text-[10px] font-mono font-bold text-cyan-400">NO_ANOMALIES_DETECTED</span>
                  </div>
               </CardContent>
            </Card>
         </div>
      </div>
    </div>
  );
}

function MetricTile({ title, value, icon, data, color }: { title: string, value: string, icon: React.ReactNode, data: any[], color: string }) {
  return (
    <Card className="rounded-[2rem] border-white/5 bg-slate-900/40 relative overflow-hidden group transition-all hover:bg-slate-900/60 hover:-translate-y-1">
      <CardContent className="p-8 pb-0">
         <div className="flex items-start justify-between mb-8 relative z-10">
           <div className="p-3 rounded-2xl bg-white/5 border border-white/10 group-hover:bg-white/10 transition-colors" style={{ color }}>
             {React.cloneElement(icon as React.ReactElement<any>, { className: 'w-6 h-6 shadow-[0_0_15px_currentColor]' })}
           </div>
           <div className="text-3xl font-bold text-white font-mono tracking-tighter">{value}</div>
         </div>
         <div className="text-slate-500 text-[10px] font-mono uppercase tracking-[0.3em] font-bold mb-10 relative z-10">{title}</div>
      </CardContent>
      
      {/* Sparkline */}
      <div className="h-24 w-full absolute bottom-0 left-0 right-0 opacity-40 group-hover:opacity-100 transition-opacity">
        <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
          <AreaChart data={data}>
            <Area type="monotone" dataKey="value" stroke={color} strokeWidth={3} fill={color} fillOpacity={0.1} animationDuration={1000} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

function ProgressItem({ label, value, color }: { label: string, value: number, color: string }) {
  return (
    <div className="space-y-3">
       <div className="flex justify-between text-[10px] font-mono font-bold uppercase tracking-widest">
          <span className="text-slate-500">{label}</span>
          <span className="text-white">{value}%</span>
       </div>
       <Progress value={value} className="h-2 bg-white/5" indicatorClassName={color} />
    </div>
  );
}
