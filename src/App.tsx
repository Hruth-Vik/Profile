import React, { useState } from 'react';
import { Navbar } from './components/sections/Navbar';
import { Hero } from './components/sections/Hero';
import { NarrativeAbout } from './components/sections/NarrativeAbout';
import { Projects } from './components/sections/Projects';
import { Skills } from './components/sections/Skills';
import { SkillsFooter } from './components/sections/SkillsFooter';
import { CustomCursor } from './components/ui/CustomCursor';
import { PageLoader } from './components/ui/PageLoader';

export default function App() {
    const [darkMode, setDarkMode] = useState(true);

    return (
        <>
            <PageLoader onLoadComplete={() => { }} darkMode={darkMode} />

            <div className={`min-h-screen transition-colors duration-700 font-sans selection:bg-pink-500 selection:text-white ${darkMode ? 'bg-black text-zinc-100' : 'bg-white text-zinc-900'}`}>
                <CustomCursor />

                {/* Noise Texture */}
                <div className="fixed inset-0 pointer-events-none opacity-[0.04] z-[90] mix-blend-overlay" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />

                <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

                <main className="relative z-10">
                    <Hero darkMode={darkMode} />
                    <NarrativeAbout darkMode={darkMode} />
                    <Projects darkMode={darkMode} />
                    <Skills darkMode={darkMode} />
                </main>

                <SkillsFooter darkMode={darkMode} />
            </div>
        </>
    );
}
