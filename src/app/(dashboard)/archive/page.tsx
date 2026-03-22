"use client";

import React, { useState, useEffect } from "react";
import { Search, Filter, Download, ChevronLeft, ChevronRight, Terminal, ShieldAlert, Cpu, Globe, ArrowUpRight, Maximize2, Loader2, Eye, Trash2, CheckCircle, BrainCircuit, ShieldCheck, Zap, Plus, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import { useSocket } from "@/context/SocketContext";
import { Separator } from "@/components/ui/separator";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 }
  }
};

const itemVariants = {
  hidden: { y: 10, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
  }
};

export default function ArchivePage() {
  const [activeLevel, setActiveLevel] = useState("ALL");
  const [logs, setLogs] = useState<any[]>([]);
  const [selectedAlert, setSelectedAlert] = useState<any>(null);
  const [isManualDialogOpen, setIsManualDialogOpen] = useState(false);
  const { subscribe, connected } = useSocket();
  const queryClient = useQueryClient();

  const [manualAlert, setManualAlert] = useState({
    title: "",
    message: "",
    level: "INFO",
    attack_type: "MANUAL_INCIDENT"
  });

  const { data: historicalData, isLoading } = useQuery({
    queryKey: ['alerts', activeLevel],
    queryFn: () => api.alerts.list({ 
      level: activeLevel === "ALL" ? undefined : activeLevel,
      limit: 50 
    }),
    select: (res) => res.data?.listAlerts || [],
  });

  useEffect(() => {
    if (historicalData) {
      setLogs(historicalData);
    }
  }, [historicalData]);

  const markReadMutation = useMutation({
    mutationFn: (id: string) => api.alerts.markRead(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['alerts'] }),
  });

  const markAllReadMutation = useMutation({
    mutationFn: () => api.alerts.markAllRead(),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['alerts'] }),
  });

  const createManualMutation = useMutation({
    mutationFn: (data: any) => api.alerts.createManual(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['alerts'] });
      setIsManualDialogOpen(false);
      setManualAlert({ title: "", message: "", level: "INFO", attack_type: "MANUAL_INCIDENT" });
    },
  });

  useEffect(() => {
    if (connected) {
      const unsubscribe = subscribe("/topic/alerts", (newAlert) => {
        setLogs((prev) => [newAlert, ...prev].slice(0, 100));
      });
      return () => unsubscribe();
    }
  }, [connected, subscribe]);

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8 max-w-[1600px] mx-auto h-full flex flex-col pb-10 font-sans"
    >
      <motion.header variants={itemVariants} className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 border-b border-white/5 pb-10">
        <div className="flex items-center gap-6">
           <div className="p-4 rounded-2xl bg-blue-500/10 text-blue-400 border border-blue-500/20 shadow-xl shadow-blue-500/10 transition-transform hover:scale-110 duration-500">
              <Terminal className="w-8 h-8" />
           </div>
           <div>
              <h1 className="text-4xl font-bold text-white tracking-tight">The Archive</h1>
              <p className="text-white/30 text-xs font-semibold uppercase tracking-wider mt-2">Immutable Forensic Intelligence Stream</p>
           </div>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
           <div className="hidden xl:flex items-center gap-8 mr-8 border-r border-white/10 pr-8">
              <div className="text-right">
                 <div className="text-[10px] text-white/20 uppercase font-bold tracking-wider">Ingestion Rate</div>
                 <div className="text-lg font-bold text-white tracking-tighter">{connected ? "1.2k/s" : "0.0k/s"}</div>
              </div>
           </div>
           
           <div className="relative w-full sm:w-80 group">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-blue-400 transition-colors z-10" />
              <Input 
                type="text" 
                placeholder="Search archive..." 
                className="pl-14 h-14 bg-white/5 border-white/10 rounded-2xl text-white placeholder:text-white/10 focus-visible:ring-blue-500/30 border-gradient transition-all w-full font-medium"
              />
           </div>

           <Button 
             variant="outline" 
             className="rounded-2xl border-white/10 bg-white/5 text-white/60 hover:text-white h-14 gap-3 px-6 border-gradient transition-all font-semibold"
             onClick={() => setIsManualDialogOpen(true)}
           >
              <Plus className="w-5 h-5 text-blue-400" />
              <span className="text-xs uppercase tracking-wide">Manual Alert</span>
           </Button>

           <Button 
             variant="outline" 
             className="rounded-2xl border-white/10 bg-white/5 text-white/60 hover:text-white h-14 gap-3 px-6 border-gradient transition-all font-semibold"
             onClick={() => markAllReadMutation.mutate()}
             disabled={markAllReadMutation.isPending}
           >
              <CheckCircle className="w-5 h-5" />
              <span className="text-xs uppercase tracking-wide">Resolve All</span>
           </Button>
        </div>
      </motion.header>

      {/* Filter Bar */}
      <motion.div variants={itemVariants} className="flex items-center gap-3 overflow-x-auto pb-4 scrollbar-hide shrink-0">
         <FilterTab label="All Logs" active={activeLevel === "ALL"} onClick={() => setActiveLevel("ALL")} />
         <FilterTab label="Critical" color="text-red-400" active={activeLevel === "CRITICAL"} onClick={() => setActiveLevel("CRITICAL")} />
         <FilterTab label="High Risk" color="text-orange-400" active={activeLevel === "HIGH"} onClick={() => setActiveLevel("HIGH")} />
         <FilterTab label="Medium" color="text-yellow-400" active={activeLevel === "MEDIUM"} onClick={() => setActiveLevel("MEDIUM")} />
         <FilterTab label="Low Priority" color="text-blue-400" active={activeLevel === "LOW"} onClick={() => setActiveLevel("LOW")} />
      </motion.div>

      {/* Logs Card */}
      <motion.div variants={itemVariants} className="flex-1 flex flex-col min-h-0">
        <Card className="flex-1 rounded-[2.5rem] border-white/5 bg-gradient-to-br from-white/[0.03] to-transparent backdrop-blur-xl overflow-hidden flex flex-col shadow-2xl p-1 relative">
           <div className="absolute inset-0 bg-grid-white opacity-5 pointer-events-none" />
           <div className="flex-1 overflow-auto custom-scrollbar relative z-10">
              <Table>
                 <TableHeader className="bg-black/40 sticky top-0 z-20 backdrop-blur-xl">
                    <TableRow className="border-b border-white/10 hover:bg-transparent px-4">
                       <TableHead className="px-10 h-16 text-[11px] text-white/30 uppercase tracking-widest font-bold">Timestamp</TableHead>
                       <TableHead className="px-10 h-16 text-[11px] text-white/30 uppercase tracking-widest font-bold text-center">Severity</TableHead>
                       <TableHead className="px-10 h-16 text-[11px] text-white/30 uppercase tracking-widest font-bold">Vector Type</TableHead>
                       <TableHead className="px-10 h-16 text-[11px] text-white/30 uppercase tracking-widest font-bold">Event Summary</TableHead>
                       <TableHead className="px-10 h-16 text-[11px] text-white/30 uppercase tracking-widest font-bold text-right">Action</TableHead>
                    </TableRow>
                 </TableHeader>
                 <TableBody>
                    {isLoading && logs.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="h-96 text-center">
                          <div className="flex flex-col items-center gap-6 text-white/20">
                            <Loader2 className="w-12 h-12 animate-spin text-blue-500" />
                            <span className="uppercase tracking-widest text-[11px] font-bold">Synchronizing forensic stream...</span>
                          </div>
                        </TableCell>
                      </TableRow>
                    ) : logs.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="h-96 text-center">
                          <span className="uppercase tracking-widest text-[11px] text-white/10 font-bold">Zero Anomaly Records in Buffer</span>
                        </TableCell>
                      </TableRow>
                    ) : (
                      <AnimatePresence initial={false}>
                        {logs.map((log) => (
                          <motion.tr 
                            layout
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            key={log.id} 
                            className={cn(
                              "group border-b border-white/[0.02] hover:bg-blue-500/[0.04] transition-all duration-300 cursor-pointer relative overflow-hidden",
                              !log.read && "bg-blue-500/[0.01]"
                            )}
                            onClick={() => setSelectedAlert(log)}
                          >
                             <TableCell className="px-10 py-6 text-white/40 whitespace-nowrap group-hover:text-white transition-colors font-medium text-xs">
                               {new Date(log.timestamp || log.detectedAt).toLocaleString()}
                             </TableCell>
                             <TableCell className="px-10 py-6 text-center">
                                <div className={cn(
                                   "font-bold tracking-tight text-[10px] h-6 px-3 flex items-center justify-center uppercase rounded-full border inline-flex",
                                   (log.level === 'CRITICAL') && "bg-red-500/10 text-red-400 border-red-500/20 shadow-lg shadow-red-500/5",
                                   (log.level === 'LOW' || log.level === 'INFO') && "bg-blue-500/10 text-blue-400 border-blue-500/20",
                                   (log.level === 'MEDIUM' || log.level === 'WARN') && "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
                                   (log.level === 'HIGH' || log.level === 'ERROR') && "bg-orange-500/10 text-orange-400 border-orange-500/20",
                                )}>
                                   {log.level}
                                </div>
                             </TableCell>
                             <TableCell className="px-10 py-6">
                                <div className="flex items-center gap-3">
                                   <Zap className="w-4 h-4 text-blue-500 opacity-40 group-hover:opacity-100 transition-opacity" />
                                   <span className="text-blue-400/60 group-hover:text-blue-400 transition-colors font-bold text-xs uppercase">
                                     {log.attack_type || "Anomaly"}
                                   </span>
                                </div>
                             </TableCell>
                             <TableCell className="px-10 py-6 text-white/60 group-hover:text-white transition-colors leading-relaxed max-w-xl font-medium text-sm">
                                {log.title || log.message}
                             </TableCell>
                             <TableCell className="px-10 py-6 text-right">
                                <div className="flex items-center justify-end gap-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                                   <Button variant="ghost" size="sm" className="h-9 rounded-xl text-[10px] font-bold text-white/20 hover:text-blue-400 uppercase tracking-widest hover:bg-blue-500/10 px-4">
                                      Inspect <ChevronRight className="w-3 h-3 ml-2" />
                                   </Button>
                                </div>
                             </TableCell>
                          </motion.tr>
                        ))}
                      </AnimatePresence>
                    )}
                 </TableBody>
              </Table>
           </div>
           
           {/* Footer Status Bar */}
           <div className="p-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between bg-black/60 backdrop-blur-2xl shrink-0 gap-6 z-20">
              <div className="flex items-center gap-10">
                 <div className="flex items-center gap-3">
                    <div className={cn(
                      "w-2.5 h-2.5 rounded-full",
                      connected ? "bg-blue-500 animate-pulse glow-primary" : "bg-red-500"
                    )} />
                    <span className="text-[11px] text-blue-400 font-bold tracking-wide uppercase">
                      {connected ? "Live Forensic Stream: VND-Cluster-01" : "Data Stream Interrupted"}
                    </span>
                 </div>
              </div>
              <div className="flex items-center gap-8">
                 <div className="text-[11px] text-white/20 uppercase font-bold tracking-wider">
                    Showing <span className="text-white/60">{logs.length}</span> Records
                 </div>
                 <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" className="h-10 w-10 rounded-xl bg-white/5 border-white/10 text-white/20 hover:text-white transition-all disabled:opacity-20 border-gradient">
                       <ChevronLeft className="w-5 h-5" />
                    </Button>
                    <Button variant="outline" size="icon" className="h-10 w-10 rounded-xl bg-white/5 border-white/10 text-white/20 hover:text-white transition-all border-gradient">
                       <ChevronRight className="w-5 h-5" />
                    </Button>
                 </div>
              </div>
           </div>
        </Card>
      </motion.div>

      {/* Manual Alert Dialog */}
      <Dialog open={isManualDialogOpen} onOpenChange={setIsManualDialogOpen}>
        <DialogContent className="max-w-xl glass-morphic border-white/10 text-white rounded-[3rem] p-10 outline-none">
          <DialogHeader className="mb-8">
            <div className="flex items-center gap-4 mb-4">
               <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  <AlertTriangle className="w-6 h-6" />
               </div>
               <DialogTitle className="text-3xl font-bold tracking-tight uppercase">Initialize Incident</DialogTitle>
            </div>
            <DialogDescription className="text-white/30 font-medium">
              Manually trigger a system-wide security alert for administrative forensics.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            <div className="space-y-2.5">
              <Label className="text-[11px] font-bold uppercase tracking-wider text-white/30 ml-1">Incident Title</Label>
              <Input 
                value={manualAlert.title}
                onChange={(e) => setManualAlert({...manualAlert, title: e.target.value})}
                placeholder="e.g. Unauthorized Access Attempt"
                className="h-14 bg-white/5 border-white/5 rounded-2xl px-6 text-white focus:bg-white/10 transition-all placeholder:text-white/10 border-none ring-1 ring-white/5 focus:ring-blue-500/50"
              />
            </div>
            <div className="grid grid-cols-2 gap-6">
               <div className="space-y-2.5">
                  <Label className="text-[11px] font-bold uppercase tracking-wider text-white/30 ml-1">Severity Level</Label>
                  <Select value={manualAlert.level} onValueChange={(v) => setManualAlert({...manualAlert, level: v})}>
                    <SelectTrigger className="h-14 bg-white/5 border-white/5 rounded-2xl px-6 text-white border-none ring-1 ring-white/5 focus:ring-blue-500/50">
                      <SelectValue placeholder="Select Severity" />
                    </SelectTrigger>
                    <SelectContent className="glass-morphic border-white/10 rounded-2xl">
                      <SelectItem value="INFO">INFO</SelectItem>
                      <SelectItem value="LOW">LOW</SelectItem>
                      <SelectItem value="MEDIUM">MEDIUM</SelectItem>
                      <SelectItem value="HIGH">HIGH</SelectItem>
                      <SelectItem value="CRITICAL">CRITICAL</SelectItem>
                    </SelectContent>
                  </Select>
               </div>
               <div className="space-y-2.5">
                  <Label className="text-[11px] font-bold uppercase tracking-wider text-white/30 ml-1">Vector Type</Label>
                  <Input 
                    value={manualAlert.attack_type}
                    onChange={(e) => setManualAlert({...manualAlert, attack_type: e.target.value})}
                    placeholder="DDoS, Brute Force..."
                    className="h-14 bg-white/5 border-white/5 rounded-2xl px-6 text-white border-none ring-1 ring-white/5 focus:ring-blue-500/50"
                  />
               </div>
            </div>
            <div className="space-y-2.5">
              <Label className="text-[11px] font-bold uppercase tracking-wider text-white/30 ml-1">Forensic Intelligence</Label>
              <Input 
                value={manualAlert.message}
                onChange={(e) => setManualAlert({...manualAlert, message: e.target.value})}
                placeholder="Detailed forensic summary..."
                className="h-24 bg-white/5 border-white/5 rounded-2xl px-6 text-white border-none ring-1 ring-white/5 focus:ring-blue-500/50"
              />
            </div>
          </div>

          <DialogFooter className="mt-10 gap-4">
            <Button variant="outline" className="flex-1 h-14 rounded-2xl border-white/10 text-white/40 hover:text-white transition-all font-bold uppercase tracking-wider text-xs" onClick={() => setIsManualDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              className="flex-1 h-14 rounded-2xl bg-blue-600 text-white font-bold hover:bg-blue-500 glow-primary transition-all uppercase tracking-wider text-xs"
              onClick={() => createManualMutation.mutate(manualAlert)}
              disabled={createManualMutation.isPending || !manualAlert.title}
            >
              {createManualMutation.isPending ? "Initializing..." : "Broadcast Incident"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Detail Dialog */}
      <Dialog open={!!selectedAlert} onOpenChange={(open) => !open && setSelectedAlert(null)}>
        <DialogContent className="max-w-2xl glass-morphic border-white/10 text-white rounded-[3rem] p-0 overflow-hidden outline-none shadow-2xl">
          {selectedAlert && (
            <div className="p-12 relative overflow-hidden">
              <div className="absolute inset-0 bg-grid-white opacity-5 pointer-events-none" />
              <div className="relative z-10">
                <DialogHeader className="mb-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className={cn(
                      "font-bold tracking-tight text-[10px] h-6 px-4 flex items-center justify-center uppercase rounded-full border",
                      selectedAlert.level === 'CRITICAL' ? 'bg-red-500/10 text-red-400 border-red-500/20 shadow-lg shadow-red-500/5' : 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                    )}>
                      {selectedAlert.level}
                    </div>
                    <span className="text-[11px] text-white/20 font-semibold tracking-wide">{new Date(selectedAlert.timestamp).toLocaleString()}</span>
                  </div>
                  <DialogTitle className="text-3xl font-bold leading-tight tracking-tight uppercase">
                    {selectedAlert.title || selectedAlert.message}
                  </DialogTitle>
                  <DialogDescription className="text-white/30 font-semibold text-[11px] mt-2 uppercase tracking-wider">
                    Record ID: <span className="text-blue-400">{selectedAlert.id}</span>
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-8 mb-10">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/5 shadow-inner">
                      <div className="text-[11px] text-white/20 uppercase font-bold tracking-wider mb-2">Source Vector</div>
                      <div className="text-lg font-bold text-white tracking-tighter">{selectedAlert.source || "N/A"}</div>
                    </div>
                    <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/5 shadow-inner">
                      <div className="text-[11px] text-white/20 uppercase font-bold tracking-wider mb-2">Detection Engine</div>
                      <div className="text-lg font-bold text-white tracking-tighter">{selectedAlert.detection_method || "Heuristic"}</div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-blue-400">
                      <BrainCircuit className="w-6 h-6 animate-pulse" />
                      <h4 className="text-xs font-bold uppercase tracking-wider">Neural Forensics Analysis</h4>
                    </div>
                    <div className="p-8 rounded-[2rem] bg-blue-500/5 border border-blue-500/10 relative overflow-hidden group">
                      <p className="text-base text-white/60 leading-relaxed italic relative z-10 font-medium">
                        "{selectedAlert.details || selectedAlert.message || "Deep behavioral analysis indicates an anomaly matching exfiltration signatures."}"
                      </p>
                      <BrainCircuit className="absolute -right-6 -bottom-6 w-32 h-32 text-blue-500/5 transition-transform group-hover:scale-110 duration-700" />
                    </div>
                  </div>
                </div>

                <DialogFooter className="gap-4">
                  <Button 
                    variant="outline" 
                    className="flex-1 h-14 rounded-2xl border-white/10 text-white/40 hover:text-red-400 hover:bg-red-500/10 hover:border-red-500/20 transition-all font-bold uppercase tracking-wider text-xs"
                  >
                    Purge Record
                  </Button>
                  {!selectedAlert.read && (
                    <Button 
                      className="flex-1 h-14 rounded-2xl bg-blue-600 text-white font-bold hover:bg-blue-500 glow-primary transition-all uppercase tracking-wider text-xs"
                      onClick={() => {
                        markReadMutation.mutate(selectedAlert.id);
                        setSelectedAlert(null);
                      }}
                    >
                      Resolve Incident
                    </Button>
                  )}
                </DialogFooter>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}

function FilterTab({ label, color, active, onClick }: { label: string, color?: string, active?: boolean, onClick: () => void }) {
  return (
    <Button 
      variant="outline"
      onClick={onClick}
      className={cn(
        "h-12 px-8 rounded-2xl text-[11px] font-bold tracking-wide border transition-all flex items-center gap-4 relative overflow-hidden",
        active 
          ? "bg-blue-600/10 border-blue-500/40 text-blue-400 shadow-xl shadow-blue-500/10" 
          : "bg-white/5 border-white/5 text-white/20 hover:text-white/60 hover:bg-white/[0.08] hover:border-white/10"
      )}
    >
      <span className={cn(active ? color : "")}>{label}</span>
      {active && (
        <motion.div 
          layoutId="filter-pill"
          className="absolute inset-0 bg-blue-500/5 pointer-events-none"
        />
      )}
    </Button>
  );
}
