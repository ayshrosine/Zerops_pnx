const express = require('express');
const router = express.Router();
const quizQuestions = require('../data/quiz.json');

// Get all quiz questions (without revealing answers directly on the list if needed, or with explanation)
router.get('/', (req, res) => {
  res.json({
    success: true,
    total: quizQuestions.length,
    data: quizQuestions
  });
});

// Score quiz submission
router.post('/submit', (req, res) => {
  const { answers = {} } = req.body;
  let score = 0;
  const results = quizQuestions.map((q) => {
    const userAnswer = answers[q.id];
    const isCorrect = userAnswer === q.correctIndex;
    if (isCorrect) score += 1;
    return {
      id: q.id,
      question: q.question,
      userAnswer,
      correctIndex: q.correctIndex,
      isCorrect,
      explanation: q.explanation
    };
  });

  const percentage = Math.round((score / quizQuestions.length) * 100);
  let badge = 'Novice Explorer';
  if (percentage === 100) badge = 'Zerops Cloud Master 🚀';
  else if (percentage >= 75) badge = 'DevOps Prodigy ⚡';
  else if (percentage >= 50) badge = 'Apprentice Builder 🛠️';

  res.json({
    success: true,
    score,
    total: quizQuestions.length,
    percentage,
    badge,
    results
  });
});

module.exports = router;
