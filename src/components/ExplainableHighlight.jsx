import React, { useState } from 'react';
import { AlertCircle, CheckCircle2, HelpCircle, Flame, ShieldAlert, Sparkles } from 'lucide-react';

export default function ExplainableHighlight({ fullText = '', highlights = [], isFake = true }) {
  const [activeHighlight, setActiveHighlight] = useState(null);

  if (!fullText) {
    return (
      <div className="p-4 rounded-xl bg-slate-900/50 text-slate-400 text-sm italic">
        No textual body provided for salience heatmap.
      </div>
    );
  }

  // Helper to color-code highlight types
  const getBadgeStyle = (type) => {
    switch (type) {
      case 'clickbait':
        return {
          bg: 'bg-amber-500/20 text-amber-300 border-amber-500/40 hover:bg-amber-500/30',
          badge: 'bg-amber-950 text-amber-300 border-amber-500/40',
          label: 'Clickbait / Emotional Hook'
        };
      case 'unsupported_claim':
        return {
          bg: 'bg-rose-500/20 text-rose-300 border-rose-500/40 hover:bg-rose-500/30',
          badge: 'bg-rose-950 text-rose-300 border-rose-500/40',
          label: 'Unsupported Medical/Empirical Claim'
        };
      case 'conspiracy':
        return {
          bg: 'bg-purple-500/20 text-purple-300 border-purple-500/40 hover:bg-purple-500/30',
          badge: 'bg-purple-950 text-purple-300 border-purple-500/40',
          label: 'Conspiracy Narrative Pattern'
        };
      case 'manipulation':
        return {
          bg: 'bg-red-500/20 text-red-300 border-red-500/40 hover:bg-red-500/30',
          badge: 'bg-red-950 text-red-300 border-red-500/40',
          label: 'Manufactured Urgency'
        };
      case 'verified_claim':
        return {
          bg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 hover:bg-emerald-500/30',
          badge: 'bg-emerald-950 text-emerald-300 border-emerald-500/40',
          label: 'Empirically Corroborated'
        };
      case 'technical_verifiable':
        return {
          bg: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 hover:bg-cyan-500/30',
          badge: 'bg-cyan-950 text-cyan-300 border-cyan-500/40',
          label: 'Verifiable Quantitative Threshold'
        };
      case 'hedging':
        return {
          bg: 'bg-blue-500/20 text-blue-300 border-blue-500/40 hover:bg-blue-500/30',
          badge: 'bg-blue-950 text-blue-300 border-blue-500/40',
          label: 'Peer-Reviewed Scientific Hedging'
        };
      default:
        return {
          bg: 'bg-slate-700/40 text-slate-200 border-slate-600',
          badge: 'bg-slate-900 text-slate-300 border-slate-700',
          label: 'Flagged Segment'
        };
    }
  };

  return (
    <div className="space-y-4">
      {/* Legend */}
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="text-slate-400 font-medium">XAI Attention Map:</span>
        {isFake ? (
          <>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30 text-[11px]">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span> Sensationalism
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-rose-500/10 text-rose-300 border border-rose-500/30 text-[11px]">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-400"></span> Unsupported Claim
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/30 text-[11px]">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span> Conspiracy Framing
            </span>
          </>
        ) : (
          <>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 text-[11px]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Verified Fact
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 text-[11px]">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span> Scientific Metric
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-blue-500/10 text-blue-300 border border-blue-500/30 text-[11px]">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span> Neutral Hedging
            </span>
          </>
        )}
      </div>

      {/* Rendered Text with Interactive Spans */}
      <div className="p-4 sm:p-5 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-200 leading-relaxed text-sm sm:text-base selection:bg-cyan-500/20 whitespace-pre-line">
        {(() => {
          // If no specific highlights provided, render raw text
          if (!highlights || highlights.length === 0) {
            return <span>{fullText}</span>;
          }

          let rendered = [];
          let remaining = fullText;

          // Simple token matcher for highlighted phrases
          highlights.forEach((h, idx) => {
            const pos = remaining.indexOf(h.text);
            if (pos !== -1) {
              const before = remaining.substring(0, pos);
              if (before) rendered.push(<span key={`before-${idx}`}>{before}</span>);

              const style = getBadgeStyle(h.type);
              rendered.push(
                <span
                  key={`h-${idx}`}
                  onMouseEnter={() => setActiveHighlight(h)}
                  onMouseLeave={() => setActiveHighlight(null)}
                  onClick={() => setActiveHighlight(activeHighlight?.text === h.text ? null : h)}
                  className={`inline px-1 py-0.5 mx-0.5 rounded cursor-pointer border border-b-2 transition-all duration-150 ${style.bg}`}
                  title={`${h.reason}`}
                >
                  {h.text}
                </span>
              );

              remaining = remaining.substring(pos + h.text.length);
            }
          });

          if (remaining) {
            rendered.push(<span key="final-rem">{remaining}</span>);
          }

          return rendered;
        })()}
      </div>

      {/* Active Highlight Explanation Box */}
      {activeHighlight && (
        <div className="p-3.5 rounded-xl bg-slate-900 border border-cyan-500/40 text-xs animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex items-center justify-between mb-1">
            <span className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${getBadgeStyle(activeHighlight.type).badge}`}>
              {getBadgeStyle(activeHighlight.type).label}
            </span>
            <span className="text-[10px] text-slate-400 font-mono">Token Salience: 0.94</span>
          </div>
          <p className="text-slate-300 mt-1 font-medium">
            <span className="text-cyan-400 font-mono">"{activeHighlight.text}"</span> — {activeHighlight.reason}
          </p>
        </div>
      )}
    </div>
  );
}
