import React from 'react';
import { motion } from 'framer-motion';
import { useMousePosition } from '../../hooks/useMousePosition';

export const CustomCursor = () => {
    const { x, y } = useMousePosition();

    return (
        <motion.div
            className="fixed top-0 left-0 w-6 h-6 bg-white rounded-full pointer-events-none z-[100] hidden md:block mix-blend-difference"
            style={{
                x,
                y,
                translateX: "-50%",
                translateY: "-50%"
            }}
            transition={{ type: "tween", ease: "linear", duration: 0 }}
        />
    );
};
