import React, { useRef } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';
import { Database, Cloud, Layout, Terminal } from 'lucide-react';

interface SkillsProps {
    darkMode: boolean;
}

const ROTATION_RANGE = 32.5;
const HALF_ROTATION_RANGE = 32.5 / 2;

const TiltCard = ({ children, className, darkMode }: { children: React.ReactNode; className?: string; darkMode: boolean }) => {
    const ref = useRef<HTMLDivElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const xSpring = useSpring(x);
    const ySpring = useSpring(y);

    const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();

        const width = rect.width;
        const height = rect.height;

        const mouseX = (e.clientX - rect.left) * ROTATION_RANGE;
        const mouseY = (e.clientY - rect.top) * ROTATION_RANGE;

        const rX = (mouseY / height - HALF_ROTATION_RANGE) * -1;
        const rY = mouseX / width - HALF_ROTATION_RANGE;

        x.set(rX);
        y.set(rY);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                transformStyle: "preserve-3d",
                transform,
            }}
            className={`relative h-full w-full rounded-xl border p-8 ${className} ${darkMode ? 'bg-zinc-900/50 border-zinc-800' : 'bg-white border-zinc-200'}`}
        >
            <div
                style={{
                    transform: "translateZ(75px)",
                    transformStyle: "preserve-3d",
                }}
                className="absolute inset-0 grid place-content-center rounded-xl shadow-lg"
            >
                {children}
            </div>
        </motion.div>
    );
};

export const Skills = ({ darkMode }: SkillsProps) => {
    const skills = [
        {
            category: "Data Engineering",
            icon: <Database size={48} />,
            items: ["Scala", "Spark", "Hadoop", "Kafka", "Airflow"],
            color: "text-blue-500"
        },
        {
            category: "Cloud & DevOps",
            icon: <Cloud size={48} />,
            items: ["Azure", "AWS", "Docker", "Kubernetes", "CI/CD"],
            color: "text-sky-400"
        },
        {
            category: "Frontend",
            icon: <Layout size={48} />,
            items: ["React", "TypeScript", "Tailwind", "Framer Motion"],
            color: "text-pink-500"
        },
        {
            category: "Backend & Tools",
            icon: <Terminal size={48} />,
            items: ["Node.js", "SQL", "Power BI", "Git", "Linux"],
            color: "text-emerald-500"
        }
    ];

    return (
        <section className={`py-32 px-6 ${darkMode ? 'bg-black' : 'bg-zinc-50'}`}>
            <div className="max-w-7xl mx-auto">
                <div className="mb-24">
                    <h2 className={`text-[8vw] font-black leading-[0.8] tracking-tighter mb-8 ${darkMode ? 'text-white' : 'text-black'}`}>
                        SKILLS & <br />
                        <span className="text-zinc-500">EXPERTISE</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-[800px]">
                    {skills.map((skill, i) => (
                        <div key={i} className="h-full">
                            <TiltCard darkMode={darkMode} className="flex flex-col items-center justify-center text-center gap-6 group">
                                <div className={`p-6 rounded-full bg-opacity-10 ${skill.color.replace('text', 'bg')} mb-4 group-hover:scale-110 transition-transform duration-500`}>
                                    <div className={skill.color}>{skill.icon}</div>
                                </div>
                                <h3 className={`text-3xl font-bold uppercase tracking-widest ${darkMode ? 'text-white' : 'text-black'}`}>
                                    {skill.category}
                                </h3>
                                <div className="flex flex-wrap justify-center gap-3 max-w-xs">
                                    {skill.items.map((item) => (
                                        <span
                                            key={item}
                                            className={`px-3 py-1 rounded-full text-sm font-bold border ${darkMode ? 'border-zinc-700 text-zinc-300' : 'border-zinc-300 text-zinc-600'}`}
                                        >
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </TiltCard>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
