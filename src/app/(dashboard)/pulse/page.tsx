"use client";

import React from "react";
import { BarChart3, TrendingUp, TrendingDown, Clock, ShieldCheck, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip,
  BarChart,
  Bar
} from "recharts";

const data = [
  { name: '00:00', threats: 400, mitigated: 380 },
  { name: '04:00', threats: 300, mitigated: 290 },
  { name: '08:00', threats: 600, mitigated: 550 },
  { name: '12:00', threats: 800, mitigated: 790 },
  { name: '16:00', threats: 500, mitigated: 480 },
  { name: '20:00', threats: 900, mitigated: 895 },
  { name: '23:59', threats: 400, mitigated: 395 },
];

export default function PulsePage() {
  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <header>
        <h1 className="text-3xl font-syne font-bold text-white tracking-tight">Pulse Analytics</h1>
        <p className="text-slate-400 font-medium">Historical trends and AI-driven threat forecasting.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <InsightCard 
           title="Threat Mitigation Rate" 
           value="99.8%" 
           trend="+0.4%" 
           up={true}
           icon={<ShieldCheck className="text-green-400" />} 
         />
         <InsightCard 
           title="Peak Attack Volume" 
           value="4.2 Gbps" 
           trend="-12.5%" 
           up={false}
           icon={<Zap className="text-yellow-400" />} 
         />
         <InsightCard 
           title="Mean Time to Resolve" 
           value="12.4s" 
           trend="-2.1s" 
           up={false}
           icon={<Clock className="text-blue-400" />} 
         />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         <div className="glass rounded-3xl p-8 border-white/5">
            <h3 className="text-xl font-syne font-bold text-white mb-8 flex items-center gap-2">
               <TrendingUp className="w-5 h-5 text-cyan-400" />
               Threat Distribution (24h)
            </h3>
            <div className="h-80 w-full">
               <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data}>
                     <defs>
                        <linearGradient id="colorThreats" x1="0" y1="0" x2="0" y2="1">
                           <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                           <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorMitigated" x1="0" y1="0" x2="0" y2="1">
                           <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.3}/>
                           <stop offset="95%" stopColor="#22d3ee" stopOpacity={0}/>
                        </linearGradient>
                     </defs>
                     <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                     <XAxis dataKey="name" stroke="#475569" fontSize={10} fontStyle="italic" />
                     <YAxis stroke="#475569" fontSize={10} fontStyle="italic" />
                     <Tooltip 
                        contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                     />
                     <Area type="monotone" dataKey="threats" stroke="#ef4444" fillOpacity={1} fill="url(#colorThreats)" strokeWidth={2} />
                     <Area type="monotone" dataKey="mitigated" stroke="#22d3ee" fillOpacity={1} fill="url(#colorMitigated)" strokeWidth={2} />
                  </AreaChart>
               </ResponsiveContainer>
            </div>
         </div>

         <div className="glass rounded-3xl p-8 border-white/5">
            <h3 className="text-xl font-syne font-bold text-white mb-8 flex items-center gap-2">
               <BarChart3 className="w-5 h-5 text-cyan-400" />
               Regional Impact Score
            </h3>
            <div className="h-80 w-full">
               <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={[
                    { name: 'NA', score: 85 },
                    { name: 'EU', score: 72 },
                    { name: 'ASIA', score: 94 },
                    { name: 'SA', score: 45 },
                    { name: 'AF', score: 32 },
                  ]}>
                     <XAxis dataKey="name" stroke="#475569" fontSize={10} fontStyle="italic" />
                     <YAxis hide />
                     <Tooltip 
                        cursor={{fill: 'rgba(255,255,255,0.05)'}}
                        contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                     />
                     <Bar dataKey="score" fill="#22d3ee" radius={[4, 4, 0, 0]} barSize={40} />
                  </BarChart>
               </ResponsiveContainer>
            </div>
         </div>
      </div>

      <div className="glass rounded-3xl p-8 border-white/5 bg-gradient-to-br from-cyan-500/5 to-transparent relative overflow-hidden">
         <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
               <div className="inline-flex items-center px-3 py-1 mb-4 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-bold uppercase tracking-widest animate-pulse">
                  AI Prediction Active
               </div>
               <h3 className="text-2xl font-syne font-bold text-white mb-2">Predictive Threat Forecast</h3>
               <p className="text-slate-400 max-w-lg">Based on current global traffic patterns, we anticipate a <span className="text-red-400 font-bold">15% increase</span> in botnet activity over the next 6 hours.</p>
            </div>
            <button className="px-8 py-4 rounded-2xl bg-white text-slate-950 font-bold hover:scale-105 transition-transform shrink-0">
               Generate Detailed Report
            </button>
         </div>
         {/* Abstract BG element */}
         <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-cyan-500/10 blur-[100px] rounded-full" />
      </div>
    </div>
  );
}

function InsightCard({ title, value, trend, up, icon }: { title: string, value: string, trend: string, up: boolean, icon: React.ReactNode }) {
  return (
    <div className="glass p-6 rounded-3xl border-white/5 hover:bg-white/10 transition-colors group">
      <div className="flex items-center gap-4 mb-4">
        <div className="p-3 rounded-2xl bg-white/5 group-hover:scale-110 transition-transform">{icon}</div>
        <div className="text-slate-500 text-xs font-mono uppercase tracking-widest font-bold">{title}</div>
      </div>
      <div className="flex items-end justify-between">
        <div className="text-3xl font-bold text-white font-mono tracking-tight">{value}</div>
        <div className={cn(
          "flex items-center text-xs font-bold font-mono px-2 py-1 rounded-lg",
          up ? "text-green-400 bg-green-400/10" : "text-blue-400 bg-blue-400/10"
        )}>
          {up ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
          {trend}
        </div>
      </div>
    </div>
  );
}
