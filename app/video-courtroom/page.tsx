'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Disclaimer } from '@/components/layout/Disclaimer';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { MOCK_CASES } from '@/data/mockData';
import { 
  Gavel, Mic, MicOff, Video as VideoIcon, VideoOff, 
  Volume2, VolumeX, Play, Square, Shield, Sparkles, Scale, 
  Activity, ArrowLeft, MessageSquare, Landmark, CheckCircle2, ChevronDown
} from 'lucide-react';

export default function VideoCourtroomPage() {
  const [selectedCaseId, setSelectedCaseId] = useState(MOCK_CASES[0].id);
  const selectedCase = MOCK_CASES.find(c => c.id === selectedCaseId) || MOCK_CASES[0];

  const [activeSpeaker, setActiveSpeaker] = useState<'judge' | 'petitioner' | 'respondent' | 'clerk'>('judge');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [currentTurnIndex, setCurrentTurnIndex] = useState(0);
  const [currentSubtitle, setCurrentSubtitle] = useState('');
  const [isMicOn, setIsMicOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);

  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Audio oral argument transcripts for the 3 adversarial turns
  const oralArguments = [
    {
      speaker: 'petitioner' as const,
      speakerName: selectedCase.parties[0]?.advocateName || 'Senior Advocate for Petitioner',
      role: 'Petitioner Counsel',
      text: selectedCase.type.includes('Constitutional')
        ? 'May it please this Hon\'ble Constitution Bench: Under Article 32 of the Constitution, we impugn the executive automated surveillance directives. Under K.S. Puttaswamy, privacy is an inalienable fundamental right under Article 21. The state collection fails the strict proportionality test, lacking prior judicial warrant or legislative sanction.'
        : selectedCase.type.includes('Criminal')
        ? 'May it please the Sessions Court: Under Section 480 of Bharatiya Nagarik Suraksha Sanhita, we move for regular bail. The accused has cooperated throughout the investigation under Section 173 BNSS, and digital cell tower logs confirm absence from the alleged crime locus.'
        : 'May it please Your Lordship: We submit the certified Master Commercial Agreement under Section 63 of Bharatiya Sakshya Adhiniyam, 2023. The respondent\'s breach is conclusive on record, entitling petitioner to liquidated damages under Section 74 of the Contract Act.'
    },
    {
      speaker: 'respondent' as const,
      speakerName: selectedCase.parties[1]?.advocateName || 'Senior Counsel for Respondent',
      role: 'Respondent Counsel',
      text: selectedCase.type.includes('Constitutional')
        ? 'Objection, Your Honour! The Union vehemently opposes the petition. The contested cybersecurity guidelines are strictly empowered under statutory law for national security and digital sovereignty. The right to privacy is not absolute and is reasonably restricted under Article 19(2).'
        : selectedCase.type.includes('Criminal')
        ? 'We strongly oppose the grant of bail, Your Honour! The accused is charged with grave offences under Section 103 and 61 of the Bharatiya Nyaya Sanhita. Release at this juncture presents severe tamper risk to digital call record evidence and prosecution witnesses.'
        : 'Objection, Your Honour! The petitioner has misapplied Section 74 of the Contract Act. The claimed sum is an unliquidated penalty clause, wholly unproven under the rules of the Indian Contract Act.'
    },
    {
      speaker: 'judge' as const,
      speakerName: 'AI Presiding Judicial Officer',
      role: 'Presiding Judge',
      text: selectedCase.type.includes('Constitutional')
        ? 'ORDER OF THE CONSTITUTION BENCH: Having heard learned Senior Counsel for both parties, this Bench finds a strong prima facie case regarding Article 21 data standards. In exercise of powers under Article 142, the State is directed to file a comprehensive technical audit affidavit within three weeks.'
        : selectedCase.type.includes('Criminal')
        ? 'ORDER OF THE BENCH: Having scrutinized the Section 173 BNSS case diary and forensic logs under Section 63 BSA, bail is granted under Section 480 BNSS subject to personal bond of one lakh rupees, surrender of travel documents, and weekly reporting to the investigating officer.'
        : 'ORDER OF THE BENCH: Having verified the cryptographic digital seals under Section 63 of Bharatiya Sakshya Adhiniyam, the Bench decrees the claim under Order XX Rule 6 CPC with statutory mitigation under Section 74 of the Contract Act.'
    }
  ];

  // Stop any ongoing speech
  const stopAudioSimulation = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlayingAudio(false);
    setCurrentSubtitle('');
  };

  // Play a specific turn's audio using Web Speech API
  const speakTurn = (index: number) => {
    if (index >= oralArguments.length) {
      setIsPlayingAudio(false);
      setActiveSpeaker('judge');
      setCurrentSubtitle('Adversarial oral proceedings concluded. Transcript committed to Section 63 BSA judicial vault.');
      return;
    }

    const turn = oralArguments[index];
    setActiveSpeaker(turn.speaker);
    setCurrentTurnIndex(index);
    setCurrentSubtitle(`${turn.speakerName}: "${turn.text}"`);

    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(turn.text);
      speechRef.current = utterance;
      utterance.rate = 1.0;
      utterance.pitch = turn.speaker === 'judge' ? 0.9 : turn.speaker === 'petitioner' ? 1.05 : 1.0;

      utterance.onend = () => {
        // Automatically progress to next turn after 1.5s
        setTimeout(() => {
          speakTurn(index + 1);
        }, 1500);
      };

      utterance.onerror = () => {
        // Fallback for browsers blocking audio
        setTimeout(() => {
          speakTurn(index + 1);
        }, 6000);
      };

      window.speechSynthesis.speak(utterance);
    } else {
      // Fallback timer if speech synthesis unavailable
      setTimeout(() => {
        speakTurn(index + 1);
      }, 6000);
    }
  };

  // Start trial audio simulation
  const handleStartAudioTrial = () => {
    if (isPlayingAudio) {
      stopAudioSimulation();
    } else {
      setIsPlayingAudio(true);
      speakTurn(0);
    }
  };

  useEffect(() => {
    return () => {
      stopAudioSimulation();
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-black text-zinc-100 relative">
      {/* Background Architectural Chamber Watermark */}
      <div 
        className="fixed inset-0 bg-cover bg-center opacity-10 pointer-events-none grayscale contrast-125"
        style={{ backgroundImage: `url('/images/courtroom_chamber.jpg')` }}
      />

      <Navbar />

      <main className="flex-1 flex flex-col max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-5 relative z-10">
        
        {/* Top Control Bar with Case Selector */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-xl bg-zinc-950/90 border border-zinc-800 backdrop-blur-md shadow-xl">
          <div className="flex items-center gap-3">
            <Link 
              href="/text-courtroom" 
              className="p-2 rounded-lg bg-zinc-900 border border-zinc-700 text-zinc-300 hover:text-white hover:border-white transition-colors"
              title="Return to Courtroom Directory"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-white text-black">
                  {selectedCase.id}
                </span>
                <Badge variant="court">{selectedCase.courtLevel}</Badge>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-zinc-900 text-zinc-200 border border-zinc-700">
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                  Live Video Bench
                </span>
              </div>
              <h1 className="text-base sm:text-lg font-bold text-white mt-1 font-serif">
                {selectedCase.title}
              </h1>
            </div>
          </div>

          {/* Quick Case Switcher Dropdown */}
          <div className="flex items-center gap-2">
            <label className="text-xs text-zinc-400 font-mono hidden sm:inline">Case Session:</label>
            <select
              value={selectedCaseId}
              onChange={(e) => {
                stopAudioSimulation();
                setSelectedCaseId(e.target.value);
              }}
              className="bg-zinc-900 border border-zinc-700 text-xs text-white rounded-lg px-3 py-2 font-mono focus:border-white focus:outline-none cursor-pointer"
            >
              {MOCK_CASES.map(c => (
                <option key={c.id} value={c.id}>
                  {c.id} — {c.caseNumber}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 4-Quadrant Courtroom Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1 min-h-[460px]">
          
          {/* Quadrant 1: AI PRESIDING JUDGE */}
          <div className={`relative rounded-2xl bg-gradient-to-b from-zinc-900 to-black border-2 overflow-hidden flex flex-col items-center justify-center p-6 transition-all ${
            activeSpeaker === 'judge' ? 'border-white shadow-2xl ring-2 ring-white/20' : 'border-zinc-800'
          }`}>
            <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
              <div className="flex items-center gap-2 px-3 py-1 bg-black/80 backdrop-blur-md rounded-lg border border-zinc-700 text-zinc-100 text-xs font-semibold">
                <Gavel className="w-3.5 h-3.5 text-white" />
                <span>AI Presiding Judicial Officer</span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 bg-zinc-800 text-zinc-200 rounded-full text-xs font-mono border border-zinc-700">
                <Activity className={`w-3.5 h-3.5 ${activeSpeaker === 'judge' ? 'animate-pulse text-white' : 'text-zinc-500'}`} />
                <span>{activeSpeaker === 'judge' ? 'Presiding Bench Speaking' : 'Bench In Session'}</span>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center text-center space-y-4 my-auto">
              <div className="relative">
                <div className={`absolute -inset-4 rounded-full bg-white/10 blur-xl ${activeSpeaker === 'judge' ? 'animate-pulse' : 'opacity-0'}`} />
                <div className="w-24 h-24 rounded-full bg-black border-2 border-zinc-700 flex items-center justify-center shadow-2xl relative">
                  <img 
                    src="/images/ashoka_emblem.jpg" 
                    alt="Emblem" 
                    className="w-14 h-14 object-contain grayscale contrast-125"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-base font-bold text-white tracking-wide">
                  {selectedCase.courtLevel.toUpperCase()}
                </div>
                <p className="text-xs text-zinc-400 max-w-sm font-mono">
                  Autonomous Adjudication • Bharatiya Sakshya Adhiniyam Sec 63
                </p>
              </div>

              {/* Audio Waveform */}
              <div className="flex items-center justify-center gap-1.5 h-6 pt-1">
                {[12, 24, 16, 28, 14, 20, 10].map((h, i) => (
                  <div 
                    key={i} 
                    className={`w-1 rounded-full bg-white transition-all duration-200 ${
                      activeSpeaker === 'judge' && isPlayingAudio ? 'animate-pulse' : 'opacity-30'
                    }`} 
                    style={{ height: activeSpeaker === 'judge' && isPlayingAudio ? `${h}px` : '4px' }} 
                  />
                ))}
              </div>
            </div>

            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] text-zinc-400 font-mono">
              <span className="px-2 py-0.5 bg-black/80 rounded border border-zinc-800">
                AI Bench Key: 0x8F9A...4B21 (Verified)
              </span>
              <button 
                onClick={() => setActiveSpeaker('judge')}
                className="px-2 py-0.5 bg-zinc-900 hover:bg-zinc-800 text-white rounded border border-zinc-700 text-[11px]"
              >
                Focus Bench
              </button>
            </div>
          </div>

          {/* Quadrant 2: PETITIONER COUNSEL */}
          <div className={`relative rounded-2xl bg-zinc-950 border-2 overflow-hidden flex flex-col items-center justify-center p-6 transition-all ${
            activeSpeaker === 'petitioner' ? 'border-white shadow-2xl ring-2 ring-white/20' : 'border-zinc-800'
          }`}>
            <div className="absolute top-3 left-3 flex items-center gap-2 z-10">
              <span className="px-2.5 py-1 bg-black text-white rounded-lg text-xs font-semibold border border-zinc-700">
                Petitioner Representation
              </span>
            </div>

            <div className="flex flex-col items-center justify-center text-center space-y-3 my-auto">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80" 
                  alt="Petitioner Counsel"
                  className="w-20 h-20 rounded-full object-cover border-2 border-zinc-700 shadow-xl grayscale contrast-125"
                />
                {activeSpeaker === 'petitioner' && isPlayingAudio && (
                  <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-white text-black rounded-full flex items-center justify-center text-[10px] font-bold animate-pulse">
                    <Volume2 className="w-3 h-3" />
                  </span>
                )}
              </div>

              <div>
                <div className="text-sm font-bold text-white font-serif">
                  {selectedCase.parties[0]?.advocateName || 'Senior Counsel for Petitioner'}
                </div>
                <div className="text-xs text-zinc-400 font-mono">
                  Bar Reg: {selectedCase.parties[0]?.barCouncilNo || 'D/4829/2012'}
                </div>
                <div className="text-[11px] text-zinc-500 mt-1 max-w-xs">
                  Representing: {selectedCase.parties[0]?.name}
                </div>
              </div>

              {/* Audio Waveform */}
              <div className="flex items-center justify-center gap-1.5 h-6 pt-1">
                {[16, 20, 26, 14, 22, 12].map((h, i) => (
                  <div 
                    key={i} 
                    className={`w-1 rounded-full bg-white transition-all duration-200 ${
                      activeSpeaker === 'petitioner' && isPlayingAudio ? 'animate-pulse' : 'opacity-30'
                    }`} 
                    style={{ height: activeSpeaker === 'petitioner' && isPlayingAudio ? `${h}px` : '4px' }} 
                  />
                ))}
              </div>
            </div>

            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-zinc-400">
              <span className="px-2 py-0.5 bg-black rounded border border-zinc-800 font-mono text-[11px]">
                1080p HD • {isMicOn ? 'Mic Live' : 'Muted'}
              </span>
              <button 
                onClick={() => setActiveSpeaker('petitioner')}
                className="px-2 py-0.5 bg-zinc-900 hover:bg-zinc-800 text-white rounded border border-zinc-700 text-[11px]"
              >
                Focus Counsel
              </button>
            </div>
          </div>

          {/* Quadrant 3: RESPONDENT COUNSEL */}
          <div className={`relative rounded-2xl bg-zinc-950 border-2 overflow-hidden flex flex-col items-center justify-center p-6 transition-all ${
            activeSpeaker === 'respondent' ? 'border-white shadow-2xl ring-2 ring-white/20' : 'border-zinc-800'
          }`}>
            <div className="absolute top-3 left-3 flex items-center gap-2 z-10">
              <span className="px-2.5 py-1 bg-black text-white rounded-lg text-xs font-semibold border border-zinc-700">
                Respondent Representation
              </span>
            </div>

            <div className="flex flex-col items-center justify-center text-center space-y-3 my-auto">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80" 
                  alt="Respondent Counsel"
                  className="w-20 h-20 rounded-full object-cover border-2 border-zinc-700 shadow-xl grayscale contrast-125"
                />
                {activeSpeaker === 'respondent' && isPlayingAudio && (
                  <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-white text-black rounded-full flex items-center justify-center text-[10px] font-bold animate-pulse">
                    <Volume2 className="w-3 h-3" />
                  </span>
                )}
              </div>

              <div>
                <div className="text-sm font-bold text-white font-serif">
                  {selectedCase.parties[1]?.advocateName || 'Senior Counsel for Respondent'}
                </div>
                <div className="text-xs text-zinc-400 font-mono">
                  Bar Reg: {selectedCase.parties[1]?.barCouncilNo || 'MH/1920/2015'}
                </div>
                <div className="text-[11px] text-zinc-500 mt-1 max-w-xs">
                  Representing: {selectedCase.parties[1]?.name}
                </div>
              </div>

              {/* Audio Waveform */}
              <div className="flex items-center justify-center gap-1.5 h-6 pt-1">
                {[14, 22, 18, 25, 12, 16].map((h, i) => (
                  <div 
                    key={i} 
                    className={`w-1 rounded-full bg-white transition-all duration-200 ${
                      activeSpeaker === 'respondent' && isPlayingAudio ? 'animate-pulse' : 'opacity-30'
                    }`} 
                    style={{ height: activeSpeaker === 'respondent' && isPlayingAudio ? `${h}px` : '4px' }} 
                  />
                ))}
              </div>
            </div>

            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-zinc-400">
              <span className="px-2 py-0.5 bg-black rounded border border-zinc-800 font-mono text-[11px]">
                1080p HD • Counsel Connected
              </span>
              <button 
                onClick={() => setActiveSpeaker('respondent')}
                className="px-2 py-0.5 bg-zinc-900 hover:bg-zinc-800 text-white rounded border border-zinc-700 text-[11px]"
              >
                Focus Counsel
              </button>
            </div>
          </div>

          {/* Quadrant 4: COURT STENOGRAPHER & DIGITAL RECORD VAULT */}
          <div className="relative rounded-2xl bg-zinc-950 border border-zinc-800 overflow-hidden flex flex-col p-5 space-y-3">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-2.5">
              <div className="flex items-center gap-2 text-xs font-bold text-white font-mono">
                <Shield className="w-4 h-4 text-white" />
                <span>Court Reporter & Live Stenography</span>
              </div>
              <span className="px-2 py-0.5 rounded bg-black border border-zinc-700 text-[10px] font-mono text-zinc-300">
                Sec 63 BSA Live Hash
              </span>
            </div>

            {/* Live Subtitle / Stenography Stream */}
            <div className="flex-1 bg-black rounded-xl border border-zinc-800/80 p-3.5 overflow-y-auto space-y-2 text-xs font-mono">
              <div className="text-[10px] text-zinc-500 uppercase tracking-widest border-b border-zinc-900 pb-1 flex items-center justify-between">
                <span>Real-Time Hearing Stenograph</span>
                <span className="text-white">Active Stream</span>
              </div>
              {currentSubtitle ? (
                <p className="text-zinc-200 leading-relaxed animate-fade-in whitespace-pre-wrap">
                  {currentSubtitle}
                </p>
              ) : (
                <div className="text-zinc-500 italic py-4 text-center">
                  Click &quot;Simulate Live Oral Arguments&quot; below to trigger multimodal speech synthesis and adversarial oral proceedings.
                </div>
              )}
            </div>

            {/* Cryptographic Compliance Footnote */}
            <div className="pt-1 flex items-center justify-between text-[10px] font-mono text-zinc-400">
              <span>SHA256: e8f2...91b4c</span>
              <span>Evidence Admissibility: Order XIII CPC</span>
            </div>
          </div>

        </div>

        {/* Video Courtroom Action Toolbar */}
        <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 flex flex-wrap items-center justify-between gap-4">
          
          {/* Main Audio Trial Simulation Button */}
          <div className="flex items-center gap-3">
            <Button
              variant="primary"
              onClick={handleStartAudioTrial}
              icon={isPlayingAudio ? <Square className="w-4 h-4 text-black" /> : <Play className="w-4 h-4 text-black fill-current" />}
              className="text-xs font-extrabold"
            >
              {isPlayingAudio ? 'Stop Oral Arguments' : 'Simulate Live Audio Oral Arguments'}
            </Button>

            {isPlayingAudio && (
              <span className="text-xs font-mono text-zinc-300 flex items-center gap-1.5 animate-pulse">
                <Volume2 className="w-4 h-4 text-white" />
                <span>Turn {currentTurnIndex + 1} of 3 in Session</span>
              </span>
            )}
          </div>

          {/* Interactive Hardware Toggles */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsMicOn(!isMicOn)}
              icon={isMicOn ? <Mic className="w-3.5 h-3.5 text-white" /> : <MicOff className="w-3.5 h-3.5 text-zinc-500" />}
              className="text-xs border-zinc-700"
            >
              {isMicOn ? 'Mic On' : 'Muted'}
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsVideoOn(!isVideoOn)}
              icon={isVideoOn ? <VideoIcon className="w-3.5 h-3.5 text-white" /> : <VideoOff className="w-3.5 h-3.5 text-zinc-500" />}
              className="text-xs border-zinc-700"
            >
              {isVideoOn ? 'Camera Active' : 'Camera Off'}
            </Button>

            <Link href={`/text-courtroom/${selectedCase.id}`}>
              <Button
                variant="court"
                size="sm"
                icon={<MessageSquare className="w-3.5 h-3.5 text-white" />}
                className="text-xs"
              >
                Switch to Chat Courtroom
              </Button>
            </Link>
          </div>
        </div>

        <Disclaimer />
      </main>

      <Footer />
    </div>
  );
}
