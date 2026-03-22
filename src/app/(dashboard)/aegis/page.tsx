"use client";

import React, { useState } from "react";
import { Lock, Shield, ShieldCheck, ShieldAlert, Globe, Key, Eye, EyeOff, CheckCircle2, AlertCircle, RefreshCw, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
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

export default function AegisPage() {
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
             <div className="w-2.5 h-2.5 rounded-full bg-green-500 glow-green" />
             <span className="text-[11px] uppercase tracking-wider font-bold text-green-400">Security Environment: Enforced</span>
          </div>
          <h1 className="text-5xl font-bold text-white tracking-tight flex items-baseline gap-4">
            Aegis Protocols <span className="text-green-500/20 text-xl tracking-wide font-bold">Active</span>
          </h1>
          <p className="text-white/40 mt-3 text-sm font-medium max-w-xl">
            Configure and enforce military-grade security equilibrium. Zero-trust architecture is currently monitoring all ingress vectors.
          </p>
        </div>
        <div className="flex items-center gap-4">
           <Badge variant="outline" className="bg-green-500/5 text-green-400 border-green-500/20 py-3 px-6 rounded-2xl gap-3 text-[11px] font-bold border-gradient shadow-lg shadow-green-500/5">
              <ShieldCheck className="w-4 h-4" />
              Infrastructure Protected
           </Badge>
        </div>
      </motion.header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Policy Section */}
        <div className="lg:col-span-8 space-y-8">
          <motion.div variants={itemVariants}>
            <Card className="rounded-[2.5rem] border-white/5 bg-gradient-to-br from-white/[0.03] to-transparent backdrop-blur-xl overflow-hidden p-1 group">
               <CardHeader className="p-10 pb-6">
                  <div className="flex items-center gap-6 mb-2">
                     <div className="p-4 rounded-2xl bg-blue-500/10 text-blue-400 border border-blue-500/20 shadow-xl shadow-blue-500/10 group-hover:scale-110 transition-transform duration-500">
                        <Shield className="w-8 h-8" />
                     </div>
                     <div>
                        <CardTitle className="text-2xl font-bold text-white tracking-tight uppercase">Network Firewall Protocols</CardTitle>
                        <CardDescription className="text-xs text-white/20 font-semibold tracking-wide mt-2">Layer 4-7 Unified Traffic Filtering</CardDescription>
                     </div>
                  </div>
               </CardHeader>
               <CardContent className="px-10 pb-10 space-y-4">
                  <PolicyToggle 
                    title="Aggressive DDoS Mitigation" 
                    description="Automatically scales distributed filters during high-velocity traffic spikes."
                    defaultEnabled
                  />
                  <PolicyToggle 
                    title="Geo-Blocking (High Risk)" 
                    description="Restrict traffic from regions with high historical threat scores."
                  />
                  <PolicyToggle 
                    title="Deep Packet Inspection" 
                    description="Analyze payload content for signature-based malware detection."
                    defaultEnabled
                  />
               </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="rounded-[2.5rem] border-white/5 bg-gradient-to-br from-white/[0.03] to-transparent backdrop-blur-xl overflow-hidden p-1 group">
               <CardHeader className="p-10 pb-6">
                  <div className="flex items-center gap-6 mb-2">
                     <div className="p-4 rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shadow-xl shadow-indigo-500/10 group-hover:scale-110 transition-transform duration-500">
                        <Lock className="w-8 h-8" />
                     </div>
                     <div>
                        <CardTitle className="text-2xl font-bold text-white tracking-tight uppercase">Access Control & RBAC</CardTitle>
                        <CardDescription className="text-xs text-white/20 font-semibold tracking-wide mt-2">Identity Management & Credential Enforcement</CardDescription>
                     </div>
                  </div>
               </CardHeader>
               <CardContent className="px-10 pb-10 space-y-4">
                  <PolicyToggle 
                    title="Multi-Factor Authentication" 
                    description="Enforce hardware-based 2FA for all administrative accounts."
                    defaultEnabled
                  />
                  <PolicyToggle 
                    title="Zero-Trust Architecture" 
                    description="Explicitly verify every request regardless of origin or network."
                    defaultEnabled
                  />
                  <PolicyToggle 
                    title="Automatic Session Expiry" 
                    description="Invalidate tokens after 30 minutes of inactivity."
                  />
               </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Security Summary Sidebar */}
        <div className="lg:col-span-4 space-y-8">
           <motion.div variants={itemVariants}>
              <Card className="rounded-[2.5rem] border-white/5 bg-gradient-to-br from-white/[0.03] to-transparent backdrop-blur-xl overflow-hidden relative group">
                 <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-400" />
                 <CardHeader className="p-8">
                    <CardTitle className="text-[11px] font-bold text-white uppercase tracking-widest">Security Posture Matrix</CardTitle>
                 </CardHeader>
                 <CardContent className="p-8 pt-0 space-y-8">
                    <div className="grid grid-cols-2 gap-4">
                       <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5">
                          <span className="text-[10px] text-white/20 uppercase font-bold tracking-wider block mb-2">Status</span>
                          <Badge variant="secondary" className="bg-blue-500/10 text-blue-400 border-blue-500/20 text-[10px] px-3 py-1 font-bold">ENFORCED</Badge>
                       </div>
                       <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5">
                          <span className="text-[10px] text-white/20 uppercase font-bold tracking-wider block mb-2">Last Audit</span>
                          <span className="text-xs font-bold text-white/60">2026-03-19</span>
                       </div>
                    </div>

                    <div className="space-y-8 pt-4">
                       <SecurityScoreItem label="Encryption Strength" score={100} color="bg-blue-500" />
                       <SecurityScoreItem label="Network Integrity" score={92} color="bg-indigo-500" />
                       <SecurityScoreItem label="Identity Validation" score={85} color="bg-blue-400" />
                    </div>
                 </CardContent>
                 <CardFooter className="px-8 pb-10">
                    <Button className="w-full h-14 bg-blue-600 text-white hover:bg-blue-500 text-[11px] font-bold uppercase tracking-wider rounded-2xl glow-primary transition-all">
                       Initialize Security Audit
                    </Button>
                 </CardFooter>
              </Card>
           </motion.div>

           <motion.div variants={itemVariants}>
              <Card className="rounded-[2.5rem] border-white/5 bg-gradient-to-br from-white/[0.03] to-transparent backdrop-blur-xl p-8 overflow-hidden">
                 <CardTitle className="text-[11px] font-bold text-white uppercase tracking-widest mb-8">Rapid Response Commands</CardTitle>
                 <CardContent className="p-0">
                    <div className="grid grid-cols-2 gap-4">
                       <QuickActionButton icon={<ShieldAlert />} label="Lockdown" variant="red" />
                       <QuickActionButton icon={<Globe />} label="Rotate Keys" variant="blue" />
                       <QuickActionButton icon={<Key />} label="Audit Log" variant="indigo" />
                       <QuickActionButton icon={<ShieldCheck />} label="Validate" variant="cyan" />
                    </div>
                 </CardContent>
              </Card>
           </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

