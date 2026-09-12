import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import StepByStepGuide from './components/StepByStepGuide';
import StackRecipes from './components/StackRecipes';
import YamlGenerator from './components/YamlGenerator';
import PitfallsAnalyzer from './components/PitfallsAnalyzer';
import CliSimulator from './components/CliSimulator';
import QuizSection from './components/QuizSection';
import ZeropsCheatsheet from './components/ZeropsCheatsheet';
import Footer from './components/Footer';
import { api } from './services/api';

export default function App() {
  const [activeTab, setActiveTab] = useState('guide');
  const [backendStatus, setBackendStatus] = useState('checking');
  const [completedSteps, setCompletedSteps] = useState(() => {
    try {
      const saved = localStorage.getItem('zerops_completed_steps');
      return saved ? JSON.parse(saved) : ['step1-account-project'];
    } catch {
      return ['step1-account-project'];
    }
  });

  useEffect(() => {
    checkBackend();
    const interval = setInterval(checkBackend, 15000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('zerops_completed_steps', JSON.stringify(completedSteps));
    } catch (e) {
      console.error(e);
    }
  }, [completedSteps]);

  const checkBackend = async () => {
    try {
      const res = await api.checkHealth();
      if (res && res.status === 'healthy') {
        setBackendStatus('healthy');
      } else {
        setBackendStatus('offline');
      }
    } catch {
      setBackendStatus('offline');
    }
  };

  const toggleStepCompletion = (stepId) => {
    setCompletedSteps(prev => 
      prev.includes(stepId) ? prev.filter(id => id !== stepId) : [...prev, stepId]
    );
  };

  const handleStartGuide = () => {
    setActiveTab('guide');
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#070D18] text-slate-100 selection:bg-cyan-500 selection:text-black">
      {/* Top Navigation */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        backendStatus={backendStatus}
        completedStepsCount={completedSteps.length}
      />

      {/* Main Content Area */}
      <main className="flex-grow">
        {/* Always display hero at top of guide or when navigating */}
        {activeTab === 'guide' && (
          <HeroSection 
            setActiveTab={setActiveTab} 
            onStartGuide={handleStartGuide} 
          />
        )}

        <div className="transition-opacity duration-200">
          {activeTab === 'guide' && (
            <StepByStepGuide 
              completedSteps={completedSteps} 
              toggleStepCompletion={toggleStepCompletion}
              setActiveTab={setActiveTab}
            />
          )}

          {activeTab === 'recipes' && (
            <StackRecipes />
          )}

          {activeTab === 'generator' && (
            <YamlGenerator />
          )}

          {activeTab === 'pitfalls' && (
            <PitfallsAnalyzer />
          )}

          {activeTab === 'simulator' && (
            <CliSimulator />
          )}

          {activeTab === 'quiz' && (
            <QuizSection />
          )}

          {activeTab === 'cheatsheet' && (
            <ZeropsCheatsheet />
          )}
        </div>
      </main>

      {/* Footer */}
      <Footer setActiveTab={setActiveTab} />
    </div>
  );
}
