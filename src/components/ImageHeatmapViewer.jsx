import React, { useState } from 'react';
import { Eye, Layers, Zap, AlertTriangle, CheckCircle2, Maximize2 } from 'lucide-react';

export default function ImageHeatmapViewer({
  imageUrl = '',
  isFake = true,
  artifacts = [],
  title = 'Visual Media Analysis'
}) {
  const [viewMode, setViewMode] = useState('heatmap'); // 'normal' | 'heatmap' | 'spectral'

  return (
    <div className="space-y-4">
      {/* Controls & View Mode Toggle */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-900/90 border border-slate-800">
          <button
            onClick={() => setViewMode('normal')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              viewMode === 'normal'
                ? 'bg-slate-800 text-white shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Standard View</span>
          </button>
          
          <button
            onClick={() => setViewMode('heatmap')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              viewMode === 'heatmap'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 shadow-sm'
                : 'text-slate-400 hover:text-cyan-300'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Artifact Map Overlay</span>
          </button>

          <button
            onClick={() => setViewMode('spectral')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              viewMode === 'spectral'
                ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 shadow-sm'
                : 'text-slate-400 hover:text-indigo-300'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>FFT Frequency Domain</span>
          </button>
        </div>

        <span className="text-xs text-slate-400 font-mono">
          Resolution: 1024x1024 (Latent Space Check)
        </span>
      </div>

      {/* Main Image Viewer Canvas */}
      <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-black aspect-video flex items-center justify-center group shadow-2xl">
        <img
          src={imageUrl || 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=800&q=80'}
          alt={title}
          className={`w-full h-full object-cover transition-all duration-500 ${
            viewMode === 'spectral' ? 'filter invert contrast-200 brightness-90 hue-rotate-180' : ''
          }`}
        />

        {/* Heatmap Overlay Simulation */}
        {viewMode === 'heatmap' && isFake && (
          <div className="absolute inset-0 pointer-events-none">
            {/* Gradient heat spots over high-artifact areas */}
            <div className="absolute top-[20%] left-[30%] w-36 h-36 rounded-full bg-rose-500/30 blur-xl animate-pulse" />
            <div className="absolute top-[40%] right-[35%] w-28 h-28 rounded-full bg-amber-500/30 blur-lg" />
            
            {/* Bounding box around face / anomaly */}
            <div className="absolute top-[18%] left-[26%] w-[48%] h-[60%] border-2 border-rose-500/80 rounded-lg shadow-[0_0_15px_rgba(244,63,94,0.5)]">
              <span className="absolute -top-3 left-3 bg-rose-600 text-white text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                Artifact Cluster: 96.8% Synth
              </span>
              <span className="absolute -bottom-3 right-3 bg-slate-900/90 border border-rose-500/40 text-rose-300 text-[10px] font-mono px-2 py-0.5 rounded">
                Latent Diffusion Residuals
              </span>
              
              {/* Corner crosshairs */}
              <div className="absolute -top-1 -left-1 w-2.5 h-2.5 border-t-2 border-l-2 border-white" />
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 border-t-2 border-r-2 border-white" />
              <div className="absolute -bottom-1 -left-1 w-2.5 h-2.5 border-b-2 border-l-2 border-white" />
              <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 border-b-2 border-r-2 border-white" />
            </div>
          </div>
        )}

        {/* FFT Frequency Simulation Overlay */}
        {viewMode === 'spectral' && (
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-cyan-900/40 via-transparent to-indigo-900/40 mix-blend-color-dodge flex items-center justify-center">
            <div className="w-48 h-48 rounded-full border border-cyan-400/40 flex items-center justify-center">
              <div className="w-32 h-32 rounded-full border border-indigo-400/40 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-white/20 blur-md" />
              </div>
            </div>
            <div className="absolute top-4 right-4 bg-slate-950/80 border border-cyan-500/30 px-2.5 py-1 rounded text-[10px] font-mono text-cyan-300">
              Discrete Cosine Transform (DCT) Grid
            </div>
          </div>
        )}

        {/* Genuine Stamp for Real Photos */}
        {!isFake && viewMode === 'heatmap' && (
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            <div className="border border-emerald-500/50 bg-emerald-950/70 backdrop-blur-md px-4 py-2.5 rounded-xl text-emerald-300 text-xs font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Verified Sensor PRNU & Natural Lens Physics</span>
            </div>
          </div>
        )}
      </div>

      {/* Artifact Findings Table/List */}
      {artifacts && artifacts.length > 0 && (
        <div className="space-y-2">
          <h5 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Detected Visual Anomalies ({artifacts.length})
          </h5>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {artifacts.map((art, idx) => (
              <div
                key={idx}
                className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                  <span className="text-slate-300 font-medium">{art.label}</span>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-rose-400 font-mono font-semibold">{art.probability}</span>
                  <span className="block text-[10px] text-slate-500">{art.coordinates}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
