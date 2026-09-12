const express = require('express');
const router = express.Router();
const pitfalls = require('../data/pitfalls.json');

// Get all pitfalls with category and search filter
router.get('/', (req, res) => {
  const { category, severity, search } = req.query;
  let filtered = [...pitfalls];

  if (category && category !== 'all') {
    filtered = filtered.filter(p => p.category.toLowerCase().includes(category.toLowerCase()));
  }

  if (severity && severity !== 'all') {
    filtered = filtered.filter(p => p.severity.toLowerCase() === severity.toLowerCase());
  }

  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(p => 
      p.title.toLowerCase().includes(q) || 
      p.symptom.toLowerCase().includes(q) ||
      p.explanation.toLowerCase().includes(q)
    );
  }

  res.json({ success: true, count: filtered.length, data: filtered });
});

// Get pitfall by ID
router.get('/:id', (req, res) => {
  const item = pitfalls.find(p => p.id === req.params.id);
  if (!item) {
    return res.status(404).json({ success: false, message: 'Pitfall not found' });
  }
  res.json({ success: true, data: item });
});

module.exports = router;
