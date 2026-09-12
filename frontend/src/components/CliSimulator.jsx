import React, { useState, useEffect, useRef } from 'react';
import { 
  Terminal, 
  Play, 
  RotateCcw, 
  Copy, 
  Check, 
  Sparkles,
  CheckCircle,
  HelpCircle,
  ArrowRight
} from 'lucide-react';

export default function CliSimulator() {
  const [terminalLogs, setTerminalLogs] = useState([
    { type: 'system', text: 'Zerops CLI (zcli) Interactive Simulator v1.0.0' },
    { type: 'system', text: 'Type a command or click a quick-run action below to see real-time deploy logs.' },
    { type: 'prompt', text: '$ ' }
  ]);
  const [inputCommand, setInputCommand] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const terminalBottomRef = useRef(null);

  const commandScenarios = {
    'zcli login': [
      { text: '$ zcli login 9dfa4b18-sample-token-abc881', delay: 100 },
      { text: 'Authenticating with Zerops Core API...', delay: 400 },
      { text: '✓ Successfully authenticated as developer@example.com', delay: 800 },
      { text: '✓ Default region set to: europe-west1 (Frankfurt)', delay: 1100 }
    ],
    'zcli service push': [
      { text: '$ zcli service push --service api', delay: 100 },
      { text: 'Packaging workspace files (excluding .git, node_modules)...', delay: 400 },
      { text: 'Archive size: 2.4 MB compressed', delay: 700 },
      { text: 'Uploading archive to Zerops build pipeline...', delay: 1100 },
      { text: '[Build #142] Starting LXD build container (nodejs@20)...', delay: 1600 },
      { text: '[Build #142] Executing buildCommands: npm ci', delay: 2200 },
      { text: '[Build #142] added 184 packages in 2.1s (reusing cached layers)', delay: 2800 },
      { text: '[Build #142] Executing buildCommands: npm run build', delay: 3400 },
      { text: '[Build #142] ✓ Build complete. Creating artifact package.', delay: 4000 },
      { text: '[Deploy] Spinning up run container (nodejs@20)...', delay: 4600 },
      { text: '[Deploy] Injecting environment variables: PORT=3000, NODE_ENV=production', delay: 5100 },
      { text: '[Deploy] Running start command: npm start', delay: 5600 },
      { text: '[App Log] > Express API listening on 0.0.0.0:3000', delay: 6100 },
      { text: '[HealthCheck] Probing http://0.0.0.0:3000/healthz -> HTTP 200 OK', delay: 6700 },
      { text: '✓ Service api successfully deployed! Public URL: https://api-app.zerops.app', delay: 7200 }
    ],
    'zcli service status': [
      { text: '$ zcli service status --service api', delay: 100 },
      { text: 'Fetching service metadata from Zerops VPC...', delay: 400 },
      { text: '--------------------------------------------------', delay: 700 },
      { text: 'Service Name: api', delay: 900 },
      { text: 'Runtime: nodejs@20 (Linux LXD Container)', delay: 1100 },
      { text: 'Status: RUNNING (Green)', delay: 1300 },
      { text: 'Containers: 2 / 2 Active (High Availability)', delay: 1500 },
      { text: 'CPU Usage: 4% | Memory: 142 MB / 512 MB', delay: 1700 },
      { text: 'Public Ingress: Enabled (https://api-app.zerops.app)', delay: 1900 },
      { text: '--------------------------------------------------', delay: 2100 }
    ],
    'zcli service log': [
      { text: '$ zcli service log --service api --tail 5', delay: 100 },
      { text: 'Streaming recent log buffer...', delay: 400 },
      { text: '[2026-09-12 11:20:01] INFO: Server initialized on port 3000', delay: 700 },
      { text: '[2026-09-12 11:20:05] INFO: Database pool connected to postgresql://db:5432/main', delay: 1000 },
      { text: '[2026-09-12 11:20:10] GET /healthz 200 - 1.2ms', delay: 1300 },
      { text: '[2026-09-12 11:20:15] GET /api/users 200 - 4.5ms', delay: 1600 }
    ]
  };

  const runScenario = (commandKey) => {
    if (isRunning) return;
    setIsRunning(true);

    const steps = commandScenarios[commandKey] || [
      { text: `$ ${commandKey}`, delay: 100 },
      { text: `zcli: unknown command '${commandKey}'. Try: 'zcli login', 'zcli service push', 'zcli service status'`, delay: 400 }
    ];

    steps.forEach((step, index) => {
      setTimeout(() => {
        setTerminalLogs(prev => [...prev, { type: 'output', text: step.text }]);
        if (index === steps.length - 1) {
          setIsRunning(false);
        }
      }, step.delay);
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!inputCommand.trim() || isRunning) return;
    const cmd = inputCommand.trim();
    setInputCommand('');

    const matchedKey = Object.keys(commandScenarios).find(k => cmd.startsWith(k));
    runScenario(matchedKey || cmd);
  };

  const clearTerminal = () => {
    setTerminalLogs([
      { type: 'system', text: 'Terminal cleared. Ready for next command.' }
    ]);
  };

  useEffect(() => {
    terminalBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [terminalLogs]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-2 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-1">
          <Terminal className="w-4 h-4" />
          <span>Interactive CLI Sandbox</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white">Zerops CLI (`zcli`) Simulator</h2>
        <p className="text-sm text-slate-400 mt-1">
          Practice deploying and managing services with <code className="text-cyan-400 font-mono">zcli</code> in a realistic browser terminal simulator.
        </p>
      </div>

      {/* Quick Run Buttons */}
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={() => runScenario('zcli login')}
          disabled={isRunning}
          className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 text-xs font-mono transition-colors disabled:opacity-50"
        >
          ▶ zcli login
        </button>
        <button
          onClick={() => runScenario('zcli service push')}
          disabled={isRunning}
          className="px-3 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-xs font-mono font-bold transition-colors disabled:opacity-50"
        >
          ⚡ zcli service push (Simulate Full Build)
        </button>
        <button
          onClick={() => runScenario('zcli service status')}
          disabled={isRunning}
          className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 text-xs font-mono transition-colors disabled:opacity-50"
        >
          ▶ zcli service status
        </button>
        <button
          onClick={() => runScenario('zcli service log')}
          disabled={isRunning}
          className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 text-xs font-mono transition-colors disabled:opacity-50"
        >
          ▶ zcli service log
        </button>
        <button
          onClick={clearTerminal}
          className="px-3 py-1.5 rounded-lg bg-slate-950 text-slate-400 hover:text-white border border-slate-800 text-xs transition-colors ml-auto flex items-center space-x-1"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Clear</span>
        </button>
      </div>

      {/* Terminal Window Box */}
      <div className="rounded-2xl border border-slate-800 overflow-hidden shadow-2xl bg-[#030712]">
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#0B1222] border-b border-slate-800">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-rose-500/80" />
            <div className="w-3 h-3 rounded-full bg-amber-500/80" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
            <span className="text-xs font-mono text-slate-400 ml-2">bash - zcli v1.0.0</span>
          </div>
          <span className="text-[11px] font-mono text-slate-500">zerops-simulator@cloud</span>
        </div>

        {/* Terminal Output Area */}
        <div className="p-4 font-mono text-xs text-slate-300 min-h-[360px] max-h-[480px] overflow-y-auto space-y-1.5 leading-relaxed selection:bg-cyan-500 selection:text-black">
          {terminalLogs.map((log, index) => {
            if (log.type === 'system') {
              return <div key={index} className="text-slate-500 italic">{log.text}</div>;
            }
            if (log.text.startsWith('$')) {
              return (
                <div key={index} className="text-cyan-400 font-bold flex items-center space-x-2 pt-1">
                  <span>{log.text}</span>
                </div>
              );
            }
            if (log.text.startsWith('✓')) {
              return <div key={index} className="text-emerald-400 font-bold">{log.text}</div>;
            }
            if (log.text.includes('[Build') || log.text.includes('[Deploy')) {
              return <div key={index} className="text-cyan-300">{log.text}</div>;
            }
            return <div key={index} className="text-slate-300">{log.text}</div>;
          })}
          {isRunning && (
            <div className="flex items-center space-x-2 text-cyan-400 animate-pulse">
              <span className="inline-block w-2 h-4 bg-cyan-400" />
              <span>Processing pipeline...</span>
            </div>
          )}
          <div ref={terminalBottomRef} />
        </div>

        {/* Terminal Input Line */}
        <form onSubmit={handleFormSubmit} className="flex items-center bg-[#070D1A] px-4 py-3 border-t border-slate-800">
          <span className="text-cyan-400 font-mono font-bold mr-2 text-xs">$</span>
          <input
            type="text"
            value={inputCommand}
            onChange={(e) => setInputCommand(e.target.value)}
            disabled={isRunning}
            placeholder="Type 'zcli service push' or choose a quick button above..."
            className="flex-1 bg-transparent font-mono text-xs text-slate-100 focus:outline-none placeholder:text-slate-600"
          />
          <button
            type="submit"
            disabled={isRunning || !inputCommand.trim()}
            className="px-3 py-1 rounded bg-cyan-500 text-slate-950 font-bold text-xs disabled:opacity-30 transition-opacity"
          >
            Run
          </button>
        </form>
      </div>
    </div>
  );
}
