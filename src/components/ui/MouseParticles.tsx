import React, { useEffect, useRef } from 'react';

interface MouseParticlesProps {
    darkMode: boolean;
}

interface Particle {
    currentX: number;
    currentY: number;
    angle: number;
    distance: number;
    baseDistance: number;
    wobbleSpeed: number;
    wobbleAmount: number;
    rotationSpeed: number;
    size: number;
    color: string;
    opacity: number;
    maxOpacity: number;
    fadeSpeed: number;
    fadeDirection: number;
    respawnTimer: number;
}

// Professional easing functions for smooth animations
const easeOutCubic = (t: number): number => 1 - Math.pow(1 - t, 3);
const easeInOutQuad = (t: number): number => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

export const MouseParticles = ({ darkMode }: MouseParticlesProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particles = useRef<Particle[]>([]);
    const mousePos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
    const time = useRef(0);
    const animationFrameId = useRef<number | undefined>(undefined);
    const isVisible = useRef(true);
    const fadeOpacity = useRef(1);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Pure black for light mode, white for dark mode
        const particleColor = darkMode ? '#ffffff' : '#000000';

        const initParticles = () => {
            const particleCount = 100;
            particles.current = Array.from({ length: particleCount }, () => {
                const randomAngle = Math.random() * Math.PI * 2;

                const clusterRandom = Math.random();
                let randomDist;
                if (clusterRandom < 0.7) {
                    randomDist = 250 + Math.random() * 150;
                } else {
                    randomDist = 120 + Math.random() * 130;
                }

                return {
                    currentX: mousePos.current.x,
                    currentY: mousePos.current.y,
                    angle: randomAngle,
                    distance: randomDist,
                    baseDistance: randomDist,
                    wobbleSpeed: 0.008 + Math.random() * 0.025,
                    wobbleAmount: 20 + Math.random() * 35,
                    rotationSpeed: 0.002 + Math.random() * 0.008,
                    size: 1.5 + Math.random() * 3,
                    color: particleColor,
                    opacity: Math.random() * 0.5,
                    maxOpacity: darkMode ? (0.5 + Math.random() * 0.4) : (0.8 + Math.random() * 0.15), // Higher opacity for light mode
                    fadeSpeed: 0.003 + Math.random() * 0.01,
                    fadeDirection: Math.random() > 0.5 ? 1 : -1,
                    respawnTimer: Math.random() * 500,
                };
            });
        };

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        resize();
        initParticles(); // Initialize particles with correct theme color
        window.addEventListener('resize', resize);

        const handleMouseMove = (e: MouseEvent) => {
            mousePos.current = { x: e.clientX, y: e.clientY };
        };

        window.addEventListener('mousemove', handleMouseMove);

        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            const viewportHeight = window.innerHeight;
            const fadeStart = viewportHeight * 0.6;
            const fadeEnd = viewportHeight * 0.9;

            if (scrollPosition < fadeStart) {
                fadeOpacity.current = 1;
                isVisible.current = true;
            } else if (scrollPosition < fadeEnd) {
                const progress = (scrollPosition - fadeStart) / (fadeEnd - fadeStart);
                fadeOpacity.current = 1 - easeOutCubic(progress);
                isVisible.current = true;
            } else {
                fadeOpacity.current = 0;
                isVisible.current = false;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();

        const animate = () => {
            if (!ctx || !canvas) return;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            if (fadeOpacity.current <= 0) {
                animationFrameId.current = requestAnimationFrame(animate);
                return;
            }

            time.current += 1;

            particles.current.forEach(particle => {
                particle.opacity += particle.fadeDirection * particle.fadeSpeed;

                if (particle.opacity >= particle.maxOpacity) {
                    particle.fadeDirection = -1;
                } else if (particle.opacity <= 0) {
                    particle.fadeDirection = 1;

                    particle.respawnTimer--;
                    if (particle.respawnTimer <= 0) {
                        particle.angle = Math.random() * Math.PI * 2;

                        const clusterRandom = Math.random();
                        if (clusterRandom < 0.7) {
                            particle.baseDistance = 250 + Math.random() * 150;
                        } else {
                            particle.baseDistance = 120 + Math.random() * 130;
                        }

                        particle.distance = particle.baseDistance;
                        particle.respawnTimer = 300 + Math.random() * 500;
                    }
                }

                const wobble = Math.sin(time.current * particle.wobbleSpeed) * particle.wobbleAmount;
                particle.distance = particle.baseDistance + wobble;

                particle.angle += particle.rotationSpeed;

                const targetX = mousePos.current.x + Math.cos(particle.angle) * particle.distance;
                const targetY = mousePos.current.y + Math.sin(particle.angle) * particle.distance;

                const smoothing = 0.12;
                const dx = targetX - particle.currentX;
                const dy = targetY - particle.currentY;
                particle.currentX += dx * smoothing;
                particle.currentY += dy * smoothing;

                const edgeFadeDistance = 120;
                let edgeFade = 1;

                if (particle.currentX < edgeFadeDistance) {
                    const t = particle.currentX / edgeFadeDistance;
                    edgeFade = Math.min(edgeFade, easeInOutQuad(t));
                }
                if (particle.currentX > canvas.width - edgeFadeDistance) {
                    const t = (canvas.width - particle.currentX) / edgeFadeDistance;
                    edgeFade = Math.min(edgeFade, easeInOutQuad(t));
                }
                if (particle.currentY < edgeFadeDistance) {
                    const t = particle.currentY / edgeFadeDistance;
                    edgeFade = Math.min(edgeFade, easeInOutQuad(t));
                }
                if (particle.currentY > canvas.height - edgeFadeDistance) {
                    const t = (canvas.height - particle.currentY) / edgeFadeDistance;
                    edgeFade = Math.min(edgeFade, easeInOutQuad(t));
                }

                const finalOpacity = particle.opacity * edgeFade * fadeOpacity.current;

                if (finalOpacity > 0.01) {
                    ctx.save();

                    ctx.beginPath();
                    ctx.arc(particle.currentX, particle.currentY, particle.size, 0, Math.PI * 2);
                    ctx.fillStyle = particle.color;
                    ctx.globalAlpha = finalOpacity;
                    ctx.fill();

                    ctx.shadowBlur = 8;
                    ctx.shadowColor = particle.color;
                    ctx.globalAlpha = finalOpacity * 0.5;
                    ctx.fill();

                    ctx.restore();
                }
            });

            if (fadeOpacity.current > 0) {
                ctx.save();

                ctx.beginPath();
                ctx.arc(mousePos.current.x, mousePos.current.y, 12, 0, Math.PI * 2);

                ctx.fillStyle = '#ffffff';
                ctx.globalAlpha = 0.9 * fadeOpacity.current;
                ctx.shadowBlur = 15;
                ctx.shadowColor = '#ffffff';
                ctx.fill();

                ctx.beginPath();
                ctx.arc(mousePos.current.x, mousePos.current.y, 16, 0, Math.PI * 2);
                ctx.strokeStyle = '#ffffff';
                ctx.lineWidth = 1;
                ctx.globalAlpha = 0.3 * fadeOpacity.current;
                ctx.stroke();

                ctx.restore();
            }

            animationFrameId.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('scroll', handleScroll);
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
            }
        };
    }, [darkMode]); // Re-run effect when darkMode changes

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-0"
            style={{
                opacity: 1,
                transition: 'opacity 0.3s ease-out',
                willChange: 'contents'
            }}
        />
    );
};
