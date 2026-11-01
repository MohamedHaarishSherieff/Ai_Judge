'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Gavel, UserPlus, Scale } from 'lucide-react';

export default function SignupPage() {
  const router = useRouter();
  const [role, setRole] = useState<'Lawyer' | 'Client' | 'Observer'>('Lawyer');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [barId, setBarId] = useState('');

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col bg-black text-zinc-100">
      <Navbar />

      <main className="flex-1 flex items-center justify-center p-6 my-8">
        <Card variant="court" className="w-full max-w-md p-8 space-y-6 border-zinc-800 shadow-2xl">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-700 flex items-center justify-center text-white mx-auto">
              <Scale className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold text-white">Create Virtual Court Account</h1>
            <p className="text-xs text-zinc-400">Join the AI Judge platform for digital courtroom proceedings.</p>
          </div>

          <form onSubmit={handleSignup} className="space-y-4 text-xs sm:text-sm">
            <div>
              <label className="block text-zinc-300 font-semibold mb-1.5">Select Role</label>
              <div className="grid grid-cols-3 gap-2 bg-zinc-950 p-1.5 rounded-lg border border-zinc-800 text-xs font-semibold">
                {(['Lawyer', 'Client', 'Observer'] as const).map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRole(r)}
                    className={`py-2 rounded-md transition-all ${
                      role === r
                        ? 'bg-white text-black font-extrabold shadow'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-zinc-300 font-semibold mb-1">Full Legal Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Adv. Rajesh Sharma"
                className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-3.5 py-2.5 text-zinc-100 focus:border-white focus:outline-none"
              />
            </div>

            {role === 'Lawyer' && (
              <div>
                <label className="block text-zinc-300 font-semibold mb-1">State Bar Council Reg Number</label>
                <input
                  type="text"
                  required
                  value={barId}
                  onChange={(e) => setBarId(e.target.value)}
                  placeholder="e.g. D/4829/2012"
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-3.5 py-2.5 text-zinc-100 focus:border-white focus:outline-none font-mono"
                />
              </div>
            )}

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

            <div>
              <label className="block text-zinc-300 font-semibold mb-1">Create Password</label>
              <input
                type="password"
                required
                placeholder="••••••••••••"
                className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-3.5 py-2.5 text-zinc-100 focus:border-white focus:outline-none"
              />
            </div>

            <Button type="submit" variant="primary" size="lg" className="w-full" icon={<UserPlus className="w-4 h-4" />}>
              Create Account
            </Button>
          </form>

          <div className="text-center text-xs text-zinc-400 pt-2 border-t border-zinc-800">
            Already have an account?{' '}
            <Link href="/login" className="text-white font-semibold hover:underline">
              Login
            </Link>
          </div>
        </Card>
      </main>

      <Footer />
    </div>
  );
}
