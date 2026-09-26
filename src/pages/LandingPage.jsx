import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  Search, 
  Cpu, 
  Layers, 
  CheckCircle2, 
  AlertTriangle, 
  FileText, 
  Image as ImageIcon, 
  Video, 
  Zap, 
  Lock, 
  TrendingUp,
  Award,
  Globe,
  Database
} from 'lucide-react';
import { useAnalysis } from '../context/AnalysisContext';

export default function LandingPage() {
  const navigate = useNavigate();
  const { startAnalysis } = useAnalysis();

  const handleQuickDemo = async (type, sampleId) => {
    navigate('/detect');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="relative min-h-screen bg-slate-50 text-slate-900 overflow-hidden">
      <div className="absolute inset-0 bg-cyber-grid opacity-60" />
      <div className="absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-blue-50 to-transparent" />

      <section className="relative pt-24 pb-20 sm:pt-28 sm:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="text-center max-w-4xl mx-auto space-y-8"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 text-slate-700 text-xs font-semibold shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Quick AI content check</span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05]"
          >
            <span className="block text-slate-900">Check what’s real.</span>
            <span className="block text-gradient mt-2">Before you share it.</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed"
          >
            Review text, images, and videos for synthetic signals, AI-generated edits, and suspicious content in a cleaner, easier workflow.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2"
          >
            <button
              onClick={() => navigate('/detect')}
              className="w-full sm:w-auto px-8 py-4 rounded-xl text-base font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md transition-all flex items-center justify-center gap-3 group"
            >
              <span>Start verification</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <a
              href="#how-it-works"
              className="w-full sm:w-auto px-8 py-4 rounded-xl text-base font-semibold text-slate-700 bg-white border border-slate-200 hover:border-slate-300 transition-all"
            >
              Learn more
            </a>
          </motion.div>

          <motion.div variants={itemVariants} className="pt-8">
            <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 shadow-sm text-left">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-200">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-amber-400" />
                    <div className="w-3 h-3 rounded-full bg-emerald-400" />
                  </div>
                  <span className="text-xs font-mono text-slate-500">Verification workspace</span>
                </div>
                <span className="text-xs px-2.5 py-1 rounded bg-blue-50 text-blue-700 font-medium">Multi-modal checks</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-5">
                <div onClick={() => navigate('/detect')} className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-blue-200 cursor-pointer transition-all">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2 text-blue-700 text-xs font-semibold"><FileText className="w-4 h-4" /> Article scan</div>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-rose-50 text-rose-600 font-semibold">Check</span>
                  </div>
                  <p className="text-xs text-slate-600">Paste a post or article and review if it contains manipulative or misleading claims.</p>
                </div>

                <div onClick={() => navigate('/detect')} className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-indigo-200 cursor-pointer transition-all">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2 text-indigo-700 text-xs font-semibold"><ImageIcon className="w-4 h-4" /> Image scan</div>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-violet-50 text-violet-700 font-semibold">AI-aware</span>
                  </div>
                  <p className="text-xs text-slate-600">Upload any AI-generated image or edited photo to compare visual signals and metadata cues.</p>
                </div>

                <div onClick={() => navigate('/detect')} className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-emerald-200 cursor-pointer transition-all">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2 text-emerald-700 text-xs font-semibold"><CheckCircle2 className="w-4 h-4" /> Verified report</div>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 font-semibold">Ready</span>
                  </div>
                  <p className="text-xs text-slate-600">Generate a concise forensic summary with confidence and evidence notes.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      <section className="py-12 border-y border-slate-200 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="text-3xl sm:text-4xl font-extrabold text-blue-700 font-mono">99.4%</div>
              <div className="text-sm font-semibold text-slate-900 mt-1">Signal accuracy</div>
              <p className="text-xs text-slate-500 mt-1">Useful benchmark for detection confidence</p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-mono">3 modes</div>
              <div className="text-sm font-semibold text-slate-900 mt-1">Text, image, video</div>
              <p className="text-xs text-slate-500 mt-1">Review all major content types in one place</p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="text-3xl sm:text-4xl font-extrabold text-blue-700 font-mono">&lt; 1s</div>
              <div className="text-sm font-semibold text-slate-900 mt-1">Fast checks</div>
              <p className="text-xs text-slate-500 mt-1">Quick scan workflow for everyday users</p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-mono">Clear</div>
              <div className="text-sm font-semibold text-slate-900 mt-1">Explainable results</div>
              <p className="text-xs text-slate-500 mt-1">Simple findings with practical action steps</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-xs uppercase font-bold tracking-[0.2em] text-blue-700">What it helps with</h2>
          <h3 className="text-3xl sm:text-5xl font-extrabold text-slate-900">A cleaner, easier verification flow</h3>
          <p className="text-slate-600 text-sm sm:text-base">Designed to be faster and easier to use while still showing useful evidence behind each verdict.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Feature 1 */}
          <div className="p-6 rounded-2xl glass-card flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-5">
                <FileText className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-2">Fake news checks</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Review sensational language, emotional framing, and unsupported claims in a straightforward summary.
              </p>
            </div>
            <div className="mt-5 pt-4 border-t border-slate-200 flex items-center gap-2 text-xs text-blue-700 font-medium">
              <CheckCircle2 className="w-4 h-4" /> Quick linguistic review
            </div>
          </div>

          {/* Feature 2 */}
          <div className="p-6 rounded-2xl glass-card flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mb-5">
                <Cpu className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-2">AI image detection</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Review uploaded images from Midjourney, DALL·E, Stable Diffusion, or other tools for synthetic patterns and metadata clues.
              </p>
            </div>
            <div className="mt-5 pt-4 border-t border-slate-200 flex items-center gap-2 text-xs text-indigo-700 font-medium">
              <CheckCircle2 className="w-4 h-4" /> Works across AI tools
            </div>
          </div>

          {/* Feature 3 */}
          <div className="p-6 rounded-2xl glass-card flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-5">
                <Award className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-2">Confidence score</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Get a simple score plus clear notes on how strong the evidence is before you trust or share content.
              </p>
            </div>
            <div className="mt-5 pt-4 border-t border-slate-200 flex items-center gap-2 text-xs text-violet-700 font-medium">
              <CheckCircle2 className="w-4 h-4" /> Clear risk estimate
            </div>
          </div>

          {/* Feature 4 */}
          <div className="p-6 rounded-2xl glass-card flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-5">
                <Globe className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-2">Source checks</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Review domain trust and other verification signals to understand whether a source looks credible or suspicious.
              </p>
            </div>
            <div className="mt-5 pt-4 border-t border-slate-200 flex items-center gap-2 text-xs text-emerald-700 font-medium">
              <CheckCircle2 className="w-4 h-4" /> Trust and context
            </div>
          </div>

          {/* Feature 5 */}
          <div className="p-6 rounded-2xl glass-card flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 mb-5">
                <Layers className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-2">Explainable findings</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Understand the key reasons behind a verdict without digging through technical jargon or hidden black-box output.
              </p>
            </div>
            <div className="mt-5 pt-4 border-t border-slate-200 flex items-center gap-2 text-xs text-rose-600 font-medium">
              <CheckCircle2 className="w-4 h-4" /> Clear reasoning
            </div>
          </div>

          {/* Feature 6 */}
          <div className="p-6 rounded-2xl glass-card flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-5">
                <FileText className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-2">Shareable reports</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Export the outcome as a professional summary for internal review, client reporting, or a final audit trail.
              </p>
            </div>
            <div className="mt-5 pt-4 border-t border-slate-200 flex items-center gap-2 text-xs text-amber-700 font-medium">
              <CheckCircle2 className="w-4 h-4" /> PDF export available
            </div>
          </div>

        </div>
      </section>

      {/* ---------------- 4. HOW IT WORKS ---------------- */}
      <section id="how-it-works" className="py-24 border-t border-slate-800/80 bg-[#06090e] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-xs uppercase font-bold tracking-widest text-cyan-400">
              Simple 3-Step Verification
            </h2>
            <h3 className="text-3xl sm:text-5xl font-extrabold text-white">
              How TruthLens Works
            </h3>
            <p className="text-slate-400 text-sm sm:text-base">
              Autonomous multi-layer pipeline designed for journalists, researchers, and everyday citizens.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            
            {/* Step 1 */}
            <div className="relative p-8 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 text-xl font-bold font-mono mb-6 shadow-lg shadow-cyan-500/10">
                1
              </div>
              <h4 className="text-xl font-bold text-white mb-3">Upload or Paste</h4>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Paste any article text, drop suspicious imagery, or upload video clips directly into the unified dashboard.
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative p-8 rounded-2xl bg-slate-900/60 border border-cyan-500/30 shadow-lg shadow-cyan-500/5 flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center text-white text-xl font-bold font-mono mb-6 shadow-lg shadow-cyan-500/25">
                2
              </div>
              <h4 className="text-xl font-bold text-white mb-3">AI Multi-Model Analysis</h4>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Our ensemble scans linguistic vectors, performs Fourier frequency transforms, checks metadata, and cross-references global fact databases.
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative p-8 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 text-xl font-bold font-mono mb-6 shadow-lg shadow-indigo-500/10">
                3
              </div>
              <h4 className="text-xl font-bold text-white mb-3">View Report & Evidence</h4>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Get an explainable breakdown, confidence gauge, risk recommendation, and download a verifiable PDF forensic certificate.
              </p>
            </div>

          </div>

          {/* Bottom Banner */}
          <div className="mt-16 text-center">
            <button
              onClick={() => navigate('/detect')}
              className="px-8 py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 shadow-xl shadow-cyan-500/25 hover:scale-105 transition-all inline-flex items-center gap-2"
            >
              <span>Launch Detection Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </section>

    </div>
  );
}
