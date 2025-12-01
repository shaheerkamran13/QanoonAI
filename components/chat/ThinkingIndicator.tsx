"use client";

import { useState, useEffect, useRef } from "react";

const thinkingSteps = [
  { text: "Analyzing your query...", duration: 1000, animation: "thinking" },
  { text: "Searching legal database...", duration: 1000, animation: "search" },
  { text: "Reviewing Pakistani law...", duration: 1000, animation: "law" },
  { text: "Preparing response...", duration: 1000, animation: "thinking" },
];

// Lottie Animation Component
function LottieAnimation({ animationData, className = "" }) {
  const containerRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    // Dynamically import lottie-web only on client side
    let lottie;
    
    const loadLottie = async () => {
      lottie = (await import('lottie-web')).default;
      
      if (containerRef.current && animationData) {
        // Destroy previous animation if exists
        if (animationRef.current) {
          animationRef.current.destroy();
        }

        // Create new animation
        animationRef.current = lottie.loadAnimation({
          container: containerRef.current,
          renderer: 'svg',
          loop: true,
          autoplay: true,
          animationData: animationData,
        });
      }
    };

    loadLottie();

    return () => {
      if (animationRef.current) {
        animationRef.current.destroy();
      }
    };
  }, [animationData]);

  return <div ref={containerRef} className={className} />;
}

// Animation selector component
function AnimationDisplay({ type }) {
  // Import your actual Lottie files
  // Place these files in: public/animations/
  const animations = {
    law: '/animations/law.lottie',
    search: '/animations/search.lottie',
    thinking: '/animations/thinking.lottie',
  };

  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    // Fetch the .lottie file
    fetch(animations[type])
      .then(res => res.json())
      .then(data => setAnimationData(data))
      .catch(err => console.error('Failed to load animation:', err));
  }, [type]);

  // Fallback to simple CSS animation if Lottie file not loaded yet
  if (!animationData) {
    return (
      <div className="relative w-12 h-12 flex items-center justify-center">
        <div className="w-6 h-6 border-3 border-blue-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <LottieAnimation 
      animationData={animationData} 
      className="w-12 h-12"
    />
  );
}

export function ThinkingIndicator() {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % thinkingSteps.length);
    }, thinkingSteps[currentStep].duration);

    return () => clearInterval(stepInterval);
  }, [currentStep]);

  // Progress animation
  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const target = ((currentStep + 1) / thinkingSteps.length) * 100;
        if (prev < target) {
          return Math.min(prev + 2, target);
        }
        return prev;
      });
    }, 50);

    return () => clearInterval(progressInterval);
  }, [currentStep]);

  return (
    <div className="flex gap-4 mb-6 max-w-full animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
      {/* Avatar with pulsing effect */}
      <div className="relative">
        <div className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        </div>
        {/* Pulsing ring */}
        <div className="absolute inset-0 rounded-2xl bg-blue-500/30 animate-ping" />
      </div>

      {/* Thinking Content */}
      <div className="flex flex-col items-start flex-1 max-w-lg">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
            QanoonAI
          </span>
          <span className="text-xs text-blue-500 dark:text-blue-400 font-medium">
            is thinking...
          </span>
        </div>

        {/* Animated thinking box */}
        <div className="w-full bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-850 rounded-2xl rounded-tl-md p-4 shadow-sm border border-gray-200/50 dark:border-gray-700/50">
          <div className="flex items-center gap-4">
            {/* Lottie Animation Component */}
            <div className="flex-shrink-0">
              <AnimationDisplay type={thinkingSteps[currentStep].animation} />
            </div>

            {/* Current step text with fade animation */}
            <div className="flex-1">
              <span
                key={currentStep}
                className="text-sm font-medium text-gray-700 dark:text-gray-300 animate-in fade-in-0 slide-in-from-right-2 duration-300 block"
              >
                {thinkingSteps[currentStep].text}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-500 mt-1 block">
                Step {currentStep + 1} of {thinkingSteps.length}
              </span>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-4 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-600 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}