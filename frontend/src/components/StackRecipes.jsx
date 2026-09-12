import React, { useState, useEffect } from 'react';
import { 
  Layers, 
  Copy, 
  Check, 
  Download, 
  ExternalLink, 
  Cpu, 
  Sparkles, 
  CheckCircle2, 
  Info,
  Code2,
  Database,
  Globe
} from 'lucide-react';
import { api } from '../services/api';

export default function StackRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRecipes();
  }, [activeCategory]);

  const loadRecipes = async () => {
    setLoading(true);
    try {
      const res = await api.getRecipes(activeCategory);
      if (res.success && res.data) {
        setRecipes(res.data);
        if (!selectedRecipe && res.data.length > 0) {
          setSelectedRecipe(res.data[0]);
        }
      }
    } catch (err) {
      console.error('Failed to load recipes:', err);
    } finally {
      setLoading(false);
    }
  };

  const copyCode = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadYaml = (content, filename = 'zerops.yml') => {
    const blob = new Blob([content], { type: 'text/yaml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const categories = [
    { id: 'all', label: 'All Stacks' },
    { id: 'Frontend', label: 'Frontend & SPAs' },
    { id: 'Backend', label: 'Backend APIs' },
    { id: 'Fullstack', label: 'Fullstack (Next.js)' },
    { id: 'Database & Cache', label: 'Databases & Storage' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-2 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-1">
          <Layers className="w-4 h-4" />
          <span>Production-Ready Blueprints</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white">Tech Stack Deployment Recipes</h2>
        <p className="text-sm text-slate-400 mt-1">
          Pre-tuned <code className="text-cyan-400 bg-slate-900 px-1 py-0.5 rounded border border-slate-800">zerops.yml</code> configurations and checklists for React, Node.js, Python FastAPI, Next.js, Go, and Databases.
        </p>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => setActiveCategory(c.id)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeCategory === c.id
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm shadow-cyan-500/25'
                : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Main Grid: Selector on left, Recipe details on right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left column: Recipe list */}
        <div className="lg:col-span-5 space-y-3">
          {recipes.map((r) => {
            const isSelected = selectedRecipe?.id === r.id;
            return (
              <div
                key={r.id}
                onClick={() => setSelectedRecipe(r)}
                className={`p-4 rounded-xl cursor-pointer transition-all border ${
                  isSelected
                    ? 'bg-cyan-500/10 border-cyan-500/50 shadow-md shadow-cyan-500/10'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-sm text-white">{r.name}</span>
                  </div>
                  {r.badge && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/30">
                      {r.badge}
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-400 line-clamp-2">{r.description}</p>
                <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                  <span>Runtime: <strong className="text-cyan-400 font-normal">{r.zeropsServiceType}</strong></span>
                  <span className="text-cyan-400 font-sans hover:underline">View Blueprint →</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right column: Selected Recipe Deep-Dive */}
        <div className="lg:col-span-7">
          {selectedRecipe ? (
            <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-6">
              {/* Recipe Title & Actions */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-3">
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="text-xl font-bold text-white">{selectedRecipe.name}</h3>
                    <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                      {selectedRecipe.category}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">{selectedRecipe.description}</p>
                </div>

                <div className="flex items-center space-x-2 shrink-0">
                  <button
                    onClick={() => copyCode(selectedRecipe.zeropsYml)}
                    className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs transition-colors"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400 font-medium">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy YAML</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => downloadYaml(selectedRecipe.zeropsYml, `${selectedRecipe.id}.zerops.yml`)}
                    className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-xs transition-colors"
                  >
                    <Download className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Download</span>
                  </button>
                </div>
              </div>

              {/* Code Preview */}
              <div>
                <div className="flex items-center justify-between text-xs text-slate-400 mb-2 font-mono">
                  <span className="flex items-center space-x-1.5">
                    <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                    <span>zerops.yml (Production configuration)</span>
                  </span>
                  <span className="text-[11px] text-slate-500">Ready to commit in git root</span>
                </div>
                <pre className="font-mono text-xs bg-[#050912] p-4 rounded-xl border border-slate-800 text-slate-200 overflow-x-auto leading-relaxed max-h-80 select-all">
                  {selectedRecipe.zeropsYml}
                </pre>
              </div>

              {/* Key Features & Optimization */}
              {selectedRecipe.keyFeatures && (
                <div>
                  <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center space-x-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Why This Configuration Works Great:</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {selectedRecipe.keyFeatures.map((feat, i) => (
                      <div key={i} className="flex items-start space-x-2 text-xs text-slate-300 bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Deployment Steps */}
              {selectedRecipe.steps && (
                <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800">
                  <h4 className="text-xs font-bold text-cyan-300 uppercase tracking-wider mb-2">
                    Quick Deployment Steps:
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {selectedRecipe.steps.map((st, i) => (
                      <li key={i} className="leading-relaxed">
                        {st}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <div className="glass-panel p-12 rounded-2xl border border-slate-800 text-center text-slate-400 text-sm">
              Select a tech stack from the left column to view its production blueprint.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
