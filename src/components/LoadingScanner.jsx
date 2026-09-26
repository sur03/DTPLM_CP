import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Cpu, Scan, CheckCircle2, Terminal, Sparkles, Activity, Layers } from 'lucide-react';
import { SCAN_STAGES } from '../services/aiDetectionService';

export default function LoadingScanner({ stageIndex, progress, logs = [] }) {
  const currentStage = SCAN_STAGES[stageIndex] || SCAN_STAGES[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#07090e]/90 backdrop-blur-2xl p-4">
      {/* Background ambient lighting */}
      <div className="absolute w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none animate-pulse-slow" />
      <div className="absolute w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none translate-y-24" />

      <div className="relative w-full max-w-2xl bg-[#0b0f19]/90 border border-cyan-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl shadow-cyan-500/10 overflow-hidden">
        
        {/* Top Scanline effect */}
        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse" />

        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Scan className="w-5 h-5 animate-spin" style={{ animationDuration: '6s' }} />
            </div>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                TruthLens Deep Forensic Engine
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                  SCANNING
                </span>
              </h3>
              <p className="text-xs text-slate-400">Multi-modal neural verification in progress...</p>
            </div>
          </div>
          
          <div className="text-right">
            <span className="text-2xl font-black font-mono text-cyan-400">{progress}%</span>
          </div>
        </div>

        {/* Center Animated Brain / Neural Scanner */}
        <div className="relative flex flex-col items-center justify-center my-6 py-4">
          
          {/* Radar Circles */}
          <div className="relative w-44 h-44 flex items-center justify-center">
            {/* Outer Ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
              className="absolute inset-0 rounded-full border border-dashed border-cyan-500/30"
            />
            {/* Middle Ring */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
              className="absolute inset-3 rounded-full border border-cyan-400/40"
            />
            {/* Pulsing Core */}
            <motion.div
              animate={{ scale: [1, 1.08, 1], opacity: [0.6, 1, 0.6] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="absolute inset-8 rounded-full bg-gradient-to-tr from-cyan-500/20 via-blue-600/30 to-indigo-500/20 border border-cyan-400/60 shadow-lg shadow-cyan-500/30 flex items-center justify-center"
            />

            {/* Neural Brain Icon Centerpiece */}
            <div className="relative z-10 flex flex-col items-center justify-center text-cyan-300">
              <Cpu className="w-12 h-12 text-cyan-300 filter drop-shadow-[0_0_12px_rgba(6,182,212,0.8)] animate-pulse" />
              <span className="text-[10px] font-mono text-cyan-400 mt-1 uppercase tracking-wider font-semibold">
                XAI Neural Core
              </span>
            </div>

            {/* Orbiting Particles */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
              className="absolute inset-0 flex items-start justify-center"
            >
              <div className="w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee]" />
            </motion.div>
          </div>

          {/* Current Active Step Highlight */}
          <div className="mt-6 text-center max-w-md">
            <motion.div
              key={currentStage.label}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-medium"
            >
              <Activity className="w-3.5 h-3.5 animate-pulse text-cyan-400" />
              <span>{currentStage.label}</span>
            </motion.div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full space-y-2 mb-6">
          <div className="flex justify-between text-xs text-slate-400 font-mono">
            <span>Overall Inspection</span>
            <span>Step {stageIndex + 1} of {SCAN_STAGES.length}</span>
          </div>
          <div className="h-2 w-full bg-slate-800/90 rounded-full overflow-hidden p-0.5 border border-slate-700">
            <motion.div
              className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 rounded-full shadow-[0_0_12px_rgba(6,182,212,0.7)]"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: "easeOut", duration: 0.3 }}
            />
          </div>
        </div>

        {/* Stage Checklist / Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-5">
          {SCAN_STAGES.map((st, idx) => {
            const isDone = idx < stageIndex;
            const isCurrent = idx === stageIndex;
            return (
              <div
                key={st.id}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs transition-all ${
                  isDone
                    ? 'bg-emerald-950/40 border border-emerald-500/30 text-emerald-300'
                    : isCurrent
                    ? 'bg-cyan-950/60 border border-cyan-500/50 text-cyan-200 shadow-sm shadow-cyan-500/20'
                    : 'bg-slate-900/40 border border-slate-800/60 text-slate-500'
                }`}
              >
                {isDone ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                ) : isCurrent ? (
                  <div className="w-3.5 h-3.5 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin shrink-0" />
                ) : (
                  <div className="w-3.5 h-3.5 rounded-full border border-slate-600 shrink-0" />
                )}
                <span className="truncate">{st.label.replace('...', '')}</span>
              </div>
            );
          })}
        </div>

        {/* Mini Live Terminal Log Stream */}
        <div className="bg-[#05070b] rounded-xl border border-slate-800 p-3 font-mono text-[11px] text-slate-400 h-24 overflow-y-auto space-y-1">
          <div className="flex items-center gap-1.5 text-slate-500 border-b border-slate-800/80 pb-1 mb-1">
            <Terminal className="w-3 h-3 text-cyan-400" />
            <span>Forensic Engine Stream Log</span>
          </div>
          {logs.map((log, i) => (
            <div key={i} className="text-slate-300 flex items-start gap-2">
              <span className="text-cyan-500 shrink-0">&gt;</span>
              <span className="text-slate-300">{log}</span>
            </div>
          ))}
          <div className="flex items-center gap-1 text-cyan-400 animate-pulse">
            <span>&gt;</span>
            <span className="w-2 h-3.5 bg-cyan-400 inline-block"></span>
          </div>
        </div>

      </div>
    </div>
  );
}
