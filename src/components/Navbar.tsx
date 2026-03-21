"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Shield, Code, Bookmark, MoreVertical, Menu, LayoutDashboard, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const navLinks = [
  { name: "Experiments", href: "#experiments" },
  { name: "Case Studies", href: "#cases" },
  { name: "About", href: "#about" },
];

export default function Navbar() {
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
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-8 py-6",
        scrolled ? "bg-black/80 backdrop-blur-xl py-4 shadow-2xl" : "bg-transparent"
      )}
    >
      <div className="max-w-[1600px] mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center transition-all group-hover:scale-105">
            <Shield className="w-5 h-5 text-black" strokeWidth={2.5} />
          </div>
          <span className="text-xl font-bold tracking-tight text-white uppercase">
            STASIS
          </span>
        </Link>

        {/* Desktop Nav - Centered */}
        <div className="hidden md:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-[11px] font-bold text-white/40 hover:text-white transition-colors uppercase tracking-widest"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Action Icons & Auth */}
        <div className="hidden md:flex items-center gap-6">
          <div className="flex items-center gap-4 text-white/40">
            <button className="hover:text-white transition-colors">
              <Code className="w-4 h-4" />
            </button>
            <button className="hover:text-white transition-colors">
              <Bookmark className="w-4 h-4" />
            </button>
            <button className="hover:text-white transition-colors">
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>

          {!isAuthenticated ? (
            <Button asChild className="bg-white text-black hover:bg-white/90 font-bold px-6 h-10 rounded-full transition-all text-[10px] uppercase tracking-widest">
              <Link href="/signup">Start Experience</Link>
            </Button>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/nexus">
                <Button variant="ghost" className="text-white/40 hover:text-white gap-2 h-10 text-[10px] uppercase tracking-widest">
                  <LayoutDashboard className="w-4 h-4" />
                  Nexus
                </Button>
              </Link>
              <Button
                onClick={logout}
                variant="ghost"
                className="text-red-400/40 hover:text-red-400 h-10 p-2"
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/5 rounded-xl">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-black border-white/10 p-8 w-[300px]">
              <SheetHeader className="mb-12 text-left">
                <SheetTitle className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center">
                    <Shield className="w-5 h-5 text-black" />
                  </div>
                  <span className="text-xl font-bold tracking-tight text-white uppercase">STASIS</span>
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-sm font-bold text-white/40 hover:text-white transition-colors uppercase tracking-widest"
                  >
                    {link.name}
                  </Link>
                ))}
                
                <div className="pt-8 flex flex-col gap-4">
                  {!isAuthenticated ? (
                    <Button asChild className="w-full h-12 rounded-full bg-white text-black font-bold uppercase tracking-widest text-xs">
                      <Link href="/signup">Start Experience</Link>
                    </Button>
                  ) : (
                    <Button
                      onClick={logout}
                      variant="outline"
                      className="w-full h-12 rounded-full border-red-500/30 text-red-400 font-bold uppercase tracking-widest text-xs"
                    >
                      Log Out
                    </Button>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
