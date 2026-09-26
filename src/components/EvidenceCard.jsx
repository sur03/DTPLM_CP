import React from 'react';
import { Shield, ExternalLink, Globe, FileCode, CheckCircle2, AlertTriangle, XCircle, Search } from 'lucide-react';

export default function EvidenceCard({
  title,
  icon: Icon = Shield,
  status = 'neutral', // 'success' | 'danger' | 'warning' | 'neutral'
  badgeText,
  children,
  subtitle
}) {
  const getStatusClasses = () => {
    switch (status) {
      case 'success':
        return {
          border: 'border-emerald-500/30',
          badge: 'bg-emerald-950/80 text-emerald-300 border-emerald-500/30',
          iconBg: 'bg-emerald-500/10 text-emerald-400'
        };
      case 'danger':
        return {
          border: 'border-rose-500/30',
          badge: 'bg-rose-950/80 text-rose-300 border-rose-500/30',
          iconBg: 'bg-rose-500/10 text-rose-400'
        };
      case 'warning':
        return {
          border: 'border-amber-500/30',
          badge: 'bg-amber-950/80 text-amber-300 border-amber-500/30',
          iconBg: 'bg-amber-500/10 text-amber-400'
        };
      default:
        return {
          border: 'border-slate-800',
          badge: 'bg-slate-800 text-slate-300 border-slate-700',
          iconBg: 'bg-slate-800 text-cyan-400'
        };
    }
  };

  const style = getStatusClasses();

  return (
    <div className={`p-5 rounded-2xl bg-slate-900/60 backdrop-blur-md border ${style.border} hover:border-slate-700 transition-all flex flex-col justify-between`}>
      <div>
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${style.iconBg} shrink-0`}>
              <Icon className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white tracking-tight">{title}</h4>
              {subtitle && <p className="text-[11px] text-slate-400">{subtitle}</p>}
            </div>
          </div>

          {badgeText && (
            <span className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border ${style.badge} shrink-0`}>
              {badgeText}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="text-xs text-slate-300 space-y-2 mt-2">
          {children}
        </div>
      </div>
    </div>
  );
}
