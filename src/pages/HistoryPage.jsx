import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  Trash2, 
  ExternalLink, 
  Download, 
  FileText, 
  Image as ImageIcon, 
  Video, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldAlert, 
  ShieldCheck,
  RefreshCw,
  Sparkles
} from 'lucide-react';
import { useAnalysis } from '../context/AnalysisContext';

export default function HistoryPage() {
  const navigate = useNavigate();
  const { history, clearHistory, deleteHistoryItem } = useAnalysis();

  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('ALL');
  const [verdictFilter, setVerdictFilter] = useState('ALL');

  // Filter history records
  const filteredHistory = history.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType = typeFilter === 'ALL' || item.type.toUpperCase() === typeFilter.toUpperCase();

    const matchesVerdict = verdictFilter === 'ALL' ||
      (verdictFilter === 'FAKE' && (item.verdict.toLowerCase().includes('fake') || item.verdict.toLowerCase().includes('deepfake'))) ||
      (verdictFilter === 'GENUINE' && item.verdict.toLowerCase().includes('genuine'));

    return matchesSearch && matchesType && matchesVerdict;
  });

  const exportHistoryJSON = () => {
    const blob = new Blob([JSON.stringify(history, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `truthlens-audit-history-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 py-8 sm:py-12 px-4 sm:px-6 lg:px-8 relative">
      
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4" /> Audit Archive
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Analysis History & Logs
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Historical records of all deepfake and misinformation forensic investigations.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={exportHistoryJSON}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-300 bg-slate-900 hover:bg-slate-800 border border-slate-700 transition-all"
            >
              <Download className="w-4 h-4 text-cyan-400" /> Export JSON
            </button>
            <button
              onClick={() => {
                if (window.confirm('Are you sure you want to clear all analysis history?')) {
                  clearHistory();
                }
              }}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-rose-300 bg-rose-950/40 hover:bg-rose-950/70 border border-rose-500/30 transition-all"
            >
              <Trash2 className="w-4 h-4" /> Clear All
            </button>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="p-4 rounded-2xl glass-panel flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Search Input */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title, claim, ID, or category..."
              className="w-full bg-slate-900/80 border border-slate-700/80 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-all"
            />
          </div>

          {/* Filter Dropdowns */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
            <div className="flex items-center gap-2">
              <Filter className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-xs text-slate-400">Type:</span>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="bg-slate-900 border border-slate-700 text-slate-300 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-cyan-500"
              >
                <option value="ALL">All Modalities</option>
                <option value="TEXT">Text Only</option>
                <option value="IMAGE">Image Only</option>
                <option value="VIDEO">Video Only</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Verdict:</span>
              <select
                value={verdictFilter}
                onChange={(e) => setVerdictFilter(e.target.value)}
                className="bg-slate-900 border border-slate-700 text-slate-300 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-cyan-500"
              >
                <option value="ALL">All Verdicts</option>
                <option value="FAKE">Fake / Deepfake</option>
                <option value="GENUINE">Likely Genuine</option>
              </select>
            </div>
          </div>

        </div>

        {/* History Table */}
        <div className="rounded-2xl glass-panel overflow-hidden border border-slate-800">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-900/90 text-slate-400 uppercase font-semibold border-b border-slate-800 text-[11px] tracking-wider">
                <tr>
                  <th className="py-3.5 px-4">Date & Time</th>
                  <th className="py-3.5 px-4">Subject / Claim</th>
                  <th className="py-3.5 px-4">Type</th>
                  <th className="py-3.5 px-4">Verdict</th>
                  <th className="py-3.5 px-4">Confidence</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredHistory.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-12 text-slate-500">
                      No matching verification records found in archive.
                    </td>
                  </tr>
                ) : (
                  filteredHistory.map((item) => {
                    const isFake = item.verdict.toLowerCase().includes('fake') || item.verdict.toLowerCase().includes('deepfake');
                    return (
                      <tr
                        key={item.id}
                        className="hover:bg-slate-800/40 transition-colors group cursor-pointer"
                        onClick={() => navigate(`/results/${item.id}`)}
                      >
                        {/* Date */}
                        <td className="py-3.5 px-4 font-mono text-slate-400 whitespace-nowrap">
                          {item.date}
                        </td>

                        {/* Title */}
                        <td className="py-3.5 px-4 font-medium text-white max-w-xs sm:max-w-md truncate">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-slate-500 text-[10px]">{item.id}</span>
                            <span className="truncate group-hover:text-cyan-300 transition-colors">{item.title}</span>
                          </div>
                        </td>

                        {/* Type */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-medium">
                            {item.type === 'Text' && <FileText className="w-3 h-3 text-cyan-400" />}
                            {item.type === 'Image' && <ImageIcon className="w-3 h-3 text-indigo-400" />}
                            {item.type === 'Video' && <Video className="w-3 h-3 text-purple-400" />}
                            <span>{item.type}</span>
                          </span>
                        </td>

                        {/* Verdict */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-bold ${
                            isFake
                              ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                              : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                          }`}>
                            {isFake ? <ShieldAlert className="w-3 h-3 text-rose-400" /> : <ShieldCheck className="w-3 h-3 text-emerald-400" />}
                            <span>{item.verdict}</span>
                          </span>
                        </td>

                        {/* Confidence */}
                        <td className="py-3.5 px-4 font-mono whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <div className="w-14 h-1.5 rounded-full bg-slate-800 overflow-hidden">
                              <div
                                className={`h-full rounded-full ${isFake ? 'bg-rose-500' : 'bg-emerald-500'}`}
                                style={{ width: `${item.confidence}%` }}
                              />
                            </div>
                            <span className="text-white font-semibold">{item.confidence}%</span>
                          </div>
                        </td>

                        {/* Status */}
                        <td className="py-3.5 px-4 text-slate-400 whitespace-nowrap">
                          <span className="text-[11px]">{item.status}</span>
                        </td>

                        {/* Actions */}
                        <td className="py-3.5 px-4 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                            <button
                              onClick={() => navigate(`/results/${item.id}`)}
                              className="px-2.5 py-1 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-medium transition-all flex items-center gap-1"
                            >
                              <span>Open Report</span>
                              <ExternalLink className="w-3 h-3" />
                            </button>
                            <button
                              onClick={() => deleteHistoryItem(item.id)}
                              className="p-1 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-950/30 transition-all"
                              title="Delete record"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>

    </div>
  );
}
