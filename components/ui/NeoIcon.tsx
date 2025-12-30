import React from 'react';
import { LucideIcon } from 'lucide-react';

interface NeoIconProps {
    icon: LucideIcon;
    size?: number;
    className?: string;
    variant?: 'raised' | 'inset' | 'Glass';
    color?: string;
}

import { cn } from '@/lib/utils';

export function NeoIcon({ icon: Icon, size = 24, className = '', variant = 'inset', color }: NeoIconProps) {
    const baseClasses = "flex items-center justify-center rounded-2xl transition-all duration-300";

    const variants = {
        raised: "neo-raised text-gray-600",
        inset: "neo-inset text-gray-500",
        Glass: "bg-white/30 backdrop-blur-md border border-white/50 shadow-lg text-primary" // Premium glassmorphism
    };

    return (
        <div
            className={cn(
                baseClasses,
                variants[variant],
                variant === 'raised' ? 'w-12 h-12' : 'w-16 h-16',
                className
            )}
        >
            <Icon
                size={size}
                className={cn(color, variant === 'raised' && 'drop-shadow-sm')}
                strokeWidth={2}
            />
        </div>
    );
}
