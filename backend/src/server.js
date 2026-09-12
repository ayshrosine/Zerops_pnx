const express = require('express');
const cors = require('cors');
const path = require('path');

const guidesRoutes = require('./routes/guidesRoutes');
const pitfallsRoutes = require('./routes/pitfallsRoutes');
const configRoutes = require('./routes/configRoutes');
const quizRoutes = require('./routes/quizRoutes');
const tipsRoutes = require('./routes/tipsRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Request logging
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Health check endpoint (Zerops compliant!)
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    service: 'zerops-guide-backend',
    version: '1.0.0'
  });
});

// API Routes
app.use('/api/guides', guidesRoutes);
app.use('/api/pitfalls', pitfallsRoutes);
app.use('/api/config', configRoutes);
app.use('/api/quiz', quizRoutes);
app.use('/api/tips', tipsRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Bind to 0.0.0.0 for Zerops container compatibility!
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Zerops Guide Backend running on http://0.0.0.0:${PORT}`);
});
