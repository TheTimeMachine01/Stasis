"use client";

import React from "react";
import { BarChart3, TrendingUp, TrendingDown, Clock, ShieldCheck, Zap, ArrowUpRight, Filter } from "lucide-react";
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
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

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
    <div className="space-y-8 max-w-7xl mx-auto pb-10">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-syne font-bold text-white tracking-tight">Pulse Analytics</h1>
          <p className="text-slate-400 font-medium mt-1">Historical trends and AI-driven threat forecasting.</p>
        </div>
        <div className="flex items-center gap-3">
           <Button variant="outline" className="rounded-xl border-white/5 bg-white/5 text-slate-400 hover:text-white h-11 gap-2">
              <Filter className="w-4 h-4" />
              Filter Range
           </Button>
           <Button className="rounded-xl bg-cyan-500 text-slate-950 font-bold glow-cyan hover:scale-105 transition-transform h-11 px-6">
              Export Dataset
           </Button>
        </div>
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
         <Card className="rounded-[2rem] border-white/5 bg-slate-900/40 overflow-hidden">
            <CardHeader className="p-8 pb-4">
               <CardTitle className="text-xl font-syne font-bold text-white flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                     <TrendingUp className="w-5 h-5" />
                  </div>
                  Threat Distribution (24h)
               </CardTitle>
               <CardDescription className="text-slate-500 font-medium">Correlation between detected and mitigated anomalies.</CardDescription>
            </CardHeader>
            <CardContent className="p-8 pt-4">
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
                           contentStyle={{ backgroundColor: '#020617', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', backdropFilter: 'blur(10px)' }}
                        />
                        <Area type="monotone" dataKey="threats" stroke="#ef4444" fillOpacity={1} fill="url(#colorThreats)" strokeWidth={2} />
                        <Area type="monotone" dataKey="mitigated" stroke="#22d3ee" fillOpacity={1} fill="url(#colorMitigated)" strokeWidth={2} />
                     </AreaChart>
                  </ResponsiveContainer>
               </div>
            </CardContent>
         </Card>

         <Card className="rounded-[2rem] border-white/5 bg-slate-900/40 overflow-hidden">
            <CardHeader className="p-8 pb-4">
               <CardTitle className="text-xl font-syne font-bold text-white flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                     <BarChart3 className="w-5 h-5" />
                  </div>
                  Regional Impact Score
               </CardTitle>
               <CardDescription className="text-slate-500 font-medium">Aggregated risk assessment by geographic zone.</CardDescription>
            </CardHeader>
            <CardContent className="p-8 pt-4">
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
                           contentStyle={{ backgroundColor: '#020617', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', backdropFilter: 'blur(10px)' }}
                        />
                        <Bar dataKey="score" fill="#22d3ee" radius={[4, 4, 0, 0]} barSize={40} />
                     </BarChart>
                  </ResponsiveContainer>
               </div>
            </CardContent>
         </Card>
      </div>

      <Card className="rounded-[2rem] border-white/5 bg-slate-900/40 bg-gradient-to-br from-cyan-500/5 to-transparent relative overflow-hidden group">
         <CardContent className="p-10 relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-4">
               <Badge className="bg-cyan-500/10 text-cyan-400 border-cyan-500/30 text-[10px] font-mono font-bold uppercase tracking-[0.2em] animate-pulse py-1 px-3">
                  AI Prediction Active
               </Badge>
               <h3 className="text-3xl font-syne font-bold text-white tracking-tight">Predictive Threat Forecast</h3>
               <p className="text-slate-400 max-w-lg leading-relaxed">Based on current global traffic patterns, we anticipate a <span className="text-red-400 font-bold">15% increase</span> in botnet activity over the next 6 hours within the <span className="text-white font-bold font-mono">ASIA-PACIFIC</span> region.</p>
            </div>
            <Button className="h-16 px-10 rounded-2xl bg-white text-slate-950 font-bold hover:scale-105 transition-all shadow-xl shadow-white/5 shrink-0 text-sm uppercase tracking-widest gap-2">
               Generate Detailed Report
               <ArrowUpRight className="w-4 h-4" />
            </Button>
         </CardContent>
         {/* Abstract BG element */}
         <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-cyan-500/10 blur-[120px] rounded-full group-hover:bg-cyan-500/15 transition-all" />
      </Card>
    </div>
  );
}

function InsightCard({ title, value, trend, up, icon }: { title: string, value: string, trend: string, up: boolean, icon: React.ReactNode }) {
  return (
    <Card className="rounded-[2rem] border-white/5 bg-slate-900/40 p-6 hover:bg-slate-900/60 transition-all group border-t-2 border-t-transparent hover:border-t-white/10">
      <CardHeader className="p-0 flex flex-row items-center gap-4 mb-6">
        <div className="p-3 rounded-2xl bg-white/5 border border-white/5 group-hover:scale-110 group-hover:bg-white/10 transition-all shadow-lg">{icon}</div>
        <CardTitle className="text-slate-500 text-[10px] font-mono uppercase tracking-[0.2em] font-bold leading-none">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-0 flex items-end justify-between">
        <div className="text-3xl font-bold text-white font-mono tracking-tighter">{value}</div>
        <Badge variant="outline" className={cn(
          "font-mono text-[10px] border-none px-2 py-1 gap-1",
          up ? "bg-green-500/10 text-green-400" : "bg-blue-500/10 text-blue-400"
        )}>
          {up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
          {trend}
        </Badge>
      </CardContent>
    </Card>
  );
}

