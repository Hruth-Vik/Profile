import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Mail, Linkedin, FileDown, ExternalLink } from 'lucide-react';

interface HorizontalScrollSectionProps {
    darkMode: boolean;
}

export const HorizontalScrollSection = ({ darkMode }: HorizontalScrollSectionProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Horizontal scroll transform: as you scroll down, content moves left
    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-66.66%"]);

    const projects = [
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

    return (
        <section ref={containerRef} className="relative" style={{ height: '400vh' }}>
            {/* Sticky container */}
            <div className="sticky top-0 h-screen overflow-hidden flex items-center">
                {/* Scrolling content */}
                <motion.div
                    style={{ x }}
                    className="flex gap-12 px-12"
                >
                    {/* Projects */}
                    {projects.map((project, index) => (
                        <div
                            key={index}
                            className="flex-shrink-0 w-screen h-screen flex items-center justify-center px-12"
                        >
                            <div className="max-w-6xl w-full grid md:grid-cols-2 gap-12 items-center">
                                {/* Project Image */}
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.6 }}
                                    className="relative aspect-[16/10] rounded-2xl overflow-hidden group"
                                >
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                </motion.div>

                                {/* Project Info */}
                                <motion.div
                                    initial={{ opacity: 0, x: 50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.6, delay: 0.2 }}
                                    className="space-y-6"
                                >
                                    <div className={`text-xs font-mono tracking-widest ${darkMode ? 'text-zinc-500' : 'text-zinc-400'}`}>
                                        PROJECT {String(index + 1).padStart(2, '0')}
                                    </div>
                                    <h3 className={`text-5xl lg:text-7xl font-black tracking-tighter ${darkMode ? 'text-white' : 'text-black'}`}>
                                        {project.title}
                                    </h3>
                                    <p className={`text-2xl font-medium ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                                        {project.type}
                                    </p>
                                    <p className={`text-lg leading-relaxed ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                                        {project.desc}
                                    </p>
                                    <div className="flex flex-wrap gap-3">
                                        {project.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className={`px-4 py-2 text-sm font-bold rounded-full border ${darkMode
                                                        ? 'border-white/20 text-white'
                                                        : 'border-black/20 text-black'
                                                    }`}
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <button
                                        className={`inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-sm tracking-wider transition-all group ${darkMode
                                                ? 'bg-white text-black hover:bg-zinc-200'
                                                : 'bg-black text-white hover:bg-zinc-800'
                                            }`}
                                    >
                                        VIEW CASE STUDY
                                        <ExternalLink size={18} className="group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </motion.div>
                            </div>
                        </div>
                    ))}

                    {/* Hire Me Section */}
                    <div className="flex-shrink-0 w-screen h-screen flex items-center justify-center px-12">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6 }}
                            className={`max-w-4xl w-full rounded-3xl p-12 ${darkMode
                                    ? 'bg-gradient-to-br from-zinc-900 to-black border border-white/10'
                                    : 'bg-gradient-to-br from-zinc-100 to-white border border-black/10'
                                }`}
                            style={{
                                boxShadow: darkMode
                                    ? '0 30px 80px rgba(0,0,0,0.5)'
                                    : '0 30px 80px rgba(0,0,0,0.15)'
                            }}
                        >
                            <div className="text-center space-y-8">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <h2 className={`text-6xl lg:text-8xl font-black tracking-tighter mb-4 ${darkMode ? 'text-white' : 'text-black'}`}>
                                        LET'S WORK
                                        <br />
                                        TOGETHER
                                    </h2>
                                    <p className={`text-xl ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                                        Open to new opportunities in AI & Data Engineering
                                    </p>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                    className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                                >
                                    <a
                                        href="mailto:hruthvik@example.com"
                                        className={`inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-sm tracking-wider transition-all ${darkMode
                                                ? 'bg-white text-black hover:bg-zinc-200'
                                                : 'bg-black text-white hover:bg-zinc-800'
                                            }`}
                                    >
                                        <Mail size={18} />
                                        SEND EMAIL
                                    </a>
                                    <a
                                        href="https://linkedin.com/in/hruthvik"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-sm tracking-wider border transition-all ${darkMode
                                                ? 'border-white/20 text-white hover:bg-white/10'
                                                : 'border-black/20 text-black hover:bg-black/5'
                                            }`}
                                    >
                                        <Linkedin size={18} />
                                        LINKEDIN
                                    </a>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.6 }}
                                >
                                    <button
                                        className={`inline-flex items-center gap-3 px-6 py-3 rounded-full text-sm font-medium transition-all ${darkMode
                                                ? 'text-zinc-400 hover:text-white'
                                                : 'text-zinc-600 hover:text-black'
                                            }`}
                                    >
                                        <FileDown size={16} />
                                        Download Resume
                                    </button>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    transition={{ delay: 0.8 }}
                                    className={`pt-8 border-t ${darkMode ? 'border-white/10' : 'border-black/10'}`}
                                >
                                    <p className={`text-sm ${darkMode ? 'text-zinc-500' : 'text-zinc-400'}`}>
                                        Currently: AI Data Engineering Intern @ Target Corporation
                                    </p>
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>

            {/* Scroll Progress Indicator */}
            <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
                <div className={`w-48 h-1 rounded-full overflow-hidden ${darkMode ? 'bg-white/10' : 'bg-black/10'}`}>
                    <motion.div
                        style={{ scaleX: scrollYProgress }}
                        className={`h-full origin-left ${darkMode ? 'bg-white' : 'bg-black'}`}
                    />
                </div>
            </div>
        </section>
    );
};
