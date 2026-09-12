import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Circle, 
  Copy, 
  Check, 
  Sparkles, 
  ExternalLink, 
  Info, 
  HelpCircle,
  FolderTree,
  FileCode,
  Globe2,
  TerminalSquare,
  ShieldAlert,
  ChevronRight,
  ArrowRight
} from 'lucide-react';

export default function StepByStepGuide({ completedSteps, toggleStepCompletion, setActiveTab }) {
  const [copiedCode, setCopiedCode] = useState(null);

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const stepsData = [
    {
      step: 1,
      id: "step1-account-project",
      badge: "Step 1",
      title: "Set Up Zerops Project & Isolated Private VPC",
      desc: "Every deployment begins with a Project container which encapsulates your microservices in a dedicated zero-trust private network.",
      actions: [
        "Sign up or log in at app.zerops.io (free tier & trial available)",
        "Click '+ Add Project' in your main dashboard",
        "Give your project a descriptive name (e.g. `ecommerce-app` or `portfolio`)",
        "Select your preferred data center location (e.g., Frankfurt/EU for global low latency)"
      ],
      diagram: "PROJECT: my-awesome-app [Private Isolated VPC]\n ├── Service 1: frontend (Static Nginx)\n ├── Service 2: api (Node.js/Python)\n └── Service 3: db (PostgreSQL 16 - Private only)",
      tip: "Services inside the same project can talk to each other securely over internal hostnames without exposing databases to the open internet!"
    },
    {
      step: 2,
      id: "step2-service-creation",
      badge: "Step 2",
      title: "Create Your Target Service(s)",
      desc: "Select the specific runtime container for each tier of your stack.",
      actions: [
        "Click '+ Add Service' inside your project",
        "Select runtime type according to your stack:",
        " • For React/Vue/Svelte/Static HTML: Choose 'Static'",
        " • For Express/NestJS/Fastify: Choose 'Node.js'",
        " • For FastAPI/Flask/Django: Choose 'Python'",
        " • For Go/PHP: Choose 'Go' or 'PHP'",
        " • For Databases: Choose 'PostgreSQL', 'MariaDB', or 'Redis'",
        "Define the hostname (e.g., `frontend`, `api`, `db`). Keep this in mind as it must match `setup:` in zerops.yml!"
      ],
      tip: "You can choose Auto-scaling so Zerops automatically expands RAM/CPU during high traffic and scales down to minimum during idle periods."
    },
    {
      step: 3,
      id: "step3-zerops-yml",
      badge: "Step 3",
      title: "Craft & Commit `zerops.yml` in Your Repo Root",
      desc: "The `zerops.yml` file is the master instruction set that tells Zerops how to install, build, cache, and run your code.",
      code: `# zerops.yml example for a Node.js Backend API
zerops:
  - setup: api
    build:
      base: nodejs@20
      buildCommands:
        - npm ci
        - npm run build
      deployFiles:
        - dist
        - package.json
        - node_modules
      cache:
        - node_modules
        - ~/.npm
    run:
      base: nodejs@20
      ports:
        - port: 3000
          httpSupport: true
      envVariables:
        PORT: 3000
        NODE_ENV: production
      start: npm start
      healthCheck:
        httpGet:
          port: 3000
          path: /healthz`,
      tip: "The `setup:` property in zerops.yml MUST match the exact service hostname you gave in Step 2!"
    },
    {
      step: 4,
      id: "step4-pipeline-deploy",
      badge: "Step 4",
      title: "Deploy via GitHub Integration or Zerops CLI (`zcli`)",
      desc: "Automate continuous deployment on every git commit, or push instantly from your local terminal with zcli.",
      options: [
        {
          title: "Method A: GitHub Continuous Deployment (Recommended)",
          steps: [
            "In your Zerops service dashboard, click 'CI/CD & Pipeline'",
            "Connect your GitHub repository and select branch (e.g. `main`)",
            "Every `git push origin main` will now trigger a zero-downtime build!"
          ]
        },
        {
          title: "Method B: Zerops CLI (zcli) Direct Push",
          code: `# Install Zerops CLI globally
npm install -g @zerops/zcli

# Log in using your Zerops Access Token
zcli login <YOUR_ACCESS_TOKEN>

# Push current directory directly to your service
zcli service push --service api`
        }
      ],
      tip: "You can generate personal access tokens in Zerops Dashboard > Your Profile > Access Tokens with 'Service: Push' permissions."
    },
    {
      step: 5,
      id: "step5-subdomains-ssl",
      badge: "Step 5",
      title: "Enable Public Routing, Subdomains & Custom Domains",
      desc: "Expose your web service to the world with automatic Let's Encrypt SSL certificates.",
      actions: [
        "In your service overview, check the 'Public Routing' section",
        "Zerops generates an automatic testing URL like `api-xxx.app.zerops.io`",
        "To attach your custom domain (e.g. `api.yourcompany.com`), add a CNAME record pointing to Zerops routing DNS",
        "SSL/TLS HTTPS certificates are automatically issued and renewed for free with zero maintenance!"
      ],
      tip: "Ensure `httpSupport: true` was declared under `ports:` in `zerops.yml` so the Zerops HTTP load balancer activates routing."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center space-x-2 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <FolderTree className="w-4 h-4" />
            <span>Master Deployment Blueprint</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">5-Step Zero-to-Production Walkthrough</h2>
          <p className="text-sm text-slate-400 mt-1">Follow these verified steps to deploy any application cleanly with zero downtime.</p>
        </div>

        {/* Step tracker summary card */}
        <div className="mt-4 md:mt-0 flex items-center space-x-3 bg-slate-900/90 border border-slate-800 p-3 rounded-xl">
          <div className="text-right">
            <span className="text-xs text-slate-400">Deployment Progress</span>
            <div className="text-sm font-bold text-cyan-400">{completedSteps.length} of {stepsData.length} Completed</div>
          </div>
          <div className="w-12 h-12 rounded-full border-4 border-slate-800 flex items-center justify-center relative">
            <div 
              className="absolute inset-0 rounded-full border-4 border-cyan-400 transition-all"
              style={{
                clipPath: `polygon(0 0, 100% 0, 100% ${(completedSteps.length / stepsData.length) * 100}%, 0 ${(completedSteps.length / stepsData.length) * 100}%)`
              }}
            />
            <span className="text-xs font-bold text-white z-10">
              {Math.round((completedSteps.length / stepsData.length) * 100)}%
            </span>
          </div>
        </div>
      </div>

      {/* Visual Hierarchy Infographic */}
      <div className="mb-10 p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/95 to-slate-900 border border-cyan-500/20 shadow-xl">
        <h3 className="text-sm font-bold text-cyan-300 flex items-center space-x-2 mb-3">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span>Understanding Zerops Architecture at a Glance</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
          <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800">
            <div className="font-mono text-cyan-400 font-bold mb-1">1. Project (VPC)</div>
            <p className="text-slate-400">Encapsulates all services in a secure private network with internal DNS.</p>
          </div>
          <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800">
            <div className="font-mono text-cyan-400 font-bold mb-1">2. Service Hostname</div>
            <p className="text-slate-400">Unique identifier inside project (e.g. `api`, `frontend`, `db`).</p>
          </div>
          <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800">
            <div className="font-mono text-cyan-400 font-bold mb-1">3. zerops.yml</div>
            <p className="text-slate-400">Directs build commands, artifacts, port forwarding, and health checks.</p>
          </div>
          <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800">
            <div className="font-mono text-cyan-400 font-bold mb-1">4. Ingress / SSL</div>
            <p className="text-slate-400">Automatic reverse proxy providing HTTPS and load balancing to containers.</p>
          </div>
        </div>
      </div>

      {/* Step Cards List */}
      <div className="space-y-6">
        {stepsData.map((s) => {
          const isDone = completedSteps.includes(s.id);
          return (
            <div 
              key={s.id}
              className={`glass-panel rounded-2xl p-6 border transition-all duration-200 ${
                isDone 
                  ? 'border-emerald-500/40 bg-emerald-950/10' 
                  : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start space-x-4">
                  {/* Step Number Circle */}
                  <button 
                    onClick={() => toggleStepCompletion(s.id)}
                    className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm transition-colors shrink-0 ${
                      isDone 
                        ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20' 
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {isDone ? <Check className="w-5 h-5 stroke-[3]" /> : s.step}
                  </button>

                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-semibold px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                        {s.badge}
                      </span>
                      <h3 className="text-lg font-bold text-white">{s.title}</h3>
                    </div>
                    <p className="text-sm text-slate-300 mt-1 leading-relaxed">{s.desc}</p>
                  </div>
                </div>

                {/* Mark as complete toggle */}
                <button
                  onClick={() => toggleStepCompletion(s.id)}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors shrink-0 ${
                    isDone 
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' 
                      : 'bg-slate-800/80 text-slate-400 border-slate-700 hover:text-white'
                  }`}
                >
                  {isDone ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Circle className="w-3.5 h-3.5" />}
                  <span>{isDone ? 'Completed' : 'Mark as Done'}</span>
                </button>
              </div>

              {/* Action items */}
              {s.actions && (
                <div className="mt-4 bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">Checklist Checklist:</span>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {s.actions.map((act, i) => (
                      <li key={i} className="flex items-start space-x-2">
                        <span className="text-cyan-400 font-bold">•</span>
                        <span>{act}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* ASCII Diagram if any */}
              {s.diagram && (
                <div className="mt-4 font-mono text-xs bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-cyan-300 whitespace-pre overflow-x-auto">
                  {s.diagram}
                </div>
              )}

              {/* Code Snippet if any */}
              {s.code && (
                <div className="mt-4">
                  <div className="flex items-center justify-between bg-slate-950 px-4 py-2 rounded-t-xl border-t border-x border-slate-800">
                    <span className="text-xs font-mono text-slate-400 flex items-center space-x-1.5">
                      <FileCode className="w-3.5 h-3.5 text-cyan-400" />
                      <span>zerops.yml</span>
                    </span>
                    <button
                      onClick={() => copyToClipboard(s.code, s.id)}
                      className="flex items-center space-x-1 text-xs text-slate-400 hover:text-white px-2 py-1 rounded hover:bg-slate-800 transition-colors"
                    >
                      {copiedCode === s.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy YAML</span>
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="font-mono text-xs bg-[#050912] p-4 rounded-b-xl border border-slate-800 text-slate-200 overflow-x-auto leading-relaxed">
                    {s.code}
                  </pre>
                </div>
              )}

              {/* Options (e.g. Method A vs Method B) */}
              {s.options && (
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {s.options.map((opt, optIdx) => (
                    <div key={optIdx} className="bg-slate-950/70 p-4 rounded-xl border border-slate-800">
                      <h4 className="text-xs font-bold text-cyan-300 mb-2">{opt.title}</h4>
                      {opt.steps && (
                        <ul className="space-y-1 text-xs text-slate-300">
                          {opt.steps.map((st, i) => (
                            <li key={i} className="flex items-start space-x-1.5">
                              <span className="text-cyan-400">▸</span>
                              <span>{st}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                      {opt.code && (
                        <div className="mt-2">
                          <pre className="font-mono text-xs bg-slate-900 p-3 rounded-lg border border-slate-800 text-slate-300 overflow-x-auto">
                            {opt.code}
                          </pre>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Pro Tip Callout */}
              {s.tip && (
                <div className="mt-4 flex items-start space-x-2.5 p-3 rounded-xl bg-cyan-500/5 border border-cyan-500/20 text-xs text-cyan-200">
                  <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-cyan-300">Pro Tip for Freshers: </span>
                    <span className="text-slate-300">{s.tip}</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer Banner */}
      <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-cyan-950/30 to-blue-950/30 border border-cyan-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="text-base font-bold text-white">Need a customized zerops.yml for your specific stack?</h4>
          <p className="text-xs text-slate-300 mt-0.5">Use our visual generator to customize ports, build commands, and cache options with live validation.</p>
        </div>
        <button
          onClick={() => setActiveTab('generator')}
          className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors shrink-0 shadow-lg shadow-cyan-500/20"
        >
          <span>Open zerops.yml Generator</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
