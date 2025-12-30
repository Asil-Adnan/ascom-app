'use client';

import React from 'react';
import { cn } from '@/lib/utils';

// Based on User's Neumorphic Snippet
// Adapted for React/Tailwind
// Color: Red

interface NeumorphicCheckboxProps {
    label: string;
    checked?: boolean;
    onChange?: () => void;
    className?: string;
}

export function NeumorphicCheckbox({ label, checked, onChange, className }: NeumorphicCheckboxProps) {
    return (
        <label className={cn("inline-flex items-center cursor-pointer gap-3 group", className)} onClick={onChange}>
            <div className="relative w-7 h-7">
                {/* Hidden Native Input */}
                <input
                    type="checkbox"
                    className="peer sr-only"
                    checked={checked}
                    readOnly
                />

                {/* The Checkmark Container */}
                <div className={cn(
                    // Base State (Unchecked)
                    "absolute inset-0 rounded-full bg-[#f0f0f0] transition-all duration-300 ease-in-out",
                    // Shadows for 3D effect (Scaled down)
                    "shadow-[0_2px_4px_rgba(0,0,0,0.2),inset_0_2px_3px_rgba(255,255,255,0.5)]",

                    // Checked State (Red Background + Inner Shadow)
                    "peer-checked:bg-red-500",
                    "peer-checked:shadow-[inset_0_3px_6px_rgba(0,0,0,0.2),0_2px_4px_rgba(0,0,0,0.1)]",

                    // The White Dot
                    "flex items-center justify-center"
                )}>
                    {/* The Dot itself (Scaled down) */}
                    <div className={cn(
                        "w-3 h-3 bg-white rounded-full shadow-sm transition-transform duration-300 ease-in-out",
                        checked ? "scale-100" : "scale-0"
                    )} />
                </div>
            </div>

            {/* Label */}
            <span className={cn(
                "text-sm font-medium transition-colors select-none",
                checked ? "text-red-600 font-bold" : "text-slate-600 group-hover:text-slate-800"
            )}>
                {label}
            </span>
        </label>
    );
}
