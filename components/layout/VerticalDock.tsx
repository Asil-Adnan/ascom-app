'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { LayoutGrid, MessageSquare, Files, User, HelpCircle } from 'lucide-react';

export function VerticalDock() {
    const pathname = usePathname();

    const navItems = [
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
            label: 'Home',
            icon: LayoutGrid,
            href: '/dashboard',
            match: '/dashboard',
            isPrimary: true
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
        <div className="flex flex-col items-center gap-4 py-6 rounded-full bg-white/20 backdrop-blur-xl border border-white/30 shadow-2xl w-fit mx-auto">
            {navItems.map((item) => {
                const isActive = pathname?.startsWith(item.match);
                const isHome = item.href === '/dashboard';
                const Icon = item.icon;

                return (
                    <Link
                        key={item.label}
                        href={item.href}
                        className={cn(
                            "group relative flex items-center justify-center rounded-full transition-all duration-300",
                            "w-12 h-12", // Base size
                            isHome ? "bg-red-500 text-white shadow-lg shadow-red-500/30" : "bg-white/80 text-gray-600 hover:bg-white hover:text-red-500",
                            isActive && !isHome ? "ring-2 ring-red-400 ring-offset-2 ring-offset-transparent" : ""
                        )}
                        title={item.label}
                    >
                        <Icon size={22} strokeWidth={2.5} className="transition-transform group-hover:scale-110" />

                        {/* Tooltip to the right */}
                        <span className="absolute left-full ml-4 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
                            {item.label}
                        </span>
                    </Link>
                );
            })}
        </div>
    );
}
