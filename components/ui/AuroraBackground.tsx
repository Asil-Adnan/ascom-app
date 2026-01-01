'use client';

import React from 'react';

export function AuroraBackground() {
    return (
        <div className="fixed inset-0 w-full h-full -z-50 overflow-hidden bg-[#eff3f9]">
            {/* 
        The "Living Aurora" Mesh
        Using large blur circles moving slowly
      */}

            {/* 1. Primary Red Glow (Top Left) */}
            <div className="absolute top-[-10%] left-[-10%] w-[70vw] h-[70vw] 
                      bg-red-400/20 rounded-full blur-[120px] 
                      animate-aurora animation-delay-0 mix-blend-multiply" />

            {/* 2. Soft Amber Warmth (Bottom Right) */}
            <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] 
                      bg-orange-300/20 rounded-full blur-[100px] 
                      animate-aurora animation-delay-2000 mix-blend-multiply" />

            {/* 3. Cyan/Blue Depth (Center offset) */}
            <div className="absolute top-[30%] left-[40%] w-[50vw] h-[50vw] 
                      bg-blue-300/20 rounded-full blur-[90px] 
                      animate-aurora animation-delay-4000 mix-blend-multiply opacity-70" />

            {/* 4. White/Highlight sheen (Top Right) */}
            <div className="absolute top-[-20%] right-[10%] w-[40vw] h-[40vw] 
                      bg-white/60 rounded-full blur-[80px] 
                      animate-aurora animation-delay-1000 mix-blend-overlay" />

            {/* Noise Texture Overlay for that "Paper/Grain" feel */}
            <div className="absolute inset-0 w-full h-full opacity-[0.03] pointer-events-none mix-blend-overlay"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
            />

            {/* 
         Particles (Fireflies) 
         We duplicate a few for density
      */}
            <div className="particle absolute left-[10%] w-2 h-2 bg-white rounded-full blur-[1px] animate-particle" style={{ animationDuration: '25s', animationDelay: '0s' }} />
            <div className="particle absolute left-[30%] w-1.5 h-1.5 bg-red-300 rounded-full blur-[1px] animate-particle" style={{ animationDuration: '35s', animationDelay: '5s' }} />
            <div className="particle absolute left-[70%] w-2 h-2 bg-blue-200 rounded-full blur-[1px] animate-particle" style={{ animationDuration: '28s', animationDelay: '10s' }} />
            <div className="particle absolute left-[90%] w-1 h-1 bg-amber-200 rounded-full blur-[1px] animate-particle" style={{ animationDuration: '40s', animationDelay: '2s' }} />
        </div>
    );
}
