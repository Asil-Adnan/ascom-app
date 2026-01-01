'use client';

import React, { useRef, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ChevronRight, ChevronLeft, CalendarDays, HelpCircle, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { NeoButton } from './NeoButton';

interface HorizontalDatePickerProps {
    selectedDate: string;
    onSelect: (date: string) => void;
}

export function HorizontalDatePicker({ selectedDate, onSelect }: HorizontalDatePickerProps) {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    // Generate next 30 days
    const dates = Array.from({ length: 30 }, (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() + i);
        return {
            dateObj: d,
            label: d.toLocaleDateString('en-US', { weekday: 'short' }),
            day: d.getDate(),
            fullDate: d.toISOString().split('T')[0], // YYYY-MM-DD
            isToday: i === 0,
        };
    });

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
        }
    };

    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: -200, behavior: 'smooth' });
        }
    };

    const isFlexible = selectedDate === 'flexible';
    const flexibleBtnRef = useRef<HTMLButtonElement>(null);
    const [tooltip, setTooltip] = useState<{ visible: boolean; x: number; y: number } | null>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleMouseEnter = () => {
        if (flexibleBtnRef.current) {
            const rect = flexibleBtnRef.current.getBoundingClientRect();
            setTooltip({
                visible: true,
                x: rect.left + rect.width / 2,
                y: rect.top
            });
        }
    };

    const handleMouseLeave = () => {
        setTooltip(null);
    };

    return (
        <>
            {/* Portal Tooltip */}
            {mounted && tooltip?.visible && createPortal(
                <div
                    className="fixed z-[9999] pointer-events-none transition-opacity duration-300"
                    style={{
                        left: tooltip.x,
                        top: tooltip.y - 12, // 12px gap
                        transform: 'translate(-50%, -100%)'
                    }}
                >
                    <div className="bg-white/60 backdrop-blur-xl p-4 rounded-2xl border border-white/60 shadow-[0_8px_32px_rgba(0_0_0_0.15)] text-center relative w-64 animate-in fade-in zoom-in-95 duration-200">
                        <h4 className="font-bold text-red-500 text-sm mb-1">Need Help?</h4>
                        <p className="text-xs text-slate-600 font-medium leading-relaxed">
                            Not sure which date to pick? allsupport staff will pick the best date and bus for you
                        </p>
                        {/* Arrow */}
                        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white/60 backdrop-blur-xl border-r border-b border-white/60 rotate-45 transform"></div>
                    </div>
                </div>,
                document.body
            )}

            <div className="relative w-full group py-2">

                {/* Left Scroll Button - Floating Glass */}
                <div className="absolute -left-4 top-1/2 -translate-y-1/2 z-30 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <button
                        onClick={scrollLeft}
                        className="w-10 h-10 rounded-full bg-white/40 backdrop-blur-md border border-white/50 shadow-[0_4px_12px_rgba(0,0,0,0.1)] flex items-center justify-center text-slate-600 hover:bg-red-500 hover:text-white hover:scale-110 active:scale-95 transition-all duration-300"
                    >
                        <ChevronLeft size={20} strokeWidth={2.5} />
                    </button>
                </div>

                {/* Scroll Container */}
                <div
                    ref={scrollContainerRef}
                    className="flex items-center gap-3 overflow-x-auto px-4 py-2 hide-scrollbar scroll-smooth"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {/* Flexible Date Option - Special Glass Card */}
                    <div className="relative group/flexible p-[2px] rounded-3xl overflow-hidden flex-shrink-0">
                        {/* Animated Border Gradient - Always Visible */}
                        <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-rose-400 to-red-600 animate-spin-slow opacity-100 transition-opacity duration-500" />

                        <button
                            ref={flexibleBtnRef}
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                            onClick={() => onSelect('flexible')}
                            className={cn(
                                "flex-shrink-0 flex flex-col items-center justify-center gap-2",
                                "w-28 h-28 rounded-[22px] transition-all duration-300 relative overflow-hidden group/card z-10", // adjust radius
                                isFlexible
                                    ? "bg-gradient-to-br from-red-500 to-red-600 text-white shadow-md shadow-red-500/20 scale-105"
                                    : "bg-white/90 backdrop-blur-md border border-white/50 hover:bg-white text-slate-500 hover:text-slate-700 hover:shadow-md"
                            )}
                        >
                            {/* Shine Effect */}
                            {!isFlexible && (
                                <div className="absolute inset-0 opacity-0 group-hover/card:opacity-100 bg-gradient-to-tr from-transparent via-white/40 to-transparent translate-x-[-100%] group-hover/card:translate-x-[100%] transition-transform duration-700 ease-in-out pointer-events-none" />
                            )}

                            <div className={cn("p-2 rounded-xl transition-colors", isFlexible ? "bg-white/20" : "bg-white/30")}>
                                <HelpCircle size={24} className={cn(isFlexible ? "text-white" : "text-current")} strokeWidth={2.5} />
                            </div>
                            <span className={cn("text-[10px] font-extrabold uppercase tracking-wide", isFlexible ? "text-white" : "text-slate-500")}>
                                Flexible
                            </span>
                        </button>
                    </div>

                    {/* Date Cards */}
                    {dates.map((date, index) => {
                        const isSelected = selectedDate === date.fullDate;

                        return (
                            <button
                                key={date.fullDate}
                                onClick={() => onSelect(date.fullDate)}
                                className={cn(
                                    "flex-shrink-0 flex flex-col items-center justify-center gap-1",
                                    "w-24 h-28 rounded-3xl transition-all duration-300 relative overflow-hidden",
                                    isSelected
                                        ? "bg-gradient-to-br from-red-500 to-red-600 text-white shadow-lg shadow-red-500/30 scale-105 z-10"
                                        : "bg-white/40 backdrop-blur-sm border border-white/40 hover:bg-white/60 hover:border-white/60 hover:-translate-y-1 hover:shadow-md"
                                )}
                            >
                                <span className={cn(
                                    "text-[10px] font-bold uppercase tracking-widest opacity-80",
                                    isSelected ? "text-white" : "text-slate-400"
                                )}>
                                    {date.isToday ? 'Today' : date.label}
                                </span>
                                <div className="flex flex-col items-center -space-y-1">
                                    <span className={cn(
                                        "text-3xl font-black tracking-tight",
                                        isSelected ? "text-white" : "text-slate-700"
                                    )}>
                                        {date.day}
                                    </span>
                                    <span className={cn("text-[8px] font-bold uppercase", isSelected ? "opacity-80" : "text-slate-400 opacity-0")}>
                                        {date.dateObj.toLocaleString('default', { month: 'short' })}
                                    </span>
                                </div>
                            </button>
                        );
                    })}

                    <div className="w-4 flex-shrink-0" />
                </div>

                {/* Right Scroll Button - Floating Glass */}
                <div className="absolute -right-4 top-1/2 -translate-y-1/2 z-30 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <button
                        onClick={scrollRight}
                        className="w-10 h-10 rounded-full bg-white/40 backdrop-blur-md border border-white/50 shadow-[0_4px_12px_rgba(0,0,0,0.1)] flex items-center justify-center text-slate-600 hover:bg-red-500 hover:text-white hover:scale-110 active:scale-95 transition-all duration-300"
                    >
                        <ChevronRight size={20} strokeWidth={2.5} />
                    </button>
                </div>
            </div >
        </>
    );
}
