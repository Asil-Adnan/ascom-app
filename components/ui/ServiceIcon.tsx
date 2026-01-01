'use client';

import React from 'react';
import { IconType } from 'react-icons';
import { cn } from '@/lib/utils';

interface ServiceIconProps {
    icon: IconType;
    label: string;
    isActive?: boolean;
    onClick?: () => void;
}

export function ServiceIcon({ icon: Icon, label, isActive, onClick }: ServiceIconProps) {
    return (
        <button
            onClick={onClick}
            className="flex flex-col items-center gap-3 group"
        >
            {/* 
                Neumorphic Button Container
                - Active: Full Red Gradient + Inset Shadow (Pit)
                - Inactive: Grey + Outward Shadow + Hover Red Fill
            */}
            <div className={cn(
                "w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center rounded-3xl transition-all duration-300 relative overflow-hidden",
                isActive
                    ? "bg-gradient-to-br from-red-500 to-red-600 shadow-[inset_6px_6px_12px_#991b1b,inset_-6px_-6px_12px_#ff6b6b]"
                    : "bg-[#e0e5ec] shadow-[6px_6px_12px_#b8b9be,-6px_-6px_12px_#ffffff] hover:-translate-y-1 hover:shadow-[8px_8px_16px_#b8b9be,-8px_-8px_16px_#ffffff]"
            )}>
                {/* Hover Gradient Fill (Inactive Only) */}
                {!isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                )}

                <Icon
                    size={48}
                    className={cn(
                        "relative z-10 transition-all duration-300",
                        isActive
                            ? "text-white scale-95"
                            : "text-slate-500 group-hover:text-white"
                    )}
                />
            </div>

            {/* Label */}
            <span className={cn(
                "text-xs sm:text-sm font-medium tracking-wide transition-colors duration-300",
                isActive ? "text-red-600 font-bold" : "text-slate-500 group-hover:text-slate-700"
            )}>
                {label}
            </span>
        </button>
    );
}
