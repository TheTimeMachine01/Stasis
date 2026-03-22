"use client";

import React from "react";
import { BarChart3, TrendingUp, TrendingDown, Clock, ShieldCheck, Zap, ArrowUpRight, Filter, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  }
};

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
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-10 max-w-[1600px] mx-auto pb-10 font-sans"
    >
      <motion.header variants={itemVariants} className="flex flex-col md:flex-row md:items-center justify-between gap-8 border-b border-white/5 pb-10">
        <div>
          <div className="flex items-center gap-3 mb-4">
             <div className="w-2.5 h-2.5 rounded-full bg-indigo-500 glow-indigo" />
             <span className="text-[11px] font-bold tracking-tight text-indigo-400">Neural Analytics Engine Active</span>
          </div>
          <h1 className="text-5xl font-bold text-white tracking-tight">Pulse Intelligence</h1>
          <p className="text-white/40 mt-3 text-base font-medium max-w-xl leading-relaxed">
            AI-driven threat forecasting and historical trend correlation. Leveraging <span className="text-indigo-400">deep learning</span> for proactive infrastructure defense.
          </p>
        </div>
        <div className="flex items-center gap-4">
           <Button variant="outline" className="rounded-2xl border-white/10 bg-white/5 text-white/60 hover:text-white h-14 gap-3 border-gradient transition-all px-6 font-semibold">
              <Filter className="w-5 h-5 text-indigo-400" />
              <span className="text-xs">Filter Range</span>
           </Button>
           <Button className="rounded-2xl bg-white text-black font-bold hover:bg-slate-200 transition-all h-14 px-8 text-sm">
              Export Intel Report
           </Button>
        </div>
      </motion.header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         <InsightCard 
           title="Threat Mitigation Rate" 
           value="99.8%" 
           trend="+0.4%" 
           up={true}
           icon={<ShieldCheck className="w-6 h-6 text-green-400" />} 
           accent="green"
         />
         <InsightCard 
           title="Peak Attack Volume" 
           value="4.2 Gbps" 
           trend="-12.5%" 
           up={false}
           icon={<Zap className="w-6 h-6 text-yellow-400" />} 
           accent="yellow"
         />
         <InsightCard 
           title="Mean Time to Resolve" 
           value="12.4s" 
           trend="-2.1s" 
           up={false}
           icon={<Clock className="w-6 h-6 text-blue-400" />} 
           accent="blue"
         />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         <motion.div variants={itemVariants}>
            <Card className="rounded-[2.5rem] border-white/5 bg-gradient-to-br from-white/[0.03] to-transparent backdrop-blur-xl overflow-hidden group p-1 shadow-2xl">
               <CardHeader className="p-10 pb-6">
                  <div className="flex items-center gap-6 mb-2">
                     <div className="p-4 rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shadow-xl shadow-indigo-500/10 group-hover:scale-110 transition-transform duration-500">
                        <TrendingUp className="w-8 h-8" />
                     </div>
                     <div>
                        <CardTitle className="text-2xl font-bold text-white tracking-tight uppercase">Threat Distribution</CardTitle>
                        <CardDescription className="text-sm text-white/20 font-semibold tracking-tight mt-2">24h Correlation: Detected vs Mitigated</CardDescription>
                     </div>
                  </div>
               </CardHeader>
               <CardContent className="px-10 pb-10">
                  <div className="h-80 w-full mt-4">
                     <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data}>
                           <defs>
                              <linearGradient id="colorThreats" x1="0" y1="0" x2="0" y2="1">
                                 <stop offset="5%" stopColor="#ef4444" stopOpacity={0.2}/>
                                 <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                              </linearGradient>
                              <linearGradient id="colorMitigated" x1="0" y1="0" x2="0" y2="1">
                                 <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                                 <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                              </linearGradient>
                           </defs>
                           <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
                           <XAxis dataKey="name" stroke="rgba(255,255,255,0.1)" fontSize={10} />
                           <YAxis stroke="rgba(255,255,255,0.1)" fontSize={10} />
                           <Tooltip 
                              contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px', backdropFilter: 'blur(20px)', padding: '12px' }}
                              itemStyle={{ fontSize: '11px', fontWeight: 'bold' }}
                           />
                           <Area type="monotone" dataKey="threats" stroke="#ef4444" fillOpacity={1} fill="url(#colorThreats)" strokeWidth={3} />
                           <Area type="monotone" dataKey="mitigated" stroke="#3b82f6" fillOpacity={1} fill="url(#colorMitigated)" strokeWidth={3} />
                        </AreaChart>
                     </ResponsiveContainer>
                  </div>
               </CardContent>
            </Card>
         </motion.div>

         <motion.div variants={itemVariants}>
            <Card className="rounded-[2.5rem] border-white/5 bg-gradient-to-br from-white/[0.03] to-transparent backdrop-blur-xl overflow-hidden group p-1 shadow-2xl">
               <CardHeader className="p-10 pb-6">
                  <div className="flex items-center gap-6 mb-2">
                     <div className="p-4 rounded-2xl bg-blue-500/10 text-blue-400 border border-blue-500/20 shadow-xl shadow-blue-500/10 group-hover:scale-110 transition-transform duration-500">
                        <BarChart3 className="w-8 h-8" />
                     </div>
                     <div>
                        <CardTitle className="text-2xl font-bold text-white tracking-tight uppercase">Regional Impact Score</CardTitle>
                        <CardDescription className="text-sm text-white/20 font-semibold tracking-tight mt-2">Zone-Based Global Risk Assessment</CardDescription>
                     </div>
                  </div>
               </CardHeader>
               <CardContent className="px-10 pb-10">
                  <div className="h-80 w-full mt-4">
                     <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={[
                          { name: 'NA', score: 85 },
                          { name: 'EU', score: 72 },
                          { name: 'ASIA', score: 94 },
                          { name: 'SA', score: 45 },
                          { name: 'AF', score: 32 },
                        ]}>
                           <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
                           <XAxis dataKey="name" stroke="rgba(255,255,255,0.1)" fontSize={10} />
                           <YAxis hide />
                           <Tooltip 
                              cursor={{fill: 'rgba(255,255,255,0.02)'}}
                              contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px', backdropFilter: 'blur(20px)' }}
                           />
                           <Bar dataKey="score" fill="#3b82f6" radius={[8, 8, 0, 0]} barSize={40} />
                        </BarChart>
                     </ResponsiveContainer>
                  </div>
               </CardContent>
            </Card>
         </motion.div>
      </div>

      <motion.div variants={itemVariants}>
         <Card className="rounded-[3rem] border-white/5 bg-gradient-to-br from-indigo-600/[0.08] via-transparent to-transparent backdrop-blur-2xl relative overflow-hidden group p-1 shadow-2xl">
            <div className="absolute inset-0 bg-grid-white opacity-5 pointer-events-none" />
            <CardContent className="p-12 relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
               <div className="space-y-6">
                  <Badge className="bg-indigo-500/10 text-indigo-400 border-indigo-500/30 text-[11px] font-bold uppercase tracking-widest animate-pulse py-1.5 px-4 rounded-full">
                     Neural Forecast: Active
                  </Badge>
                  <h3 className="text-4xl font-bold text-white tracking-tight">Predictive Threat Intelligence</h3>
                  <p className="text-white/40 max-w-xl text-lg leading-relaxed font-medium">
                     Neural analysis of global ingress patterns indicates a <span className="text-red-400 font-bold">15% surge</span> in botnet vectors within the <span className="text-white font-bold tracking-tight uppercase">Asia-Pacific</span> region over the next 6-hour cycle.
                  </p>
               </div>
               <Button className="h-20 px-12 rounded-[2rem] bg-white text-black font-bold hover:scale-105 transition-all shadow-2xl shadow-indigo-500/20 shrink-0 text-xs uppercase tracking-widest gap-4">
                  Initialize Mitigation
                  <ArrowUpRight className="w-5 h-5" />
               </Button>
            </CardContent>
            <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-indigo-500/10 blur-[120px] rounded-full group-hover:bg-indigo-500/20 transition-all duration-700" />
            <div className="absolute -left-20 -top-20 w-64 h-64 bg-blue-500/5 blur-[100px] rounded-full" />
         </Card>
      </motion.div>
    </motion.div>
  );
}

