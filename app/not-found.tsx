'use client';

import Link from 'next/link';
import { NeoCard } from '@/components/ui/NeoCard';
import { NeoButton } from '@/components/ui/NeoButton';
import { NeoIcon } from '@/components/ui/NeoIcon';
import { AlertCircle, Home, Search, MessageSquare, ArrowLeft } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="w-full max-w-6xl mx-auto py-24 flex items-center justify-center animate-in fade-in zoom-in duration-500">
            <NeoCard className="w-full grid grid-cols-1 lg:grid-cols-2 p-12 lg:p-16 gap-12 items-center relative overflow-hidden">
                {/* Decorative Background Element */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-red-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

                {/* Left: Error Message */}
                <div className="space-y-8 relative z-10">
                    <div className="flex items-center gap-4">
                        <div className="w-20 h-20 rounded-2xl bg-red-100 flex items-center justify-center text-red-600 neo-inset">
                            <span className="text-4xl font-extrabold">404</span>
                        </div>
                        <h1 className="text-4xl font-extrabold text-foreground">Page Not Found</h1>
                    </div>

                    <p className="text-xl text-gray-500 font-medium leading-relaxed">
                        We couldn't find the page you're looking for. It might have been moved, deleted, or never existed in the first place.
                    </p>

                    <div className="flex flex-wrap gap-4 pt-4">
                        <Link href="/dashboard">
                            <NeoButton size="lg" className="h-14 px-8 text-lg font-bold flex items-center gap-3">
                                <Home size={22} />
                                Back to Dashboard
                            </NeoButton>
                        </Link>
                        <button onClick={() => window.history.back()} className="h-14 px-8 rounded-xl neo-btn flex items-center gap-3 text-gray-500 hover:text-red-600 font-bold transition-colors">
                            <ArrowLeft size={22} />
                            Go Back
                        </button>
                    </div>
                </div>

                {/* Right: Helpful Links / Search */}
                <div className="relative z-10 glass-panel p-8 rounded-3xl border border-white/40 neo-raised lg:ml-12">
                    <h3 className="text-xl font-bold text-gray-700 mb-6">Common Destinations</h3>
                    <div className="space-y-4">
                        <Link href="/services/family-visa">
                            <div className="p-4 rounded-xl bg-white/60 hover:bg-white transition-all cursor-pointer flex items-center gap-4 group">
                                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <Search size={18} />
                                </div>
                                <span className="font-bold text-gray-600 group-hover:text-blue-600">Family Visa Services</span>
                            </div>
                        </Link>
                        <Link href="/messages">
                            <div className="p-4 rounded-xl bg-white/60 hover:bg-white transition-all cursor-pointer flex items-center gap-4 group">
                                <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <MessageSquare size={18} />
                                </div>
                                <span className="font-bold text-gray-600 group-hover:text-green-600">Contact Support</span>
                            </div>
                        </Link>
                    </div>
                </div>
            </NeoCard>
        </div>
    );
}
