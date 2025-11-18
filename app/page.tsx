'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Scene {
  id: number;
  duration: number;
  text: string;
  backgroundImage: string;
  animation: 'fadeIn' | 'zoomIn' | 'slideUp';
}

const scenes: Scene[] = [
  {
    id: 1,
    duration: 2000,
    text: "Every journey is different…",
    backgroundImage: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    animation: 'fadeIn'
  },
  {
    id: 2,
    duration: 2000,
    text: "But some journeys test every bit of your strength.",
    backgroundImage: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    animation: 'fadeIn'
  },
  {
    id: 3,
    duration: 3000,
    text: "Sleepless nights. Fear. Prayers.",
    backgroundImage: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    animation: 'zoomIn'
  },
  {
    id: 4,
    duration: 2000,
    text: "Yet… they never gave up.",
    backgroundImage: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
    animation: 'fadeIn'
  },
  {
    id: 5,
    duration: 3000,
    text: "Because this little life is their whole world.",
    backgroundImage: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
    animation: 'zoomIn'
  },
  {
    id: 6,
    duration: 3000,
    text: "Strong parents raise strong miracles.",
    backgroundImage: "linear-gradient(135deg, #30cfd0 0%, #330867 100%)",
    animation: 'fadeIn'
  },
  {
    id: 7,
    duration: 2000,
    text: "❤️",
    backgroundImage: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
    animation: 'fadeIn'
  }
];

export default function Home() {
  const [currentScene, setCurrentScene] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isPlaying) return;

    const scene = scenes[currentScene];
    const startTime = Date.now();

    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const percent = (elapsed / scene.duration) * 100;
      setProgress(Math.min(percent, 100));
    }, 50);

    const timer = setTimeout(() => {
      if (currentScene < scenes.length - 1) {
        setCurrentScene(currentScene + 1);
        setProgress(0);
      } else {
        setIsPlaying(false);
        setProgress(100);
      }
    }, scene.duration);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, [currentScene, isPlaying]);

  const handleStart = () => {
    setCurrentScene(0);
    setProgress(0);
    setIsPlaying(true);
  };

  const handleRestart = () => {
    setCurrentScene(0);
    setProgress(0);
    setIsPlaying(true);
  };

  const scene = scenes[currentScene];

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* Background */}
      <AnimatePresence mode="wait">
        <motion.div
          key={scene.id}
          className="absolute inset-0 w-full h-full"
          style={{ background: scene.backgroundImage }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        />
      </AnimatePresence>

      {/* Overlay for better text contrast */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full px-8">
        <AnimatePresence mode="wait">
          {!isPlaying && currentScene === 0 ? (
            <motion.div
              key="start"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center"
            >
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 drop-shadow-2xl">
                A Birth Story
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-12 drop-shadow-lg">
                A journey of hope, strength, and love
              </p>
              <button
                onClick={handleStart}
                className="px-12 py-4 bg-white text-purple-600 rounded-full text-xl font-semibold hover:bg-purple-50 transition-all transform hover:scale-105 shadow-2xl"
              >
                Watch Story
              </button>
            </motion.div>
          ) : (
            <motion.div
              key={scene.id}
              initial={
                scene.animation === 'zoomIn'
                  ? { opacity: 0, scale: 0.8 }
                  : scene.animation === 'slideUp'
                  ? { opacity: 0, y: 50 }
                  : { opacity: 0 }
              }
              animate={
                scene.animation === 'zoomIn'
                  ? { opacity: 1, scale: 1.05 }
                  : scene.animation === 'slideUp'
                  ? { opacity: 1, y: 0 }
                  : { opacity: 1 }
              }
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-4xl"
            >
              <p className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight drop-shadow-2xl px-4">
                {scene.text}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* End screen */}
        {!isPlaying && currentScene === scenes.length - 1 && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            onClick={handleRestart}
            className="mt-12 px-10 py-3 bg-white text-purple-600 rounded-full text-lg font-semibold hover:bg-purple-50 transition-all transform hover:scale-105 shadow-2xl"
          >
            Watch Again
          </motion.button>
        )}
      </div>

      {/* Progress bar */}
      {isPlaying && (
        <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20">
          <motion.div
            className="h-full bg-white"
            style={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>
      )}

      {/* Audio visualization hint */}
      {isPlaying && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60 text-sm">
          🎵 Add your favorite lullaby music for the full experience
        </div>
      )}
    </div>
  );
}
