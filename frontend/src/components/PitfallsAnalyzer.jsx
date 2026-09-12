import React, { useState, useEffect } from 'react';
import { 
  AlertTriangle, 
  Search, 
  Filter, 
  CheckCircle2, 
  XCircle, 
  Lightbulb, 
  FileCode, 
  Info,
  ShieldAlert,
  Terminal,
  Zap
} from 'lucide-react';
import { api } from '../services/api';

export default function PitfallsAnalyzer() {
  const [pitfalls, setPitfalls] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSeverity, setSelectedSeverity] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPitfalls();
  }, [selectedCategory, selectedSeverity, search]);

  const loadPitfalls = async () => {
    setLoading(true);
    try {
      const res = await api.getPitfalls(selectedCategory, selectedSeverity, search);
      if (res.success && res.data) {
        setPitfalls(res.data);
      }
    } catch (err) {
      console.error('Failed to load pitfalls:', err);
    } finally {
      setLoading(false);
    }
  };

  const getSeverityBadge = (sev) => {
    switch (sev) {
      case 'CRITICAL':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40">CRITICAL</span>;
      case 'HIGH':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">HIGH PRIORITY</span>;
      default:
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">PERFORMANCE</span>;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-2 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-1">
          <ShieldAlert className="w-4 h-4" />
          <span>Rookie Mistake Prevention</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white">Common Deployment Pitfalls & Exact Fixes</h2>
        <p className="text-sm text-slate-400 mt-1">
          70%+ of junior developers stumble upon the same 7 mistakes during cloud deployments. Learn the root causes, error symptoms, and copy-paste ready solutions.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="glass-panel p-4 rounded-2xl border border-slate-800 mb-8 flex flex-col md:flex-row items-center gap-4">
        {/* Search input */}
        <div className="relative w-full md:flex-1">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by error symptom, code snippet, or keywords (e.g. 502, localhost, 404)..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:border-cyan-500 focus:outline-none placeholder:text-slate-600"
          />
        </div>

        {/* Severity Filter */}
        <div className="flex items-center space-x-2 w-full md:w-auto">
          <span className="text-xs text-slate-400 font-medium">Severity:</span>
          <select
            value={selectedSeverity}
            onChange={(e) => setSelectedSeverity(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:border-cyan-500 focus:outline-none"
          >
            <option value="all">All Severities</option>
            <option value="CRITICAL">Critical</option>
            <option value="HIGH">High</option>
            <option value="MEDIUM">Medium</option>
          </select>
        </div>
      </div>

      {/* Pitfalls Cards */}
      <div className="space-y-6">
        {pitfalls.map((p) => (
          <div key={p.id} className="glass-panel rounded-2xl border border-slate-800 p-6 overflow-hidden">
            {/* Header: Title & Badges */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-2 mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white">{p.title}</h3>
                  <div className="flex items-center space-x-2 mt-0.5">
                    <span className="text-xs text-slate-400 font-medium">{p.category}</span>
                    <span className="text-slate-600">•</span>
                    <span className="text-xs text-amber-400 font-medium">{p.frequency}</span>
                  </div>
                </div>
              </div>
              <div>{getSeverityBadge(p.severity)}</div>
            </div>

            {/* Symptoms & Root Cause */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
              <div className="bg-rose-950/20 border border-rose-500/20 p-4 rounded-xl">
                <h4 className="text-xs font-bold text-rose-400 flex items-center space-x-1.5 mb-1.5 uppercase tracking-wider">
                  <XCircle className="w-4 h-4" />
                  <span>Symptom / What You Experience:</span>
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">{p.symptom}</p>
              </div>

              <div className="bg-cyan-950/20 border border-cyan-500/20 p-4 rounded-xl">
                <h4 className="text-xs font-bold text-cyan-400 flex items-center space-x-1.5 mb-1.5 uppercase tracking-wider">
                  <Info className="w-4 h-4" />
                  <span>Under the Hood / Why It Happens:</span>
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">{p.explanation}</p>
              </div>
            </div>

            {/* Side-by-Side Code Comparison: Wrong vs Fixed */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {/* Wrong Code */}
              <div>
                <div className="flex items-center justify-between bg-rose-950/40 px-3 py-1.5 rounded-t-xl border-t border-x border-rose-500/30 text-rose-300 text-xs font-mono font-bold">
                  <span className="flex items-center space-x-1">
                    <XCircle className="w-3.5 h-3.5 text-rose-400" />
                    <span>❌ Rookie Mistake (DO NOT DO)</span>
                  </span>
                </div>
                <pre className="font-mono text-xs bg-[#0b0507] p-3.5 rounded-b-xl border border-rose-500/30 text-rose-200 overflow-x-auto leading-relaxed">
                  {p.wrongCode}
                </pre>
              </div>

              {/* Fixed Code */}
              <div>
                <div className="flex items-center justify-between bg-emerald-950/40 px-3 py-1.5 rounded-t-xl border-t border-x border-emerald-500/30 text-emerald-300 text-xs font-mono font-bold">
                  <span className="flex items-center space-x-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>✅ The Solution (CORRECT FIX)</span>
                  </span>
                </div>
                <pre className="font-mono text-xs bg-[#050e09] p-3.5 rounded-b-xl border border-emerald-500/30 text-emerald-200 overflow-x-auto leading-relaxed">
                  {p.fixedCode}
                </pre>
              </div>
            </div>

            {/* Pro Tip Banner */}
            <div className="flex items-start space-x-2.5 bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-xs text-slate-300">
              <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-amber-400">DevOps Rule of Thumb: </span>
                <span>{p.proTip}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
