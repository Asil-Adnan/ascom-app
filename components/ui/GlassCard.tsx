'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    className?: string; // Allow Tailwind overrides
    frosted?: boolean; // If true, applies stronger blur (Level 2)
}

export function GlassCard({ children, className, frosted = false, ...props }: GlassCardProps) {
    return (
        <div
            className={cn(
                "rounded-3xl border transition-all duration-300",
                frosted
                    ? "bg-white/40 backdrop-blur-2xl border-white/40 shadow-xl" // Level 2: Heavy Frost
                    : "bg-gradient-to-br from-white/60 to-white/30 backdrop-blur-xl border-white/60 shadow-lg hover:shadow-2xl hover:-translate-y-1", // Level 3: Interactive
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}
