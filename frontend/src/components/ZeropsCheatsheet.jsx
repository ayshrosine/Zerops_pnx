import React, { useState, useEffect } from 'react';
import { 
  Bookmark, 
  Terminal, 
  Key, 
  Layers, 
  ThumbsUp, 
  PlusCircle, 
  Check, 
  Send,
  Sparkles,
  Info
} from 'lucide-react';
import { api } from '../services/api';

export default function ZeropsCheatsheet() {
  const [tips, setTips] = useState([]);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    text: '',
    author: '',
    role: 'Junior Developer',
    tag: 'General'
  });
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  useEffect(() => {
    loadTips();
  }, []);

  const loadTips = async () => {
    try {
      const res = await api.getTips();
      if (res.success && res.data) {
        setTips(res.data);
      }
    } catch (err) {
      console.error('Failed to load tips:', err);
    }
  };

  const handleUpvote = async (id) => {
    try {
      const res = await api.upvoteTip(id);
      if (res.success) {
        setTips(prev => prev.map(t => t.id === id ? { ...t, upvotes: t.upvotes + 1 } : t));
      }
    } catch (err) {
      console.error('Failed to upvote:', err);
    }
  };

  const handleSubmitTip = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.text) return;

    try {
      const res = await api.submitTip(formData);
      if (res.success) {
        setSubmittedSuccess(true);
        setFormData({ title: '', text: '', author: '', role: 'Junior Developer', tag: 'General' });
        loadTips();
        setTimeout(() => {
          setSubmittedSuccess(false);
          setShowSubmitModal(false);
        }, 1500);
      }
    } catch (err) {
      console.error('Failed to submit tip:', err);
    }
  };

  const envVariablesRef = [
    { var: '${db_hostname}', desc: 'Internal VPC hostname of the database service named db' },
    { var: '${db_port}', desc: 'Internal port for database connection (e.g. 5432 for Postgres, 3306 for MariaDB)' },
    { var: '${db_user}', desc: 'System-generated secure database username' },
    { var: '${db_password}', desc: 'Strong randomized database password' },
    { var: '${db_name}', desc: 'Primary default database name' },
    { var: '${service_hostname}', desc: 'Internal DNS hostname for any microservice in the same project' }
  ];

  const cliCommandsRef = [
    { cmd: 'npm install -g @zerops/zcli', desc: 'Installs Zerops CLI tool globally on your system' },
    { cmd: 'zcli login <TOKEN>', desc: 'Authenticates your CLI session with Zerops cloud' },
    { cmd: 'zcli service push --service api', desc: 'Instantly packages and uploads your code to trigger build pipeline' },
    { cmd: 'zcli service log --service api --follow', desc: 'Live tails runtime stdout/stderr logs in your terminal' },
    { cmd: 'zcli service status --service api', desc: 'Displays container health, memory usage, and running instances' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <Bookmark className="w-4 h-4" />
            <span>Developer Cheatsheet & Knowledge Sharing</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Zerops Quick Reference & Fresher Tips</h2>
          <p className="text-sm text-slate-400 mt-1">
            Handy tables of dynamic environment variables, CLI shortcuts, and community peer advice.
          </p>
        </div>

        <button
          onClick={() => setShowSubmitModal(true)}
          className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-xs font-bold transition-colors self-start md:self-auto"
        >
          <PlusCircle className="w-4 h-4 text-cyan-400" />
          <span>Share a Fresher Tip</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
        {/* Cross-Service Env Variables */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-800">
          <h3 className="text-sm font-bold text-white flex items-center space-x-2 mb-4 pb-3 border-b border-slate-800">
            <Key className="w-4 h-4 text-cyan-400" />
            <span>Dynamic VPC Environment Variables</span>
          </h3>
          <div className="space-y-2.5">
            {envVariablesRef.map((item, idx) => (
              <div key={idx} className="bg-slate-950/70 p-3 rounded-xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <code className="text-xs font-mono text-cyan-300 font-bold bg-slate-900 px-2 py-0.5 rounded border border-slate-700/80">
                  {item.var}
                </code>
                <span className="text-xs text-slate-400 text-right sm:text-left">{item.desc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Essential CLI Commands */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-800">
          <h3 className="text-sm font-bold text-white flex items-center space-x-2 mb-4 pb-3 border-b border-slate-800">
            <Terminal className="w-4 h-4 text-cyan-400" />
            <span>Essential `zcli` Commands</span>
          </h3>
          <div className="space-y-2.5">
            {cliCommandsRef.map((item, idx) => (
              <div key={idx} className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
                <div className="text-xs font-mono text-cyan-400 font-bold mb-1">$ {item.cmd}</div>
                <div className="text-xs text-slate-400">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Community Tips Board */}
      <div>
        <div className="flex items-center space-x-2 mb-4">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <h3 className="text-lg font-bold text-white">Community & Junior Developer Advice Board</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {tips.map((t) => (
            <div key={t.id} className="glass-card p-5 rounded-2xl border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                    {t.tag}
                  </span>
                  <button
                    onClick={() => handleUpvote(t.id)}
                    className="flex items-center space-x-1 text-xs text-slate-400 hover:text-cyan-400 transition-colors"
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span>{t.upvotes}</span>
                  </button>
                </div>
                <h4 className="text-sm font-bold text-white mb-2">{t.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{t.text}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500">
                <span className="font-medium text-slate-400">{t.author}</span>
                <span className="italic">{t.role}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for Submitting Tip */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-panel w-full max-w-md p-6 rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl">
            <h3 className="text-lg font-bold text-white mb-1">Share Your Zerops Tip or Gotcha</h3>
            <p className="text-xs text-slate-400 mb-4">Help other freshers avoid common pitfalls.</p>

            {submittedSuccess ? (
              <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-xs text-center flex items-center justify-center space-x-2">
                <Check className="w-4 h-4" />
                <span>Tip submitted successfully!</span>
              </div>
            ) : (
              <form onSubmit={handleSubmitTip} className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Tip Title</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. Always remember port 0.0.0.0"
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Description / Advice</label>
                  <textarea
                    required
                    rows={3}
                    value={formData.text}
                    onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                    placeholder="Describe what you learned and how it helps..."
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Your Name</label>
                    <input
                      type="text"
                      value={formData.author}
                      onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                      placeholder="e.g. Alex"
                      className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Tag</label>
                    <select
                      value={formData.tag}
                      onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500"
                    >
                      <option value="General">General</option>
                      <option value="Networking">Networking</option>
                      <option value="Database">Database</option>
                      <option value="CLI">CLI</option>
                      <option value="Performance">Performance</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center justify-end space-x-2 pt-3">
                  <button
                    type="button"
                    onClick={() => setShowSubmitModal(false)}
                    className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white text-xs font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex items-center space-x-1.5 px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold transition-colors"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Publish Tip</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
