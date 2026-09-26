import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { 
  ShieldAlert, 
  ShieldCheck, 
  Download, 
  Share2, 
  ArrowLeft, 
  Globe, 
  Search, 
  FileCode, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Sparkles, 
  Check, 
  Copy, 
  RefreshCw, 
  ExternalLink,
  Layers,
  FileText,
  Clock,
  Info
} from 'lucide-react';
import { useAnalysis } from '../context/AnalysisContext';
import { DEMO_SAMPLES } from '../data/demoData';
import GaugeChart from '../components/GaugeChart';
import ExplainableHighlight from '../components/ExplainableHighlight';
import ImageHeatmapViewer from '../components/ImageHeatmapViewer';
import EvidenceCard from '../components/EvidenceCard';
import { generatePDFReport } from '../utils/pdfExport';

export default function ResultPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentResult, history } = useAnalysis();

  const [copied, setCopied] = useState(false);
  const [resultData, setResultData] = useState(null);

  useEffect(() => {
    // 1. Check current active result in context
    if (currentResult && (currentResult.id === id || !id)) {
      setResultData(currentResult);
      return;
    }

    // 2. Check history
    const fromHistory = history.find(h => h.id === id);
    if (fromHistory?.fullData) {
      setResultData(fromHistory.fullData);
      return;
    }

    // 3. Fallback to demo samples
    const allDemos = [
      ...DEMO_SAMPLES.text,
      ...DEMO_SAMPLES.image,
      ...DEMO_SAMPLES.video
    ];
    const foundDemo = allDemos.find(d => d.id === id || d.title.includes(id));
    if (foundDemo) {
      setResultData(foundDemo);
    } else {
      // Default to demo sample 1
      setResultData(DEMO_SAMPLES.text[0]);
    }
  }, [id, currentResult, history]);

  const isFake = resultData?.expectedVerdict === 'FAKE' || resultData?.expectedVerdict === 'DEEPFAKE';

  useEffect(() => {
    // Trigger confetti if genuine
    if (resultData && !isFake) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }, [resultData, isFake]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadPDF = () => {
    if (resultData) {
      generatePDFReport(resultData);
    }
  };

  if (!resultData) {
    return (
      <div className="min-h-screen bg-[#07090e] flex items-center justify-center text-slate-400">
        <div className="flex items-center gap-3">
          <RefreshCw className="w-5 h-5 animate-spin text-cyan-400" />
          <span>Loading Forensic Verification Report...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 py-8 sm:py-12 px-4 sm:px-6 lg:px-8 relative">
      
      {/* Background ambient lighting */}
      <div className={`absolute top-0 right-1/3 w-[600px] h-[500px] rounded-full blur-[140px] pointer-events-none ${
        isFake ? 'bg-rose-600/10' : 'bg-emerald-600/10'
      }`} />

      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Navigation & Action Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <button
            onClick={() => navigate('/detect')}
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white bg-slate-900/60 hover:bg-slate-800 px-3 py-2 rounded-xl border border-slate-800 transition-all"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={handleCopyLink}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-300 bg-slate-900 hover:bg-slate-800 border border-slate-700 transition-all"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
              <span>{copied ? 'Link Copied' : 'Share Report'}</span>
            </button>

            <button
              onClick={handleDownloadPDF}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-lg shadow-cyan-500/20 hover:scale-105 transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Download PDF Report</span>
            </button>
          </div>
        </div>

        {/* ---------------- 1. LARGE RESULT CARD ---------------- */}
        <div className={`p-6 sm:p-8 rounded-2xl glass-panel relative overflow-hidden border ${
          isFake ? 'border-rose-500/40 shadow-2xl shadow-rose-950/20' : 'border-emerald-500/40 shadow-2xl shadow-emerald-950/20'
        }`}>
          
          {/* Top Banner Status */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 pb-6 border-b border-slate-800">
            
            {/* Status Badge & Headline */}
            <div className="space-y-2 max-w-2xl">
              <div className="flex flex-wrap items-center gap-3">
                {/* Large Status Badge */}
                <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-xl text-sm font-extrabold tracking-wide uppercase shadow-lg ${
                  isFake
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/50 shadow-rose-500/20'
                    : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 shadow-emerald-500/20'
                }`}>
                  {isFake ? <ShieldAlert className="w-5 h-5 text-rose-400" /> : <ShieldCheck className="w-5 h-5 text-emerald-400" />}
                  <span>{resultData.expectedVerdict || (isFake ? 'FAKE / MISINFORMATION' : 'LIKELY GENUINE')}</span>
                </span>

                <span className="text-xs font-mono text-slate-400">
                  Forensic ID: {resultData.id || 'TL-98214'}
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug">
                {resultData.title || 'Analyzed Media Subject'}
              </h2>
              
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-1">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-cyan-400" /> {resultData.analyzedAt || 'Just now'}
                </span>
                <span className="flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-400" /> Model: {resultData.aiModel || 'TruthLens-RoBERTa-v4'}
                </span>
              </div>
            </div>

            {/* Gauge Chart & Confidence Readout */}
            <div className="flex flex-col items-center justify-center p-3 rounded-2xl bg-slate-900/60 border border-slate-800 shrink-0">
              <GaugeChart
                score={resultData.confidence || 94}
                isFake={isFake}
                size={200}
              />
            </div>

          </div>

          {/* Key Metric Indicators Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
            
            {/* Risk Level */}
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400">Risk Assessment</span>
                <div className={`text-base font-bold uppercase tracking-wider ${
                  resultData.riskLevel === 'Critical' ? 'text-rose-400' : (resultData.riskLevel === 'High' ? 'text-amber-400' : 'text-emerald-400')
                }`}>
                  {resultData.riskLevel || (isFake ? 'High Risk' : 'Low Risk')}
                </div>
              </div>
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                isFake ? 'bg-rose-500/10 text-rose-400' : 'bg-emerald-500/10 text-emerald-400'
              }`}>
                {isFake ? <AlertTriangle className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
              </div>
            </div>

            {/* Recommendation */}
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400">Action Recommendation</span>
                <div className={`text-base font-bold ${
                  resultData.recommendation?.toLowerCase().includes('do not') ? 'text-rose-400' : 'text-emerald-400'
                }`}>
                  {resultData.recommendation || (isFake ? 'Do Not Share' : 'Safe to Share')}
                </div>
              </div>
              <div className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
                <Info className="w-4 h-4" />
              </div>
            </div>

            {/* Source Credibility Score */}
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400">Source Credibility Index</span>
                <div className="text-base font-bold text-white font-mono">
                  {resultData.sourceReputation || (isFake ? '14/100' : '98/100')}
                </div>
              </div>
              <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
                <Globe className="w-4 h-4" />
              </div>
            </div>

          </div>

        </div>

        {/* ---------------- 2. EXPLANATION SECTION ---------------- */}
        <div className="p-6 sm:p-8 rounded-2xl glass-panel space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Explainable AI (XAI) Salience & Diagnostics</h3>
              <p className="text-xs text-slate-400">Comprehensive reasoning why our ensemble classified this content.</p>
            </div>
          </div>

          {/* Key Explanation Points */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Model Diagnostic Findings:
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {(resultData.explanations || [
                'The article contains emotionally manipulative language, unsupported claims and matches multiple misinformation patterns.',
                'Lacks peer-reviewed citations or verifiable origin author masthead.'
              ]).map((exp, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-200 flex items-start gap-3"
                >
                  <span className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 text-[10px] font-mono font-bold ${
                    isFake ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40' : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                  }`}>
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed">{exp}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Modality Breakdown */}
          {resultData.fullText && (
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Interactive Text Salience Map (Hover/Tap tokens for details):
              </h4>
              <ExplainableHighlight
                fullText={resultData.fullText}
                highlights={resultData.highlights || []}
                isFake={isFake}
              />
            </div>
          )}

          {(resultData.imagePreview || resultData.videoPreview) && (
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Visual Forensics & Frequency Domain Analysis:
              </h4>
              <ImageHeatmapViewer
                imageUrl={resultData.imagePreview || resultData.videoPreview}
                isFake={isFake}
                artifacts={resultData.artifactsFound || []}
                title={resultData.title}
              />
            </div>
          )}

        </div>

        {/* ---------------- 3. EVIDENCE SECTION ---------------- */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <FileCode className="w-4 h-4 text-cyan-400" />
            <h3 className="text-lg font-bold text-white">Forensic Evidence & Cross-Checks</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Card 1: Source Credibility */}
            <EvidenceCard
              title="Source Credibility & Domain Trust"
              icon={Globe}
              status={resultData.evidence?.sourceCredibility?.status || (isFake ? 'danger' : 'success')}
              badgeText={resultData.evidence?.sourceCredibility?.status === 'danger' ? 'Suspicious Origin' : 'Verified Entity'}
              subtitle="WHOIS, Registration Age & Domain Authority"
            >
              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">Trust Classification:</span>
                  <span className="font-semibold text-slate-200">{resultData.evidence?.sourceCredibility?.label || 'Analyzed Domain'}</span>
                </div>
                <p className="text-slate-400 leading-relaxed pt-1">
                  {resultData.evidence?.sourceCredibility?.details || 'Domain inspected for editorial transparency and bot amplification networks.'}
                </p>
              </div>
            </EvidenceCard>

            {/* Card 2: Fact Checking References */}
            <EvidenceCard
              title="Fact-Checking References & Matches"
              icon={Search}
              status={isFake ? 'danger' : 'success'}
              badgeText={`${resultData.evidence?.factCheckMatches?.length || 0} Cross-Checks`}
              subtitle="Global Fact-Checking Network (GFCN) Database"
            >
              <div className="space-y-2">
                {(resultData.evidence?.factCheckMatches || [
                  { agency: 'Reuters Fact Check', verdict: isFake ? 'False Claim' : 'Verified Context', matchRate: 96 }
                ]).map((fc, i) => (
                  <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-slate-900 border border-slate-800 text-xs">
                    <span className="font-medium text-slate-300">{fc.agency}</span>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                        fc.verdict.toLowerCase().includes('false') || fc.verdict.toLowerCase().includes('fabricated')
                          ? 'bg-rose-500/20 text-rose-300'
                          : 'bg-emerald-500/20 text-emerald-300'
                      }`}>
                        {fc.verdict}
                      </span>
                      <span className="font-mono text-slate-500 text-[10px]">{fc.matchRate}% Match</span>
                    </div>
                  </div>
                ))}
              </div>
            </EvidenceCard>

            {/* Card 3: Reverse Web Duplication */}
            <EvidenceCard
              title="Reverse Web & Syndication Duplication"
              icon={Layers}
              status={isFake ? 'warning' : 'neutral'}
              badgeText={`${resultData.evidence?.reverseCrossReference?.duplicateSyndications || 0} Syndications`}
              subtitle="Digital Fingerprint & Earliest Appearance"
            >
              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">Earliest Timestamp:</span>
                  <span className="font-mono text-slate-200">{resultData.evidence?.reverseCrossReference?.earliestTimestamp || '2026-08-31'}</span>
                </div>
                <p className="text-slate-400 leading-relaxed pt-1">
                  {resultData.evidence?.reverseCrossReference?.verdictSummary || 'Synchronized syndicated news pattern across authoritative channels.'}
                </p>
              </div>
            </EvidenceCard>

            {/* Card 4: Metadata Inspection */}
            <EvidenceCard
              title="Cryptographic Metadata & Sensor Inspection"
              icon={FileCode}
              status={isFake ? 'danger' : 'success'}
              badgeText="EXIF / C2PA"
              subtitle="Hardware PRNU & Container Fingerprint"
            >
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">Hardware / Camera:</span>
                  <span className="text-slate-200">{resultData.evidence?.metadataInspection?.exifCamera || 'None / Virtual Synthetic'}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">Software Signature:</span>
                  <span className="text-slate-200">{resultData.evidence?.metadataInspection?.software || 'Diffusion Model Latent Grid'}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-400">Sensor Verification:</span>
                  <span className="text-slate-200">{resultData.evidence?.metadataInspection?.sensorSignature || 'Zero Physical Noise'}</span>
                </div>
              </div>
            </EvidenceCard>

          </div>
        </div>

        {/* ---------------- 4. ACTION TIPS & RECOMMENDATIONS ---------------- */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-cyan-400" />
            Recommended Safety Guidelines
          </h4>
          <ul className="space-y-2 text-xs text-slate-300">
            {(resultData.actionTips || [
              'Do not share this post on social media to prevent further algorithmic amplification.',
              'Cross-check any unverified health/political claims with certified registries.'
            ]).map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Bottom Action Footer */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800">
          <Link
            to="/detect"
            className="px-6 py-3 rounded-xl text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-all flex items-center gap-2"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Analyze Another Article / File
          </Link>

          <div className="flex items-center gap-3">
            <button
              onClick={handleDownloadPDF}
              className="px-6 py-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 transition-all flex items-center gap-2"
            >
              <Download className="w-3.5 h-3.5" /> Export PDF Audit
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
