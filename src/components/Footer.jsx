import React from 'react';
import { ShieldCheck, ExternalLink, Cpu, Lock, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="border-t border-slate-800/80 bg-[#06080d] text-slate-400 text-sm relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-cyan-500/5 blur-3xl pointer-events-none rounded-full" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          
          {/* Col 1: Brand & Mission */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center p-[1px]">
                <div className="w-full h-full bg-[#0b0f19] rounded-[7px] flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4 text-cyan-400" />
                </div>
              </div>
              <span className="font-bold text-white tracking-tight text-base">TruthLens.AI</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Autonomous multi-modal forensic platform combating digital disinformation, deepfakes, and synthetic media with Explainable Artificial Intelligence.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-slate-900 border border-slate-800">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Inference Node v4.2 Active
              </span>
            </div>
          </div>

          {/* Col 2: Core Capabilities */}
          <div>
            <h4 className="text-white font-semibold text-xs tracking-wider uppercase mb-3">AI Engine Models</h4>
            <ul className="space-y-2 text-xs">
              <li><span className="text-slate-300 hover:text-cyan-400 transition-colors">RoBERTa Misinformation NLP</span></li>
              <li><span className="text-slate-300 hover:text-cyan-400 transition-colors">EfficientNet-B7 Spatial Forensics</span></li>
              <li><span className="text-slate-300 hover:text-cyan-400 transition-colors">Fourier FFT Spectral Anomaly</span></li>
              <li><span className="text-slate-300 hover:text-cyan-400 transition-colors">Audio-Viseme Temporal Sync</span></li>
              <li><span className="text-slate-300 hover:text-cyan-400 transition-colors">C2PA Cryptographic Provenance</span></li>
            </ul>
          </div>

          {/* Col 3: Platform Navigation */}
          <div>
            <h4 className="text-white font-semibold text-xs tracking-wider uppercase mb-3">Quick Navigation</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/detect" className="text-slate-300 hover:text-cyan-400 transition-colors">Detection Dashboard</Link></li>
              <li><Link to="/history" className="text-slate-300 hover:text-cyan-400 transition-colors">Analysis History & Logs</Link></li>
              <li><Link to="/reports" className="text-slate-300 hover:text-cyan-400 transition-colors">Verification Reports</Link></li>
              <li><Link to="/admin" className="text-slate-300 hover:text-cyan-400 transition-colors">Admin & Model Status</Link></li>
              <li><Link to="/settings" className="text-slate-300 hover:text-cyan-400 transition-colors">API & Sensitivity Settings</Link></li>
            </ul>
          </div>

          {/* Col 4: Academic & Project Info */}
          <div>
            <h4 className="text-white font-semibold text-xs tracking-wider uppercase mb-3">Project & Standards</h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">
              College Capstone & Research Demonstration. Built according to IEEE standard ethical AI guidelines for media integrity.
            </p>
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-[11px] text-slate-400 space-y-1">
              <div className="flex items-center gap-1.5 text-cyan-400 font-medium">
                <Sparkles className="w-3.5 h-3.5" /> Explainable AI (XAI)
              </div>
              <p>Provides human-interpretable linguistic salience maps and artifact probability matrices.</p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p className="text-slate-500">
            © 2026 TruthLens AI. All rights reserved. Built for Explainable AI & Digital Forensics.
          </p>
          <div className="flex items-center gap-4 text-slate-400">
            <span className="flex items-center gap-1">
              <Lock className="w-3 h-3 text-emerald-400" /> End-to-End Encrypted Verification
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
