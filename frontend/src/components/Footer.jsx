import React from 'react';
import { Zap, Heart, ExternalLink, Github, Terminal, Globe } from 'lucide-react';

export default function Footer({ setActiveTab }) {
  return (
    <footer className="border-t border-slate-800/80 bg-[#040811] text-slate-400 text-xs mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Info */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 rounded-lg bg-cyan-500 flex items-center justify-center font-bold text-slate-950">
                <Zap className="w-4 h-4 fill-slate-950" />
              </div>
              <span className="font-extrabold text-white text-base">Zerops Fresher Hub</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              An educational platform dedicated to teaching junior developers and freshers how to master cloud deployments with confidence.
            </p>
          </div>

          {/* Core Sections */}
          <div>
            <h4 className="font-bold text-white mb-3 text-xs uppercase tracking-wider">Learning Modules</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => setActiveTab('guide')} className="hover:text-cyan-400 transition-colors">
                  5-Step Master Guide
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('recipes')} className="hover:text-cyan-400 transition-colors">
                  Tech Stack Recipes
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('generator')} className="hover:text-cyan-400 transition-colors">
                  Visual zerops.yml Generator
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('pitfalls')} className="hover:text-cyan-400 transition-colors">
                  Common Mistakes & Fixes
                </button>
              </li>
            </ul>
          </div>

          {/* Interactive Tools */}
          <div>
            <h4 className="font-bold text-white mb-3 text-xs uppercase tracking-wider">Interactive Tools</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => setActiveTab('simulator')} className="hover:text-cyan-400 transition-colors">
                  zcli Terminal Simulator
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('quiz')} className="hover:text-cyan-400 transition-colors">
                  Fresher Readiness Quiz
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('cheatsheet')} className="hover:text-cyan-400 transition-colors">
                  Cheatsheet & Advice Board
                </button>
              </li>
            </ul>
          </div>

          {/* Official Zerops Links */}
          <div>
            <h4 className="font-bold text-white mb-3 text-xs uppercase tracking-wider">Official Resources</h4>
            <ul className="space-y-2">
              <li>
                <a 
                  href="https://zerops.io" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1 hover:text-cyan-400 transition-colors"
                >
                  <span>Zerops Official Website</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a 
                  href="https://docs.zerops.io" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1 hover:text-cyan-400 transition-colors"
                >
                  <span>Zerops Documentation</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a 
                  href="https://discord.gg/zerops" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1 hover:text-cyan-400 transition-colors"
                >
                  <span>Zerops Discord Community</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-slate-500 gap-3">
          <p>© 2026 Zerops Fresher Deployment Hub. Open source learning platform.</p>
          <div className="flex items-center space-x-1">
            <span>Built with precision for future DevOps & Fullstack Engineers</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
