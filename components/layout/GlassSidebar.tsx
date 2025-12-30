'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { LayoutGrid, MessageSquare, Files, User, HelpCircle, ArrowLeft, LogOut } from 'lucide-react';

export function GlassSidebar() {
    const pathname = usePathname();

    const navItems = [
        {
            label: 'Home',
            icon: LayoutGrid,
            href: '/dashboard',
            match: '/dashboard',
        },
        {
            label: 'Applications',
            icon: Files,
            href: '/applications',
            match: '/applications'
        },
        {
            label: 'Messages',
            icon: MessageSquare,
            href: '/messages',
            match: '/messages'
        },
        {
            label: 'Profile',
            icon: User,
            href: '/profile',
            match: '/profile'
        },
        {
            label: 'Help',
            icon: HelpCircle,
            href: '/help',
            match: '/help'
        }
    ];

    return (
        <aside className={cn(
            "fixed left-6 top-6 bottom-6 w-[280px]",
            "rounded-[40px] overflow-hidden", // Increased roundness for super premium feel
            // Ultra-Premium Glass Effect
            "bg-white/10 backdrop-blur-[40px] backdrop-saturate-150",
            "border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.1)]",
            "flex flex-col z-50 transition-all duration-500 ease-out",
            "hover:bg-white/20 hover:border-white/30 hover:shadow-[0_20px_60px_rgba(0,0,0,0.15)]"
        )}>

            {/* 1. Header Area - Modern & Clean */}
            <div className="relative p-8 pb-4 z-10 text-center sm:text-left">
                <Link href="/dashboard" className="group inline-flex items-center gap-2 text-slate-600 hover:text-red-500 mb-8 transition-all duration-300">
                    <div className="w-10 h-10 rounded-full bg-white/30 border border-white/40 flex items-center justify-center group-hover:scale-110 group-hover:bg-red-500 group-hover:text-white group-hover:border-red-500 transition-all shadow-sm">
                        <ArrowLeft size={18} strokeWidth={2.5} />
                    </div>
                    <span className="text-[10px] font-extrabold uppercase tracking-widest opacity-60 group-hover:opacity-100 transition-opacity">Back</span>
                </Link>

                <div className="space-y-1 relative">
                    {/* Decorative subtle background glow behind text */}
                    <div className="absolute -left-4 -top-4 w-24 h-24 bg-red-500/10 rounded-full blur-2xl pointer-events-none"></div>

                    <h1 className="text-4xl font-black text-slate-800 leading-[0.9] tracking-tighter drop-shadow-sm relative z-10">
                        Bus<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-600">
                            Visa
                        </span>
                    </h1>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-2 pl-1 relative z-10">
                        Service
                    </p>
                </div>
            </div>

            {/* 2. Navigation Area - Floating Pills */}
            <nav className="flex-1 px-4 py-6 space-y-3 overflow-y-auto scrollbar-hide relative z-10">
                {navItems.map((item) => {
                    const isActive = pathname?.startsWith(item.match);
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.label}
                            href={item.href}
                            className={cn(
                                "group relative flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-500 ease-out",
                                isActive
                                    ? "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg shadow-red-500/30 translate-x-1"
                                    : "hover:bg-white/50 text-slate-500 hover:text-slate-900 hover:shadow-md hover:shadow-white/40 hover:translate-x-1"
                            )}
                        >
                            {/* Icon Container */}
                            <div className={cn(
                                "w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500",
                                isActive
                                    ? "bg-white/20 text-white rotate-0"
                                    : "bg-white/40 group-hover:bg-white group-hover:scale-110 group-hover:rotate-12"
                            )}>
                                <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                            </div>

                            {/* Label */}
                            <span className={cn(
                                "font-bold text-sm tracking-wide transition-all",
                                isActive ? "opacity-100 translate-x-0" : "opacity-80 group-hover:opacity-100 group-hover:translate-x-1"
                            )}>
                                {item.label}
                            </span>

                            {/* Glass Glint Effect on Hover */}
                            {!isActive && (
                                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
                            )}
                        </Link>
                    );
                })}
            </nav>

            {/* 3. Footer / User Area */}
            <div className="p-4 mt-auto relative z-10">
                <div className="p-3 rounded-2xl bg-white/40 border border-white/50 backdrop-blur-md flex items-center gap-3 shadow-inner hover:shadow-lg transition-shadow duration-300 group cursor-pointer">
                    <div className="w-10 h-10 rounded-full bg-slate-100 border-2 border-white shadow-sm overflow-hidden flex items-center justify-center">
                        <User size={18} className="text-slate-400 group-hover:text-red-500 transition-colors" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-xs font-extraBold text-slate-700 truncate group-hover:text-red-600 transition-colors">Asil Adnan</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Premium</p>
                    </div>
                    <button className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-white transition-all">
                        <LogOut size={16} strokeWidth={2.5} />
                    </button>
                </div>
            </div>

        </aside>
    );
}
