"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Shield, Menu, LayoutDashboard, LogOut } from "lucide-react";
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
  { name: "Features", href: "#features" },
  { name: "Infrastructure", href: "#infrastructure" },
  { name: "Architecture", href: "#architecture" },
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
        scrolled ? "bg-black/60 backdrop-blur-2xl py-4 border-b border-white/5" : "bg-transparent"
      )}
    >
      <div className="max-w-[1400px] mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-[0.5rem] bg-white flex items-center justify-center transition-all group-hover:opacity-80">
            <Shield className="w-5 h-5 text-black" strokeWidth={2} />
          </div>
          <span className="text-lg font-semibold tracking-tight text-white/90">
            Stasis
          </span>
        </Link>

        {/* Desktop Nav - Centered */}
        <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-[13px] font-medium text-white/50 hover:text-white transition-colors duration-300"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Action Icons & Auth */}
        <div className="hidden md:flex items-center gap-6">
          {!isAuthenticated ? (
            <Button asChild className="bg-white text-black hover:bg-white/90 font-semibold px-5 h-9 rounded-full transition-all text-[12px] shadow-sm">
              <Link href="/signup">Start Experience</Link>
            </Button>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/nexus">
                <Button variant="ghost" className="text-white/50 hover:text-white gap-2 h-9 text-[12px] font-medium transition-colors">
                  <LayoutDashboard className="w-4 h-4" strokeWidth={1.5} />
                  Nexus
                </Button>
              </Link>
              <Button
                onClick={logout}
                variant="ghost"
                className="text-red-400/30 hover:text-red-400 h-9 px-2 transition-colors"
              >
                <LogOut className="w-4 h-4" strokeWidth={1.5} />
              </Button>
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white/70 hover:bg-white/5 rounded-xl">
                <Menu className="w-6 h-6" strokeWidth={1.5} />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-black/95 backdrop-blur-2xl border-white/5 p-8 w-[300px]">
              <SheetHeader className="mb-12 text-left">
                <SheetTitle className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-[0.5rem] bg-white flex items-center justify-center">
                    <Shield className="w-5 h-5 text-black" strokeWidth={2} />
                  </div>
                  <span className="text-lg font-semibold tracking-tight text-white/90">Stasis</span>
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-sm font-medium text-white/50 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
                
                <div className="pt-8 flex flex-col gap-4 border-t border-white/5">
                  {!isAuthenticated ? (
                    <Button asChild className="w-full h-11 rounded-full bg-white text-black font-semibold text-sm">
                      <Link href="/signup">Start Experience</Link>
                    </Button>
                  ) : (
                    <Button
                      onClick={logout}
                      variant="outline"
                      className="w-full h-11 rounded-full border-red-500/20 text-red-400/80 font-medium text-sm"
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
