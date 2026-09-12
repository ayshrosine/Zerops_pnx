import React, { useState, useEffect } from 'react';
import { 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Award, 
  Sparkles, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { api } from '../services/api';

export default function QuizSection() {
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [quizResult, setQuizResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadQuestions();
  }, []);

  const loadQuestions = async () => {
    setLoading(true);
    try {
      const res = await api.getQuizQuestions();
      if (res.success && res.data) {
        setQuestions(res.data);
      }
    } catch (err) {
      console.error('Failed to load quiz:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectOption = (questionId, optionIndex) => {
    if (quizResult) return; // Prevent change after submit
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const handleSubmit = async () => {
    if (Object.keys(userAnswers).length < questions.length) {
      alert(`Please answer all ${questions.length} questions before submitting!`);
      return;
    }

    setSubmitting(true);
    try {
      const res = await api.submitQuiz(userAnswers);
      if (res.success) {
        setQuizResult(res);
      }
    } catch (err) {
      console.error('Failed to submit quiz:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setUserAnswers({});
    setQuizResult(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-2 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-1">
          <Award className="w-4 h-4" />
          <span>Certification & Knowledge Check</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white">Fresher Zerops Readiness Quiz</h2>
        <p className="text-sm text-slate-400 mt-1">
          Test your deployment knowledge regarding containers, ports, networking, and CI/CD pipelines before deploying to production.
        </p>
      </div>

      {/* Quiz Result Banner */}
      {quizResult && (
        <div className="mb-8 p-6 rounded-2xl bg-gradient-to-r from-cyan-950/40 via-slate-900 to-blue-950/40 border border-cyan-500/40 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
              <Award className="w-8 h-8" />
            </div>
            <div>
              <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wide">Test Completed</span>
              <h3 className="text-2xl font-black text-white">{quizResult.badge}</h3>
              <p className="text-xs text-slate-300 mt-1">
                You scored <strong className="text-cyan-400 font-bold">{quizResult.score} / {quizResult.total}</strong> ({quizResult.percentage}%) correct answers!
              </p>
            </div>
          </div>

          <button
            onClick={handleReset}
            className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-medium transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Retake Quiz</span>
          </button>
        </div>
      )}

      {/* Questions List */}
      <div className="space-y-6">
        {questions.map((q, qIndex) => {
          const selectedOption = userAnswers[q.id];
          const hasSubmitted = !!quizResult;
          const isCorrect = hasSubmitted && selectedOption === q.correctIndex;

          return (
            <div 
              key={q.id} 
              className={`glass-panel p-6 rounded-2xl border transition-all ${
                hasSubmitted 
                  ? isCorrect 
                    ? 'border-emerald-500/40 bg-emerald-950/10' 
                    : 'border-rose-500/40 bg-rose-950/10'
                  : 'border-slate-800'
              }`}
            >
              {/* Question Header */}
              <div className="flex items-start space-x-3 mb-4">
                <span className="w-7 h-7 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 flex items-center justify-center text-xs font-bold shrink-0">
                  {qIndex + 1}
                </span>
                <h3 className="text-sm sm:text-base font-bold text-white leading-snug">
                  {q.question}
                </h3>
              </div>

              {/* Options */}
              <div className="space-y-2.5 ml-10">
                {q.options.map((opt, optIndex) => {
                  const isSelected = selectedOption === optIndex;
                  let optionClass = 'bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-900 hover:border-slate-700';

                  if (hasSubmitted) {
                    if (optIndex === q.correctIndex) {
                      optionClass = 'bg-emerald-500/20 border-emerald-500 text-emerald-200 font-semibold';
                    } else if (isSelected && optIndex !== q.correctIndex) {
                      optionClass = 'bg-rose-500/20 border-rose-500 text-rose-200';
                    }
                  } else if (isSelected) {
                    optionClass = 'bg-cyan-500/20 border-cyan-500 text-cyan-200 font-semibold shadow-sm shadow-cyan-500/10';
                  }

                  return (
                    <div
                      key={optIndex}
                      onClick={() => handleSelectOption(q.id, optIndex)}
                      className={`p-3 rounded-xl border text-xs cursor-pointer transition-all flex items-center space-x-3 ${optionClass}`}
                    >
                      <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold border shrink-0 ${
                        isSelected 
                          ? 'border-cyan-400 bg-cyan-500 text-slate-950' 
                          : 'border-slate-700 text-slate-400'
                      }`}>
                        {String.fromCharCode(65 + optIndex)}
                      </span>
                      <span>{opt}</span>
                    </div>
                  );
                })}
              </div>

              {/* Explanation (Shown after submission) */}
              {hasSubmitted && (
                <div className="mt-4 ml-10 p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300">
                  <span className="font-bold text-cyan-400">Explanation: </span>
                  <span>{q.explanation}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Submit Button */}
      {!quizResult && (
        <div className="mt-8 flex justify-center">
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="flex items-center space-x-2 px-8 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold shadow-lg shadow-cyan-500/25 transition-all transform hover:-translate-y-0.5 text-sm"
          >
            <span>Submit Quiz & Get Score</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
