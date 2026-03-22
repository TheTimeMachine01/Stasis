"use client";

import GlobeHero from "@/components/GlobeHero";
import Navbar from "@/components/Navbar";
import { Shield, Activity, Lock, Globe, Zap, Database, ArrowUpRight, CheckCircle2, ChevronRight, Server, Globe2, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { motion } from "framer-motion";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
};

const staggerContainer = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.1 } },
  viewport: { once: true }
};

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col selection:bg-accent-blue/30 font-sans bg-transparent">
      <Navbar />
      <GlobeHero />
      
      {/* Section 2: The Core Ecosystem (Bento Grid) */}
      <section id="features" className="py-48 px-6 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
        
        <div className="max-w-7xl mx-auto">
          <motion.div 
            {...staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="text-center mb-32"
            id="architecture"
          >
            <motion.div 
              variants={fadeInUp}
              className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full border border-blue-500/20 glass-dark text-[10px] font-semibold tracking-wide text-blue-400/80"
            >
               Platform Architecture
            </motion.div>
            <motion.h2 
              variants={fadeInUp}
              className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight"
            >
              The Architecture of <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-400 text-glow-blue">
                Digital Sovereignty
              </span>
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="text-white/40 max-w-2xl mx-auto text-xl leading-relaxed font-medium"
            >
              Stasis is an <span className="text-blue-300/60">unbreakable equilibrium</span> for global infrastructure. 
              Explore the modules defining the standard in proactive defense.
            </motion.p>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-12 gap-8 auto-rows-[320px]"
          >
            {/* Real-time Visualization */}
            <motion.div variants={fadeInUp} className="md:col-span-8 h-full">
              <Card className="h-full rounded-[2.5rem] border-white/5 bg-gradient-to-br from-blue-500/[0.03] to-white/[0.01] backdrop-blur-sm relative group overflow-hidden shadow-2xl transition-all duration-500 hover:border-blue-500/20">
                 <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:opacity-10 transition-opacity">
                    <Globe2 className="w-64 h-64 text-blue-400" />
                 </div>
                 <CardContent className="relative z-10 flex flex-col h-full p-12">
                    <div className="flex items-center gap-3 mb-6">
                       <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 shadow-lg shadow-blue-500/10">
                          <Globe className="w-5 h-5" />
                       </div>
                       <span className="text-[10px] font-semibold text-blue-400 tracking-wide">Visual Intelligence</span>
                    </div>
                    <CardTitle className="text-3xl font-bold text-white mb-4 tracking-tight">Real-time <span className="text-blue-400/80">Global</span> Visualization</CardTitle>
                    <CardDescription className="text-white/40 max-w-md text-base leading-relaxed font-medium">
                       Experience your infrastructure through <span className="text-indigo-300/40">high-fidelity 3D telemetry</span>. 
                       Every packet, every threat, every node—visualized in a single, unified command center.
                    </CardDescription>
                    <div className="mt-auto">
                       <Button variant="link" className="p-0 h-auto text-blue-400 hover:text-white font-semibold tracking-wide text-[10px] gap-2 group/link">
                          Explore Nexus <ArrowUpRight className="w-4 h-4 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                       </Button>
                    </div>
                 </CardContent>
              </Card>
            </motion.div>

            {/* AI Mitigation */}
            <motion.div variants={fadeInUp} className="md:col-span-4 h-full">
              <Card className="h-full rounded-[2.5rem] border-blue-500/10 bg-gradient-to-br from-indigo-500/[0.05] via-white/[0.02] to-transparent flex flex-col shadow-2xl group transition-all duration-500 hover:border-indigo-500/30">
                 <CardContent className="p-12 flex flex-col h-full">
                    <div className="flex items-center gap-3 mb-auto">
                       <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                          <Zap className="w-5 h-5" />
                       </div>
                       <span className="text-[10px] font-semibold text-indigo-400 tracking-wide">AI Core</span>
                    </div>
                    <div className="mt-8">
                       <CardTitle className="text-2xl font-bold text-white mb-3 tracking-tight group-hover:text-indigo-400 transition-colors">Proactive <span className="text-indigo-400/60">Mitigation</span></CardTitle>
                       <CardDescription className="text-sm text-white/40 leading-relaxed font-medium">
                          Neural networks trained on 100PB+ of attack data automatically identify and <span className="text-indigo-300/30">neutralize threats</span> before they reach your stack.
                       </CardDescription>
                    </div>
                 </CardContent>
              </Card>
            </motion.div>

            {/* Compliance */}
            <motion.div variants={fadeInUp} className="md:col-span-4 h-full">
              <Card className="h-full rounded-[2.5rem] border-white/5 bg-white/[0.02] flex flex-col shadow-2xl group relative overflow-hidden transition-all duration-500 hover:border-cyan-500/20">
                 <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-cyan-500/5 rounded-full blur-3xl" />
                 <CardContent className="p-12 flex flex-col h-full">
                    <div className="flex items-center gap-3 mb-auto">
                       <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                          <Database className="w-5 h-5" />
                       </div>
                       <span className="text-[10px] font-semibold text-cyan-400 tracking-wide">Audit Engine</span>
                    </div>
                    <div className="mt-8">
                       <CardTitle className="text-2xl font-bold text-white mb-3 tracking-tight group-hover:text-cyan-400 transition-colors">Immutable Archiving</CardTitle>
                       <CardDescription className="text-sm text-white/40 leading-relaxed font-medium">
                          Every event is <span className="text-cyan-300/30">cryptographically signed</span> and stored for perfect compliance and digital forensics.
                       </CardDescription>
                    </div>
                 </CardContent>
              </Card>
            </motion.div>

            {/* Security Policies */}
            <motion.div variants={fadeInUp} className="md:col-span-8 h-full">
              <Card className="h-full rounded-[2.5rem] border-white/5 bg-gradient-to-tr from-white/[0.01] via-white/[0.02] to-blue-500/[0.03] relative overflow-hidden shadow-2xl transition-all duration-500 hover:border-blue-400/20">
                 <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.08)_0%,transparent_70%)]" />
                 <CardContent className="p-12 relative z-10 flex flex-col h-full">
                    <div className="flex items-center gap-3 mb-6">
                       <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
                          <Shield className="w-5 h-5" />
                       </div>
                       <span className="text-[10px] font-semibold text-blue-400 tracking-wide">Control Plane</span>
                    </div>
                    <div className="flex-1 flex flex-col md:flex-row gap-10">
                       <div className="flex-1">
                          <CardTitle className="text-3xl font-bold text-white mb-4 tracking-tight">Granular Aegis Policies</CardTitle>
                          <CardDescription className="text-white/40 text-base leading-relaxed font-medium">
                             Deploy <span className="text-blue-300/40">complex firewall rules</span>, RBAC settings, and encryption protocols across your fleet with a single toggle.
                          </CardDescription>
                       </div>
                       <div className="flex-1 grid grid-cols-2 gap-3">
                          <PolicyBadge label="Zero-Trust" color="blue" />
                          <PolicyBadge label="MFA-Enforced" color="indigo" />
                          <PolicyBadge label="DDoS-Proof" color="cyan" />
                          <PolicyBadge label="FIPS-Ready" color="white" />
                       </div>
                    </div>
                 </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Section 3: Global Infrastructure */}
      <section id="infrastructure" className="py-48 border-y border-white/5 bg-white/[0.01] relative">
         <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-24">
               <motion.div 
                 {...staggerContainer}
                 initial="initial"
                 whileInView="whileInView"
                 viewport={{ once: true }}
                 className="flex-1 space-y-10"
               >
                  <motion.div variants={fadeInUp} className="inline-flex items-center px-4 py-1.5 rounded-full border border-indigo-500/20 glass-dark text-[10px] font-semibold tracking-wide text-indigo-400/80">
                     Global Network
                  </motion.div>
                  <motion.h2 variants={fadeInUp} className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-[0.95]">Global <span className="text-indigo-400/80">Distributed</span> Nodes</motion.h2>
                  <motion.p variants={fadeInUp} className="text-white/40 text-xl leading-relaxed font-medium">
                     Our infrastructure spans 48 regions with over <span className="text-indigo-300/60">48,000 edge nodes</span>. 
                     No matter where your users are, the Equilibrium is always within 10ms.
                  </motion.p>
                  <motion.div variants={fadeInUp} className="grid grid-cols-2 gap-12 pt-4">
                     <div className="space-y-3">
                        <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 tracking-tighter">100+</div>
                        <div className="text-[10px] text-white/30 font-semibold tracking-wide">PoP Locations</div>
                     </div>
                     <div className="space-y-3">
                        <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 tracking-tighter">99.9%</div>
                        <div className="text-[10px] text-white/30 font-semibold tracking-wide">Target Uptime</div>
                     </div>
                  </motion.div>
               </motion.div>
               
               <motion.div 
                 initial={{ opacity: 0, scale: 0.95 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 viewport={{ once: true }}
                 transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                 className="flex-1 relative w-full lg:w-auto"
               >
                  <Card className="aspect-square rounded-[3rem] border-white/5 bg-gradient-to-br from-indigo-500/[0.03] to-white/[0.01] p-10 flex items-center justify-center relative overflow-hidden shadow-2xl group transition-all duration-700 hover:border-indigo-500/20">
                     <div className="w-full h-full rounded-[2.5rem] bg-black border border-white/5 relative overflow-hidden">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.08)_0%,transparent_100%)]" />
                        <div className="p-10">
                           <div className="flex items-center gap-3 text-[10px] text-indigo-400 mb-8 animate-pulse font-semibold tracking-wide">
                              <Server className="w-4 h-4" />
                              Connecting to core...
                           </div>
                           <div className="space-y-5">
                              {[...Array(5)].map((_, i) => (
                                 <div key={i} className="flex items-center justify-between text-[10px] text-white/20 group-hover:text-white/40 transition-colors font-bold tracking-wider">
                                    <span className="flex items-center gap-3">
                                       <div className="w-1.5 h-1.5 rounded-full bg-indigo-500/40" />
                                       Node_{i+1}_{['London', 'NYC', 'Tokyo', 'Singapore', 'Berlin'][i]}
                                    </span>
                                    <span className="text-indigo-400">ONLINE</span>
                                 </div>
                              ))}
                           </div>
                        </div>
                     </div>
                     {/* Decorative Glow */}
                     <div className="absolute -top-20 -right-20 w-64 h-64 bg-indigo-500/10 blur-[100px] rounded-full group-hover:bg-indigo-500/20 transition-all duration-700" />
                  </Card>
               </motion.div>
            </div>
         </div>
      </section>

      {/* Footer CTA */}
      <section className="py-48 px-6 text-center relative overflow-hidden bg-radial-glow">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />
         <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 max-w-4xl mx-auto"
         >
            <h2 className="text-5xl md:text-8xl font-bold text-white mb-14 tracking-tight leading-[0.9]">
               Ready to secure <br />your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-400">future?</span>
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
               <Link href="/signup" className="h-16 px-12 rounded-full bg-white text-black font-bold text-lg hover:scale-105 transition-all shadow-2xl flex items-center justify-center gap-3">
                  Start Experience <ArrowRight className="w-5 h-5" />
               </Link>
               <Button variant="ghost" className="h-16 px-12 rounded-full border border-white/10 text-white font-bold text-lg hover:bg-white/5 transition-all">
                  Contact Sales
               </Button>
            </div>
         </motion.div>
      </section>

      <footer className="py-24 border-t border-white/5 text-center px-6 bg-black">
         <div className="max-w-7xl mx-auto">
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex items-center justify-center gap-3 mb-12"
            >
               <div className="w-8 h-8 rounded-[0.5rem] bg-white flex items-center justify-center shadow-lg">
                  <Shield className="w-5 h-5 text-black" strokeWidth={2.5} />
               </div>
               <span className="text-xl font-bold text-white/90 tracking-tight">Stasis</span>
            </motion.div>
            <nav className="flex flex-wrap justify-center gap-x-10 gap-y-4 mb-12">
               {['Compliance', 'Privacy', 'Network Status', 'Terminal', 'Design System'].map(link => (
                  <Link key={link} href="#" className="text-[13px] font-medium text-white/40 hover:text-white transition-colors duration-300">
                     {link}
                  </Link>
               ))}
            </nav>
            <p className="text-white/10 text-[11px] font-medium">
               © 2026 Stasis Core Infrastructure. All rights reserved.
            </p>
         </div>
      </footer>
    </main>
  );
}

function PolicyBadge({ label, color = "blue" }: { label: string, color?: string }) {
   const colorClasses: Record<string, string> = {
      blue: "text-blue-400 bg-blue-500/10 border-blue-500/20",
      indigo: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20",
      cyan: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
      white: "text-white/50 bg-white/5 border-white/10",
   };

   return (
      <div className={cn("p-4 rounded-2xl border flex items-center gap-3 transition-all group/badge hover:scale-[1.02]", colorClasses[color] || colorClasses.blue)}>
         <CheckCircle2 className="w-4 h-4 transition-transform group-hover/badge:scale-110" />
         <span className="text-xs font-semibold tracking-tight">{label}</span>
      </div>
   );
}
