import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Send, Sparkles } from 'lucide-react';

interface PaintSplashModalProps {
    isOpen: boolean;
    onClose: () => void;
    darkMode: boolean;
    content: 'about' | 'contact';
}

// Enhanced Paint splash SVG component with better visibility
const PaintSplash = ({ color, delay, position, size = 300 }: { color: string; delay: number; position: { x: string; y: string }; size?: number }) => {
    return (
        <motion.div
            initial={{ scale: 0, opacity: 0, rotate: 0 }}
            animate={{ scale: 1, opacity: 0.85, rotate: Math.random() * 360 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{
                duration: 0.7,
                delay,
                type: "spring",
                stiffness: 120,
                damping: 12
            }}
            style={{
                position: 'fixed',
                left: position.x,
                top: position.y,
                pointerEvents: 'none',
                zIndex: 45,
                filter: 'blur(1px)'
            }}
        >
            <svg width={size} height={size} viewBox="0 0 200 200" fill="none">
                {/* Main large splash */}
                <path
                    d="M100 30C130 25 160 50 165 80C170 110 150 140 120 145C90 150 60 130 55 100C50 70 70 35 100 30Z"
                    fill={color}
                    opacity="0.9"
                />
                {/* Secondary splash */}
                <path
                    d="M140 60C155 58 165 70 167 85C169 100 160 110 145 112C130 114 120 105 118 90C116 75 125 62 140 60Z"
                    fill={color}
                    opacity="0.7"
                />
                {/* Large splatter particles */}
                <circle cx="180" cy="60" r="12" fill={color} opacity="0.8" />
                <circle cx="25" cy="90" r="10" fill={color} opacity="0.7" />
                <circle cx="150" cy="160" r="15" fill={color} opacity="0.75" />
                <circle cx="60" cy="170" r="11" fill={color} opacity="0.6" />
                <circle cx="190" cy="120" r="8" fill={color} opacity="0.85" />
                <circle cx="40" cy="40" r="13" fill={color} opacity="0.7" />
                <circle cx="170" cy="180" r="9" fill={color} opacity="0.65" />
                <circle cx="30" cy="140" r="14" fill={color} opacity="0.8" />
                {/* Paint drips */}
                <path
                    d="M100 145 L95 180 L105 180 Z"
                    fill={color}
                    opacity="0.6"
                />
                <path
                    d="M140 150 L137 175 L143 175 Z"
                    fill={color}
                    opacity="0.7"
                />
                <path
                    d="M70 155 L67 185 L73 185 Z"
                    fill={color}
                    opacity="0.5"
                />
            </svg>
        </motion.div>
    );
};

// Creative Rolling close button with sparkle effect
const RollingCloseButton = ({ onClick, darkMode }: { onClick: () => void; darkMode: boolean }) => {
    return (
        <motion.button
            onClick={onClick}
            className={`absolute -top-6 -right-6 w-16 h-16 rounded-full flex items-center justify-center cursor-pointer border-4 shadow-2xl ${darkMode ? 'bg-white border-pink-500' : 'bg-black border-pink-500'
                }`}
            whileHover={{
                rotate: 360,
                scale: 1.2,
            }}
            whileTap={{ scale: 0.85 }}
            transition={{
                type: "spring",
                stiffness: 300,
                damping: 18,
                rotate: { duration: 0.5, ease: "easeInOut" }
            }}
        >
            <motion.div
                whileHover={{ rotate: -360, scale: 1.1 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
            >
                <X size={32} className={darkMode ? 'text-pink-500' : 'text-pink-500'} strokeWidth={3.5} />
            </motion.div>

            {/* Sparkle effect */}
            <motion.div
                className="absolute"
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
                <Sparkles size={16} className="text-pink-500 absolute -top-2 -right-2" />
            </motion.div>
        </motion.button>
    );
};

export const PaintSplashModal = ({ isOpen, onClose, darkMode, content }: PaintSplashModalProps) => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [focusedField, setFocusedField] = useState<string | null>(null);

    // Vibrant paint splash colors
    const splashColor = content === 'contact' ? '#ec4899' : '#3b82f6';

    // Better positioned splashes for visibility
    const splashPositions = [
        { x: '5%', y: '10%', size: 350 },
        { x: '80%', y: '8%', size: 300 },
        { x: '8%', y: '70%', size: 320 },
        { x: '85%', y: '75%', size: 280 },
        { x: '45%', y: '3%', size: 250 },
        { x: '92%', y: '45%', size: 240 },
    ];

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Enhanced Paint splashes */}
                    {splashPositions.map((pos, index) => (
                        <PaintSplash
                            key={index}
                            color={splashColor}
                            delay={index * 0.08}
                            position={{ x: pos.x, y: pos.y }}
                            size={pos.size}
                        />
                    ))}

                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-md z-50"
                    />

                    {/* Modal */}
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
                        <motion.div
                            initial={{ scale: 0.7, opacity: 0, y: 60, rotateX: 15 }}
                            animate={{ scale: 1, opacity: 1, y: 0, rotateX: 0 }}
                            exit={{ scale: 0.7, opacity: 0, y: 60 }}
                            transition={{
                                type: "spring",
                                stiffness: 280,
                                damping: 25,
                                delay: 0.15
                            }}
                            className={`relative w-full max-w-5xl max-h-[90vh] overflow-hidden rounded-3xl pointer-events-auto ${darkMode
                                ? 'bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-800 border-2 border-pink-500/30'
                                : 'bg-gradient-to-br from-white via-pink-50 to-white border-2 border-pink-500/20'
                                }`}
                            style={{
                                backdropFilter: 'blur(30px)',
                                boxShadow: '0 30px 60px -15px rgba(236, 72, 153, 0.5), 0 0 0 1px rgba(236, 72, 153, 0.1)'
                            }}
                        >
                            {/* Rolling Close Button */}
                            <RollingCloseButton onClick={onClose} darkMode={darkMode} />

                            {content === 'contact' && (
                                <div className="grid md:grid-cols-2 gap-0">
                                    {/* LEFT SIDE - Creative Header */}
                                    <motion.div
                                        initial={{ x: -50, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: 0.3 }}
                                        className={`p-12 flex flex-col justify-center relative overflow-hidden ${darkMode ? 'bg-gradient-to-br from-pink-600 to-rose-600' : 'bg-gradient-to-br from-pink-500 to-rose-500'
                                            }`}
                                    >
                                        {/* Animated background pattern */}
                                        <motion.div
                                            className="absolute inset-0 opacity-10"
                                            animate={{
                                                backgroundPosition: ['0% 0%', '100% 100%']
                                            }}
                                            transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse' }}
                                            style={{
                                                backgroundImage: 'radial-gradient(circle, white 2px, transparent 2px)',
                                                backgroundSize: '30px 30px'
                                            }}
                                        />

                                        <div className="relative z-10">
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{ delay: 0.4, type: "spring" }}
                                                className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-6"
                                            >
                                                <Mail size={40} className="text-white" />
                                            </motion.div>

                                            <h2 className="text-6xl font-black mb-4 text-white leading-tight">
                                                LET'S CREATE<br />
                                                <span className="text-7xl bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">
                                                    MAGIC
                                                </span>
                                            </h2>

                                            <p className="text-xl text-white/90 mb-8 font-medium leading-relaxed">
                                                Got an idea? Let's turn it into reality. Drop me a message and I'll get back to you faster than you can say "innovation"! ⚡
                                            </p>

                                            {/* Email direct link */}
                                            <motion.a
                                                href="mailto:hruthvik@example.com"
                                                whileHover={{ scale: 1.05, x: 10 }}
                                                className="inline-flex items-center gap-3 text-white font-bold text-lg bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border-2 border-white/30 hover:bg-white/20 transition-all"
                                            >
                                                <Mail size={20} />
                                                hruthvik@example.com
                                            </motion.a>
                                        </div>
                                    </motion.div>

                                    {/* RIGHT SIDE - Creative Form */}
                                    <motion.div
                                        initial={{ x: 50, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: 0.4 }}
                                        className="p-12"
                                    >
                                        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                                            {/* Name Field */}
                                            <div className="relative">
                                                <motion.label
                                                    className={`absolute left-4 transition-all duration-200 font-bold ${focusedField === 'name' || formData.name
                                                        ? '-top-3 text-sm text-pink-500 bg-white dark:bg-zinc-900 px-2'
                                                        : 'top-4 text-base ' + (darkMode ? 'text-zinc-500' : 'text-zinc-400')
                                                        }`}
                                                >
                                                    Your Name ✨
                                                </motion.label>
                                                <input
                                                    type="text"
                                                    value={formData.name}
                                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                    onFocus={() => setFocusedField('name')}
                                                    onBlur={() => setFocusedField(null)}
                                                    className={`w-full px-6 py-4 rounded-2xl border-3 text-lg font-medium transition-all focus:outline-none ${darkMode
                                                        ? 'bg-zinc-800/50 border-zinc-700 text-white focus:border-pink-500 focus:bg-zinc-800'
                                                        : 'bg-white border-zinc-200 text-black focus:border-pink-500 focus:bg-pink-50/30'
                                                        }`}
                                                />
                                            </div>

                                            {/* Email Field */}
                                            <div className="relative">
                                                <motion.label
                                                    className={`absolute left-4 transition-all duration-200 font-bold ${focusedField === 'email' || formData.email
                                                        ? '-top-3 text-sm text-pink-500 bg-white dark:bg-zinc-900 px-2'
                                                        : 'top-4 text-base ' + (darkMode ? 'text-zinc-500' : 'text-zinc-400')
                                                        }`}
                                                >
                                                    Email Address 📧
                                                </motion.label>
                                                <input
                                                    type="email"
                                                    value={formData.email}
                                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                    onFocus={() => setFocusedField('email')}
                                                    onBlur={() => setFocusedField(null)}
                                                    className={`w-full px-6 py-4 rounded-2xl border-3 text-lg font-medium transition-all focus:outline-none ${darkMode
                                                        ? 'bg-zinc-800/50 border-zinc-700 text-white focus:border-pink-500 focus:bg-zinc-800'
                                                        : 'bg-white border-zinc-200 text-black focus:border-pink-500 focus:bg-pink-50/30'
                                                        }`}
                                                />
                                            </div>

                                            {/* Message Field */}
                                            <div className="relative">
                                                <motion.label
                                                    className={`absolute left-4 transition-all duration-200 font-bold ${focusedField === 'message' || formData.message
                                                        ? '-top-3 text-sm text-pink-500 bg-white dark:bg-zinc-900 px-2'
                                                        : 'top-4 text-base ' + (darkMode ? 'text-zinc-500' : 'text-zinc-400')
                                                        }`}
                                                >
                                                    Your Message 💭
                                                </motion.label>
                                                <textarea
                                                    value={formData.message}
                                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                                    onFocus={() => setFocusedField('message')}
                                                    onBlur={() => setFocusedField(null)}
                                                    rows={6}
                                                    className={`w-full px-6 py-4 rounded-2xl border-3 text-lg font-medium transition-all focus:outline-none resize-none ${darkMode
                                                        ? 'bg-zinc-800/50 border-zinc-700 text-white focus:border-pink-500 focus:bg-zinc-800'
                                                        : 'bg-white border-zinc-200 text-black focus:border-pink-500 focus:bg-pink-50/30'
                                                        }`}
                                                />
                                            </div>

                                            {/* Submit Button */}
                                            <motion.button
                                                type="submit"
                                                whileHover={{ scale: 1.02, y: -2 }}
                                                whileTap={{ scale: 0.98 }}
                                                className="w-full bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 text-white py-5 rounded-2xl font-black text-xl shadow-2xl hover:shadow-pink-500/50 transition-all flex items-center justify-center gap-3 relative overflow-hidden group"
                                            >
                                                <motion.div
                                                    className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity"
                                                />
                                                <span className="relative z-10">SEND MESSAGE</span>
                                                <Send size={24} className="relative z-10" />
                                            </motion.button>
                                        </form>
                                    </motion.div>
                                </div>
                            )}

                            {content === 'about' && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                    className="p-12 space-y-6"
                                >
                                    <h2 className={`text-6xl font-black mb-6 bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent`}>
                                        ABOUT ME
                                    </h2>
                                    <p className={`text-xl leading-relaxed ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
                                        I'm an AI Data Engineering Intern passionate about building scalable data pipelines and working with large-scale systems using Scala, Spark, and Hadoop.
                                    </p>
                                    <p className={`text-xl leading-relaxed ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
                                        Currently interning at Target Corporation, I'm gaining hands-on experience in transforming complex data into actionable insights.
                                    </p>
                                </motion.div>
                            )}
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
};
