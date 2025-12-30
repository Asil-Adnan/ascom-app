'use client';

import React, { useState } from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

// Palette for the "Liquid Glass" effect - APPLIED TO ICON FALLBACK
const iconColors = {
    red: "text-red-500 fill-red-500/20 shadow-red-500/50",
    blue: "text-blue-500 fill-blue-500/20 shadow-blue-500/50",
    orange: "text-orange-500 fill-orange-500/20 shadow-orange-500/50",
    cyan: "text-cyan-500 fill-cyan-500/20 shadow-cyan-500/50",
    purple: "text-purple-500 fill-purple-500/20 shadow-purple-500/50",
    emerald: "text-emerald-500 fill-emerald-500/20 shadow-emerald-500/50",
    slate: "text-slate-500 fill-slate-500/20 shadow-slate-500/50",
};

interface ServiceIconProps {
    icon: LucideIcon;
    label: string;
    isActive?: boolean;
    color?: keyof typeof iconColors;
    imageSrc?: string; // URL for 3D Asset
    onClick?: () => void;
}

export function ServiceIcon({ icon: Icon, label, isActive, color = 'red', imageSrc, onClick }: ServiceIconProps) {
    const iconColorClass = iconColors[color] || iconColors.slate;
    const [imgError, setImgError] = useState(false);

    // Determine if we show the Image or the Fallback Icon
    const showImage = imageSrc && !imgError;

    return (
        <button
            onClick={onClick}
            className="flex flex-col items-center gap-3 group transition-all duration-500"
        >
            {/* 
                "Liquid Glass" Container - STRICT RULES
                - ACTIVE: Deep Red Gradient + Gloss (Brand)
                - INACTIVE: White Glass (Neutral)
            */}
            <div className={cn(
                "relative w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center rounded-[22px] transition-all duration-500",
                isActive
                    ? "bg-gradient-to-br from-red-500 to-red-600 shadow-xl shadow-red-500/30 scale-110 border-red-400"
                    : "bg-white/40 border border-white/40 shadow-sm group-hover:bg-white/60 group-hover:scale-105"
            )}>
                {/* 
                   Liquid Gloss Overlay
                */}
                {isActive && (
                    <div className="absolute inset-0 rounded-[22px] overflow-hidden pointer-events-none">
                        <div className="absolute top-0 left-0 w-full h-[40%] bg-gradient-to-b from-white/40 to-transparent opacity-60" />
                        <div className="absolute bottom-0 right-0 w-[60%] h-[60%] bg-gradient-to-tl from-black/10 to-transparent opacity-20" />
                    </div>
                )}

                {/* 
                   Content Layer: 3D Image OR Lucide Fallback
                */}
                {showImage ? (
                    // 3D Image Asset
                    <img
                        src={imageSrc}
                        alt={label}
                        onError={() => setImgError(true)}
                        className={cn(
                            "relative z-10 w-full h-full object-contain transition-all duration-300 drop-shadow-md p-1",
                            // Show full color user asset. On active, maybe pop it more.
                            isActive ? "scale-110 drop-shadow-2xl brightness-110" : "filter-none hover:scale-110"
                        )}
                    />
                ) : (
                    // Lucide Fallback
                    <Icon
                        size={32}
                        strokeWidth={isActive ? 2.5 : 2}
                        className={cn(
                            "relative z-10 transition-all duration-300",
                            isActive
                                ? "text-white drop-shadow-md scale-105"
                                : cn(
                                    "scale-100 drop-shadow-sm transition-colors",
                                    iconColorClass
                                )
                        )}
                    />
                )}
            </div>

            {/* Label */}
            <span className={cn(
                "text-sm font-medium tracking-wide transition-colors duration-300",
                isActive ? "text-red-600 font-bold" : "text-slate-600 group-hover:text-slate-800"
            )}>
                {label}
            </span>
        </button>
    );
}
