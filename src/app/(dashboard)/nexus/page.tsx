"use client";

import React from "react";
import { Shield, Activity, Globe, Zap, AlertTriangle, ArrowUpRight, TrendingUp, Server, Cpu, Database } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export default function NexusPage() {
  return (
    <div className="space-y-8 max-w-[1600px] mx-auto">
      {/* Page Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-cyan-500 font-mono text-[10px] uppercase tracking-[0.3em] mb-2">
             <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
             System Status: Nominal
          </div>
          <h1 className="text-4xl font-syne font-bold text-white tracking-tight">
            Nexus Command <span className="text-slate-700 font-light ml-2 text-2xl">v1.0.4</span>
          </h1>
        </div>
        <div className="flex items-center gap-4">
           <div className="hidden lg:flex flex-col items-end mr-4">
              <span className="text-[10px] font-mono text-slate-500 uppercase">Uptime</span>
              <span className="text-sm font-bold text-white font-mono tracking-tighter">99.9998%</span>
           </div>
           <button className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-bold hover:bg-white/10 transition-all flex items-center gap-2">
              <Database className="w-4 h-4 text-cyan-400" />
              Snapshot
           </button>
           <button className="px-6 py-3 rounded-xl bg-cyan-500 text-slate-950 text-sm font-bold glow-cyan transition-transform hover:scale-105 flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Deploy Aegis
           </button>
        </div>
      </header>

      {/* High-Density Grid (Inspired by Dashboard-Grid/dbg-2.webp) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Left Column: Primary Metrics */}
        <div className="md:col-span-8 space-y-6">
           <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <StatCard 
                title="Integrity Score" 
                value="99.9%" 
                trend="+0.1%" 
                icon={<Shield className="text-cyan-400" />} 
                chartColor="cyan"
              />
              <StatCard 
                title="Global Traffic" 
                value="24.8 TB/s" 
                trend="+1.2%" 
                icon={<TrendingUp className="text-blue-400" />} 
                chartColor="blue"
              />
              <StatCard 
                title="Active Threats" 
                value="142" 
                trend="-4%" 
                icon={<AlertTriangle className="text-red-400" />} 
                chartColor="red"
              />
           </div>

           {/* Large Activity Overview */}
           <div className="glass rounded-[2rem] p-8 border-white/5 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-cyan-500/5 to-transparent pointer-events-none" />
              <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                 <div className="flex items-center gap-4">
                    <div className="p-3 rounded-2xl bg-cyan-500/10 text-cyan-400">
                       <Activity className="w-6 h-6" />
                    </div>
                    <div>
                       <h3 className="text-xl font-syne font-bold text-white">Infrastructure Pulse</h3>
                       <p className="text-xs text-slate-500 font-mono uppercase tracking-widest mt-1">Cross-Regional Aggregate</p>
                    </div>
                 </div>
                 <div className="flex gap-2">
                    <button className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[10px] font-bold text-slate-400 hover:text-white transition-colors">1H</button>
                    <button className="px-3 py-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-[10px] font-bold text-cyan-400">24H</button>
                    <button className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[10px] font-bold text-slate-400 hover:text-white transition-colors">7D</button>
                 </div>
              </div>

              {/* Mock Chart Area */}
              <div className="h-64 w-full flex items-end gap-2 relative">
                 {[...Array(40)].map((_, i) => (
                    <motion.div 
                      key={i}
                      initial={{ height: 0 }}
                      animate={{ height: `${20 + Math.random() * 80}%` }}
                      transition={{ duration: 1, delay: i * 0.02, repeat: Infinity, repeatType: 'mirror' }}
                      className="flex-1 bg-gradient-to-t from-cyan-500/40 to-cyan-500/10 rounded-t-[2px] min-w-[2px]"
                    />
                 ))}
                 <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="text-[40px] font-bold text-white/5 font-syne uppercase tracking-[0.5em]">REAL_TIME</div>
                 </div>
              </div>
           </div>
        </div>

        {/* Right Column: High-Density Info (Inspired by Bento/bento-3.webp) */}
        <div className="md:col-span-4 space-y-6">
           {/* Mini Globe/Map Tile */}
           <div className="glass rounded-[2rem] overflow-hidden relative border-white/5 h-[320px] group">
              <div className="absolute inset-0 bg-slate-900/50" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.1)_0%,transparent_100%)] animate-pulse" />
              <div className="p-6 relative z-10 flex flex-col h-full">
                 <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-syne font-bold text-white">Threat Origin</h3>
                    <Globe className="w-5 h-5 text-cyan-500/50 group-hover:text-cyan-500 transition-colors" />
                 </div>
                 <div className="flex-1 flex items-center justify-center">
                    <div className="relative w-40 h-40">
                       <div className="absolute inset-0 rounded-full border border-cyan-500/20 animate-ping" />
                       <div className="absolute inset-2 rounded-full border border-cyan-500/40" />
                       <div className="absolute inset-4 rounded-full border border-cyan-500/60" />
                       <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-12 h-12 bg-cyan-500/20 blur-xl rounded-full" />
                          <div className="w-4 h-4 bg-cyan-500 rounded-full glow-cyan" />
                       </div>
                    </div>
                 </div>
                 <div className="mt-auto space-y-2">
                    <div className="flex justify-between text-[10px] font-mono">
                       <span className="text-slate-500 uppercase">Primary Region</span>
                       <span className="text-white">EU-WEST-1</span>
                    </div>
                    <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                       <div className="h-full w-3/4 bg-cyan-500" />
                    </div>
                 </div>
              </div>
           </div>

           {/* Active Nodes Card */}
           <div className="glass rounded-[2rem] p-6 border-white/5">
              <h3 className="text-sm font-syne font-bold text-white uppercase tracking-widest mb-6 flex items-center gap-2">
                 <Server className="w-4 h-4 text-cyan-400" />
                 Active Compute Nodes
              </h3>
              <div className="space-y-4">
                 <NodeItem id="VND-001" load={42} status="nominal" />
                 <NodeItem id="VND-002" load={88} status="warning" />
                 <NodeItem id="VND-003" load={12} status="nominal" />
              </div>
              <button className="w-full mt-6 py-3 rounded-xl border border-white/5 text-[10px] font-bold text-slate-500 hover:text-cyan-400 hover:border-cyan-500/20 transition-all uppercase tracking-widest">
                 Manage Cluster
              </button>
           </div>
        </div>

        {/* Bottom Wide Section: High Density Logs */}
        <div className="md:col-span-12 glass rounded-[2rem] p-8 border-white/5">
           <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                 <div className="p-3 rounded-2xl bg-white/5 text-slate-400">
                    <Database className="w-6 h-6" />
                 </div>
                 <div>
                    <h3 className="text-xl font-syne font-bold text-white">Vanguard Event Stream</h3>
                    <p className="text-xs text-slate-500 font-mono uppercase tracking-widest mt-1">Immutable Forensics</p>
                 </div>
              </div>
              <button className="text-xs font-bold text-cyan-400 uppercase tracking-widest flex items-center gap-1 hover:underline">
                 View All Logs <ArrowUpRight className="w-3 h-3" />
              </button>
           </div>

           <div className="space-y-1">
              <LogLine time="12:44:02.124" level="CRITICAL" service="FIREWALL" message="DDoS attempt mitigated from 182.16.4.12. Magnitude: 4.2 Gbps." />
              <LogLine time="12:42:15.582" level="INFO" service="IAM-SERVICE" message="New API Key generated for service: Pulse-Lambda." />
              <LogLine time="12:40:08.910" level="WARN" service="METRIC-COLLECTOR" message="Traffic spike detected in EU-West-1 region." />
              <LogLine time="12:38:55.231" level="INFO" service="POLICY-ENGINE" message="RBAC rules updated by Administrator." />
           </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, trend, icon, chartColor }: { title: string, value: string, trend: string, icon: React.ReactNode, chartColor: string }) {
  const colors = {
    cyan: "text-cyan-400 bg-cyan-400/10",
    blue: "text-blue-400 bg-blue-400/10",
    red: "text-red-400 bg-red-400/10"
  }[chartColor as 'cyan' | 'blue' | 'red'];

  return (
    <div className="glass p-6 rounded-[2rem] border-white/5 hover:bg-white/10 transition-all group">
      <div className="flex items-center justify-between mb-6">
        <div className={cn("p-3 rounded-2xl", colors)}>
          {icon}
        </div>
        <span className={cn(
          "text-[10px] font-bold px-2 py-1 rounded-lg font-mono",
          trend.startsWith('+') ? "text-green-400 bg-green-400/10" : "text-red-400 bg-red-400/10"
        )}>
          {trend}
        </span>
      </div>
      <div className="text-slate-500 text-[10px] font-mono uppercase tracking-[0.2em] mb-1">{title}</div>
      <div className="text-3xl font-bold text-white font-mono tracking-tighter">{value}</div>
    </div>
  );
}

