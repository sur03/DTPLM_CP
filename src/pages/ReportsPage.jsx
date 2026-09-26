import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FileText, 
  Download, 
  ExternalLink, 
  Search, 
  ShieldAlert, 
  ShieldCheck, 
  CheckCircle2, 
  Filter, 
  Sparkles,
  ArrowRight,
  Printer
} from 'lucide-react';
import { useAnalysis } from '../context/AnalysisContext';
import { DEMO_SAMPLES } from '../data/demoData';
import { generatePDFReport } from '../utils/pdfExport';

export default function ReportsPage() {
  const navigate = useNavigate();
  const { history } = useAnalysis();
  const [search, setSearch] = useState('');

  // Combine sample reports and history
  const allReports = [
    ...DEMO_SAMPLES.text.map(t => ({ ...t, type: 'Text', date: '2026-08-31 21:00' })),
    ...DEMO_SAMPLES.image.map(i => ({ ...i, type: 'Image', date: '2026-08-31 18:30' })),
    ...DEMO_SAMPLES.video.map(v => ({ ...v, type: 'Video', date: '2026-08-30 22:15' })),
  ];

  const filtered = allReports.filter(r => 
    r.title.toLowerCase().includes(search.toLowerCase()) ||
    r.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 py-8 sm:py-12 px-4 sm:px-6 lg:px-8 relative">
      
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4" /> Official Certificates
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Forensic Verification Reports
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Browse, view, and export tamper-evident Explainable AI verification audit certificates.
            </p>
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search reports..."
              className="w-full bg-slate-900/80 border border-slate-700/80 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>
        </div>

        {/* Reports Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((report) => {
            const isFake = report.expectedVerdict === 'FAKE' || report.expectedVerdict === 'DEEPFAKE';
            return (
              <div
                key={report.id}
                className="p-6 rounded-2xl glass-card flex flex-col justify-between border border-slate-800 hover:border-cyan-500/40 transition-all group"
              >
                <div>
                  {/* Top badges */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg text-xs font-bold ${
                      isFake
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                        : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    }`}>
                      {isFake ? <ShieldAlert className="w-3.5 h-3.5" /> : <ShieldCheck className="w-3.5 h-3.5" />}
                      <span>{report.expectedVerdict}</span>
                    </span>

                    <span className="text-[11px] font-mono text-cyan-400 font-semibold">
                      {report.confidence}% Conf.
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-2 mb-2">
                    {report.title}
                  </h3>

                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-4">
                    {report.explanations?.[0] || 'Comprehensive forensic inspection conducted.'}
                  </p>

                  <div className="space-y-1 text-[11px] text-slate-500 pt-2 border-t border-slate-800/80">
                    <div className="flex justify-between">
                      <span>Category:</span>
                      <span className="text-slate-300">{report.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Model:</span>
                      <span className="text-slate-300">{report.aiModel}</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between gap-2">
                  <button
                    onClick={() => navigate(`/results/${report.id}`)}
                    className="flex-1 px-3 py-2 rounded-xl text-xs font-semibold bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>View Report</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => generatePDFReport(report)}
                    className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all"
                    title="Download PDF"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>

    </div>
  );
}
