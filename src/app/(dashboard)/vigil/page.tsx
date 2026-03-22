"use client";

import React, { useState, useEffect } from "react";
import { Activity, Zap, Cpu, HardDrive, Network, Maximize2, RefreshCw, ChevronRight, BarChart3, ShieldAlert } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api-client";

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

export default function VigilPage() {
  const [history, setHistory] = useState<{ time: number, throughput: number, latency: number, confidence: number }[]>([]);

  const { data: metrics, isLoading } = useQuery({
    queryKey: ["systemMetrics"],
    queryFn: () => api.alerts.getSystemMetrics(),
    select: (res) => res.data?.getSystemMetrics?.statistics,
    refetchInterval: 3000,
  });

  useEffect(() => {
    if (metrics) {
      setHistory(prev => {
        const newEntry = {
          time: Date.now(),
          throughput: metrics.throughput_flows_per_sec || 0,
          latency: metrics.processing_time_ms || 0,
          confidence: (metrics.average_confidence || 0) * 100,
        };
        const updated = [...prev, newEntry].slice(-30);
        return updated;
      });
    }
  }, [metrics]);

  const throughputData = history.map(h => ({ time: h.time, value: h.throughput }));
  const latencyData = history.map(h => ({ time: h.time, value: h.latency }));
  const confidenceData = history.map(h => ({ time: h.time, value: h.confidence }));

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
             <div className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse glow-primary" />
             <span className="text-[11px] font-bold tracking-tight text-blue-400">Live Infrastructure Monitoring</span>
          </div>
          <h1 className="text-5xl font-bold text-white tracking-tight">Vigil Telemetry</h1>
          <p className="text-white/40 mt-3 text-sm font-medium max-w-xl leading-relaxed">
            Real-time resource allocation and cluster health diagnostics. Monitoring <span className="text-indigo-400">VND-CORE-PRIMARY</span> via live backend stream.
          </p>
        </div>
        <div className="flex items-center gap-4">
           <Button variant="outline" size="icon" className="rounded-2xl border-white/10 bg-white/5 text-white/40 hover:text-white h-14 w-14 border-gradient transition-all shadow-sm">
              <RefreshCw className={cn("w-5 h-5", isLoading && "animate-spin")} />
           </Button>
           <Button className="rounded-2xl bg-blue-600 text-white font-bold glow-primary hover:scale-105 transition-all h-14 px-8 border-t border-white/20">
              Run System Diagnostics
           </Button>
        </div>
      </motion.header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <MetricTile 
          title="Throughput" 
          value={`${metrics?.throughput_flows_per_sec?.toFixed(1) || "0.0"} F/S`} 
          icon={<Network />} 
          data={throughputData} 
          color="#3b82f6" 
        />
        <MetricTile 
          title="Latency" 
          value={`${metrics?.processing_time_ms?.toFixed(2) || "0.00"} MS`} 
          icon={<Zap />} 
          data={latencyData} 
          color="#818cf8" 
        />
        <MetricTile 
          title="AI Confidence" 
          value={`${((metrics?.average_confidence || 0) * 100).toFixed(1)}%`} 
          icon={<Cpu />} 
          data={confidenceData} 
          color="#6366f1" 
        />
        <MetricTile 
          title="Total Flows" 
          value={`${metrics?.total_flows || "0"}`} 
          icon={<BarChart3 />} 
          data={throughputData} 
          color="#60a5fa" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
         {/* Main Detailed Chart */}
         <motion.div variants={itemVariants} className="lg:col-span-8">
            <Card className="rounded-[2.5rem] border-white/5 bg-gradient-to-br from-white/[0.03] to-transparent backdrop-blur-xl relative overflow-hidden group shadow-2xl">
               <div className="absolute inset-0 bg-grid-white opacity-5 pointer-events-none" />
               <CardHeader className="flex flex-row items-center justify-between space-y-0 p-10 pb-0 relative z-10">
                  <div className="flex items-center gap-6">
                     <div className="p-4 rounded-2xl bg-blue-500/10 text-blue-400 border border-blue-500/20 shadow-xl shadow-blue-500/10">
                        <Activity className="w-8 h-8" />
                     </div>
                     <div>
                        <CardTitle className="text-2xl font-bold text-white tracking-tight uppercase">Traffic Analysis</CardTitle>
                        <CardDescription className="text-xs text-white/30 font-semibold tracking-wide mt-2">Throughput Stream • Global Operations</CardDescription>
                     </div>
                  </div>
                  <Button variant="ghost" size="icon" className="text-white/20 hover:text-white rounded-2xl h-12 w-12 hover:bg-white/5 transition-colors">
                     <Maximize2 className="w-5 h-5" />
                  </Button>
               </CardHeader>

               <CardContent className="p-10 relative z-10">
                  <div className="h-[420px] w-full">
                     <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                        <AreaChart data={throughputData}>
                           <defs>
                              <linearGradient id="neonGradient" x1="0" y1="0" x2="0" y2="1">
                                 <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                                 <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                              </linearGradient>
                           </defs>
                           <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
                           <XAxis dataKey="time" hide />
                           <YAxis stroke="rgba(255,255,255,0.1)" fontSize={10} />
                           <Tooltip 
                              contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '24px', backdropFilter: 'blur(20px)', padding: '16px', boxShadow: '0 10px 40px rgba(0,0,0,0.5)' }}
                              itemStyle={{ color: '#60a5fa', fontWeight: 'bold', fontSize: '11px' }}
                           />
                           <Area type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={4} fillOpacity={1} fill="url(#neonGradient)" animationDuration={1000} isAnimationActive={false} />
                        </AreaChart>
                     </ResponsiveContainer>
                  </div>
               </CardContent>
            </Card>
         </motion.div>

         {/* Sidebar Stats */}
         <div className="lg:col-span-4 space-y-8">
            <motion.div variants={itemVariants}>
               <Card className="rounded-[2.5rem] p-10 border-white/5 bg-gradient-to-br from-white/[0.03] to-transparent backdrop-blur-xl shadow-xl">
                  <CardTitle className="text-[11px] font-bold text-white uppercase tracking-widest mb-10 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center border border-white/10">
                       <ShieldAlert className="w-4 h-4 text-white/40" />
                    </div>
                    ML Model Insights
                  </CardTitle>
                  <CardContent className="p-0 space-y-10">
                     <ProgressItem label="Attack Predictions" value={metrics ? Math.round((metrics.attack_predictions / metrics.total_flows) * 100 || 0) : 0} color="bg-red-500" />
                     <ProgressItem label="Benign Predictions" value={metrics ? Math.round((metrics.benign_predictions / metrics.total_flows) * 100 || 0) : 0} color="bg-green-500" />
                     <ProgressItem label="Model Confidence" value={metrics ? Math.round(metrics.average_confidence * 100) : 0} color="bg-blue-400" />
                     <ProgressItem label="Data Health" value={100} color="bg-white/40" />
                  </CardContent>
               </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
               <Card className="rounded-[2.5rem] p-10 border-white/5 bg-gradient-to-tr from-blue-500/10 to-transparent backdrop-blur-xl relative overflow-hidden shadow-lg">
                  <div className="absolute top-0 right-0 p-8 opacity-10">
                     <Zap className="w-12 h-12 text-blue-400" />
                  </div>
                  <CardHeader className="p-0 mb-6">
                     <CardTitle className="text-[11px] font-bold text-white uppercase tracking-widest">Anomaly Detection</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                     <CardDescription className="text-sm text-white/40 font-medium leading-relaxed mb-8">
                        Vanguard Neural Engine is monitoring cluster behavioral patterns. Current status is <span className="text-blue-400">Optimal</span>.
                     </CardDescription>
                     <div className="flex items-center gap-4 p-5 rounded-2xl bg-blue-500/5 border border-blue-500/20 shadow-inner">
                        <div className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse glow-primary" />
                        <span className="text-[11px] font-bold text-blue-400 tracking-tight uppercase">No Anomalies Detected</span>
                     </div>
                  </CardContent>
               </Card>
            </motion.div>
         </div>
      </div>
    </motion.div>
  );
}

