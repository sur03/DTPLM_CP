import React from 'react';
import { 
  User, 
  ShieldCheck, 
  Award, 
  Zap, 
  Activity, 
  Clock, 
  Key, 
  Lock, 
  Sparkles,
  ExternalLink,
  GraduationCap
} from 'lucide-react';
import { useAnalysis } from '../context/AnalysisContext';

export default function ProfilePage() {
  const { history } = useAnalysis();

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 py-8 sm:py-12 px-4 sm:px-6 lg:px-8 relative">
      
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-cyan-500/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header Banner */}
        <div className="p-8 rounded-2xl glass-panel relative overflow-hidden border border-cyan-500/30 flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 p-[2px] shrink-0 shadow-lg shadow-cyan-500/30">
            <div className="w-full h-full bg-[#0b0f19] rounded-[14px] flex items-center justify-center text-cyan-400">
              <User className="w-10 h-10" />
            </div>
          </div>

          <div className="space-y-2 text-center sm:text-left flex-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h1 className="text-2xl font-bold text-white">Researcher / Investigator Profile</h1>
              <span className="px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-500/30 text-xs font-semibold">
                PRO Verified
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Institution / Department: <span className="text-slate-200">Department of Computer Science & Engineering</span>
            </p>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-slate-400 pt-2">
              <span className="flex items-center gap-1.5"><GraduationCap className="w-4 h-4 text-indigo-400" /> College Capstone Demonstration</span>
              <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-emerald-400" /> IEEE Ethical AI Verified</span>
            </div>
          </div>
        </div>

        {/* Quota & Usage Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          
          <div className="p-5 rounded-2xl glass-panel space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Monthly Scans</span>
              <Activity className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-2xl font-extrabold text-white font-mono">{history.length + 42} / 50,000</div>
            <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
              <div className="h-full bg-cyan-400 rounded-full" style={{ width: '12%' }} />
            </div>
            <span className="text-[10px] text-slate-500 block">Unlimited Academic Plan</span>
          </div>

          <div className="p-5 rounded-2xl glass-panel space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>API Concurrency</span>
              <Zap className="w-4 h-4 text-indigo-400" />
            </div>
            <div className="text-2xl font-extrabold text-white font-mono">100 Req/sec</div>
            <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
              <div className="h-full bg-indigo-400 rounded-full" style={{ width: '40%' }} />
            </div>
            <span className="text-[10px] text-slate-500 block">High-Throughput Node</span>
          </div>

          <div className="p-5 rounded-2xl glass-panel space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Tamper Certificates</span>
              <Award className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-2xl font-extrabold text-white font-mono">{history.length} Issued</div>
            <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
              <div className="h-full bg-purple-400 rounded-full" style={{ width: '25%' }} />
            </div>
            <span className="text-[10px] text-slate-500 block">Digitally Signed Audits</span>
          </div>

        </div>

        {/* Security & Access Logs */}
        <div className="p-6 rounded-2xl glass-panel space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Lock className="w-4 h-4 text-cyan-400" />
              Recent Security & Forensic Audit Sessions
            </h3>
            <span className="text-xs text-emerald-400 font-medium">Session Secure</span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <div>
                <span className="font-semibold text-white">Browser Session (Windows 11 / Chrome 128)</span>
                <span className="block text-[11px] text-slate-400">IP: 192.168.1.42 • Local Workspace Node</span>
              </div>
              <span className="text-[11px] font-mono text-emerald-400">Active Now</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <div>
                <span className="font-semibold text-white">TruthLens XAI Python SDK Batch Ingestion</span>
                <span className="block text-[11px] text-slate-400">API Key tl_live_...291e</span>
              </div>
              <span className="text-[11px] font-mono text-slate-400">2 hrs ago</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
