'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Disclaimer } from '@/components/layout/Disclaimer';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { CURRENT_USER } from '@/data/mockData';
import { User, Settings, Shield, Bell, Moon, Lock, CheckCircle2, Save } from 'lucide-react';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<'profile' | 'account' | 'notifications' | 'appearance' | 'privacy' | 'security'>('profile');
  const [saved, setSaved] = useState(false);

  // Profile Form
  const [name, setName] = useState(CURRENT_USER.name);
  const [email, setEmail] = useState(CURRENT_USER.email);
  const [org, setOrg] = useState(CURRENT_USER.organization || '');
  const [barId, setBarId] = useState(CURRENT_USER.barId || '');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#090d16] text-slate-100">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        
        {/* Header */}
        <div className="pb-6 border-b border-slate-800">
          <Badge variant="gold">Chambers System Preferences</Badge>
          <h1 className="text-3xl font-extrabold text-white mt-1">Platform Settings</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Manage your legal profile, bar council verification, notification triggers, and security controls.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Settings Sidebar Tabs */}
          <div className="lg:col-span-3 space-y-1">
            {[
              { id: 'profile', label: 'Profile Settings', icon: User },
              { id: 'account', label: 'Account & Bar ID', icon: Settings },
              { id: 'notifications', label: 'Notifications', icon: Bell },
              { id: 'appearance', label: 'Appearance & Bench Theme', icon: Moon },
              { id: 'privacy', label: 'Privacy Controls', icon: Shield },
              { id: 'security', label: 'Security & 2FA', icon: Lock }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold text-left transition-all ${
                    activeTab === tab.id
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                  }`}
                >
                  <Icon className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Right Main Form Area */}
          <div className="lg:col-span-9">
            <Card variant="court" className="p-8 border-slate-800">
              {saved && (
                <div className="mb-6 p-3 bg-emerald-950/50 border border-emerald-500/40 rounded-xl text-emerald-300 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Settings updated successfully!</span>
                </div>
              )}

              <form onSubmit={handleSave} className="space-y-6 text-xs sm:text-sm">
                
                {activeTab === 'profile' && (
                  <div className="space-y-4">
                    <h3 className="text-base font-bold text-white border-b border-slate-800 pb-3">Legal Profile Details</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-slate-300 font-semibold mb-1">Advocate Full Name</label>
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3.5 py-2.5 text-slate-100 focus:border-amber-500 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-300 font-semibold mb-1">Email Address</label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3.5 py-2.5 text-slate-100 focus:border-amber-500 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-slate-300 font-semibold mb-1">Chambers / Law Firm</label>
                        <input
                          type="text"
                          value={org}
                          onChange={(e) => setOrg(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3.5 py-2.5 text-slate-100 focus:border-amber-500 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-300 font-semibold mb-1">Bar Registration Number</label>
                        <input
                          type="text"
                          value={barId}
                          onChange={(e) => setBarId(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3.5 py-2.5 text-slate-100 focus:border-amber-500 focus:outline-none font-mono"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'notifications' && (
                  <div className="space-y-4">
                    <h3 className="text-base font-bold text-white border-b border-slate-800 pb-3">Hearing & Bench Notifications</h3>
                    <div className="space-y-3 text-xs">
                      {[
                        'Email alerts when AI Presiding Judge opens virtual session',
                        'SMS alerts for Section 63 BSA evidence hash verification',
                        'Appellate High Court stay application updates',
                        'Daily cause list digest'
                      ].map((item, i) => (
                        <label key={i} className="flex items-center gap-3 p-3 bg-slate-950 rounded-lg border border-slate-800 cursor-pointer">
                          <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-amber-500 focus:ring-amber-500 bg-slate-900 border-slate-700" />
                          <span className="text-slate-200">{item}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'appearance' && (
                  <div className="space-y-4">
                    <h3 className="text-base font-bold text-white border-b border-slate-800 pb-3">Appearance & Judicial Theme</h3>
                    <p className="text-slate-300 text-xs">Select preferred contrast mode for virtual courtroom sessions.</p>
                    <div className="grid grid-cols-3 gap-4 text-xs font-bold">
                      <div className="p-4 bg-slate-950 border-2 border-amber-500 rounded-xl text-center text-amber-400">
                        Dark Judicial Navy (Active)
                      </div>
                      <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl text-center text-slate-400 opacity-60">
                        High Contrast Slate
                      </div>
                      <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl text-center text-slate-400 opacity-60">
                        System Preference
                      </div>
                    </div>
                  </div>
                )}

                {(activeTab === 'account' || activeTab === 'privacy' || activeTab === 'security') && (
                  <div className="space-y-4">
                    <h3 className="text-base font-bold text-white border-b border-slate-800 pb-3">Security & Role Access</h3>
                    <p className="text-slate-300 text-xs">
                      Two-factor authentication (2FA) via hardware security key or mobile OTP is enabled for all bar-certified advocate logins.
                    </p>
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs text-emerald-400 font-mono flex items-center justify-between">
                      <span>Status: Hardware 2FA Active</span>
                      <Badge variant="emerald">Verified Advocate</Badge>
                    </div>
                  </div>
                )}

                <div className="pt-4 border-t border-slate-800 flex justify-end">
                  <Button type="submit" variant="gold" icon={<Save className="w-4 h-4" />}>
                    Save System Settings
                  </Button>
                </div>
              </form>
            </Card>
          </div>

        </div>

        <Disclaimer />
      </main>

      <Footer />
    </div>
  );
}
