import React, { useState } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  Legend, 
  AreaChart, 
  Area 
} from 'recharts';
import { 
  BarChart2, 
  ShieldAlert, 
  Cpu, 
  Users, 
  Activity, 
  Database, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Star, 
  Server, 
  TrendingUp, 
  HardDrive, 
  RefreshCw,
  Sliders
} from 'lucide-react';
import { ADMIN_ANALYTICS } from '../data/demoData';

export default function AdminDashboard() {
  const [retrainingStatus, setRetrainingStatus] = useState(false);
  const [datasetCount, setDatasetCount] = useState(482910);

  const handleTriggerRetrain = () => {
    setRetrainingStatus(true);
    setTimeout(() => {
      setRetrainingStatus(false);
      setDatasetCount(prev => prev + 1500);
      alert('Active Learning pipeline synced 1,500 newly flagged user submissions to TruthLens-RoBERTa-v4 and EfficientNet-B7 weights.');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 py-8 sm:py-12 px-4 sm:px-6 lg:px-8 relative">
      
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-cyan-500/5 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-indigo-600/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4" /> Global Telemetry & Intelligence
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Admin & Model Command Center
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Real-time monitoring of inference nodes, global disinformation detection streams, and dataset pipelines.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleTriggerRetrain}
              disabled={retrainingStatus}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 disabled:opacity-50 transition-all shadow-lg shadow-cyan-500/20"
            >
              <RefreshCw className={`w-4 h-4 ${retrainingStatus ? 'animate-spin' : ''}`} />
              <span>{retrainingStatus ? 'Syncing Weights...' : 'Trigger Active Learning Sync'}</span>
            </button>
          </div>
        </div>

        {/* ---------------- 1. KPI CARDS ---------------- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          
          {/* Card 1: Total Analyses */}
          <div className="p-6 rounded-2xl glass-panel relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Total Analyses</span>
              <div className="w-9 h-9 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400">
                <BarChart2 className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-white font-mono">{ADMIN_ANALYTICS.kpis.totalScanned}</span>
              <span className="text-xs text-emerald-400 font-semibold flex items-center gap-0.5">
                <TrendingUp className="w-3.5 h-3.5" /> +14.2%
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">Total requests processed across all endpoints</p>
          </div>

          {/* Card 2: Fake News Detected */}
          <div className="p-6 rounded-2xl glass-panel relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Fake News Detected</span>
              <div className="w-9 h-9 rounded-xl bg-rose-500/10 flex items-center justify-center text-rose-400">
                <ShieldAlert className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-rose-400 font-mono">{ADMIN_ANALYTICS.kpis.fakeDetected}</span>
              <span className="text-xs text-rose-400/80 font-mono font-semibold">34.4% Flag Rate</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">Linguistic disinformation & clickbait suppressed</p>
          </div>

          {/* Card 3: Deepfakes Found */}
          <div className="p-6 rounded-2xl glass-panel relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Deepfakes Found</span>
              <div className="w-9 h-9 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400">
                <Cpu className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-purple-400 font-mono">{ADMIN_ANALYTICS.kpis.deepfakesNeutralized}</span>
              <span className="text-xs text-purple-300 font-semibold">+8.7% this wk</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">Synthetic visuals & voice clones caught</p>
          </div>

          {/* Card 4: Users / Active Scanners */}
          <div className="p-6 rounded-2xl glass-panel relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Active Users</span>
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                <Users className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-emerald-400 font-mono">{ADMIN_ANALYTICS.kpis.activeScanners}</span>
              <span className="text-xs text-slate-400 font-mono">Live Sessions</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">Journalists & intelligence agencies connected</p>
          </div>

        </div>

        {/* ---------------- 2. CHARTS SECTION ---------------- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Weekly Analyses Chart (8 Cols) */}
          <div className="lg:col-span-8 p-6 rounded-2xl glass-panel space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-sm font-bold text-white">Weekly Analysis Volume & Threat Trends</h3>
                <p className="text-[11px] text-slate-400">Comparison of Genuine content vs Fake News and Deepfakes detected daily.</p>
              </div>
              <span className="text-xs font-mono text-cyan-400 bg-cyan-950/60 px-2.5 py-1 rounded border border-cyan-500/30">
                Last 7 Days
              </span>
            </div>

            <div className="h-72 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={ADMIN_ANALYTICS.weeklyTrend}>
                  <defs>
                    <linearGradient id="colorGenuine" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                    </linearGradient>
                    <linearGradient id="colorFake" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#f43f5e" stopOpacity={0.0} />
                    </linearGradient>
                    <linearGradient id="colorDeepfake" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="5%" stopColor="#818cf8" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#818cf8" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="day" stroke="#64748b" fontSize={11} />
                  <YAxis stroke="#64748b" fontSize={11} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0b0f19', borderColor: '#334155', borderRadius: '12px', fontSize: '11px' }}
                    itemStyle={{ color: '#e2e8f0' }}
                  />
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                  <Area type="monotone" dataKey="genuine" name="Genuine Content" stroke="#10b981" fillOpacity={1} fill="url(#colorGenuine)" />
                  <Area type="monotone" dataKey="fakeNews" name="Fake News Detected" stroke="#f43f5e" fillOpacity={1} fill="url(#colorFake)" />
                  <Area type="monotone" dataKey="deepfakes" name="Deepfakes Caught" stroke="#818cf8" fillOpacity={1} fill="url(#colorDeepfake)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Media Type Distribution Pie Chart (4 Cols) */}
          <div className="lg:col-span-4 p-6 rounded-2xl glass-panel space-y-4 flex flex-col justify-between">
            <div className="border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white">Media Type Distribution</h3>
              <p className="text-[11px] text-slate-400">Proportion of modalities analyzed.</p>
            </div>

            <div className="h-60 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={ADMIN_ANALYTICS.mediaDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {ADMIN_ANALYTICS.mediaDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0b0f19', borderColor: '#334155', borderRadius: '10px', fontSize: '11px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800 text-[11px]">
              {ADMIN_ANALYTICS.mediaDistribution.map((item, idx) => (
                <div key={idx} className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-slate-300">{item.name} ({item.value}%)</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* ---------------- 3. AI MODEL STATUS & DATASET MANAGEMENT ---------------- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* AI Model Status (7 Cols) */}
          <div className="lg:col-span-7 p-6 rounded-2xl glass-panel space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Server className="w-4 h-4 text-cyan-400" />
                <h3 className="text-sm font-bold text-white">Inference Engine Models & Cluster Health</h3>
              </div>
              <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/30">
                All 4 Clusters Healthy
              </span>
            </div>

            <div className="space-y-3">
              {ADMIN_ANALYTICS.modelStatus.map((m, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="font-bold text-white">{m.name}</span>
                    </div>
                    <span className="text-[11px] text-slate-400">{m.type} • {m.version}</span>
                  </div>

                  <div className="flex items-center gap-4 text-right font-mono">
                    <div>
                      <span className="text-slate-500 text-[10px] block">F1-Score</span>
                      <span className="text-emerald-400 font-semibold">{m.f1Score}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 text-[10px] block">Latency</span>
                      <span className="text-cyan-400 font-semibold">{m.latency}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 text-[10px] block">Memory</span>
                      <span className="text-slate-300 font-semibold">{m.memory}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dataset Management & Recent Feedback (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Dataset Card */}
            <div className="p-6 rounded-2xl glass-panel space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <Database className="w-4 h-4 text-indigo-400" />
                  <h3 className="text-sm font-bold text-white">Dataset Management</h3>
                </div>
                <span className="text-xs font-mono text-indigo-300 font-semibold">
                  {datasetCount.toLocaleString()} Samples
                </span>
              </div>

              <div className="space-y-2 text-xs text-slate-300">
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">Benchmarked Repositories:</span>
                  <span>MediaEval, FakeNewsCorpus, FaceForensics++</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">Active Learning Buffer:</span>
                  <span className="text-cyan-400 font-semibold">1,500 unlabelled samples</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-400">Class Balance:</span>
                  <span>52% Synthetic / 48% Genuine</span>
                </div>
              </div>
            </div>

            {/* Latest Feedback Card */}
            <div className="p-6 rounded-2xl glass-panel space-y-3">
              <h3 className="text-sm font-bold text-white border-b border-slate-800 pb-3">
                Latest User Feedback & Verifications
              </h3>

              <div className="space-y-2.5">
                {ADMIN_ANALYTICS.recentFeedback.map((fb) => (
                  <div key={fb.id} className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-slate-300">{fb.user}</span>
                      <span className="text-[10px] text-slate-500">{fb.date}</span>
                    </div>
                    <p className="text-slate-400 text-[11px] leading-relaxed">"{fb.feedback}"</p>
                    <div className="flex items-center gap-1 text-amber-400 pt-0.5">
                      {[...Array(fb.rating)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
