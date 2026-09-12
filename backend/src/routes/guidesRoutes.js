const express = require('express');
const router = express.Router();
const guides = require('../data/guides.json');
const recipes = require('../data/recipes.json');

// Get all general guides
router.get('/', (req, res) => {
  const { category, search } = req.query;
  let filtered = [...guides];

  if (category && category !== 'all') {
    filtered = filtered.filter(g => g.category.toLowerCase() === category.toLowerCase());
  }

  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(g => 
      g.title.toLowerCase().includes(q) || 
      g.summary.toLowerCase().includes(q)
    );
  }

  res.json({ success: true, count: filtered.length, data: filtered });
});

// Get guide by ID
router.get('/:id', (req, res) => {
  const guide = guides.find(g => g.id === req.params.id);
  if (!guide) {
    return res.status(404).json({ success: false, message: 'Guide not found' });
  }
  res.json({ success: true, data: guide });
});

// Get all tech stack recipes
router.get('/recipes/all', (req, res) => {
  const { category } = req.query;
  let result = [...recipes];
  if (category && category !== 'all') {
    result = result.filter(r => r.category.toLowerCase() === category.toLowerCase());
  }
  res.json({ success: true, count: result.length, data: result });
});

module.exports = router;
