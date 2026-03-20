import type { Metadata } from "next";
import { Geist, JetBrains_Mono, Syne, Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { cn } from "@/lib/utils";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Stasis | Unbreakable Equilibrium",
  description: "High-end, immersive security platform for real-time digital infrastructure defense.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("dark", "antialiased", geistSans.variable, syne.variable, jetbrainsMono.variable, "font-sans", inter.variable)}
    >
      <body className="bg-slate-950 text-slate-50 min-h-screen selection:bg-cyan-500/30">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
