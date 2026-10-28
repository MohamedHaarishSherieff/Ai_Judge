'use client';

import React, { useState } from 'react';
import { Mic, MicOff, Camera, CameraOff, Monitor, Upload, MessageSquare, PhoneOff, Settings, Shield } from 'lucide-react';
import Link from 'next/link';

interface CourtroomControlsProps {
  onToggleChat?: () => void;
  onUploadDoc?: () => void;
  isChatOpen?: boolean;
}

export const CourtroomControls: React.FC<CourtroomControlsProps> = ({
  onToggleChat,
  onUploadDoc,
  isChatOpen = true,
}) => {
  const [micOn, setMicOn] = useState(true);
  const [cameraOn, setCameraOn] = useState(true);
  const [screenSharing, setScreenSharing] = useState(false);

  return (
    <div className="w-full bg-slate-950 border-t border-slate-800 px-6 py-3 flex items-center justify-between gap-4">
      {/* Left Info Tag */}
      <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400 font-mono">
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
        <span>Virtual Session #03 • Encrypted Stream</span>
      </div>

      {/* Center Action Controls */}
      <div className="flex items-center gap-3 mx-auto sm:mx-0">
        {/* Mic Toggle */}
        <button
          onClick={() => setMicOn(!micOn)}
          className={`p-3 rounded-xl border transition-all ${
            micOn
              ? 'bg-slate-900 border-slate-700 text-slate-200 hover:bg-slate-800'
              : 'bg-red-950/80 border-red-700 text-red-300 hover:bg-red-900'
          }`}
          title={micOn ? 'Mute Microphone' : 'Unmute Microphone'}
        >
          {micOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5 text-red-400" />}
        </button>

        {/* Camera Toggle */}
        <button
          onClick={() => setCameraOn(!cameraOn)}
          className={`p-3 rounded-xl border transition-all ${
            cameraOn
              ? 'bg-slate-900 border-slate-700 text-slate-200 hover:bg-slate-800'
              : 'bg-red-950/80 border-red-700 text-red-300 hover:bg-red-900'
          }`}
          title={cameraOn ? 'Turn Off Camera' : 'Turn On Camera'}
        >
          {cameraOn ? <Camera className="w-5 h-5" /> : <CameraOff className="w-5 h-5 text-red-400" />}
        </button>

        {/* Screen Share */}
        <button
          onClick={() => setScreenSharing(!screenSharing)}
          className={`p-3 rounded-xl border transition-all ${
            screenSharing
              ? 'bg-amber-950/80 border-amber-500 text-amber-300'
              : 'bg-slate-900 border-slate-700 text-slate-200 hover:bg-slate-800'
          }`}
          title="Share Screen / Evidence Presentation"
        >
          <Monitor className="w-5 h-5" />
        </button>

        {/* Upload Document */}
        <button
          onClick={onUploadDoc}
          className="p-3 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 hover:bg-slate-800 hover:text-amber-400 transition-all"
          title="Upload Legal Document / Affidavit"
        >
          <Upload className="w-5 h-5" />
        </button>

        {/* Chat Drawer Toggle */}
        <button
          onClick={onToggleChat}
          className={`p-3 rounded-xl border transition-all ${
            isChatOpen
              ? 'bg-blue-900/60 border-blue-600 text-blue-300'
              : 'bg-slate-900 border-slate-700 text-slate-200 hover:bg-slate-800'
          }`}
          title="Toggle Courtroom Chat Transcript"
        >
          <MessageSquare className="w-5 h-5" />
        </button>

        {/* Leave Courtroom */}
        <Link href="/cases">
          <button
            className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-600/90 hover:bg-red-600 text-white font-medium text-sm transition-all shadow-md shadow-red-950/40"
            title="Exit Virtual Courtroom Session"
          >
            <PhoneOff className="w-5 h-5" />
            <span className="hidden sm:inline">Leave Court</span>
          </button>
        </Link>
      </div>

      {/* Right placeholder */}
      <div className="hidden md:flex items-center gap-2 text-xs text-amber-400 font-medium">
        <Shield className="w-4 h-4" />
        <span>Court Registry Verified</span>
      </div>
    </div>
  );
};