function NodeItem({ id, load, status }: { id: string, load: number, status: 'nominal' | 'warning' }) {
  return (
    <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
       <div className="flex items-center gap-3">
          <div className={cn(
             "w-2 h-2 rounded-full",
             status === 'nominal' ? "bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.5)]" : "bg-red-500 animate-pulse"
          )} />
          <span className="text-xs font-mono font-bold text-slate-300">{id}</span>
       </div>
       <div className="flex items-center gap-3">
          <div className="text-[10px] font-mono text-slate-500">LOAD: {load}%</div>
          <div className="w-16 h-1.5 bg-white/5 rounded-full overflow-hidden">
             <div className={cn("h-full rounded-full", status === 'nominal' ? "bg-cyan-500" : "bg-red-500")} style={{ width: `${load}%` }} />
          </div>
       </div>
    </div>
  );
}

function LogLine({ time, level, service, message }: { time: string, level: string, service: string, message: string }) {
  const levelColor = {
    CRITICAL: "text-red-400",
    WARN: "text-yellow-400",
    INFO: "text-blue-400"
  }[level as 'CRITICAL' | 'WARN' | 'INFO'];

  return (
    <div className="flex items-center gap-4 py-2 border-b border-white/5 last:border-0 hover:bg-white/[0.02] px-2 rounded-lg transition-colors group">
       <span className="text-[10px] font-mono text-slate-600 w-24">{time}</span>
       <span className={cn("text-[10px] font-bold font-mono w-16", levelColor)}>{level}</span>
       <span className="text-[10px] font-bold font-mono text-slate-400 w-24">[{service}]</span>
       <span className="text-sm text-slate-300 font-medium flex-1 truncate">{message}</span>
       <ArrowUpRight className="w-3 h-3 text-slate-700 group-hover:text-cyan-400 transition-colors" />
    </div>
  );
}
