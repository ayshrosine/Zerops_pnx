import React, { useState, useRef, useEffect } from 'react';
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
  ChevronDown,
  Sparkles,
  CheckCircle2
} from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, backendStatus, completedStepsCount = 0 }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showProgressDropdown, setShowProgressDropdown] = useState(false);
  const [showMoreDropdown, setShowMoreDropdown] = useState(false);
  const moreDropdownRef = useRef(null);
  const progressDropdownRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (moreDropdownRef.current && !moreDropdownRef.current.contains(event.target)) {
        setShowMoreDropdown(false);
      }
      if (progressDropdownRef.current && !progressDropdownRef.current.contains(event.target)) {
        setShowProgressDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Primary top-level navigation items
  const primaryNav = [
    { id: 'guide', label: '5-Step Guide', icon: BookOpen },
    { id: 'recipes', label: 'Stack Recipes', icon: Layers },
    { id: 'generator', label: 'YAML Builder', icon: FileCode2, badge: 'Live' },
    { id: 'pitfalls', label: 'Common Mistakes', icon: AlertTriangle, badge: 'Crucial' },
  ];

  // Secondary tools in "More" dropdown
  const secondaryNav = [
    { id: 'simulator', label: 'CLI Simulator', desc: 'Interactive zcli terminal sandbox', icon: Terminal },
    { id: 'quiz', label: 'Fresher Quiz', desc: 'Readiness certification test', icon: HelpCircle },
    { id: 'cheatsheet', label: 'Cheatsheet & Tips', desc: 'Dynamic VPC env vars & shortcuts', icon: Bookmark },
  ];

  const isSecondaryActive = secondaryNav.some(item => item.id === activeTab);
  const activeSecondaryItem = secondaryNav.find(item => item.id === activeTab);

  const handleNavClick = (id) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    setShowMoreDropdown(false);
  };

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-slate-800/80 bg-[#070D18]/95 backdrop-blur-xl shadow-lg shadow-black/30">
      {/* Top subtle glow line */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-cyan-500/70 to-purple-500/70" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-2">
          
          {/* 1. Left: Compact Logo & Brand */}
          <div 
            className="flex items-center space-x-2.5 cursor-pointer shrink-0"
            onClick={() => handleNavClick('guide')}
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-md shadow-cyan-500/25 ring-1 ring-cyan-300/40">
              <Zap className="w-4.5 h-4.5 text-slate-950 fill-slate-950 font-bold" />
            </div>
            <div className="flex items-center space-x-2">
              <span className="font-extrabold text-base tracking-tight text-white">
                Zerops
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 font-bold uppercase tracking-wider">
                Fresher Guide
              </span>
            </div>
          </div>

          {/* 2. Center: Streamlined Desktop Navigation (Zero Overlap) */}
          <nav className="hidden lg:flex items-center space-x-1">
            {primaryNav.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-150 relative whitespace-nowrap ${
                    isActive
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm shadow-cyan-500/10'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60 border border-transparent'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className={`text-[9px] px-1.5 py-0.2 rounded-full font-bold uppercase tracking-tight ${
                      item.badge === 'Crucial'
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                        : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}

            {/* "More Tools" Dropdown */}
            <div className="relative" ref={moreDropdownRef}>
              <button
                onClick={() => setShowMoreDropdown(!showMoreDropdown)}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-150 border whitespace-nowrap ${
                  isSecondaryActive
                    ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 shadow-sm shadow-cyan-500/10'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60 border-transparent'
                }`}
              >
                <span>{isSecondaryActive ? activeSecondaryItem.label : 'Tools & More'}</span>
                <ChevronDown className={`w-3 h-3 transition-transform ${showMoreDropdown ? 'rotate-180 text-cyan-400' : 'text-slate-500'}`} />
              </button>

              {showMoreDropdown && (
                <div className="absolute left-0 mt-2 w-60 p-2 rounded-2xl glass-panel border border-slate-700/80 bg-slate-900/98 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150">
                  {secondaryNav.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleNavClick(item.id)}
                        className={`w-full flex items-start space-x-3 p-2.5 rounded-xl text-left transition-all ${
                          isActive 
                            ? 'bg-cyan-500/20 border border-cyan-500/30 text-cyan-300' 
                            : 'hover:bg-slate-800/80 text-slate-300'
                        }`}
                      >
                        <div className={`p-1.5 rounded-lg shrink-0 mt-0.5 ${isActive ? 'bg-cyan-500/20 text-cyan-300' : 'bg-slate-800 text-slate-400'}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white">{item.label}</div>
                          <div className="text-[10px] text-slate-400 leading-tight mt-0.5">{item.desc}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </nav>

          {/* 3. Right: Compact Progress & App Button */}
          <div className="flex items-center space-x-2 shrink-0">
            {/* Compact Readiness Badge */}
            <div className="relative" ref={progressDropdownRef}>
              <button
                onClick={() => setShowProgressDropdown(!showProgressDropdown)}
                className="flex items-center space-x-1.5 bg-slate-900/90 hover:bg-slate-800 px-2.5 py-1 rounded-xl border border-slate-800 text-xs transition-colors"
                title="View deployment progress checklist"
              >
                <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-slate-400 text-[11px] hidden sm:inline">Progress:</span>
                <span className="font-bold text-cyan-400 font-mono text-xs">{completedStepsCount}/5</span>
                <ChevronDown className="w-3 h-3 text-slate-500" />
              </button>

              {/* Progress Popover */}
              {showProgressDropdown && (
                <div className="absolute right-0 mt-2 w-64 p-3.5 rounded-2xl glass-panel border border-slate-700 bg-slate-900/98 shadow-2xl z-50 text-xs">
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800">
                    <span className="font-bold text-white">Deployment Readiness</span>
                    <span className="text-cyan-400 font-bold font-mono">{Math.round((completedStepsCount / 5) * 100)}%</span>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mb-2.5">
                    <div 
                      className="bg-cyan-400 h-full rounded-full transition-all duration-300"
                      style={{ width: `${(completedStepsCount / 5) * 100}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-slate-400 mb-3">
                    Complete all 5 guided steps to master Zerops cloud deployment.
                  </p>
                  <button
                    onClick={() => {
                      setActiveTab('guide');
                      setShowProgressDropdown(false);
                    }}
                    className="w-full py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-center block text-xs transition-colors"
                  >
                    Open 5-Step Guide
                  </button>
                </div>
              )}
            </div>

            {/* Quick Link to Zerops Dashboard */}
            <a
              href="https://app.zerops.io"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs shadow-sm shadow-cyan-500/20 transition-all whitespace-nowrap"
            >
              <span>Zerops App</span>
              <ExternalLink className="w-3 h-3" />
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 rounded-xl bg-slate-900 text-slate-300 hover:text-white border border-slate-800 transition-colors ml-1"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* 4. Mobile Drawer Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-3 border-t border-slate-800/80 bg-[#070D18] space-y-1">
            <div className="text-[10px] uppercase font-bold text-slate-500 px-3 py-1 tracking-wider">Main Modules</div>
            {primaryNav.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                      : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-cyan-500/20 text-cyan-300 font-bold">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}

            <div className="text-[10px] uppercase font-bold text-slate-500 px-3 pt-2 pb-1 tracking-wider">Interactive Tools</div>
            {secondaryNav.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                      : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                </button>
              );
            })}

            <div className="pt-2 mt-2 border-t border-slate-800 flex items-center justify-between px-3">
              <div className="flex items-center space-x-1.5 text-xs text-slate-400">
                <span className={`w-2 h-2 rounded-full ${backendStatus === 'healthy' ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                <span>Backend API: {backendStatus === 'healthy' ? 'Online' : 'Connecting'}</span>
              </div>
              <a
                href="https://app.zerops.io"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-cyan-400 font-bold flex items-center space-x-1"
              >
                <span>app.zerops.io</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}


