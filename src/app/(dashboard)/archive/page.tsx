"use client";

import React, { useState } from "react";
import { Search, Filter, Download, ChevronLeft, ChevronRight, Terminal, ShieldAlert, Cpu, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const mockLogs = [
  { id: 1, timestamp: "2026-03-19 12:44:02.124", level: "CRITICAL", source: "FW-NODE-04", message: "DDoS attempt mitigated from 182.16.4.12. Attack type: SYN Flood. Magnitude: 4.2 Gbps." },
  { id: 2, timestamp: "2026-03-19 12:42:15.582", level: "INFO", source: "IAM-SERVICE", message: "New API Key generated for service: Pulse-Lambda. User: admin_j_doe." },
  { id: 3, timestamp: "2026-03-19 12:40:08.910", level: "WARN", source: "METRIC-COLLECTOR", message: "Traffic spike detected in EU-West-1 region. Latency increased by 15%." },
  { id: 4, timestamp: "2026-03-19 12:38:55.231", level: "INFO", source: "POLICY-ENGINE", message: "RBAC rules updated by Administrator. 4 new permissions added to 'Analyst' role." },
  { id: 5, timestamp: "2026-03-19 12:35:12.004", level: "ERROR", source: "DB-CLUSTER-01", message: "Connection timeout on node shard-3. Auto-failover initiated." },
  { id: 6, timestamp: "2026-03-19 12:32:44.872", level: "INFO", source: "SYSTEM", message: "Kernel update v4.2.0 deployed to all Vanguard nodes successfully." },
  { id: 7, timestamp: "2026-03-19 12:30:11.112", level: "WARN", source: "STORAGE", message: "Disk usage on Archive-A exceeded 85%. Automated cleanup scheduled." },
  { id: 8, timestamp: "2026-03-19 12:28:05.654", level: "INFO", source: "AUTH-GW", message: "Successful login from unrecognized device: user_id_882. Location: Singapore." },
];

export default function ArchivePage() {
  const [activeLevel, setActiveLevel] = useState("ALL");

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto h-full flex flex-col">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
           <div className="p-3 rounded-2xl bg-cyan-500/10 text-cyan-400">
              <Terminal className="w-6 h-6" />
           </div>
           <div>
              <h1 className="text-3xl font-syne font-bold text-white tracking-tight">The Archive</h1>
              <p className="text-slate-500 font-mono text-[10px] uppercase tracking-[0.3em] mt-1">Unified Forensic Event Stream</p>
           </div>
        </div>
        <div className="flex items-center gap-3">
           <div className="hidden lg:flex items-center gap-6 mr-6 border-r border-white/10 pr-6">
              <div className="text-right">
                 <div className="text-[10px] font-mono text-slate-500 uppercase">Stream Rate</div>
                 <div className="text-sm font-bold text-white font-mono">1.2k/s</div>
              </div>
              <div className="text-right">
                 <div className="text-[10px] font-mono text-slate-500 uppercase">Retention</div>
                 <div className="text-sm font-bold text-white font-mono">365D</div>
              </div>
           </div>
           <button className="p-3 rounded-xl glass border-white/5 text-slate-400 hover:text-white transition-colors">
              <Download className="w-5 h-5" />
           </button>
           <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600 group-focus-within:text-cyan-400 transition-colors" />
              <input 
                type="text" 
                placeholder="QUERY_STREAM..." 
                className="pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm font-mono text-cyan-400 placeholder:text-slate-700 focus:outline-none focus:border-cyan-500/50 w-64 md:w-80 transition-all"
              />
           </div>
        </div>
      </header>

      {/* Filter Bar */}
      <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
         <FilterTab label="ALL" active={activeLevel === "ALL"} onClick={() => setActiveLevel("ALL")} />
         <FilterTab label="CRITICAL" count={1} color="text-red-400" active={activeLevel === "CRITICAL"} onClick={() => setActiveLevel("CRITICAL")} />
         <FilterTab label="ERROR" count={1} color="text-orange-400" active={activeLevel === "ERROR"} onClick={() => setActiveLevel("ERROR")} />
         <FilterTab label="WARN" count={2} color="text-yellow-400" active={activeLevel === "WARN"} onClick={() => setActiveLevel("WARN")} />
         <FilterTab label="INFO" count={4} color="text-blue-400" active={activeLevel === "INFO"} onClick={() => setActiveLevel("INFO")} />
      </div>

      {/* Logs Table (Inspired by live-logs page/llp-1.webp) */}
      <div className="flex-1 glass rounded-[2rem] border-white/5 overflow-hidden flex flex-col bg-slate-900/20">
         <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[1000px]">
               <thead>
                  <tr className="bg-white/5 border-b border-white/10 text-[10px] font-mono text-slate-500 uppercase tracking-[0.3em]">
                     <th className="px-8 py-5 font-bold">UTC_TIMESTAMP</th>
                     <th className="px-8 py-5 font-bold">LVL</th>
                     <th className="px-8 py-5 font-bold">SOURCE_ID</th>
                     <th className="px-8 py-5 font-bold">EVENT_DESCRIPTION</th>
                     <th className="px-8 py-5 font-bold">ACTION</th>
                  </tr>
               </thead>
               <tbody className="font-mono text-[11px] divide-y divide-white/[0.03]">
                  {mockLogs.map((log) => (
                     <motion.tr 
                       initial={{ opacity: 0, x: -10 }}
                       animate={{ opacity: 1, x: 0 }}
                       key={log.id} 
                       className="group hover:bg-cyan-500/[0.03] transition-colors cursor-pointer"
                     >
                        <td className="px-8 py-4 text-slate-500 whitespace-nowrap group-hover:text-slate-400 transition-colors">{log.timestamp}</td>
                        <td className="px-8 py-4 whitespace-nowrap">
                           <span className={cn(
                              "px-2 py-0.5 rounded font-bold tracking-tighter text-[10px]",
                              log.level === 'CRITICAL' && "bg-red-500/10 text-red-500",
                              log.level === 'ERROR' && "bg-orange-500/10 text-orange-500",
                              log.level === 'WARN' && "bg-yellow-500/10 text-yellow-500",
                              log.level === 'INFO' && "bg-blue-500/10 text-blue-500",
                           )}>
                              {log.level}
                           </span>
                        </td>
                        <td className="px-8 py-4">
                           <div className="flex items-center gap-2">
                              {log.source.startsWith('FW') ? <ShieldAlert className="w-3 h-3 text-cyan-500" /> : log.source.startsWith('DB') ? <Cpu className="w-3 h-3 text-purple-500" /> : <Globe className="w-3 h-3 text-blue-500" />}
                              <span className="text-cyan-500/80 group-hover:text-cyan-400 transition-colors">{log.source}</span>
                           </div>
                        </td>
                        <td className="px-8 py-4 text-slate-400 group-hover:text-slate-200 transition-colors leading-relaxed">
                           {log.message}
                        </td>
                        <td className="px-8 py-4 whitespace-nowrap text-right">
                           <button className="text-[10px] font-bold text-slate-600 hover:text-cyan-400 uppercase tracking-widest transition-colors">Inspect</button>
                        </td>
                     </motion.tr>
                  ))}
               </tbody>
            </table>
         </div>
         
         {/* Matrix-style Status Bar */}
         <div className="p-6 border-t border-white/10 flex items-center justify-between mt-auto bg-black/40 backdrop-blur-xl">
            <div className="flex items-center gap-8">
               <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
                  <span className="text-[10px] font-mono text-cyan-400 font-bold tracking-widest uppercase">Streaming: VND-HUB-NYC-01</span>
               </div>
               <div className="hidden md:flex items-center gap-4 text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                  <span>Latency: <span className="text-white">12ms</span></span>
                  <span>Packet_Loss: <span className="text-white">0.00%</span></span>
               </div>
            </div>
            <div className="flex items-center gap-4">
               <div className="text-[10px] font-mono text-slate-500">
                  SHW: <span className="text-slate-300">1-8</span> / TOT: <span className="text-slate-300">1,242</span>
               </div>
               <div className="flex items-center gap-1">
                  <button className="p-1.5 rounded bg-white/5 text-slate-500 hover:text-white disabled:opacity-30">
                     <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button className="p-1.5 rounded bg-white/5 text-slate-500 hover:text-white">
                     <ChevronRight className="w-4 h-4" />
                  </button>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}

function FilterTab({ label, count, color, active, onClick }: { label: string, count?: number, color?: string, active?: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "px-6 py-2.5 rounded-xl text-[10px] font-mono font-bold tracking-[0.2em] border transition-all flex items-center gap-3",
        active ? "bg-cyan-500/10 border-cyan-500/40 text-cyan-400 glow-cyan" : "bg-white/5 border-white/10 text-slate-500 hover:text-slate-300 hover:bg-white/[0.08]"
      )}
    >
      {label}
      {count !== undefined && (
        <span className={cn("opacity-50", color)}>({count})</span>
      )}
    </button>
  );
}
