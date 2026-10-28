'use client';

import React from 'react';
import useRouter from 'next/navigation';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Video, MessageSquare, AlertCircle, Sparkles } from 'lucide-react';
import Link from 'next/link';

interface VideoUnavailableModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VideoUnavailableModal: React.FC<VideoUnavailableModalProps> = ({
  isOpen,
  onClose,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Video Courtroom — Feature Notice" maxWidth="md">
      <div className="text-center space-y-5 py-2">
        <div className="w-14 h-14 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 mx-auto">
          <Video className="w-7 h-7" />
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-bold text-white">Video Courtroom Is Not Ready Yet</h3>
          <p className="text-xs text-slate-300 leading-relaxed max-w-sm mx-auto">
            The video & voice courtroom infrastructure is currently under development. Please use the <span className="text-amber-400 font-semibold">Chat Courtroom</span> to present arguments, submit evidence, and interact with the AI Judge.
          </p>
        </div>

        <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-400 flex items-center justify-center gap-2 font-mono">
          <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
          <span>Currently Focusing On: Text / Chat Courtroom</span>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Button variant="ghost" size="md" onClick={onClose} className="w-full sm:w-auto">
            Close
          </Button>
          <Link href="/text-courtroom" onClick={onClose} className="w-full sm:w-auto">
            <Button variant="gold" size="md" className="w-full" icon={<MessageSquare className="w-4 h-4" />}>
              Try Chat Courtroom
            </Button>
          </Link>
        </div>
      </div>
    </Modal>
  );
};
