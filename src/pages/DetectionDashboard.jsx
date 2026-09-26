import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, 
  Image as ImageIcon, 
  Video, 
  Sparkles, 
  Upload, 
  Link as LinkIcon, 
  Trash2, 
  History, 
  ArrowRight, 
  AlertCircle, 
  CheckCircle2, 
  Sliders, 
  Layers, 
  Eye, 
  FileCode,
  Check
} from 'lucide-react';
import { useAnalysis } from '../context/AnalysisContext';
import { DEMO_SAMPLES } from '../data/demoData';
import LoadingScanner from '../components/LoadingScanner';

export default function DetectionDashboard() {
  const navigate = useNavigate();
  const { startAnalysis, isScanning, scanStageIndex, scanProgress, scanningLogs, history } = useAnalysis();

  const [activeTab, setActiveTab] = useState('text'); // 'text' | 'image' | 'video'
  
  // Text Tab State
  const [textContent, setTextContent] = useState('');
  const [articleUrl, setArticleUrl] = useState('');
  
  // Image Tab State
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  
  // Video Tab State
  const [videoFile, setVideoFile] = useState(null);
  const [videoUrl, setVideoUrl] = useState('');

  // Selected Demo Preset Tracking
  const [selectedSampleId, setSelectedSampleId] = useState(null);

  // Settings in Dashboard
  const [sensitivity, setSensitivity] = useState('standard'); // 'standard' | 'strict' | 'relaxed'

  // Handle Text Sample Selection
  const applyTextSample = (sample) => {
    setTextContent(sample.fullText);
    setSelectedSampleId(sample.id);
  };

  // Handle Image Upload
  const handleImageFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setSelectedSampleId(null);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle Video Upload
  const handleVideoFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setVideoFile(file);
      setSelectedSampleId(null);
      setVideoUrl(URL.createObjectURL(file));
    }
  };

  // Trigger Analysis
  const handleAnalyze = async () => {
    let payload = {
      type: activeTab,
      sensitivity
    };

    if (activeTab === 'text') {
      if (!textContent.trim()) return;
      payload.content = textContent;
      payload.sampleId = selectedSampleId;
    } else if (activeTab === 'image') {
      if (!imagePreview && !selectedSampleId) return;
      payload.mediaUrl = imagePreview;
      payload.sampleId = selectedSampleId;
    } else if (activeTab === 'video') {
      if (!videoUrl && !selectedSampleId) return;
      payload.mediaUrl = videoUrl;
      payload.sampleId = selectedSampleId;
    }

    await startAnalysis(payload, (result) => {
      navigate(`/results/${result.id}`);
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 py-8 sm:py-12 px-4 sm:px-6 lg:px-8 relative">
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-100 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-indigo-100 blur-[120px] pointer-events-none rounded-full" />

      {/* Loading Overlay */}
      {isScanning && (
        <LoadingScanner
          stageIndex={scanStageIndex}
          progress={scanProgress}
          logs={scanningLogs}
        />
      )}

      <div className="max-w-7xl mx-auto space-y-8">
        
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-200 pb-6">
          <div>
            <div className="flex items-center gap-2 text-blue-700 text-xs font-semibold uppercase tracking-[0.2em] mb-1">
              <Sparkles className="w-4 h-4" /> Verification workspace
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Detect suspicious content quickly
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Paste text or upload a file to check whether it looks manipulated, synthetic, or unreliable.
            </p>
          </div>

          {/* Quick presets pills */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-slate-400 font-medium mr-1 hidden sm:inline">Quick Demos:</span>
            <button
              onClick={() => {
                setActiveTab('text');
                applyTextSample(DEMO_SAMPLES.text[0]);
              }}
              className="px-3 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 text-xs font-medium transition-all"
            >
              ⚠️ Fake news sample
            </button>
            <button
              onClick={() => {
                setActiveTab('text');
                applyTextSample(DEMO_SAMPLES.text[1]);
              }}
              className="px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-700 text-xs font-medium transition-all"
            >
              ✅ Verified article
            </button>
            <button
              onClick={() => {
                setActiveTab('image');
                setSelectedSampleId(DEMO_SAMPLES.image[0].id);
                setImagePreview(DEMO_SAMPLES.image[0].imagePreview);
              }}
              className="px-3 py-1.5 rounded-lg bg-violet-50 hover:bg-violet-100 border border-violet-200 text-violet-700 text-xs font-medium transition-all"
            >
              🎭 Deepfake demo
            </button>
          </div>
        </div>

        {/* Main Grid: Left Main Card + Right Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Verification Card (8 Cols) */}
          <div className="lg:col-span-8 space-y-6">
            
            <div className="p-6 sm:p-8 rounded-2xl glass-panel relative overflow-hidden">
              
              {/* Top Card Bar: Modality Tabs */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-5 mb-6">
                
                {/* 3 Modality Tabs */}
                <div className="flex items-center p-1 bg-slate-900/90 rounded-xl border border-slate-800">
                  <button
                    onClick={() => {
                      setActiveTab('text');
                      setSelectedSampleId(null);
                    }}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                      activeTab === 'text'
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <FileText className="w-4 h-4" />
                    <span>TEXT</span>
                  </button>

                  <button
                    onClick={() => {
                      setActiveTab('image');
                      setSelectedSampleId(null);
                    }}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                      activeTab === 'image'
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <ImageIcon className="w-4 h-4" />
                    <span>IMAGE</span>
                  </button>

                  <button
                    onClick={() => {
                      setActiveTab('video');
                      setSelectedSampleId(null);
                    }}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                      activeTab === 'video'
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Video className="w-4 h-4" />
                    <span>VIDEO</span>
                  </button>
                </div>

                {/* Sensitivity Selector */}
                <div className="flex items-center gap-2">
                  <Sliders className="w-3.5 h-3.5 text-slate-400" />
                  <span className="text-xs text-slate-400">Sensitivity:</span>
                  <select
                    value={sensitivity}
                    onChange={(e) => setSensitivity(e.target.value)}
                    className="bg-slate-900 border border-slate-700 text-slate-300 rounded-lg px-2.5 py-1 text-xs focus:outline-none focus:border-cyan-500"
                  >
                    <option value="standard">Standard (Balanced)</option>
                    <option value="strict">Strict (High Recall)</option>
                    <option value="relaxed">Relaxed (High Precision)</option>
                  </select>
                </div>

              </div>

              {/* ---------------- 1. TEXT TAB ---------------- */}
              {activeTab === 'text' && (
                <div className="space-y-4 animate-in fade-in duration-300">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-cyan-400" /> Article Content or Social Post
                    </label>
                    <span className="text-xs text-slate-400 font-mono">
                      {textContent.length} chars | {textContent.trim() ? textContent.trim().split(/\s+/).length : 0} words
                    </span>
                  </div>

                  {/* Large Text Area */}
                  <div className="relative">
                    <textarea
                      rows={8}
                      value={textContent}
                      onChange={(e) => {
                        setTextContent(e.target.value);
                        setSelectedSampleId(null);
                      }}
                      placeholder="Paste news article, breaking social media post, headline, or claim here..."
                      className="w-full bg-[#05070c] border border-slate-800 rounded-xl p-4 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/80 focus:ring-1 focus:ring-cyan-500/50 transition-all font-sans leading-relaxed"
                    />

                    {textContent && (
                      <button
                        onClick={() => {
                          setTextContent('');
                          setSelectedSampleId(null);
                        }}
                        className="absolute top-3 right-3 p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-rose-400 transition-all text-xs"
                        title="Clear text"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  {/* Sample Presets for Quick Demo */}
                  <div className="space-y-2 pt-2">
                    <span className="text-xs font-medium text-slate-400">Load sample demo article:</span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {DEMO_SAMPLES.text.map((s) => {
                        const isSelected = selectedSampleId === s.id;
                        return (
                          <div
                            key={s.id}
                            onClick={() => applyTextSample(s)}
                            className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                              isSelected
                                ? 'bg-cyan-950/60 border-cyan-500/50 text-cyan-200'
                                : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-300'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-1">
                              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                                s.expectedVerdict === 'FAKE' ? 'bg-rose-500/20 text-rose-300' : 'bg-emerald-500/20 text-emerald-300'
                              }`}>
                                {s.expectedVerdict}
                              </span>
                              <span className="text-[10px] text-slate-400">{s.category}</span>
                            </div>
                            <p className="text-xs font-medium truncate">{s.title}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Analyze Button */}
                  <div className="pt-4 flex items-center justify-end">
                    <button
                      disabled={!textContent.trim() || isScanning}
                      onClick={handleAnalyze}
                      className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-2"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>Analyze Article</span>
                    </button>
                  </div>
                </div>
              )}

              {/* ---------------- 2. IMAGE TAB ---------------- */}
              {activeTab === 'image' && (
                <div className="space-y-5 animate-in fade-in duration-300">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-700 flex items-center gap-1.5">
                      <ImageIcon className="w-3.5 h-3.5 text-indigo-600" /> AI-generated or uploaded image
                    </label>
                    <span className="text-xs text-slate-500">JPG, PNG, WEBP, TIFF • up to 25MB</span>
                  </div>

                  {!imagePreview ? (
                    <label className="border-2 border-dashed border-slate-300 hover:border-blue-300 bg-white rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer transition-all text-center group shadow-sm">
                      <div className="w-16 h-16 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 mb-4 group-hover:scale-105 transition-transform">
                        <Upload className="w-7 h-7" />
                      </div>
                      <span className="text-sm font-semibold text-slate-900 mb-1">
                        Upload any image to check it
                      </span>
                      <span className="text-xs text-slate-500 max-w-sm">
                        Works for AI-generated photos, edited images, and standard uploads from many different creation tools.
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageFileChange}
                        className="hidden"
                      />
                    </label>
                  ) : (
                    <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-black max-h-96 flex items-center justify-center shadow-sm">
                      <img
                        src={imagePreview}
                        alt="Upload preview"
                        className="w-full h-80 object-cover"
                      />
                      <button
                        onClick={() => {
                          setImagePreview('');
                          setSelectedImage(null);
                          setSelectedSampleId(null);
                        }}
                        className="absolute top-3 right-3 p-2 rounded-xl bg-slate-900/80 hover:bg-rose-950 border border-slate-700 text-slate-300 hover:text-rose-400 transition-all text-xs flex items-center gap-1.5"
                      >
                        <Trash2 className="w-4 h-4" /> Remove Image
                      </button>
                    </div>
                  )}

                  {/* Preset Demo Images */}
                  <div className="space-y-2 pt-2">
                    <span className="text-xs font-medium text-slate-400">Or choose a benchmark test image:</span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {DEMO_SAMPLES.image.map((img) => (
                        <div
                          key={img.id}
                          onClick={() => {
                            setSelectedSampleId(img.id);
                            setImagePreview(img.imagePreview);
                          }}
                          className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center gap-3 ${
                            selectedSampleId === img.id
                              ? 'bg-indigo-950/60 border-indigo-500/60'
                              : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                          }`}
                        >
                          <img
                            src={img.imagePreview}
                            alt={img.title}
                            className="w-12 h-12 rounded-lg object-cover border border-slate-700 shrink-0"
                          />
                          <div className="overflow-hidden">
                            <div className="flex items-center gap-2 mb-0.5">
                              <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${
                                img.expectedVerdict === 'DEEPFAKE' ? 'bg-rose-500/20 text-rose-300' : 'bg-emerald-500/20 text-emerald-300'
                              }`}>
                                {img.expectedVerdict}
                              </span>
                            </div>
                            <p className="text-xs text-slate-200 truncate">{img.title}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Analyze Button */}
                  <div className="pt-4 flex items-center justify-end">
                    <button
                      disabled={!imagePreview || isScanning}
                      onClick={handleAnalyze}
                      className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-2"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>Analyze Image</span>
                    </button>
                  </div>
                </div>
              )}

              {/* ---------------- 3. VIDEO TAB ---------------- */}
              {activeTab === 'video' && (
                <div className="space-y-5 animate-in fade-in duration-300">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                      <Video className="w-3.5 h-3.5 text-purple-400" /> Video File or Social Stream URL
                    </label>
                    <span className="text-xs text-slate-400">Supported: MP4, MOV, WEBM (Max 100MB)</span>
                  </div>

                  {/* Video Upload Box */}
                  {!videoUrl ? (
                    <label className="border-2 border-dashed border-slate-700 hover:border-purple-500/60 bg-slate-900/40 hover:bg-slate-900/80 rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer transition-all text-center group">
                      <div className="w-16 h-16 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-4 group-hover:scale-110 transition-transform">
                        <Upload className="w-7 h-7" />
                      </div>
                      <span className="text-sm font-semibold text-white mb-1">
                        Click or drag & drop video clip
                      </span>
                      <span className="text-xs text-slate-400 max-w-sm">
                        Analyzes frame-by-frame temporal consistency, Audio-Viseme lip sync synchronization, and synthetic voice vocoder harmonics.
                      </span>
                      <input
                        type="file"
                        accept="video/*"
                        onChange={handleVideoFileChange}
                        className="hidden"
                      />
                    </label>
                  ) : (
                    <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-black flex items-center justify-center">
                      <img
                        src={videoUrl}
                        alt="Video preview"
                        className="w-full h-80 object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <div className="px-4 py-2 rounded-xl bg-slate-900/90 border border-slate-700 text-xs text-slate-300 flex items-center gap-2">
                          <Video className="w-4 h-4 text-purple-400" /> Video Stream Ready for Frame Sampling
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          setVideoUrl('');
                          setVideoFile(null);
                          setSelectedSampleId(null);
                        }}
                        className="absolute top-3 right-3 p-2 rounded-xl bg-slate-900/80 hover:bg-rose-950 border border-slate-700 text-slate-300 hover:text-rose-400 transition-all text-xs flex items-center gap-1.5"
                      >
                        <Trash2 className="w-4 h-4" /> Remove Video
                      </button>
                    </div>
                  )}

                  {/* Preset Demo Video */}
                  <div className="space-y-2 pt-2">
                    <span className="text-xs font-medium text-slate-400">Or test with verified synthetic deepfake video:</span>
                    <div className="grid grid-cols-1 gap-2">
                      {DEMO_SAMPLES.video.map((vid) => (
                        <div
                          key={vid.id}
                          onClick={() => {
                            setSelectedSampleId(vid.id);
                            setVideoUrl(vid.videoPreview);
                          }}
                          className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                            selectedSampleId === vid.id
                              ? 'bg-purple-950/60 border-purple-500/60'
                              : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-300 shrink-0">
                              <Video className="w-5 h-5" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-rose-500/20 text-rose-300">
                                  {vid.expectedVerdict}
                                </span>
                                <span className="text-xs font-medium text-slate-200">{vid.title}</span>
                              </div>
                              <p className="text-[11px] text-slate-400">Lip-sync lag & Wav2Lip voice clone test</p>
                            </div>
                          </div>
                          <span className="text-xs text-purple-400 font-medium">Select</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Analyze Button */}
                  <div className="pt-4 flex items-center justify-end">
                    <button
                      disabled={!videoUrl || isScanning}
                      onClick={handleAnalyze}
                      className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-2"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>Analyze Video</span>
                    </button>
                  </div>
                </div>
              )}

            </div>

          </div>

          {/* Right Column: Recent Analyses & Node Status (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Recent Analyses Card */}
            <div className="p-6 rounded-2xl glass-panel space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2 text-white font-bold text-sm">
                  <History className="w-4 h-4 text-cyan-400" />
                  <span>Recent Analyses</span>
                </div>
                <Link
                  to="/history"
                  className="text-xs text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-1"
                >
                  View All <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

              {/* History list preview */}
              <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
                {history.slice(0, 5).map((item) => (
                  <Link
                    key={item.id}
                    to={`/results/${item.id}`}
                    className="block p-3 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all group"
                  >
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                        item.verdict.toLowerCase().includes('fake')
                          ? 'bg-rose-500/20 text-rose-300'
                          : 'bg-emerald-500/20 text-emerald-300'
                      }`}>
                        {item.verdict}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">{item.confidence}% Conf.</span>
                    </div>
                    <p className="text-xs text-slate-200 group-hover:text-cyan-300 transition-colors line-clamp-1 font-medium">
                      {item.title}
                    </p>
                    <div className="mt-1 flex items-center justify-between text-[10px] text-slate-500">
                      <span>{item.type}</span>
                      <span>{item.date}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Model Architecture Info Card */}
            <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/80 space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Active Forensic Stack
              </h4>
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between text-slate-300">
                  <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-400"></span> RoBERTa-Truth-v4</span>
                  <span className="font-mono text-slate-400">Online</span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-400"></span> EfficientNet-B7-Spatial</span>
                  <span className="font-mono text-slate-400">Online</span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-400"></span> Fast Fourier Transform FFT</span>
                  <span className="font-mono text-slate-400">Online</span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-400"></span> Global Fact-Check Vector Sync</span>
                  <span className="font-mono text-slate-400">Online</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
