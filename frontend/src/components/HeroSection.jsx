import React from 'react';
import { 
  Rocket, 
  Terminal, 
  Layers, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles,
  ShieldCheck,
  Cpu,
  Globe
} from 'lucide-react';

export default function HeroSection({ setActiveTab, onStartGuide }) {
  const keyPillars = [
    {
      icon: Cpu,
      title: "Bare-Metal Container Speed",
      desc: "LXD Linux containers without Docker daemon overhead. Zero cold-starts."
    },
    {
      icon: ShieldCheck,
      title: "Private VPC by Default",
      desc: "Databases & services connect over private hostnames without public IP leakage."
    },
    {
      icon: Globe,
      title: "Automated Wildcard SSL",
      desc: "Instant HTTPS for testing subdomains and production custom domains."
    }
  ];

  return (
    <div className="relative overflow-hidden pt-8 pb-12">
      {/* Background glow accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold mb-6 shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Zero-to-Production Guide for Beginners & Freshers</span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight mb-4">
            Master <span className="gradient-text-cyan">Zerops Cloud</span> Deployment Without the Headaches
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-300 mb-8 leading-relaxed">
            A comprehensive, interactive step-by-step masterclass teaching freshers how to configure <code className="text-cyan-400 bg-slate-900 px-1.5 py-0.5 rounded border border-slate-700 font-mono text-xs sm:text-sm">zerops.yml</code>, deploy any frontend/backend stack, avoid the 7 fatal rookie mistakes, and automate CI/CD.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
            <button
              onClick={onStartGuide}
              className="flex items-center space-x-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold shadow-lg shadow-cyan-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 text-sm"
            >
              <Rocket className="w-4 h-4 text-slate-950" />
              <span>Start 5-Step Deployment Guide</span>
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </button>

            <button
              onClick={() => setActiveTab('generator')}
              className="flex items-center space-x-2 px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-medium transition-colors text-sm hover:border-cyan-500/50"
            >
              <Terminal className="w-4 h-4 text-cyan-400" />
              <span>Build zerops.yml Config</span>
            </button>

            <button
              onClick={() => setActiveTab('pitfalls')}
              className="flex items-center space-x-2 px-4 py-3 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 font-medium transition-colors text-sm"
            >
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span>Avoid Common Mistakes</span>
            </button>
          </div>
        </div>

        {/* 3 Pillars Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto mt-6">
          {keyPillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div key={idx} className="glass-card p-4 rounded-xl border border-slate-800 flex items-start space-x-3">
                <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-white mb-1">{p.title}</h2>
                  <p className="text-xs text-slate-400 leading-relaxed">{p.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
