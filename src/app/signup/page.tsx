"use client";

import React, { useState } from "react";
import { Shield, ArrowRight, Loader2, AlertCircle } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function SignupPage() {
  const { signup, isLoading, error: authError } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError("");

    if (!name || !email || !password) {
      setLocalError("Please fill in all fields.");
      return;
    }

    if (password.length < 8) {
      setLocalError("Password must be at least 8 characters.");
      return;
    }

    try {
      await signup({ name, email, password });
    } catch (err) {
      // Error handled in AuthContext
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6 relative overflow-hidden font-sans">
      {/* Background Effect */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.08)_0%,transparent_70%)]" />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md relative z-10"
      >
        <Card className="rounded-[2.5rem] border-white/5 bg-white/[0.02] backdrop-blur-2xl p-6 shadow-2xl overflow-hidden relative">
          {/* Subtle top glow */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent-blue/30 to-transparent" />
          
          <CardHeader className="flex flex-col items-center space-y-6 pb-10">
            <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center shadow-2xl">
              <Shield className="w-10 h-10 text-black" />
            </div>
            <div className="text-center space-y-2">
              <CardTitle className="text-3xl font-bold text-white tracking-tight">Join the Equilibrium</CardTitle>
              <CardDescription className="text-white/30 text-[10px] uppercase tracking-[0.2em] font-bold">Request Vanguard Credentials</CardDescription>
            </div>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              {(localError || authError) && (
                <Alert variant="destructive" className="bg-red-500/10 border-red-500/20 text-red-400 rounded-2xl">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription className="text-xs font-bold">{localError || authError}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2.5">
                <Label htmlFor="name" className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] ml-1">Full Designation</Label>
                <Input 
                  id="name"
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  disabled={isLoading}
                  className="h-14 bg-white/5 border-white/5 rounded-2xl px-6 text-white focus:bg-white/10 transition-all placeholder:text-white/10 border-none ring-1 ring-white/5 focus:ring-accent-blue/50"
                />
              </div>
              <div className="space-y-2.5">
                <Label htmlFor="email" className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] ml-1">Access Key</Label>
                <Input 
                  id="email"
                  type="email" 
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="j.doe@vanguard.sec"
                  disabled={isLoading}
                  className="h-14 bg-white/5 border-white/5 rounded-2xl px-6 text-white focus:bg-white/10 transition-all placeholder:text-white/10 border-none ring-1 ring-white/5 focus:ring-accent-blue/50"
                />
              </div>
              <div className="space-y-2.5">
                <Label htmlFor="pass" className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] ml-1">Initialize Cipher</Label>
                <Input 
                  id="pass"
                  type="password" 
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  disabled={isLoading}
                  className="h-14 bg-white/5 border-white/5 rounded-2xl px-6 text-white focus:bg-white/10 transition-all placeholder:text-white/10 border-none ring-1 ring-white/5 focus:ring-accent-blue/50"
                />
              </div>
              <Button 
                type="submit"
                disabled={isLoading}
                className="w-full h-14 bg-white text-black font-bold rounded-full flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all mt-6 shadow-xl"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    Create Credentials
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </Button>
            </form>
          </CardContent>

          <CardFooter className="flex justify-center pt-4 pb-8">
            <p className="text-white/30 text-xs font-medium">
              Already registered? <Link href="/login" className="text-white hover:text-accent-blue transition-colors font-bold underline-offset-4 hover:underline">Authorize Access</Link>
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
