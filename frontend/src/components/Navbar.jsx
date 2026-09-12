import React from 'react';
import { 
  Terminal, 
  BookOpen, 
  Layers, 
  AlertTriangle, 
  FileCode2, 
  HelpCircle, 
  Activity, 
  Zap,
  Bookmark
} from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, backendStatus, completedStepsCount = 0 }) {
  const navItems = [
    { id: 'guide', label: 'Step-by-Step Guide', icon: BookOpen },
    { id: 'recipes', label: 'Stack Recipes', icon: Layers },
    { id: 'generator', label: 'zerops.yml Generator', icon: FileCode2 },
    { id: 'pitfalls', label: 'Common Mistakes & Fixes', icon: AlertTriangle, badge: 'Crucial' },
    { id: 'simulator', label: 'CLI Simulator', icon: Terminal },
    { id: 'quiz', label: 'Fresher Quiz', icon: HelpCircle },
    { id: 'cheatsheet', label: 'Cheatsheet & Tips', icon: Bookmark },
  ];

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-slate-800/80 bg-[#070D18]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('guide')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/25 ring-1 ring-cyan-400/40">
              <Zap className="w-5 h-5 text-slate-950 fill-slate-950 font-bold" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-lg tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-cyan-400">
                  Zerops
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-semibold tracking-wide">
                  FRESHER GUIDE
                </span>
              </div>
              <p className="text-[10px] text-slate-400 hidden sm:block">Deployment Mastery & Troubleshooting</p>
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
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150 relative ${
                    isActive
                      ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 shadow-sm shadow-cyan-500/10'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Status & Progress info */}
          <div className="flex items-center space-x-3">
            <div className="hidden md:flex items-center space-x-2 bg-slate-900/80 px-2.5 py-1 rounded-full border border-slate-800 text-xs">
              <span className="text-slate-400">Readiness:</span>
              <span className="font-semibold text-cyan-400">{completedStepsCount}/5 Steps</span>
            </div>

            {/* Backend API status */}
            <div className="flex items-center space-x-1.5 bg-slate-900/90 px-2.5 py-1 rounded-full border border-slate-800 text-[11px]">
              <span className={`w-2 h-2 rounded-full ${backendStatus === 'healthy' ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
              <span className="text-slate-400">API:</span>
              <span className={`font-mono font-medium ${backendStatus === 'healthy' ? 'text-emerald-400' : 'text-amber-400'}`}>
                {backendStatus === 'healthy' ? 'Connected' : 'Connecting'}
              </span>
            </div>
          </div>
        </div>

        {/* Mobile / Compact scrollable nav */}
        <div className="xl:hidden flex items-center space-x-2 overflow-x-auto py-2 scrollbar-none border-t border-slate-800/50 text-xs">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center space-x-1 px-2.5 py-1 rounded-lg whitespace-nowrap text-xs font-medium transition-colors ${
                  isActive
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                    : 'text-slate-400 hover:text-slate-200 bg-slate-900/40'
                }`}
              >
                <Icon className="w-3 h-3" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}
