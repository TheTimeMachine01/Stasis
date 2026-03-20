"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Shield, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "#about" },
  { name: "Features", href: "#features" },
  { name: "Infrastructure", href: "#infrastructure" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
        scrolled ? "bg-slate-950/80 backdrop-blur-md border-b border-white/10 py-3" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-cyan-500 flex items-center justify-center glow-cyan transition-transform group-hover:scale-110">
            <Shield className="w-6 h-6 text-slate-950" strokeWidth={2.5} />
          </div>
          <span className="text-2xl font-syne font-bold tracking-tighter text-white">
            STASIS
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-slate-400 hover:text-cyan-400 transition-colors uppercase tracking-widest font-mono"
            >
              {link.name}
            </Link>
          ))}
          {isAuthenticated && (
            <Link
              href="/nexus"
              className="text-sm font-bold text-cyan-400 hover:text-cyan-300 transition-colors uppercase tracking-widest font-mono"
            >
              Dashboard
            </Link>
          )}
        </div>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center gap-4">
          {!isAuthenticated ? (
            <>
              <Link
                href="/login"
                className="px-5 py-2 rounded-lg text-sm font-semibold text-white hover:bg-white/5 transition-colors"
              >
                Log In
              </Link>
              <Link
                href="/signup"
                className="px-5 py-2 rounded-lg bg-white text-slate-950 text-sm font-bold transition-all hover:scale-105"
              >
                Join the Equilibrium
              </Link>
            </>
          ) : (
            <button
              onClick={logout}
              className="px-5 py-2 rounded-lg border border-red-500/30 text-red-400 text-sm font-bold transition-all hover:bg-red-500/10"
            >
              Terminate Session
            </button>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 text-white hover:bg-white/5 rounded-lg transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-slate-900 border-b border-white/10 p-6 md:hidden glass-dark shadow-2xl"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-lg font-syne font-bold text-white flex items-center justify-between"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                  <ChevronRight className="w-5 h-5 text-cyan-400" />
                </Link>
              ))}
              {isAuthenticated && (
                <Link
                  href="/nexus"
                  className="text-lg font-syne font-bold text-cyan-400 flex items-center justify-between"
                  onClick={() => setIsOpen(false)}
                >
                  Dashboard
                  <ChevronRight className="w-5 h-5 text-cyan-400" />
                </Link>
              )}
              <hr className="border-white/10" />
              <div className="flex flex-col gap-4">
                {!isAuthenticated ? (
                  <>
                    <Link
                      href="/login"
                      className="w-full py-3 text-center font-bold text-white border border-white/10 rounded-xl"
                      onClick={() => setIsOpen(false)}
                    >
                      Log In
                    </Link>
                    <Link
                      href="/signup"
                      className="w-full py-3 text-center font-bold bg-cyan-500 text-slate-950 rounded-xl"
                      onClick={() => setIsOpen(false)}
                    >
                      Join the Equilibrium
                    </Link>
                  </>
                ) : (
                  <button
                    onClick={() => {
                      logout();
                      setIsOpen(false);
                    }}
                    className="w-full py-3 text-center font-bold border border-red-500/30 text-red-400 rounded-xl"
                  >
                    Terminate Session
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
