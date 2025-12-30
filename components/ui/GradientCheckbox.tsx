'use client';

import React from 'react';
import { cn } from '@/lib/utils';

// Based on Uiverse.io by hatim_6360
// Adapted for React control and Pastel Red palette

interface GradientCheckboxProps {
    label: string;
    checked?: boolean;
    onChange?: () => void;
    className?: string;
}

export function GradientCheckbox({ label, checked, onChange, className }: GradientCheckboxProps) {
    return (
        <label className={cn("relative flex items-center cursor-pointer group", className)} onClick={onChange}>
            {/* Hidden native checkbox for accessibility/peer logic */}
            <input
                type="checkbox"
                className="peer sr-only"
                checked={checked}
                readOnly // Controlled via onClick on label
            />

            {/* Visual Checkbox - Pastel Red Gradient */}
            <div
                className={cn(
                    "w-8 h-8 rounded-lg bg-white border-2 transition-all duration-300 ease-in-out",
                    // Default State: Red Border
                    "border-red-300 group-hover:border-red-400 group-hover:shadow-[0_0_15px_rgba(248,113,113,0.3)]",
                    // Checked State: Gradient Background, No Border, Rotate
                    "peer-checked:bg-gradient-to-br peer-checked:from-red-400 peer-checked:to-rose-400 peer-checked:border-0 peer-checked:rotate-12",
                    // Checkmark SVG using after pseudoelement trick from snippet
                    "after:content-[''] after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2",
                    "after:w-5 after:h-5 after:opacity-0 after:transition-opacity after:duration-300",
                    // SVG Data URI (White Checkmark)
                    "after:bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMyIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cG9seWxpbmUgcG9pbnRzPSIyMCA2IDkgMTcgNCAxMiI+PC9wb2x5bGluZT48L3N2Zz4=')]",
                    "after:bg-contain after:bg-no-repeat",
                    "peer-checked:after:opacity-100"
                )}
            ></div>

            <span className={cn(
                "ml-3 text-sm font-medium transition-colors",
                checked ? "text-red-600 font-semibold" : "text-gray-600 group-hover:text-gray-800"
            )}>
                {label}
            </span>
        </label>
    );
}
