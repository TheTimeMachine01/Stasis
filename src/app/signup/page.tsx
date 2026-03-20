"use client";

import React from "react";
import { Shield, ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.1)_0%,transparent_70%)]" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass p-8 rounded-3xl w-full max-w-md border-white/5 relative z-10"
      >
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-cyan-500 flex items-center justify-center glow-cyan mb-4">
            <Shield className="w-10 h-10 text-slate-950" />
          </div>
          <h1 className="text-3xl font-syne font-bold text-white">Join the Equilibrium</h1>
          <p className="text-slate-500 font-mono text-xs uppercase tracking-widest mt-2">Become a Guardian of the Infrastructure</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-2">Full Designation (Name)</label>
            <input 
              type="text" 
              placeholder="John Doe"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500/50 transition-colors"
            />
          </div>
          <div>
            <label className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-2">Core Access Key (Email)</label>
            <input 
              type="email" 
              placeholder="j.doe@vanguard.sec"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500/50 transition-colors"
            />
          </div>
          <div>
            <label className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-2">Initialize Cipher (Password)</label>
            <input 
              type="password" 
              placeholder="••••••••"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500/50 transition-colors"
            />
          </div>
          <Link 
            href="/login"
            className="w-full bg-cyan-500 text-slate-950 font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-cyan-400 transition-all glow-cyan mt-6"
          >
            Create Credentials
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <p className="text-center text-slate-500 text-xs mt-8">
          Already registered? <Link href="/login" className="text-cyan-400 hover:underline">Authorize Access</Link>
        </p>
      </motion.div>
    </div>
  );
}
