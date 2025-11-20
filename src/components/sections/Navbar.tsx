import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, X } from 'lucide-react';
import { MagneticButton } from '../ui/MagneticButton';

interface NavbarProps {
    darkMode: boolean;
    setDarkMode: (value: boolean) => void;
}

export const Navbar = ({ darkMode, setDarkMode }: NavbarProps) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const menuItems = ["About", "Work", "Contact"];

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className={`fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-8 py-6 transition-all duration-500 ${isScrolled ? 'bg-transparent backdrop-blur-sm' : 'bg-transparent'}`}
            >
                <a href="#" className="text-2xl font-black tracking-tighter z-50 flex items-center gap-2 group">
                    <div className={`w-10 h-10 border-2 flex items-center justify-center rounded-full transition-all duration-500 group-hover:rotate-180 ${darkMode ? 'border-white bg-white text-black' : 'border-black bg-black text-white'}`}>
                        <span className="text-sm font-mono font-bold">H</span>
                    </div>
                </a>

                <div className={`flex items-center gap-4 ${darkMode ? 'text-white' : 'text-black'}`}>
                    <MagneticButton
                        onClick={() => setDarkMode(!darkMode)}
                        className={`w-12 h-12 rounded-full flex items-center justify-center border transition-colors ${darkMode ? 'border-white hover:bg-white hover:text-black' : 'border-black hover:bg-black hover:text-white'}`}
                    >
                        {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                    </MagneticButton>

                    <MagneticButton
                        onClick={() => setIsMenuOpen(true)}
                        className={`px-6 py-3 rounded-full border font-bold text-xs uppercase tracking-widest transition-colors ${darkMode ? 'border-white hover:bg-white hover:text-black' : 'border-black hover:bg-black hover:text-white'}`}
                    >
                        Menu
                    </MagneticButton>
                </div>
            </motion.nav>

            {/* Side Drawer Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMenuOpen(false)}
                            className="fixed inset-0 bg-black/50 z-[60] backdrop-blur-sm"
                        />

                        {/* Drawer */}
                        <motion.div
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "spring", damping: 30, stiffness: 300 }}
                            className="fixed top-0 left-0 bottom-0 w-full md:w-[500px] bg-black z-[70] p-12 flex flex-col justify-between"
                        >
                            <div className="flex justify-between items-center">
                                <div className="w-10 h-10 border-2 border-white bg-white text-black flex items-center justify-center rounded-full">
                                    <span className="text-sm font-mono font-bold">H</span>
                                </div>
                                <button
                                    onClick={() => setIsMenuOpen(false)}
                                    className="w-12 h-12 rounded-full border border-white text-white flex items-center justify-center hover:bg-white hover:text-black transition-colors"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            <div className="space-y-8">
                                {menuItems.map((item, i) => (
                                    <motion.div
                                        key={item}
                                        initial={{ x: -50, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: 0.1 + (i * 0.1) }}
                                    >
                                        <a
                                            href={`#${item.toLowerCase()}`}
                                            onClick={() => setIsMenuOpen(false)}
                                            className="text-6xl md:text-8xl font-black text-white hover:text-zinc-400 transition-colors tracking-tighter block"
                                        >
                                            {item}
                                        </a>
                                    </motion.div>
                                ))}
                            </div>

                            <div className="text-zinc-500 font-mono text-sm">
                                <p>BANGALORE, INDIA</p>
                                <p>{new Date().getFullYear()}</p>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};
