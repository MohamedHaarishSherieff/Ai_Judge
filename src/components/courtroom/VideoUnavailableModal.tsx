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
    <Modal isOpen={isOpen} onClose={onClose} title="Video Courtroom — Future Roadmap" maxWidth="md">
      <div className="text-center space-y-5 py-2">
        <div className="w-14 h-14 rounded-2xl bg-zinc-900 border border-zinc-700 flex items-center justify-center text-white mx-auto shadow-lg">
          <Video className="w-7 h-7" />
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-bold text-white">
            Live Video Courtroom — In Active Roadmap
          </h3>
          <p className="text-xs text-zinc-300 leading-relaxed max-w-md mx-auto">
            We are planning to add live video courtroom proceedings in the future in a most elegant and professional way, integrated with e-Courts Phase III standards and high-definition virtual bench infrastructure.
          </p>
          <p className="text-xs text-zinc-400 leading-relaxed max-w-md mx-auto">
            Please use the live <span className="text-white font-semibold underline">Chat / Text Courtroom</span> for this session to present arguments, cross-examine evidence, and obtain certified judicial decrees.
          </p>
        </div>

        <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800 text-xs text-zinc-400 flex items-center justify-center gap-2 font-mono">
          <Sparkles className="w-4 h-4 text-white shrink-0" />
          <span>Roadmap Initiative • Video & Virtual Chambers Coming Soon</span>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Button variant="ghost" size="md" onClick={onClose} className="w-full sm:w-auto">
            Close
          </Button>
          <Link href="/text-courtroom" onClick={onClose} className="w-full sm:w-auto">
            <Button variant="primary" size="md" className="w-full" icon={<MessageSquare className="w-4 h-4" />}>
              Proceed to Chat Courtroom
            </Button>
          </Link>
        </div>
      </div>
    </Modal>
  );
};
