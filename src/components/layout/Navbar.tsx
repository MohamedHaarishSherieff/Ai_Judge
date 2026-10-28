'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Scale, Gavel, MessageSquare, Video, Info, HelpCircle, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { VideoUnavailableModal } from '@/components/courtroom/VideoUnavailableModal';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '/', icon: Scale },
    { name: 'Chat Courtroom', href: '/text-courtroom', icon: MessageSquare },
    { name: 'Evidence Vault', href: '/evidence', icon: Scale },
    { name: 'How It Works', href: '/how-it-works', icon: HelpCircle },
    { name: 'About', href: '/about', icon: Info },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 legal-glass">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-white p-0.5 shadow-lg shadow-white/5 group-hover:scale-105 transition-transform duration-200">
              <div className="w-full h-full bg-black rounded-[9px] flex items-center justify-center">
                <Gavel className="w-5 h-5 text-white group-hover:rotate-12 transition-transform duration-300" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-black tracking-tight text-white flex items-center gap-2 font-sans">
                AI JUDGE <span className="text-[10px] uppercase font-extrabold px-1.5 py-0.2 bg-white text-black rounded tracking-widest">Bharat Bench</span>
              </span>
              <span className="text-[10px] text-zinc-400 tracking-widest uppercase font-mono font-medium">Virtual Courtroom Platform</span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1.5">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg transition-all ${
                    isActive
                      ? 'bg-zinc-900 text-white border border-zinc-700 shadow-sm'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-900/60'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-zinc-400'}`} />
                  {link.name}
                </Link>
              );
            })}
            
            <button
              onClick={() => setVideoModalOpen(true)}
              className="flex items-center gap-2 px-3.5 py-2 text-sm font-medium rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 transition-colors"
            >
              <Video className="w-4 h-4 text-slate-500" />
              Video Courtroom
            </button>
          </nav>

          {/* Direct CTA - No Login Barrier */}
          <div className="hidden lg:flex items-center gap-3">
            <Link href="/text-courtroom">
              <Button variant="gold" size="sm" icon={<MessageSquare className="w-4 h-4" />}>
                Enter Chat Courtroom
              </Button>
            </Link>
          </div>

          {/* Mobile menu toggle button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-slate-950 border-b border-slate-800 px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top duration-200">
            <div className="space-y-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-2.5 text-base font-medium rounded-lg ${
                      isActive
                        ? 'bg-slate-800 text-amber-400 font-semibold'
                        : 'text-slate-300 hover:bg-slate-900'
                    }`}
                  >
                    <Icon className="w-5 h-5 text-amber-400" />
                    {link.name}
                  </Link>
                );
              })}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setVideoModalOpen(true);
                }}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-base font-medium rounded-lg text-slate-400 hover:bg-slate-900"
              >
                <Video className="w-5 h-5 text-slate-500" />
                Video Courtroom (Not Ready)
              </button>
            </div>

            <div className="pt-4 border-t border-slate-800">
              <Link href="/text-courtroom" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="gold" className="w-full justify-center" icon={<MessageSquare className="w-4 h-4" />}>
                  Enter Chat Courtroom
                </Button>
              </Link>
            </div>
          </div>
        )}
      </header>

      <VideoUnavailableModal isOpen={videoModalOpen} onClose={() => setVideoModalOpen(false)} />
    </>
  );
};
