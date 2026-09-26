import React, { useState } from 'react';
import { 
  Sliders, 
  Key, 
  Cpu, 
  ShieldCheck, 
  Sparkles, 
  Bell, 
  Lock, 
  Save, 
  Check, 
  Database,
  Layers
} from 'lucide-react';
import { useAnalysis } from '../context/AnalysisContext';

export default function SettingsPage() {
  const { settings, updateSettings } = useAnalysis();
  const [saved, setSaved] = useState(false);

  const [form, setForm] = useState({
    sensitivity: settings.sensitivity || 'standard',
    deepSearch: settings.deepSearch !== false,
    ocrExtraction: settings.ocrExtraction !== false,
    modelEngine: settings.modelEngine || 'TruthLens-RoBERTa-v4',
    apiKey: 'tl_live_94819a8b291e4f9b8a1c',
    realtimeAlerts: true
  });

  const handleSave = (e) => {
    e.preventDefault();
    updateSettings(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 py-8 sm:py-12 px-4 sm:px-6 lg:px-8 relative">
      
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/3 w-96 h-96 bg-cyan-500/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="border-b border-slate-800 pb-6">
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4" /> System Configuration
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Platform & Engine Settings
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Tune neural detection thresholds, configure developer API credentials, and manage model preferences.
          </p>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          
          {/* Section 1: AI Model Configuration */}
          <div className="p-6 rounded-2xl glass-panel space-y-5">
            <div className="flex items-center gap-2.5 text-white font-bold text-sm border-b border-slate-800 pb-3">
              <Cpu className="w-4 h-4 text-cyan-400" />
              <span>Inference Engine & Sensitivity</span>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1.5">
                  Default Detection Sensitivity
                </label>
                <select
                  value={form.sensitivity}
                  onChange={(e) => setForm({ ...form, sensitivity: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 text-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-cyan-500"
                >
                  <option value="strict">Strict (High Sensitivity - Catches subtle nuances)</option>
                  <option value="standard">Standard (Balanced - Recommended for production)</option>
                  <option value="relaxed">Relaxed (High Specificity - Only flags severe violations)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1.5">
                  Primary NLP Language Backbone
                </label>
                <select
                  value={form.modelEngine}
                  onChange={(e) => setForm({ ...form, modelEngine: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 text-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-cyan-500"
                >
                  <option value="TruthLens-RoBERTa-v4">TruthLens-RoBERTa-Linguistic-v4 (Default)</option>
                  <option value="DeBERTa-v3-Misinfo">DeBERTa-v3-Misinformation-Large</option>
                  <option value="MultiModal-CLIP-Fact">MultiModal-CLIP-Fact-X</option>
                </select>
              </div>

              <div className="pt-2 space-y-3">
                <label className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800 cursor-pointer">
                  <div>
                    <span className="font-semibold text-slate-200 block">Deep Web Fact-Checking Cross-Check</span>
                    <span className="text-slate-400 text-[11px]">Automatically query global verified fact repositories in real-time.</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={form.deepSearch}
                    onChange={(e) => setForm({ ...form, deepSearch: e.target.checked })}
                    className="w-4 h-4 rounded text-cyan-500 focus:ring-cyan-500"
                  />
                </label>

                <label className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800 cursor-pointer">
                  <div>
                    <span className="font-semibold text-slate-200 block">OCR Visual Text Extraction</span>
                    <span className="text-slate-400 text-[11px]">Extract and scan headline text embedded inside memes and screenshots.</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={form.ocrExtraction}
                    onChange={(e) => setForm({ ...form, ocrExtraction: e.target.checked })}
                    className="w-4 h-4 rounded text-cyan-500 focus:ring-cyan-500"
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Section 2: Developer API Keys */}
          <div className="p-6 rounded-2xl glass-panel space-y-5">
            <div className="flex items-center gap-2.5 text-white font-bold text-sm border-b border-slate-800 pb-3">
              <Key className="w-4 h-4 text-indigo-400" />
              <span>Developer API Key</span>
            </div>

            <div className="space-y-3 text-xs">
              <p className="text-slate-400 leading-relaxed">
                Use your secret API key to authenticate Python SDK and headless browser extensions with TruthLens endpoints.
              </p>
              <div className="flex items-center gap-2">
                <input
                  type="password"
                  readOnly
                  value={form.apiKey}
                  className="flex-1 bg-slate-900 border border-slate-700 text-slate-300 font-mono rounded-xl px-4 py-2.5 text-xs"
                />
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(form.apiKey);
                    alert('API Key copied to clipboard!');
                  }}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium transition-all"
                >
                  Copy Key
                </button>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="submit"
              className="px-8 py-3.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 shadow-lg shadow-cyan-500/20 hover:scale-105 transition-all flex items-center gap-2"
            >
              {saved ? <Check className="w-4 h-4 text-emerald-300" /> : <Save className="w-4 h-4" />}
              <span>{saved ? 'Settings Saved' : 'Save Preferences'}</span>
            </button>
          </div>

        </form>

      </div>

    </div>
  );
}
