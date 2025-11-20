import React from 'react';
import { VelocityText } from '../ui/VelocityText';

interface SkillsFooterProps {
    darkMode: boolean;
}

export const SkillsFooter = ({ darkMode }: SkillsFooterProps) => {
    return (
        <footer className={`py-20 overflow-hidden ${darkMode ? 'bg-zinc-900' : 'bg-zinc-100'}`}>
            <VelocityText baseVelocity={-2} className={`text-[15vw] font-black leading-none ${darkMode ? 'text-zinc-800' : 'text-zinc-300'}`}>
                SCALA SPARK HADOOP AZURE SQL REACT
            </VelocityText>

            <div className="max-w-7xl mx-auto px-6 mt-20 grid md:grid-cols-2 gap-12">
                <div>
                    <h4 className="text-lg font-bold mb-8 uppercase tracking-widest">Get in Touch</h4>
                    <a href="mailto:hruthviknaik03@gmail.com" className="text-4xl md:text-6xl font-black hover:underline decoration-2 underline-offset-8">
                        hruthviknaik03@gmail.com
                    </a>
                </div>
                <div className="flex flex-col justify-end md:items-end">
                    <div className="flex gap-8 mb-8">
                        <a href="https://github.com/Hruth-Vik" target="_blank" rel="noopener noreferrer" className="font-bold uppercase tracking-widest hover:text-zinc-500 transition-colors">Github</a>
                        <a href="https://linkedin.com/in/hruthviknaik" target="_blank" rel="noopener noreferrer" className="font-bold uppercase tracking-widest hover:text-zinc-500 transition-colors">LinkedIn</a>
                    </div>
                    <p className="text-xs font-mono opacity-50">
                        © 2025 Hruthvik.
                    </p>
                </div>
            </div>
        </footer>
    );
};