function MetricTile({ title, value, icon, data, color }: { title: string, value: string, icon: React.ReactNode, data: any[], color: string }) {
  return (
    <motion.div variants={itemVariants}>
      <Card className="rounded-[2.5rem] border-white/5 bg-gradient-to-br from-white/[0.03] to-transparent backdrop-blur-xl relative overflow-hidden group transition-all duration-500 hover:bg-white/[0.06] hover:-translate-y-1 shadow-lg">
        <CardContent className="p-10 pb-0 relative z-10">
           <div className="flex items-start justify-between mb-10">
             <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 group-hover:scale-110 transition-transform duration-500" style={{ color }}>
               {React.isValidElement(icon) && React.cloneElement(icon as React.ReactElement<{ className?: string }>, { 
                 className: cn('w-7 h-7', (icon.props as any)?.className) 
               })}
             </div>
             <div className="text-4xl font-bold text-white tracking-tighter">{value}</div>
           </div>
           <div className="text-white/20 text-[11px] uppercase tracking-wider font-bold mb-12">{title}</div>
        </CardContent>
        
        <div className="h-28 w-full absolute bottom-0 left-0 right-0 opacity-20 group-hover:opacity-40 transition-opacity duration-500">
          <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
            <AreaChart data={data}>
              <Area type="monotone" dataKey="value" stroke={color} strokeWidth={3} fill={color} fillOpacity={0.2} animationDuration={1000} isAnimationActive={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </motion.div>
  );
}

function ProgressItem({ label, value, color }: { label: string, value: number, color: string }) {
  return (
    <div className="space-y-4">
       <div className="flex justify-between text-[11px] font-bold uppercase tracking-wide">
          <span className="text-white/20">{label}</span>
          <span className="text-white">{value}%</span>
       </div>
       <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden p-[1px]">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${value}%` }}
            transition={{ duration: 1.5, ease: "circOut" }}
            className={cn("h-full rounded-full shadow-lg", color)} 
          />
       </div>
    </div>
  );
}
