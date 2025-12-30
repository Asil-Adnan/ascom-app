'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { LayoutGrid, MessageSquare, Files, User, HelpCircle } from 'lucide-react';

export function BottomDock() {
    const pathname = usePathname();

    // Hide on Bus Visa page to allow for new sidebar layout
    if (pathname?.startsWith('/services/bus-visa')) {
        return null;
    }

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
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-bottom-10 fade-in duration-700">
            {/* Glass Container for Dock */}
            <div className="flex items-center gap-3 px-4 py-3 rounded-full bg-white/20 backdrop-blur-xl border border-white/30 shadow-2xl">
                {navItems.map((item) => {
                    const isActive = pathname?.startsWith(item.match);
                    const isHome = item.href === '/dashboard';
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.label}
                            href={item.href}
                            className={cn(
                                "dock-btn",
                                isHome ? "is-home" : "",
                                isActive && !isHome ? "ring-2 ring-red-400 ring-offset-2 ring-offset-transparent" : "" // Subtle ring for active non-home items
                            )}
                        >
                            <Icon size={24} strokeWidth={2.5} />
                            <span className="dock-btn-text">
                                {item.label}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