function PolicyToggle({ title, description, defaultEnabled = false }: { title: string, description: string, defaultEnabled?: boolean }) {
  const [enabled, setEnabled] = useState(defaultEnabled);

  return (
    <div className="flex items-center justify-between p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-white/10 transition-all group">
      <div className="space-y-2">
        <h4 className="text-base font-bold text-white tracking-tight group-hover:text-blue-400 transition-colors">{title}</h4>
        <p className="text-xs text-white/30 max-w-sm font-medium leading-relaxed">{description}</p>
      </div>
      <Switch 
        checked={enabled}
        onCheckedChange={setEnabled}
        className="data-[state=checked]:bg-blue-600"
      />
    </div>
  );
}

function SecurityScoreItem({ label, score, color }: { label: string, score: number, color: string }) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider">
        <span className="text-white/20">{label}</span>
        <span className="text-white">{score}%</span>
      </div>
      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden p-[1px]">
         <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${score}%` }}
            transition={{ duration: 1.5, ease: "circOut" }}
            className={cn("h-full rounded-full", color)} 
         />
      </div>
    </div>
  );
}

function QuickActionButton({ icon, label, variant }: { icon: React.ReactNode, label: string, variant: 'red' | 'blue' | 'indigo' | 'cyan' }) {
  const variants = {
    red: "text-red-400 bg-red-500/5 border-red-500/10 hover:bg-red-500/10 hover:border-red-500/20",
    blue: "text-blue-400 bg-blue-500/5 border-blue-500/10 hover:bg-blue-500/10 hover:border-blue-500/20",
    indigo: "text-indigo-400 bg-indigo-500/5 border-indigo-500/10 hover:bg-indigo-500/10 hover:border-indigo-500/20",
    cyan: "text-cyan-400 bg-cyan-500/5 border-cyan-500/10 hover:bg-cyan-500/10 hover:border-cyan-500/20"
  };

  return (
    <Button variant="outline" className={cn(
      "flex flex-col items-center justify-center h-auto py-6 rounded-2xl border transition-all text-[10px] font-bold uppercase tracking-wider gap-4",
      variants[variant]
    )}>
      <div className="p-3 rounded-xl bg-current/10 group-hover:scale-110 transition-transform">
        {React.isValidElement(icon) && React.cloneElement(icon as React.ReactElement<{ className?: string }>, { 
          className: cn("w-6 h-6", (icon.props as any)?.className) 
        })}
      </div>
      {label}
    </Button>
  );
}
