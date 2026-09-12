const express = require('express');
const router = express.Router();

let initialTips = [
  {
    id: "tip-1",
    author: "Senior Platform Architect",
    role: "DevOps Lead",
    title: "Always check LXD Container Architecture",
    text: "Remember that Zerops containers are full Linux operating system containers (not single process Alpine images). You can use standard Linux system utilities and package managers without any hassle.",
    upvotes: 42,
    tag: "Architecture"
  },
  {
    id: "tip-2",
    author: "Fullstack Developer",
    role: "Zerops Power User",
    title: "Combine Frontend & Backend in one zerops.yml",
    text: "You can define multiple services inside the single zerops.yml file in your monorepo. Just provide two items under the `zerops:` array, one with `setup: frontend` and one with `setup: api`.",
    upvotes: 38,
    tag: "Monorepo"
  },
  {
    id: "tip-3",
    author: "Junior Engineer",
    role: "Fresher",
    title: "Use zcli for instant log tailing",
    text: "Instead of refreshing the web page, run `zcli service log --service api --follow` in your VS Code terminal. It gives you immediate live streaming output as your server initializes!",
    upvotes: 56,
    tag: "CLI"
  }
];

// Get tips
router.get('/', (req, res) => {
  res.json({ success: true, count: initialTips.length, data: initialTips });
});

// Upvote a tip
router.post('/:id/upvote', (req, res) => {
  const tip = initialTips.find(t => t.id === req.params.id);
  if (!tip) return res.status(404).json({ success: false, message: 'Tip not found' });
  tip.upvotes += 1;
  res.json({ success: true, data: tip });
});

// Submit a new tip
router.post('/submit', (req, res) => {
  const { author, role, title, text, tag } = req.body;
  if (!title || !text) {
    return res.status(400).json({ success: false, message: 'Title and text are required.' });
  }
  const newTip = {
    id: 'tip-' + Date.now(),
    author: author || 'Community Contributor',
    role: role || 'Junior Developer',
    title,
    text,
    upvotes: 1,
    tag: tag || 'General'
  };
  initialTips.unshift(newTip);
  res.status(201).json({ success: true, data: newTip });
});

module.exports = router;
