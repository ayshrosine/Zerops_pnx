import React, { useState } from 'react';
import { 
  Terminal, 
  BookOpen, 
  Layers, 
  AlertTriangle, 
  FileCode2, 
  HelpCircle, 
  Zap,
  Bookmark,
  Menu,
  X,
  ExternalLink,
  Github,
  ChevronDown,
  CheckCircle2,
  Sparkles,
  Rocket
} from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, backendStatus, completedStepsCount = 0 }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showProgressDropdown, setShowProgressDropdown] = useState(false);

  const navItems = [
    { id: 'guide', label: '5-Step Guide', icon: BookOpen },
    { id: 'recipes', label: 'Stack Recipes', icon: Layers },
    { id: 'generator', label: 'zerops.yml Builder', icon: FileCode2, badge: 'Live' },
    { id: 'pitfalls', label: 'Common Mistakes', icon: AlertTriangle, badge: 'Crucial' },
    { id: 'simulator', label: 'CLI Simulator', icon: Terminal },
    { id: 'quiz', label: 'Readiness Quiz', icon: HelpCircle },
    { id: 'cheatsheet', label: 'Cheatsheet', icon: Bookmark },
  ];

  const handleNavClick = (id) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-slate-800/80 bg-[#070D18]/95 backdrop-blur-xl shadow-lg shadow-black/20">
      {/* Subtle top glow highlight line */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-cyan-500/60 to-purple-500/60" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div 
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => handleNavClick('guide')}
          >
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-cyan-400 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/25 ring-1 ring-cyan-300/40 group-hover:scale-105 transition-transform duration-200">
                <Zap className="w-5 h-5 text-slate-950 fill-slate-950 font-bold" />
              </div>
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
              </span>
            </div>

            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-lg tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-cyan-300 group-hover:to-cyan-200 transition-colors">
                  Zerops
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-500/30 font-bold tracking-wider uppercase shadow-inner">
                  Fresher Hub
                </span>
              </div>
              <p className="text-[10px] text-slate-400 hidden sm:block">Zero-to-Production Cloud Mastery</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-150 relative ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/15 text-cyan-300 border border-cyan-500/40 shadow-sm shadow-cyan-500/10'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60 border border-transparent'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className={`text-[9px] px-1.5 py-0.2 rounded-full font-bold uppercase tracking-tight ${
                      item.badge === 'Crucial'
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                        : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Controls: Progress, Status & Quick Launch */}
          <div className="flex items-center space-x-3">
            {/* Step Completion Progress */}
            <div className="relative">
              <button
                onClick={() => setShowProgressDropdown(!showProgressDropdown)}
                className="hidden sm:flex items-center space-x-2 bg-slate-900/90 hover:bg-slate-800/90 px-3 py-1.5 rounded-xl border border-slate-800 text-xs transition-colors cursor-pointer"
              >
                <div className="w-2 h-2 rounded-full bg-cyan-400" />
                <span className="text-slate-400 font-medium">Readiness:</span>
                <span className="font-bold text-cyan-400 font-mono">{completedStepsCount}/5</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
              </button>

              {/* Progress Popover Dropdown */}
              {showProgressDropdown && (
                <div className="absolute right-0 mt-2 w-64 p-3 rounded-2xl glass-panel border border-slate-700 bg-slate-900/95 shadow-2xl z-50 text-xs">
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800">
                    <span className="font-bold text-white">Your Readiness</span>
                    <span className="text-cyan-400 font-bold">{Math.round((completedStepsCount / 5) * 100)}%</span>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mb-3">
                    <div 
                      className="bg-cyan-400 h-full rounded-full transition-all duration-300"
                      style={{ width: `${(completedStepsCount / 5) * 100}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-slate-400 mb-2">
                    Complete all 5 steps in the Step-by-Step guide to get production-ready.
                  </p>
                  <button
                    onClick={() => {
                      setActiveTab('guide');
                      setShowProgressDropdown(false);
                    }}
                    className="w-full py-1.5 rounded-lg bg-cyan-500 text-slate-950 font-bold text-center block text-[11px]"
                  >
                    View 5-Step Guide
                  </button>
                </div>
              )}
            </div>

            {/* Backend API status */}
            <div className="hidden lg:flex items-center space-x-1.5 bg-slate-900/90 px-2.5 py-1.5 rounded-xl border border-slate-800 text-[11px]">
              <span className={`w-2 h-2 rounded-full ${backendStatus === 'healthy' ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
              <span className="text-slate-400">API:</span>
              <span className={`font-mono font-medium ${backendStatus === 'healthy' ? 'text-emerald-400' : 'text-amber-400'}`}>
                {backendStatus === 'healthy' ? 'Connected' : 'Connecting'}
              </span>
            </div>

            {/* Quick Action: Official Zerops App Link */}
            <a
              href="https://app.zerops.io"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs shadow-md shadow-cyan-500/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Zerops App</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-950" />
            </a>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-xl bg-slate-900 text-slate-300 hover:text-white border border-slate-800 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Full Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="xl:hidden py-4 border-t border-slate-800/80 bg-[#070D18] space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                      : 'text-slate-300 hover:bg-slate-900/80 hover:text-white'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-bold">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}

            <div className="pt-3 mt-2 border-t border-slate-800 flex items-center justify-between px-2">
              <div className="flex items-center space-x-2 text-xs">
                <span className={`w-2 h-2 rounded-full ${backendStatus === 'healthy' ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                <span className="text-slate-400">API: {backendStatus === 'healthy' ? 'Online' : 'Connecting'}</span>
              </div>
              <a
                href="https://app.zerops.io"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-cyan-400 font-bold flex items-center space-x-1"
              >
                <span>Go to app.zerops.io</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

