import React from 'react';

interface LogoProps {
    className?: string;
    size?: number;
    variant?: 'full' | 'icon';
}

export const Logo = ({ className = '', size = 40, variant = 'full' }: LogoProps) => {
    if (variant === 'icon') {
        return (
            <svg
                width={size}
                height={size}
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={className}
            >
                {/* Data node network forming H */}
                <circle cx="20" cy="25" r="6" fill="currentColor" />
                <circle cx="20" cy="50" r="6" fill="currentColor" />
                <circle cx="20" cy="75" r="6" fill="currentColor" />
                <circle cx="80" cy="25" r="6" fill="currentColor" />
                <circle cx="80" cy="50" r="6" fill="currentColor" />
                <circle cx="80" cy="75" r="6" fill="currentColor" />

                {/* Connecting lines */}
                <line x1="20" y1="25" x2="20" y2="75" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                <line x1="80" y1="25" x2="80" y2="75" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                <line x1="20" y1="50" x2="80" y2="50" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />

                {/* Data flow accent */}
                <circle cx="50" cy="50" r="4" fill="url(#gradient)" />

                <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#3B82F6" />
                        <stop offset="100%" stopColor="#8B5CF6" />
                    </linearGradient>
                </defs>
            </svg>
        );
    }

    return (
        <div className={`flex items-center gap-3 ${className}`}>
            {/* Icon */}
            <svg
                width={size}
                height={size}
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <circle cx="20" cy="25" r="6" fill="currentColor" />
                <circle cx="20" cy="50" r="6" fill="currentColor" />
                <circle cx="20" cy="75" r="6" fill="currentColor" />
                <circle cx="80" cy="25" r="6" fill="currentColor" />
                <circle cx="80" cy="50" r="6" fill="currentColor" />
                <circle cx="80" cy="75" r="6" fill="currentColor" />

                <line x1="20" y1="25" x2="20" y2="75" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                <line x1="80" y1="25" x2="80" y2="75" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                <line x1="20" y1="50" x2="80" y2="50" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />

                <circle cx="50" cy="50" r="4" fill="url(#gradient)" />

                <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#3B82F6" />
                        <stop offset="100%" stopColor="#8B5CF6" />
                    </linearGradient>
                </defs>
            </svg>

            {/* Wordmark */}
            <span className="font-black text-xl tracking-tighter">
                HRUTHVIK
            </span>
        </div>
    );
};
