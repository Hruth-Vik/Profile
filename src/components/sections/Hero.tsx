import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { VelocityText } from '../ui/VelocityText';
import { MouseParticles } from '../ui/MouseParticles';

interface HeroProps {
    darkMode: boolean;
}

export const Hero = ({ darkMode }: HeroProps) => {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);

    return (
        <section className="min-h-screen relative flex flex-col justify-center overflow-hidden pt-20">
            {/* Mouse Particle Effect */}
            <MouseParticles darkMode={darkMode} />
            <div className="max-w-[1600px] mx-auto px-6 relative z-10 w-full">

                <motion.div style={{ y: y1, opacity }} className="relative z-20">
                    <div className="overflow-hidden">
                        <motion.h1
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                            className="text-[clamp(4rem,13vw,12rem)] font-black leading-[0.85] tracking-tighter"
                        >
                            AI DATA
                        </motion.h1>
                    </div>
                    <div className="overflow-hidden">
                        <motion.h1
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                            className="text-[clamp(4rem,13vw,12rem)] font-black leading-[0.85] tracking-tighter ml-[10vw] outline-text opacity-50"
                        >
                            ENGINEER
                        </motion.h1>
                    </div>
                    <div className="overflow-hidden">
                        <motion.h1
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
                            className="text-[clamp(4rem,13vw,12rem)] font-black leading-[0.85] tracking-tighter"
                        >
                            & BUILDER
                        </motion.h1>
                    </div>

                    <div className="mt-12 flex flex-col md:flex-row justify-between items-start md:items-end max-w-4xl">
                        <p className={`text-lg md:text-xl max-w-md leading-relaxed font-medium ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                            Hruthvik is an AI Data Engineer at Target Corporation, architecting large-scale pipelines with Scala, Spark, and Hadoop.
                        </p>

                        <div className="mt-8 md:mt-0">
                            <div className={`w-16 h-16 rounded-full border flex items-center justify-center animate-bounce ${darkMode ? 'border-white' : 'border-black'}`}>
                                <ArrowRight className="rotate-90" />
                            </div>
                        </div>
                    </div>
                </motion.div>

            </div>

            {/* Background Marquee */}
            <div className="absolute bottom-10 left-0 w-full opacity-10 pointer-events-none mix-blend-overlay">
                <VelocityText baseVelocity={5} className="text-9xl font-black text-transparent stroke-text">
                    DATA • PIPELINES • SCALA • SPARK •
                </VelocityText>
            </div>
        </section>
    );
};
