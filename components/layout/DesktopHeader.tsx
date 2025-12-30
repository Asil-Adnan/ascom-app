'use client';

import { Bell, Search } from 'lucide-react';

export function DesktopHeader() {
    return (
        <header className="flex items-center justify-between py-6 px-8 mb-8">
            {/* Search Bar - Spatial Design */}
            <div className="relative w-96">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                <input
                    type="text"
                    placeholder="Search for services, applications..."
                    className="w-full h-12 rounded-2xl bg-background pl-12 pr-4 text-sm font-medium outline-none neo-input-desktop focus:ring-2 focus:ring-primary/10"
                />
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-4">
                <button className="w-12 h-12 rounded-2xl bg-background flex items-center justify-center text-muted-foreground hover:text-primary transition-colors neo-btn-desktop">
                    <Bell size={20} />
                    {/* Notification Dot */}
                    <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-background"></span>
                </button>
            </div>
        </header>
    );
}
