import React from 'react';
import { motion } from 'framer-motion';

export default function GaugeChart({ score = 94, isFake = true, size = 220 }) {
  // Score is 0-100
  const normalizedScore = Math.max(0, Math.min(100, score));
  
  // Angle: from -90 deg (left) to 90 deg (right) -> 180 deg span
  const radius = 80;
  const strokeWidth = 14;
  const circumference = Math.PI * radius; // semi-circle circumference
  const strokeDashoffset = circumference - (circumference * normalizedScore) / 100;

  // Colors based on result verdict
  const trackColor = isFake
    ? 'url(#fakeGradient)'
    : 'url(#genuineGradient)';

  const glowColor = isFake
    ? 'rgba(244, 63, 94, 0.4)'
    : 'rgba(16, 185, 129, 0.4)';

  return (
    <div className="flex flex-col items-center justify-center relative">
      <div className="relative" style={{ width: size, height: size * 0.65 }}>
        <svg
          viewBox="0 0 200 120"
          className="w-full h-full overflow-visible"
        >
          <defs>
            {/* Gradient for Fake / Deepfake (Amber to Red) */}
            <linearGradient id="fakeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="50%" stopColor="#f43f5e" />
              <stop offset="100%" stopColor="#e11d48" />
            </linearGradient>

            {/* Gradient for Genuine (Cyan to Emerald) */}
            <linearGradient id="genuineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="50%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>

            {/* Filter Glow */}
            <filter id="gaugeGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Background Arc */}
          <path
            d="M 20 100 A 80 80 0 0 1 180 100"
            fill="none"
            stroke="#1e293b"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />

          {/* Value Arc */}
          <motion.path
            d="M 20 100 A 80 80 0 0 1 180 100"
            fill="none"
            stroke={trackColor}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: strokeDashoffset }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            filter="url(#gaugeGlow)"
          />

          {/* Min & Max Labels */}
          <text x="16" y="118" fill="#64748b" fontSize="10" fontWeight="600" textAnchor="middle">0%</text>
          <text x="100" y="36" fill="#94a3b8" fontSize="9" fontWeight="600" textAnchor="middle">50%</text>
          <text x="184" y="118" fill="#64748b" fontSize="10" fontWeight="600" textAnchor="middle">100%</text>
        </svg>

        {/* Center Score Readout */}
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-1 pointer-events-none">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex flex-col items-center text-center"
          >
            <div className="flex items-baseline">
              <span className={`text-4xl font-extrabold tracking-tight ${isFake ? 'text-rose-400' : 'text-emerald-400'}`}>
                {normalizedScore}
              </span>
              <span className="text-xl font-bold text-slate-400 ml-0.5">%</span>
            </div>
            <span className="text-[11px] font-semibold tracking-wider uppercase text-slate-400 -mt-1">
              Confidence Score
            </span>
          </motion.div>
        </div>
      </div>

      <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-400 font-mono">
        <span className={`w-2 h-2 rounded-full ${isFake ? 'bg-rose-500 shadow-[0_0_8px_#f43f5e]' : 'bg-emerald-500 shadow-[0_0_8px_#10b981]'}`} />
        <span>Model certainty threshold: High ({normalizedScore > 90 ? 'Definitive' : 'Probable'})</span>
      </div>
    </div>
  );
}
