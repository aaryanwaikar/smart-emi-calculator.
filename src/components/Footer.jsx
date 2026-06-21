import React from 'react';
import { DEVELOPER_CONFIG } from '../config';
import { ExternalLink, ShieldCheck } from 'lucide-react';

export default function Footer() {
  const handleRedirect = () => {
    window.open(DEVELOPER_CONFIG.redirectUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <footer className="w-full mt-16 border-t border-slate-800 bg-slate-950/70 backdrop-blur-md py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        
        {/* Assessment/Developer Info */}
        <div className="text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 text-slate-400 text-sm mb-1">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Developer Assessment Project</span>
          </div>
          <p className="text-slate-200 font-semibold tracking-wide">
            Name: <span className="text-indigo-400 font-medium">{DEVELOPER_CONFIG.name}</span>
          </p>
          <p className="text-slate-400 text-sm mt-0.5">
            Email: <a href={`mailto:${DEVELOPER_CONFIG.email}`} className="text-indigo-400 hover:text-indigo-300 transition-colors underline decoration-slate-700 underline-offset-4">{DEVELOPER_CONFIG.email}</a>
          </p>
        </div>

        {/* Required Assessment Button */}
        <div>
          <button
            onClick={handleRedirect}
            className="group relative inline-flex items-center justify-center gap-2 px-6 py-3 font-semibold text-white transition-all duration-300 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:shadow-[0_0_25px_rgba(99,102,241,0.5)] active:scale-95 cursor-pointer"
          >
            {/* Pulsing background effect */}
            <span className="absolute inset-0 w-full h-full rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 blur-sm opacity-50 group-hover:opacity-75 transition-opacity duration-300 animate-pulse-slow"></span>
            
            <span className="relative flex items-center gap-2">
              Built for Digital Heroes
              <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </button>
        </div>

      </div>

      <div className="max-w-6xl mx-auto mt-8 pt-8 border-t border-slate-900/50 text-center">
        <p className="text-slate-500 text-xs">
          © {new Date().getFullYear()} FinHero Analytics. All rights reserved. Secured client-side calculations.
        </p>
      </div>
    </footer>
  );
}
