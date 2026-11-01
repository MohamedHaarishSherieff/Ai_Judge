'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { KeyRound, ArrowLeft, CheckCircle2 } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#090d16] text-slate-100">
      <Navbar />

      <main className="flex-1 flex items-center justify-center p-6 my-8">
        <Card variant="court" className="w-full max-w-md p-8 space-y-6 border-zinc-800 shadow-2xl">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-700 flex items-center justify-center text-white mx-auto">
              <KeyRound className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold text-white">Reset Credentials</h1>
            <p className="text-xs text-zinc-400">Enter your registered email to receive a password reset link.</p>
          </div>

          {sent ? (
            <div className="p-4 bg-zinc-900 border border-zinc-700 rounded-xl text-center space-y-2 text-xs">
              <CheckCircle2 className="w-8 h-8 text-white mx-auto" />
              <div className="font-bold text-white">Reset Link Dispatched</div>
              <p className="text-zinc-300">Check your inbox for instructions to reset your legal credentials.</p>
              <Link href="/login" className="inline-block pt-2 text-white hover:underline font-semibold">
                Return to Login
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block text-zinc-300 font-semibold mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@barcouncil.org"
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-3.5 py-2.5 text-zinc-100 focus:border-white focus:outline-none"
                />
              </div>

              <Button type="submit" variant="primary" size="lg" className="w-full">
                Send Reset Link
              </Button>
            </form>
          )}

          <div className="text-center text-xs text-slate-400 pt-2 border-t border-slate-800">
            <Link href="/login" className="text-slate-400 hover:text-white flex items-center justify-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Login
            </Link>
          </div>
        </Card>
      </main>

      <Footer />
    </div>
  );
}
