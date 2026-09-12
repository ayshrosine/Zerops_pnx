const express = require('express');
const router = express.Router();
const yaml = require('js-yaml');

// Dynamic zerops.yml generation endpoint
router.post('/generate', (req, res) => {
  try {
    const {
      serviceHostname = 'api',
      runtimeType = 'nodejs@20',
      isStatic = false,
      installCommand = 'npm ci',
      buildCommand = 'npm run build',
      deployFiles = ['dist', 'package.json', 'node_modules'],
      cacheDirs = ['node_modules', '~/.npm'],
      port = 3000,
      enableHttp = true,
      startCommand = 'npm start',
      healthCheckPath = '/healthz',
      envVars = { NODE_ENV: 'production' }
    } = req.body;

    let zeropsConfig;

    if (isStatic) {
      zeropsConfig = {
        zerops: [
          {
            setup: serviceHostname,
            build: {
              base: runtimeType || 'nodejs@20',
              buildCommands: [installCommand, buildCommand].filter(Boolean),
              deployFiles: ['dist/~'],
              cache: cacheDirs.filter(Boolean)
            },
            run: {
              base: 'static'
            }
          }
        ]
      };
    } else {
      const runBlock = {
        base: runtimeType,
        ports: [
          {
            port: Number(port) || 3000,
            httpSupport: Boolean(enableHttp)
          }
        ],
        start: startCommand || 'npm start'
      };

      if (Object.keys(envVars).length > 0) {
        runBlock.envVariables = envVars;
      }

      if (healthCheckPath) {
        runBlock.healthCheck = {
          httpGet: {
            port: Number(port) || 3000,
            path: healthCheckPath
          }
        };
      }

      zeropsConfig = {
        zerops: [
          {
            setup: serviceHostname,
            build: {
              base: runtimeType,
              buildCommands: [installCommand, buildCommand].filter(Boolean),
              deployFiles: Array.isArray(deployFiles) ? deployFiles : [deployFiles],
              cache: Array.isArray(cacheDirs) ? cacheDirs.filter(Boolean) : []
            },
            run: runBlock
          }
        ]
      };
    }

    const yamlString = yaml.dump(zeropsConfig, { indent: 2, lineWidth: -1 });

    res.json({
      success: true,
      yaml: yamlString,
      json: zeropsConfig
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to generate zerops.yml: ' + error.message
    });
  }
});

// Validate user's zerops.yml text
router.post('/validate', (req, res) => {
  const { yamlContent } = req.body;
  if (!yamlContent || typeof yamlContent !== 'string') {
    return res.status(400).json({ success: false, message: 'YAML content is required' });
  }

  const warnings = [];
  const errors = [];

  try {
    const parsed = yaml.load(yamlContent);

    if (!parsed || typeof parsed !== 'object') {
      errors.push('YAML content parsed into an empty or non-object structure.');
    } else if (!parsed.zerops && !parsed.project) {
      errors.push("Missing root key 'zerops:' or 'project:' in configuration.");
    } else if (parsed.zerops && Array.isArray(parsed.zerops)) {
      parsed.zerops.forEach((service, idx) => {
        if (!service.setup) {
          errors.push(`Service item at index ${idx} is missing 'setup:' name.`);
        }
        if (!service.build && !service.run) {
          errors.push(`Service '${service.setup || idx}' must contain at least 'build' or 'run' definition.`);
        }
        if (service.run && service.run.ports) {
          const hasHttp = service.run.ports.some(p => p.httpSupport === true);
          if (!hasHttp) {
            warnings.push(`Service '${service.setup}' has ports but none with 'httpSupport: true'. It won't get a public subdomain.`);
          }
        }
        if (service.build && (!service.build.cache || service.build.cache.length === 0)) {
          warnings.push(`Service '${service.setup}' has no 'cache:' configured. Builds might be slower without package caching.`);
        }
      });
    }

    res.json({
      success: errors.length === 0,
      isValid: errors.length === 0,
      errors,
      warnings,
      parsed
    });
  } catch (err) {
    res.json({
      success: false,
      isValid: false,
      errors: ['YAML Syntax Error: ' + err.message],
      warnings: []
    });
  }
});

module.exports = router;
