import GlobeHero from "@/components/GlobeHero";
import Navbar from "@/components/Navbar";
import { Shield, Activity, Lock, Globe, Zap, Database, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-slate-950">
      <Navbar />
      <GlobeHero />
      
      {/* Section 2: The Core Ecosystem (Bento Grid) */}
      <section id="features" className="py-24 px-6 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-syne font-bold text-white mb-6">
              The Architecture of <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                Digital Sovereignty
              </span>
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg">
              Stasis is not just a tool; it's an unbreakable equilibrium for your global infrastructure. 
              Explore the modules that make us the standard in proactive defense.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[240px]">
            {/* Real-time Visualization */}
            <div className="md:col-span-8 glass rounded-3xl p-8 border-white/5 relative group overflow-hidden">
               <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Globe className="w-32 h-32 text-cyan-400" />
               </div>
               <div className="relative z-10 flex flex-col h-full">
                  <div className="flex items-center gap-3 mb-4">
                     <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
                        <Globe className="w-5 h-5" />
                     </div>
                     <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">Visual Intelligence</span>
                  </div>
                  <h3 className="text-2xl font-syne font-bold text-white mb-4">Real-time Global Visualization</h3>
                  <p className="text-slate-400 max-w-md">
                     Experience your infrastructure through high-fidelity 3D telemetry. 
                     Every packet, every threat, every node—visualized in a single, unified command center.
                  </p>
                  <div className="mt-auto flex items-center gap-2 text-sm font-bold text-white cursor-pointer group/link">
                     Explore Nexus <ArrowUpRight className="w-4 h-4 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                  </div>
               </div>
            </div>

            {/* AI Mitigation */}
            <div className="md:col-span-4 glass rounded-3xl p-8 border-white/5 bg-gradient-to-br from-blue-500/5 to-transparent flex flex-col justify-between">
               <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                     <Zap className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono font-bold text-blue-400 uppercase tracking-widest">AI Core</span>
               </div>
               <div>
                  <h3 className="text-xl font-syne font-bold text-white mb-2">Proactive Mitigation</h3>
                  <p className="text-sm text-slate-400">
                     Neural networks trained on 100PB+ of attack data automatically identify and neutralize zero-day threats.
                  </p>
               </div>
            </div>

            {/* Compliance */}
            <div className="md:col-span-4 glass rounded-3xl p-8 border-white/5 flex flex-col justify-between">
               <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-slate-500/10 text-slate-400">
                     <Database className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest">Audit Engine</span>
               </div>
               <div>
                  <h3 className="text-xl font-syne font-bold text-white mb-2">Immutable Archiving</h3>
                  <p className="text-sm text-slate-400">
                     Every event is cryptographically signed and stored in our distributed ledger for perfect compliance and forensics.
                  </p>
               </div>
            </div>

            {/* Security Policies */}
            <div className="md:col-span-8 glass rounded-3xl p-8 border-white/5 relative overflow-hidden flex flex-col">
               <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
                     <Shield className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">Control Plane</span>
               </div>
               <div className="flex-1 flex flex-col md:flex-row gap-8">
                  <div className="flex-1">
                     <h3 className="text-2xl font-syne font-bold text-white mb-4">Granular Aegis Policies</h3>
                     <p className="text-slate-400">
                        Deploy complex firewall rules, RBAC settings, and encryption protocols across your entire fleet with a single toggle.
                     </p>
                  </div>
                  <div className="flex-1 grid grid-cols-2 gap-3">
                     <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                        <span className="text-[10px] font-bold text-slate-300 uppercase tracking-tighter">Zero-Trust</span>
                     </div>
                     <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                        <span className="text-[10px] font-bold text-slate-300 uppercase tracking-tighter">MFA-Enforced</span>
                     </div>
                     <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                        <span className="text-[10px] font-bold text-slate-300 uppercase tracking-tighter">DDoS-Proof</span>
                     </div>
                     <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                        <span className="text-[10px] font-bold text-slate-300 uppercase tracking-tighter">FIPS-Ready</span>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Global Infrastructure Marquee */}
      <section id="infrastructure" className="py-24 border-y border-white/5 bg-slate-900/50">
         <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-12">
               <div className="flex-1">
                  <h2 className="text-3xl md:text-5xl font-syne font-bold text-white mb-6">Global Distributed Nodes</h2>
                  <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                     Our infrastructure spans 48 regions with over 48,000 edge nodes. 
                     No matter where your users are, the Equilibrium is always within 10ms.
                  </p>
                  <div className="grid grid-cols-2 gap-6">
                     <div>
                        <div className="text-3xl font-bold text-cyan-400 font-mono">100+</div>
                        <div className="text-xs text-slate-500 font-mono uppercase tracking-widest mt-1">PoP Locations</div>
                     </div>
                     <div>
                        <div className="text-3xl font-bold text-cyan-400 font-mono">99.999%</div>
                        <div className="text-xs text-slate-500 font-mono uppercase tracking-widest mt-1">Target Uptime</div>
                     </div>
                  </div>
               </div>
               <div className="flex-1 relative">
                  <div className="aspect-square rounded-3xl glass border-white/5 overflow-hidden flex items-center justify-center p-8">
                     <div className="w-full h-full rounded-2xl bg-slate-950/50 border border-white/10 relative overflow-hidden">
                        {/* Mock Infrastructure Visualization */}
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.05)_0%,transparent_100%)]" />
                        <div className="p-6">
                           <div className="text-[10px] font-mono text-cyan-400 mb-4 animate-pulse">CONNECTING_TO_CORE_NODES...</div>
                           <div className="space-y-3">
                              {[...Array(5)].map((_, i) => (
                                 <div key={i} className="flex items-center justify-between text-[10px] font-mono text-slate-500">
                                    <span>NODE_0{i+1}_LONDON_UK</span>
                                    <span className="text-cyan-400">ONLINE</span>
                                 </div>
                              ))}
                           </div>
                        </div>
                     </div>
                  </div>
                  {/* Decorative Glow */}
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-cyan-500/20 blur-[80px] rounded-full" />
               </div>
            </div>
         </div>
      </section>

      {/* Footer-ish CTA */}
      <section className="py-24 px-6 text-center">
         <h2 className="text-3xl md:text-5xl font-syne font-bold text-white mb-8">
            Ready to secure your future?
         </h2>
         <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="px-10 py-5 rounded-2xl bg-cyan-500 text-slate-950 font-bold text-lg hover:scale-105 transition-transform glow-cyan">
               Get Started Now
            </button>
            <button className="px-10 py-5 rounded-2xl glass text-white font-bold text-lg hover:bg-white/10 transition-transform">
               Contact Sales
            </button>
         </div>
      </section>

      <footer className="py-12 border-t border-white/5 text-center px-6">
         <div className="flex items-center justify-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-lg bg-cyan-500 flex items-center justify-center">
               <Shield className="w-5 h-5 text-slate-950" />
            </div>
            <span className="text-xl font-syne font-bold text-white tracking-tighter">STASIS</span>
         </div>
         <p className="text-slate-600 text-sm font-mono uppercase tracking-widest">
            © 2026 STASIS CORE INFRASTRUCTURE. ALL RIGHTS RESERVED.
         </p>
      </footer>
    </main>
  );
}
