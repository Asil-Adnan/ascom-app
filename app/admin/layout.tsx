'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, FileText, Bus, Settings } from 'lucide-react';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    const navItems = [
        { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
        { name: 'Applications', href: '/admin/applications', icon: FileText },
        { name: 'Bus Management', href: '/admin/bus-management', icon: Bus },
        { name: 'Settings', href: '/admin/settings', icon: Settings },
    ];

    return (
        <div className="w-full max-w-6xl mx-auto space-y-8 animate-in fade-in zoom-in duration-500">
            {/* Admin Sub-Navigation (Horizontal Neo-Raised Panel) */}
            <div className="neo-raised p-2 flex items-center justify-between overflow-x-auto">
                <div className="flex items-center gap-2 p-2">
                    {navItems.map((item) => {
                        const isActive = pathname.startsWith(item.href);
                        return (
                            <Link key={item.name} href={item.href}>
                                <div className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-300 font-bold text-sm whitespace-nowrap
                                    ${isActive
                                        ? 'neo-inset text-red-600'
                                        : 'text-gray-500 hover:text-red-500 hover:bg-gray-200/50'}
                                `}>
                                    <item.icon size={18} strokeWidth={isActive ? 2.5 : 2} />
                                    {item.name}
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>

            {/* Main Admin Content */}
            <main>
                {children}
            </main>
        </div>
    );
}
