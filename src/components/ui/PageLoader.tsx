import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PageLoaderProps {
    onLoadComplete: () => void;
    darkMode: boolean;
}

export const PageLoader = ({ onLoadComplete, darkMode }: PageLoaderProps) => {
    const [progress, setProgress] = useState(0);
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        // Simulate loading progress
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => setIsComplete(true), 500);
                    setTimeout(onLoadComplete, 1500);
                    return 100;
                }
                // Accelerated curve for more natural feel
                const increment = prev < 60 ? Math.random() * 15 : Math.random() * 8;
                return Math.min(prev + increment, 100);
            });
        }, 150);

        return () => clearInterval(interval);
    }, [onLoadComplete]);

    return (
        <AnimatePresence>
            {!isComplete && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: [0.85, 0, 0.15, 1] }}
                    className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden ${darkMode ? 'bg-black' : 'bg-white'
                        }`}
                >
                    {/* Main Content */}
                    <div className="relative z-10 flex flex-col items-center gap-16 px-6">
                        {/* Bold Typography Loader */}
                        <div className="relative">
                            {/* Main Text with Stagger */}
                            <div className="overflow-hidden">
                                <motion.h1
                                    initial={{ y: "100%" }}
                                    animate={{ y: 0 }}
                                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                                    className={`text-[clamp(4rem,15vw,10rem)] font-black leading-none tracking-tighter ${darkMode ? 'text-white' : 'text-black'
                                        }`}
                                >
                                    LOADING
                                </motion.h1>
                            </div>

                            {/* Outline Text */}
                            <div className="overflow-hidden">
                                <motion.h1
                                    initial={{ y: "100%" }}
                                    animate={{ y: 0 }}
                                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                                    className="text-[clamp(4rem,15vw,10rem)] font-black leading-none tracking-tighter outline-text opacity-30"
                                    style={{
                                        WebkitTextStroke: `2px ${darkMode ? '#ffffff' : '#000000'}`,
                                        color: 'transparent'
                                    }}
                                >
                                    PORTFOLIO
                                </motion.h1>
                            </div>
                        </div>

                        {/* Progress Section */}
                        <div className="flex flex-col items-center gap-6 w-full max-w-md">
                            {/* Progress Number */}
                            <motion.div
                                className={`text-8xl font-black tracking-tighter tabular-nums ${darkMode ? 'text-white' : 'text-black'
                                    }`}
                                key={Math.floor(progress)}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.15 }}
                            >
                                {Math.floor(progress)}
                                <span className={`text-3xl ml-2 ${darkMode ? 'text-zinc-500' : 'text-zinc-400'}`}>%</span>
                            </motion.div>

                            {/* Minimalist Loading Bar */}
                            <div className="w-full relative">
                                <div className={`w-full h-0.5 ${darkMode ? 'bg-white/10' : 'bg-black/10'}`}>
                                    <motion.div
                                        className={`h-full ${darkMode ? 'bg-white' : 'bg-black'}`}
                                        initial={{ width: '0%' }}
                                        animate={{ width: `${progress}%` }}
                                        transition={{ duration: 0.3, ease: "easeOut" }}
                                    />
                                </div>

                                {/* Progress indicator dot */}
                                <motion.div
                                    className={`absolute -top-1.5 w-4 h-4 rounded-full ${darkMode ? 'bg-white' : 'bg-black'
                                        }`}
                                    initial={{ left: '0%' }}
                                    animate={{ left: `${progress}%` }}
                                    transition={{ duration: 0.3, ease: "easeOut" }}
                                    style={{ marginLeft: '-8px' }}
                                />
                            </div>

                            {/* Loading Text */}
                            <motion.p
                                className={`text-xs font-mono uppercase tracking-[0.3em] ${darkMode ? 'text-zinc-600' : 'text-zinc-400'
                                    }`}
                                animate={{ opacity: [0.3, 0.7, 0.3] }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            >
                                Preparing Experience
                            </motion.p>
                        </div>
                    </div>

                    {/* Clean Reveal Animation */}
                    {isComplete && (
                        <motion.div
                            className={`absolute inset-0 ${darkMode ? 'bg-black' : 'bg-white'}`}
                            initial={{ scaleY: 0 }}
                            animate={{ scaleY: 1 }}
                            transition={{ duration: 0.6, ease: [0.85, 0, 0.15, 1] }}
                            style={{ originY: 0 }}
                        />
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    );
};
