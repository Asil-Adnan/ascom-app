'use client';

import React, { useRef } from 'react';
import { ChevronRight, ChevronLeft, CalendarDays, HelpCircle } from 'lucide-react';
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

    return (
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
                className="flex items-center gap-3 overflow-x-auto px-1 hide-scrollbar scroll-smooth"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {/* Flexible Date Option - Special Glass Card */}
                <button
                    onClick={() => onSelect('flexible')}
                    className={cn(
                        "flex-shrink-0 flex flex-col items-center justify-center gap-2",
                        "w-28 h-28 rounded-3xl transition-all duration-300 relative overflow-hidden group/card",
                        isFlexible
                            ? "bg-gradient-to-br from-red-500 to-red-600 text-white shadow-lg shadow-red-500/30 scale-105"
                            : "bg-white/40 backdrop-blur-md border border-white/40 hover:bg-white/60 hover:border-white/60 text-slate-500 hover:text-red-500 hover:shadow-lg"
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
        </div>
    );
}
