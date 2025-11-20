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
        <section id="work" className="py-40">
            <div className="max-w-[1800px] mx-auto px-6">
                <div className="mb-32 border-b border-current pb-8 flex justify-between items-end">
                    <h2 className="text-6xl md:text-[10vw] leading-[0.8] font-black tracking-tighter">WORKS</h2>
                    <div className="text-right hidden md:block">
                        <p className="text-sm font-mono">SELECTED PROJECTS</p>
                        <p className="text-sm font-mono">(2023 — 2025)</p>
                    </div>
                </div>

                <div className="space-y-40">
                    {projects.map((project, i) => (
                        <div key={i} className="group cursor-none">
                            <div className="relative w-full aspect-video md:aspect-[2.35/1] overflow-hidden mb-8">
                                <div className={`absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-difference pointer-events-none flex items-center justify-center text-white`}>
                                    <span className="text-2xl font-bold tracking-widest uppercase">Explore</span>
                                </div>
                                <motion.img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-out scale-105 group-hover:scale-100"
                                />
                            </div>

                            <div className="flex justify-between items-start px-2">
                                <div>
                                    <h3 className={`text-4xl md:text-8xl font-black tracking-tighter mb-2 ${darkMode ? 'text-white' : 'text-black'}`}>{project.title}</h3>
                                    <div className="flex gap-2">
                                        {["React", "WebGL", "Motion"].map(tag => (
                                            <span key={tag} className={`text-xs font-bold px-3 py-1 border rounded-full uppercase tracking-widest ${darkMode ? 'border-white/20 text-white' : 'border-black/20 text-black'}`}>{tag}</span>
                                        ))}
                                    </div>
                                </div>
                                <div className="text-right mt-4 md:mt-0">
                                    <p className={`text-xl font-medium mb-2 ${darkMode ? 'text-white' : 'text-black'}`}>{project.type}</p>
                                    <p className={`text-sm max-w-xs ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>{project.desc}</p>
                                    <MagneticButton className="mt-6 px-6 py-3 border rounded-full font-bold uppercase text-xs tracking-widest hover:bg-current hover:text-transparent hover:bg-clip-text transition-all">
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
