import React, { useState, useEffect } from 'react';
import { 
  FileCode2, 
  Copy, 
  Check, 
  Download, 
  RefreshCw, 
  AlertCircle, 
  CheckCircle, 
  HelpCircle,
  Sliders,
  Sparkles,
  Terminal,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { api } from '../services/api';

export default function YamlGenerator() {
  const [formData, setFormData] = useState({
    serviceHostname: 'api',
    runtimeType: 'nodejs@20',
    isStatic: false,
    installCommand: 'npm ci',
    buildCommand: 'npm run build',
    deployFiles: 'dist, package.json, node_modules',
    cacheDirs: 'node_modules, ~/.npm',
    port: '3000',
    enableHttp: true,
    startCommand: 'npm start',
    healthCheckPath: '/healthz',
    envVars: 'NODE_ENV=production\nPORT=3000'
  });

  const [generatedYaml, setGeneratedYaml] = useState('');
  const [validationResult, setValidationResult] = useState(null);
  const [copied, setCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  // Quick preset templates
  const presets = [
    {
      label: 'Node.js Express / Nest',
      data: {
        serviceHostname: 'api',
        runtimeType: 'nodejs@20',
        isStatic: false,
        installCommand: 'npm ci',
        buildCommand: 'npm run build',
        deployFiles: 'dist, package.json, node_modules',
        cacheDirs: 'node_modules, ~/.npm',
        port: '3000',
        enableHttp: true,
        startCommand: 'npm start',
        healthCheckPath: '/healthz',
        envVars: 'NODE_ENV=production\nPORT=3000'
      }
    },
    {
      label: 'React / Vite SPA',
      data: {
        serviceHostname: 'frontend',
        runtimeType: 'nodejs@20',
        isStatic: true,
        installCommand: 'npm ci',
        buildCommand: 'npm run build',
        deployFiles: 'dist/~',
        cacheDirs: 'node_modules, ~/.npm',
        port: '80',
        enableHttp: true,
        startCommand: '',
        healthCheckPath: '',
        envVars: ''
      }
    },
    {
      label: 'Python FastAPI',
      data: {
        serviceHostname: 'python-api',
        runtimeType: 'python@3.11',
        isStatic: false,
        installCommand: 'python -m venv .venv && . .venv/bin/activate && pip install -r requirements.txt',
        buildCommand: '',
        deployFiles: 'app, requirements.txt, .venv',
        cacheDirs: '~/.cache/pip',
        port: '8000',
        enableHttp: true,
        startCommand: '.venv/bin/uvicorn app.main:app --host 0.0.0.0 --port 8000',
        healthCheckPath: '/healthz',
        envVars: 'PYTHONUNBUFFERED=1'
      }
    },
    {
      label: 'Go Gin / Fiber',
      data: {
        serviceHostname: 'go-api',
        runtimeType: 'go@1.22',
        isStatic: false,
        installCommand: 'go mod download',
        buildCommand: 'CGO_ENABLED=0 GOOS=linux go build -o main .',
        deployFiles: 'main',
        cacheDirs: '~/go/pkg/mod, ~/.cache/go-build',
        port: '8080',
        enableHttp: true,
        startCommand: './main',
        healthCheckPath: '/healthz',
        envVars: 'PORT=8080'
      }
    }
  ];

  const handleApplyPreset = (preset) => {
    setFormData(preset.data);
  };

  useEffect(() => {
    generateYaml();
  }, [formData]);

  const generateYaml = async () => {
    setIsGenerating(true);
    try {
      // Parse env vars
      const parsedEnv = {};
      if (formData.envVars.trim()) {
        formData.envVars.split('\n').forEach(line => {
          const parts = line.split('=');
          if (parts.length >= 2) {
            parsedEnv[parts[0].trim()] = parts.slice(1).join('=').trim();
          }
        });
      }

      // Parse deployFiles and cacheDirs
      const deployFilesArr = formData.deployFiles
        .split(',')
        .map(s => s.trim())
        .filter(Boolean);

      const cacheDirsArr = formData.cacheDirs
        .split(',')
        .map(s => s.trim())
        .filter(Boolean);

      const payload = {
        serviceHostname: formData.serviceHostname || 'api',
        runtimeType: formData.runtimeType,
        isStatic: formData.isStatic,
        installCommand: formData.installCommand,
        buildCommand: formData.buildCommand,
        deployFiles: deployFilesArr,
        cacheDirs: cacheDirsArr,
        port: formData.port,
        enableHttp: formData.enableHttp,
        startCommand: formData.startCommand,
        healthCheckPath: formData.healthCheckPath,
        envVars: parsedEnv
      };

      const res = await api.generateConfig(payload);
      if (res.success) {
        setGeneratedYaml(res.yaml);
        validateYaml(res.yaml);
      }
    } catch (err) {
      console.error('Failed to generate YAML:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const validateYaml = async (yamlText) => {
    try {
      const res = await api.validateConfig(yamlText);
      setValidationResult(res);
    } catch (err) {
      console.error('Validation error:', err);
    }
  };

  const copyYaml = () => {
    navigator.clipboard.writeText(generatedYaml);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadYaml = () => {
    const blob = new Blob([generatedYaml], { type: 'text/yaml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'zerops.yml';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-2 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-1">
          <FileCode2 className="w-4 h-4" />
          <span>Interactive Config Studio</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white">Visual `zerops.yml` Generator & Validator</h2>
        <p className="text-sm text-slate-400 mt-1">
          Customize your runtime, commands, build caches, and ports. Get an optimized, error-free configuration ready to commit into git root.
        </p>
      </div>

      {/* Preset Buttons */}
      <div className="mb-6 flex flex-wrap items-center gap-2">
        <span className="text-xs text-slate-400 font-medium mr-1 flex items-center space-x-1">
          <Zap className="w-3.5 h-3.5 text-amber-400" />
          <span>Quick Presets:</span>
        </span>
        {presets.map((p, idx) => (
          <button
            key={idx}
            onClick={() => handleApplyPreset(p)}
            className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 hover:border-cyan-500/40 text-xs font-medium transition-colors"
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Form: Visual Inputs */}
        <div className="lg:col-span-6 glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center space-x-2 pb-3 border-b border-slate-800">
            <Sliders className="w-4 h-4 text-cyan-400" />
            <span>Service & Build Configuration</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Service Hostname */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Service Hostname (setup:)
              </label>
              <input
                type="text"
                value={formData.serviceHostname}
                onChange={(e) => setFormData({ ...formData, serviceHostname: e.target.value })}
                placeholder="api or frontend"
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 text-xs font-mono focus:border-cyan-500 focus:outline-none"
              />
              <span className="text-[10px] text-slate-500 mt-0.5 block">Must match Zerops dashboard service name</span>
            </div>

            {/* Runtime Base */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Runtime Base Container
              </label>
              <select
                value={formData.runtimeType}
                onChange={(e) => setFormData({ ...formData, runtimeType: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 text-xs font-mono focus:border-cyan-500 focus:outline-none"
              >
                <option value="nodejs@20">nodejs@20 (LTS)</option>
                <option value="nodejs@22">nodejs@22 (Latest)</option>
                <option value="python@3.11">python@3.11</option>
                <option value="python@3.12">python@3.12</option>
                <option value="go@1.22">go@1.22</option>
                <option value="php@8.3">php@8.3</option>
                <option value="rust@1">rust@1</option>
              </select>
            </div>
          </div>

          {/* Is Static Toggle */}
          <div className="flex items-center space-x-2 bg-slate-950/70 p-3 rounded-xl border border-slate-800">
            <input
              type="checkbox"
              id="isStatic"
              checked={formData.isStatic}
              onChange={(e) => setFormData({ ...formData, isStatic: e.target.checked })}
              className="w-4 h-4 rounded text-cyan-500 focus:ring-0 focus:ring-offset-0 bg-slate-900 border-slate-700"
            />
            <label htmlFor="isStatic" className="text-xs text-slate-200 cursor-pointer">
              Deploy as Static Site / SPA (<span className="text-cyan-400 font-mono">run.base: static</span>)
            </label>
          </div>

          {/* Install Command */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Package Install Command (Build stage)
            </label>
            <input
              type="text"
              value={formData.installCommand}
              onChange={(e) => setFormData({ ...formData, installCommand: e.target.value })}
              placeholder="npm ci or pip install -r requirements.txt"
              className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 text-xs font-mono focus:border-cyan-500 focus:outline-none"
            />
          </div>

          {/* Build Command */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Compile / Build Command (Build stage)
            </label>
            <input
              type="text"
              value={formData.buildCommand}
              onChange={(e) => setFormData({ ...formData, buildCommand: e.target.value })}
              placeholder="npm run build or go build -o main ."
              className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 text-xs font-mono focus:border-cyan-500 focus:outline-none"
            />
          </div>

          {/* Deploy Files */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Deploy Files / Artifacts (Comma separated)
            </label>
            <input
              type="text"
              value={formData.deployFiles}
              onChange={(e) => setFormData({ ...formData, deployFiles: e.target.value })}
              placeholder="dist, package.json, node_modules"
              className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 text-xs font-mono focus:border-cyan-500 focus:outline-none"
            />
            <span className="text-[10px] text-slate-500 mt-0.5 block">Use 'dist/~' to extract directly to root for static sites</span>
          </div>

          {/* Cache Dirs */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Build Cache Folders (Comma separated)
            </label>
            <input
              type="text"
              value={formData.cacheDirs}
              onChange={(e) => setFormData({ ...formData, cacheDirs: e.target.value })}
              placeholder="node_modules, ~/.npm"
              className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 text-xs font-mono focus:border-cyan-500 focus:outline-none"
            />
          </div>

          {!formData.isStatic && (
            <>
              {/* Port & Start Command */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Container Port Number
                  </label>
                  <input
                    type="number"
                    value={formData.port}
                    onChange={(e) => setFormData({ ...formData, port: e.target.value })}
                    placeholder="3000"
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 text-xs font-mono focus:border-cyan-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Health Check Endpoint Path
                  </label>
                  <input
                    type="text"
                    value={formData.healthCheckPath}
                    onChange={(e) => setFormData({ ...formData, healthCheckPath: e.target.value })}
                    placeholder="/healthz"
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 text-xs font-mono focus:border-cyan-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Start Command */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Start Command (Runtime entry point)
                </label>
                <input
                  type="text"
                  value={formData.startCommand}
                  onChange={(e) => setFormData({ ...formData, startCommand: e.target.value })}
                  placeholder="npm start or node dist/index.js"
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 text-xs font-mono focus:border-cyan-500 focus:outline-none"
                />
              </div>

              {/* Environment Variables */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Environment Variables (KEY=VALUE per line)
                </label>
                <textarea
                  rows={2}
                  value={formData.envVars}
                  onChange={(e) => setFormData({ ...formData, envVars: e.target.value })}
                  placeholder="NODE_ENV=production&#10;PORT=3000"
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 text-xs font-mono focus:border-cyan-500 focus:outline-none"
                />
              </div>
            </>
          )}
        </div>

        {/* Right Column: Live YAML Output & Validation Result */}
        <div className="lg:col-span-6 space-y-4">
          <div className="glass-panel p-6 rounded-2xl border border-slate-800">
            {/* Action Bar */}
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
              <div className="flex items-center space-x-2">
                <FileCode2 className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-mono font-bold text-white">zerops.yml</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 font-mono">
                  Live Generated
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={copyYaml}
                  className="flex items-center space-x-1.5 px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>

                <button
                  onClick={downloadYaml}
                  className="flex items-center space-x-1.5 px-3 py-1 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/30 text-xs font-medium transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </button>
              </div>
            </div>

            {/* YAML Preview Code Box */}
            <pre className="font-mono text-xs bg-[#050912] p-4 rounded-xl border border-slate-800/80 text-cyan-200 overflow-x-auto leading-relaxed max-h-96 select-all">
              {generatedYaml || '# Generating configuration...'}
            </pre>
          </div>

          {/* Live Validation & Tips Box */}
          {validationResult && (
            <div className={`p-4 rounded-2xl border ${
              validationResult.isValid 
                ? 'bg-emerald-950/20 border-emerald-500/30' 
                : 'bg-rose-950/20 border-rose-500/30'
            }`}>
              <div className="flex items-center space-x-2 mb-2">
                {validationResult.isValid ? (
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-rose-400" />
                )}
                <h4 className={`text-xs font-bold ${validationResult.isValid ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {validationResult.isValid ? 'Configuration Valid & Zerops Ready!' : 'Configuration Errors Detected'}
                </h4>
              </div>

              {validationResult.errors?.length > 0 && (
                <ul className="text-xs text-rose-300 space-y-1 mb-2">
                  {validationResult.errors.map((err, i) => (
                    <li key={i}>• {err}</li>
                  ))}
                </ul>
              )}

              {validationResult.warnings?.length > 0 && (
                <ul className="text-xs text-amber-300 space-y-1">
                  {validationResult.warnings.map((w, i) => (
                    <li key={i}>⚠️ {w}</li>
                  ))}
                </ul>
              )}

              {validationResult.isValid && validationResult.warnings?.length === 0 && (
                <p className="text-xs text-slate-300">
                  All syntax rules, port declarations, and build/run blocks match Zerops specifications. You are safe to commit this file!
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
