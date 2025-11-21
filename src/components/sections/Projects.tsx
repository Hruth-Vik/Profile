import React from 'react';
import { motion } from 'framer-motion';
import { MagneticButton } from '../ui/MagneticButton';

interface ProjectsProps {
    darkMode: boolean;
}

export const Projects = ({ darkMode }: ProjectsProps) => {
    const projects = [
        {
            title: "DATA PIPELINE",
            type: "Scala & Spark",
            image: "/data-pipeline.png",
            desc: "Large-scale event data processing with ETL transformations"
        },
        {
            title: "OLA RIDE REPORT",
            type: "Power BI & SQL",
            image: "/ola-dashboard.png",
            desc: "End-to-end dashboard analyzing booking trends & revenue"
        },
        {
            title: "TOKYO OLYMPICS",
            type: "Azure Data Factory",
            image: "/tokyo-olympics.png",
            desc: "Scalable ETL pipeline on Azure Data Lake & Synapse"
        }
    ];

    return (
        <section id="work" className="py-20 md:py-40">
            <div className="max-w-[1800px] mx-auto px-4 md:px-6">
                <div className="mb-16 md:mb-32 border-b border-current pb-6 md:pb-8 flex justify-between items-end">
                    <h2 className="text-5xl md:text-6xl lg:text-[10vw] leading-[0.8] font-black tracking-tighter">WORKS</h2>
                    <div className="text-right hidden md:block">
                        <p className="text-sm font-mono">SELECTED PROJECTS</p>
                        <p className="text-sm font-mono">(2023 — 2025)</p>
                    </div>
                </div>

                <div className="space-y-20 md:space-y-40">
                    {projects.map((project, i) => (
                        <div key={i} className="group cursor-none">
                            {/* Image Container - Fixed for mobile responsiveness */}
                            <div className="relative w-full aspect-[4/3] sm:aspect-video md:aspect-[2.35/1] overflow-hidden mb-6 md:mb-8 rounded-none md:rounded-none">
                                <div className={`absolute inset-0 z-10 opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 mix-blend-difference pointer-events-none flex items-center justify-center text-white`}>
                                    <span className="text-xl md:text-2xl font-bold tracking-widest uppercase">Explore</span>
                                </div>
                                <motion.img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover object-center grayscale group-hover:grayscale-0 transition-all duration-700 ease-out scale-100 md:scale-105 md:group-hover:scale-100"
                                />
                            </div>

                            {/* Content - Stacked on mobile, side-by-side on desktop */}
                            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6 md:gap-4 px-2">
                                <div className="flex-1">
                                    <h3 className={`text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-black tracking-tighter mb-3 md:mb-2 ${darkMode ? 'text-white' : 'text-black'}`}>{project.title}</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {["React", "WebGL", "Motion"].map(tag => (
                                            <span key={tag} className={`text-xs font-bold px-3 py-1 border rounded-full uppercase tracking-widest ${darkMode ? 'border-white/20 text-white' : 'border-black/20 text-black'}`}>{tag}</span>
                                        ))}
                                    </div>
                                </div>
                                <div className="md:text-right md:max-w-xs flex-shrink-0">
                                    <p className={`text-lg md:text-xl font-medium mb-2 ${darkMode ? 'text-white' : 'text-black'}`}>{project.type}</p>
                                    <p className={`text-sm md:text-sm mb-4 md:mb-0 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>{project.desc}</p>
                                    <MagneticButton className="mt-4 md:mt-6 px-6 py-3 border rounded-full font-bold uppercase text-xs tracking-widest hover:bg-current hover:text-transparent hover:bg-clip-text transition-all inline-block">
                                        View Case Study
                                    </MagneticButton>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
