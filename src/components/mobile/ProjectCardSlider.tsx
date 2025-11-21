import React, { useState } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';

interface Project {
    title: string;
    type: string;
    image: string;
    desc: string;
    tags: string[];
}

interface ProjectCardSliderProps {
    darkMode: boolean;
}

export const ProjectCardSlider = ({ darkMode }: ProjectCardSliderProps) => {
    const projects: Project[] = [
        {
            title: "DATA PIPELINE",
            type: "Scala & Spark",
            image: "/data-pipeline.png",
            desc: "Large-scale event data processing with ETL transformations",
            tags: ["Scala", "Spark", "Hadoop"]
        },
        {
            title: "OLA RIDE REPORT",
            type: "Power BI & SQL",
            image: "/ola-dashboard.png",
            desc: "End-to-end dashboard analyzing booking trends & revenue",
            tags: ["Power BI", "SQL", "Azure"]
        },
        {
            title: "TOKYO OLYMPICS",
            type: "Azure Data Factory",
            image: "/tokyo-olympics.png",
            desc: "Scalable ETL pipeline on Azure Data Lake & Synapse",
            tags: ["Azure", "ETL", "Synapse"]
        }
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    const slideVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0,
            scale: 0.9
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
            scale: 1
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0,
            scale: 0.9
        })
    };

    const swipeConfidenceThreshold = 10000;
    const swipePower = (offset: number, velocity: number) => {
        return Math.abs(offset) * velocity;
    };

    const paginate = (newDirection: number) => {
        setDirection(newDirection);
        setCurrentIndex((prevIndex) => {
            let newIndex = prevIndex + newDirection;
            if (newIndex < 0) newIndex = projects.length - 1;
            if (newIndex >= projects.length) newIndex = 0;
            return newIndex;
        });
    };

    const handleDragEnd = (e: any, { offset, velocity }: PanInfo) => {
        const swipe = swipePower(offset.x, velocity.x);

        if (swipe < -swipeConfidenceThreshold) {
            paginate(1);
        } else if (swipe > swipeConfidenceThreshold) {
            paginate(-1);
        }
    };

    return (
        <section className="relative min-h-screen flex flex-col justify-center py-20 px-4 overflow-hidden">
            {/* Header */}
            <div className="mb-8">
                <h2 className={`text-4xl font-black tracking-tighter mb-2 ${darkMode ? 'text-white' : 'text-black'}`}>
                    PROJECTS
                </h2>
                <p className={`text-sm font-mono ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                    SWIPE TO EXPLORE
                </p>
            </div>

            {/* Card Container */}
            <div className="relative w-full max-w-md mx-auto" style={{ height: '500px' }}>
                <AnimatePresence initial={false} custom={direction}>
                    <motion.div
                        key={currentIndex}
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: "spring", stiffness: 300, damping: 30 },
                            opacity: { duration: 0.2 },
                            scale: { duration: 0.2 }
                        }}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={1}
                        onDragEnd={handleDragEnd}
                        className={`absolute inset-0 rounded-2xl overflow-hidden cursor-grab active:cursor-grabbing ${darkMode ? 'bg-zinc-900 border border-white/10' : 'bg-white border border-black/10'
                            }`}
                        style={{
                            boxShadow: darkMode
                                ? '0 20px 60px rgba(0,0,0,0.5)'
                                : '0 20px 60px rgba(0,0,0,0.15)'
                        }}
                    >
                        {/* Project Image */}
                        <div className="relative h-64 overflow-hidden">
                            <img
                                src={projects[currentIndex].image}
                                alt={projects[currentIndex].title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        </div>

                        {/* Project Info */}
                        <div className="p-6 space-y-4">
                            <div>
                                <h3 className={`text-3xl font-black tracking-tighter mb-2 ${darkMode ? 'text-white' : 'text-black'}`}>
                                    {projects[currentIndex].title}
                                </h3>
                                <p className={`text-lg font-medium ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                                    {projects[currentIndex].type}
                                </p>
                            </div>

                            <p className={`text-sm leading-relaxed ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                                {projects[currentIndex].desc}
                            </p>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2">
                                {projects[currentIndex].tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className={`px-3 py-1 text-xs font-bold rounded-full border ${darkMode
                                                ? 'border-white/20 text-white'
                                                : 'border-black/20 text-black'
                                            }`}
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            {/* View Button */}
                            <button
                                className={`w-full py-3 px-6 rounded-full font-bold text-sm tracking-wider flex items-center justify-center gap-2 transition-all ${darkMode
                                        ? 'bg-white text-black hover:bg-zinc-200'
                                        : 'bg-black text-white hover:bg-zinc-800'
                                    }`}
                            >
                                VIEW CASE STUDY
                                <ExternalLink size={16} />
                            </button>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Navigation Arrows - Desktop */}
                <div className="hidden md:flex absolute inset-y-0 -left-16 -right-16 items-center justify-between pointer-events-none">
                    <button
                        onClick={() => paginate(-1)}
                        className={`pointer-events-auto w-12 h-12 rounded-full flex items-center justify-center transition-all ${darkMode
                                ? 'bg-white/10 hover:bg-white/20 text-white'
                                : 'bg-black/10 hover:bg-black/20 text-black'
                            }`}
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <button
                        onClick={() => paginate(1)}
                        className={`pointer-events-auto w-12 h-12 rounded-full flex items-center justify-center transition-all ${darkMode
                                ? 'bg-white/10 hover:bg-white/20 text-white'
                                : 'bg-black/10 hover:bg-black/20 text-black'
                            }`}
                    >
                        <ChevronRight size={24} />
                    </button>
                </div>
            </div>

            {/* Progress Indicators */}
            <div className="flex justify-center gap-2 mt-8">
                {projects.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => {
                            setDirection(index > currentIndex ? 1 : -1);
                            setCurrentIndex(index);
                        }}
                        className={`h-2 rounded-full transition-all ${index === currentIndex
                                ? `w-8 ${darkMode ? 'bg-white' : 'bg-black'}`
                                : `w-2 ${darkMode ? 'bg-white/30' : 'bg-black/30'}`
                            }`}
                    />
                ))}
            </div>

            {/* Swipe Hint */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 0.5, y: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
                className={`text-center mt-8 text-xs font-mono ${darkMode ? 'text-zinc-500' : 'text-zinc-400'}`}
            >
                ← SWIPE OR TAP ARROWS →
            </motion.div>
        </section>
    );
};