function InsightCard({ title, value, trend, up, icon, accent }: { title: string, value: string, trend: string, up: boolean, icon: React.ReactNode, accent: string }) {
  const accentStyles = {
    green: "bg-green-500/10 border-green-500/20 shadow-green-500/5",
    yellow: "bg-yellow-500/10 border-yellow-500/20 shadow-yellow-500/5",
    blue: "bg-blue-500/10 border-blue-500/20 shadow-blue-500/5"
  }[accent as 'green' | 'yellow' | 'blue'];

  return (
    <motion.div variants={itemVariants}>
      <Card className="rounded-[2.5rem] border-white/5 bg-gradient-to-br from-white/[0.03] to-transparent hover:bg-white/[0.06] backdrop-blur-xl p-8 transition-all duration-500 group relative overflow-hidden shadow-xl">
        <div className="absolute -right-4 -top-4 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity">
           {React.isValidElement(icon) && React.cloneElement(icon as React.ReactElement<{ size?: number }>, { size: 120 })}
        </div>
        
        <CardHeader className="p-0 flex flex-row items-center gap-6 mb-10 relative z-10">
          <div className={cn("p-4 rounded-2xl border transition-all duration-500 group-hover:scale-110", accentStyles)}>
             {icon}
          </div>
          <CardTitle className="text-white/30 text-[11px] font-bold uppercase tracking-widest leading-none">{title}</CardTitle>
        </CardHeader>
        
        <CardContent className="p-0 flex items-end justify-between relative z-10">
          <div className="text-4xl font-bold text-white tracking-tighter group-hover:text-white transition-colors">{value}</div>
          <Badge variant="outline" className={cn(
            "text-[10px] border-none px-3 py-1 font-bold tracking-wide gap-1.5 rounded-full",
            up ? "bg-green-500/10 text-green-400" : "bg-blue-500/10 text-blue-400"
          )}>
            {up ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
            {trend}
          </Badge>
        </CardContent>
      </Card>
    </motion.div>
  );
}
