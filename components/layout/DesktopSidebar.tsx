'use client';

import {
    LayoutGrid,
    MessageSquare,
    Settings,
    LogOut,
    Send
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';

export function DesktopSidebar() {
    const pathname = usePathname();
    const { logout, user } = useAuth();

    const navItems = [
        { icon: LayoutGrid, label: 'Dashboard', href: '/dashboard' },
        { icon: MessageSquare, label: 'Messages', href: '/messages' },
        { icon: Send, label: 'Applications', href: '/applications' },
    ];

    if (user?.role === 'ADMIN') {
        navItems.push({ icon: Settings, label: 'Admin Panel', href: '/admin' });
    }

    return (
        <aside className="fixed left-0 top-0 h-screen w-72 bg-white/50 backdrop-blur-xl border-r border-white/40 z-50 flex flex-col p-6 shadow-2xl shadow-gray-200/50">
            <div className="mb-10 px-2 mt-2">
                <Link href="/dashboard" className="inline-block transition-transform duration-300 hover:scale-105 active:scale-95 group">
                    <img
                        src="/brand/logo-full.png"
                        alt="AllSupport"
                        className="w-[180px] h-auto cursor-pointer"
                    />
                    {/* Subtle glass glow container behind/around if requested, or just apply effect to image */}
                    {/* User asked for 'logo (and its small glass container)'. If no container exists, I'll add a subtle one or just animate the image block. */}
                    {/* Given the existing code doesn't have a glass container, I will wrap it in a subtle one to satisfy the request. */}
                    <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 rounded-xl -z-10 transition-colors duration-300 blur-xl" />
                </Link>
            </div>

            {/* User Profile */}
            <div className="flex items-center gap-3 px-2 mb-6">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center text-white font-bold shadow-md">
                    {user?.name.charAt(0)}
                </div>
                <div className="flex-1 overflow-hidden">
                    <p className="text-sm font-bold truncate text-foreground">{user?.name}</p>
                    <p className="text-[10px] text-muted-foreground truncate uppercase tracking-wider">Online</p>
                </div>
            </div>

            {/* Main Nav */}
            <nav className="space-y-3">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link key={item.href} href={item.href}>
                            <div className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 ${isActive ? 'bg-white neo-glass text-red-600 font-bold shadow-lg' : 'text-gray-500 hover:bg-white/40 hover:text-red-500'}`}>
                                <item.icon size={20} />
                                <span>{item.label}</span>
                            </div>
                        </Link>
                    );
                })}
            </nav>

            {/* Logout */}
            <div className="mt-auto pt-6 border-t border-gray-100/50">
                <button
                    onClick={() => logout()}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-gray-400 hover:bg-red-50 hover:text-red-500 transition-colors"
                >
                    <LogOut size={20} />
                    <span className="font-medium">Sign Out</span>
                </button>
            </div>
        </aside>
    );
}
