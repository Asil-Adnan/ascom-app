'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface ExploreButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
}

export function ExploreButton({ className, ...props }: ExploreButtonProps) {
    return (
        <button
            {...props}
            className={cn(
                "group relative flex items-center justify-center gap-3",
                "px-8 py-3 rounded-full bg-[#EFE6E6] overflow-hidden",
                // Neumorphic Shadows (Base)
                "shadow-[8px_8px_16px_#D3C4C4,-8px_-8px_16px_#ffffff]",
                "transition-all duration-300",
                // Active State (Pressed)
                "active:shadow-[inset_4px_4px_8px_#D3C4C4,inset_-4px_-4px_8px_#ffffff] active:translate-y-0",
                // Hover State (Move slightly & Fill)
                "hover:-translate-y-0.5 hover:shadow-[10px_10px_20px_#D3C4C4,-10px_-10px_20px_#ffffff]",
                // Text Style
                "text-slate-700 font-bold tracking-wide hover:text-white",
                // Fill Effect (restored)
                "before:absolute before:-left-full before:z-10 before:w-full before:aspect-square",
                "before:rounded-full before:bg-gradient-to-r before:from-red-500 before:to-red-600",
                "before:transition-all before:duration-500 ease-out",
                "hover:before:left-0 hover:before:w-full hover:before:scale-150",
                className
            )}
        >
            <span className="relative z-20">Proceed</span>
            <svg
                className={cn(
                    "w-5 h-5 relative z-20 transition-all duration-300",
                    "text-slate-600 group-hover:text-white",
                    "group-hover:translate-x-1 group-hover:rotate-[-45deg]" // Added rotation for dynamic feel
                )}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
            >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
        </button>
    );
}
