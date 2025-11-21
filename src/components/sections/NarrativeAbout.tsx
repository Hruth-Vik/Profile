import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Orbit } from 'lucide-react';

interface NarrativeAboutProps {
    darkMode: boolean;
}

export const NarrativeAbout = ({ darkMode }: NarrativeAboutProps) => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Transforms for the narrative text skew
    const skewX = useTransform(scrollYProgress, [0, 1], [0, -10]);

    return (
        <section ref={containerRef} id="about" className="relative min-h-[250vh]">
            <div className="sticky top-0 h-screen flex items-center overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 w-full grid md:grid-cols-12 gap-12 items-center h-full">

                    {/* LEFT COLUMN: SCROLLING TEXT */}
                    <div className="md:col-span-7 h-full flex flex-col justify-center relative z-10 pointer-events-none">
                        <motion.div style={{ skewX }} className="space-y-40 py-20">

                            {/* Chapter 1 */}
                            <motion.div
                                style={{ opacity: useTransform(scrollYProgress, [0, 0.25, 0.35], [0, 1, 0.3]) }}
                                className="transition-opacity duration-500"
                            >
                                <h3 className={`text-xs font-bold uppercase tracking-[0.3em] mb-6 ${darkMode ? 'opacity-80' : 'opacity-60'}`}>01 — The Origin</h3>
                                <p className="text-3xl md:text-6xl font-bold leading-tight">
                                    Alliance University <br />
                                    <span className={`${darkMode ? 'text-zinc-300 md:text-zinc-500' : 'text-zinc-600'}`}>Graduate (9 CGPA).</span>
                                </p>
                                <p className={`mt-6 text-base md:text-lg max-w-md ${darkMode ? 'opacity-90 md:opacity-70' : 'opacity-70'}`}>
                                    Started with a strong foundation in Information Technology. Now architecting enterprise data solutions at Target.
                                </p>
                            </motion.div>

                            {/* Chapter 2 */}
                            <motion.div
                                style={{ opacity: useTransform(scrollYProgress, [0.3, 0.5, 0.65], [0.3, 1, 0.3]) }}
                                className="transition-opacity duration-500"
                            >
                                <h3 className={`text-xs font-bold uppercase tracking-[0.3em] mb-6 ${darkMode ? 'opacity-80' : 'opacity-60'}`}>02 — The Method</h3>
                                <p className="text-4xl md:text-6xl font-bold leading-tight">
                                    Big Data & <br />
                                    <span className={`${darkMode ? 'text-zinc-300 md:text-zinc-500' : 'text-zinc-600'}`}>Pipelines.</span>
                                </p>
                                <p className={`mt-6 text-lg max-w-md ${darkMode ? 'opacity-90 md:opacity-70' : 'opacity-70'}`}>
                                    I design scalable ETL transformations using Scala, Spark, and Hadoop. Efficiency and reliability are my core metrics.
                                </p>
                            </motion.div>

                            {/* Chapter 3 */}
                            <motion.div
                                style={{ opacity: useTransform(scrollYProgress, [0.6, 0.85, 1], [0.3, 1, 1]) }}
                                className="transition-opacity duration-500"
                            >
                                <h3 className={`text-xs font-bold uppercase tracking-[0.3em] mb-6 ${darkMode ? 'opacity-80' : 'opacity-60'}`}>03 — The Vision</h3>
                                <p className="text-4xl md:text-6xl font-bold leading-tight">
                                    Data-Driven <br />
                                    <span className={`${darkMode ? 'text-zinc-300 md:text-zinc-500' : 'text-zinc-600'}`}>Future.</span>
                                </p>
                                <p className={`mt-6 text-lg max-w-md ${darkMode ? 'opacity-90 md:opacity-70' : 'opacity-70'}`}>
                                    From raw ingestion to business-ready datasets. Ensuring data availability and quality for analytical objectives.
                                </p>
                            </motion.div>

                        </motion.div>
                    </div>

                    {/* RIGHT COLUMN: STICKY IMAGE */}
                    <div className="md:col-span-5 h-full flex items-center justify-center relative hidden md:flex">
                        <div className="relative w-full aspect-[3/4] max-h-[70vh]">
                            <motion.div
                                style={{
                                    rotateZ: useTransform(scrollYProgress, [0, 1], [0, 5]),
                                    scale: useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.1, 1])
                                }}
                                className={`w-full h-full overflow-hidden relative border-2 ${darkMode ? 'border-white/10 bg-zinc-900' : 'border-black/10 bg-zinc-100'}`}
                            >
                                <motion.img
                                    src="/hruthvik-portrait.png"
                                    alt="Hruthvik S Naik"
                                    className="w-full h-full object-cover grayscale contrast-125"
                                    style={{
                                        scale: useTransform(scrollYProgress, [0, 1], [1.2, 1])
                                    }}
                                />
                                {/* Overlay Filters */}
                                <div className={`absolute inset-0 mix-blend-overlay opacity-30 ${darkMode ? 'bg-indigo-900' : 'bg-amber-100'}`} />
                                <div className={`absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]`} />
                            </motion.div>

                            {/* Floating Decorative Elements */}
                            <motion.div
                                animate={{ y: [0, -20, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className={`absolute -right-8 -bottom-8 w-32 h-32 border rounded-full backdrop-blur-xl flex items-center justify-center z-20 ${darkMode ? 'border-white/20 bg-black/50 text-white' : 'border-black/20 bg-white/50 text-black'}`}
                            >
                                <span className="text-xs font-bold tracking-widest animate-spin-slow duration-20000">
                                    <Orbit size={32} className="animate-spin-slow" />
                                </span>
                            </motion.div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};
