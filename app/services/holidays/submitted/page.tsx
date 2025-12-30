'use client';

import { Suspense } from 'react';
import Link from 'next/link';
import { NeoCard } from '@/components/ui/NeoCard';
import { NeoButton } from '@/components/ui/NeoButton';
import { CheckCircle, Home, Palmtree } from 'lucide-react';

function HolidaysSubmittedContent() {
    return (
        <div className="w-full max-w-6xl mx-auto py-12 animate-in fade-in zoom-in duration-300">

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                {/* Main Success Card (8 Cols) */}
                <div className="lg:col-span-8">
                    <NeoCard className="p-10 flex flex-col items-center text-center min-h-[500px] justify-center relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-pink-50 rounded-bl-full opacity-50 pointer-events-none"></div>

                        <div className="relative z-10 mb-8">
                            <div className="w-24 h-24 rounded-full neo-inset flex items-center justify-center text-pink-500 mb-6 mx-auto">
                                <Palmtree size={48} strokeWidth={2} />
                            </div>
                            <h1 className="text-4xl font-extrabold text-gray-800 mb-4">Inquiry Received!</h1>
                            <p className="text-lg text-gray-500 max-w-lg mx-auto leading-relaxed">
                                We're already looking for the best deals for your trip to <span className="text-pink-600 font-bold">Maldives</span>.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4 w-full max-w-md mb-8">
                            <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                                <p className="text-xs font-bold text-gray-400 uppercase">Ref ID</p>
                                <p className="text-lg font-bold text-pink-600">HOL-992</p>
                            </div>
                            <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                                <p className="text-xs font-bold text-gray-400 uppercase">Est. Response</p>
                                <p className="text-lg font-bold text-gray-700">2 Hours</p>
                            </div>
                        </div>

                        <Link href="/dashboard" className="relative z-10">
                            <NeoButton size="lg" className="h-14 px-8 text-lg font-bold flex items-center gap-2">
                                <Home size={20} /> Return to Dashboard
                            </NeoButton>
                        </Link>
                    </NeoCard>
                </div>

                {/* Right Side: What's Next (4 Cols) */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="neo-raised p-8 h-full bg-white/40 border border-white">
                        <h3 className="text-xl font-bold text-gray-700 mb-8">Next Steps</h3>

                        <div className="space-y-8 relative border-l-2 border-pink-100 ml-3 pl-8">
                            <div className="relative">
                                <div className="absolute -left-[39px] top-1 w-4 h-4 rounded-full bg-pink-500 ring-4 ring-white"></div>
                                <h4 className="font-bold text-gray-800">Inquiry Review</h4>
                                <p className="text-xs text-gray-500 mt-1">Agent assigned.</p>
                            </div>
                            <div className="relative opacity-50">
                                <div className="absolute -left-[39px] top-1 w-4 h-4 rounded-full bg-gray-300 ring-4 ring-white"></div>
                                <h4 className="font-bold text-gray-800">Proposal Sent</h4>
                                <p className="text-xs text-gray-500 mt-1">You'll receive 3 options.</p>
                            </div>
                            <div className="relative opacity-50">
                                <div className="absolute -left-[39px] top-1 w-4 h-4 rounded-full bg-gray-300 ring-4 ring-white"></div>
                                <h4 className="font-bold text-gray-800">Booking</h4>
                                <p className="text-xs text-gray-500 mt-1">Confirm & Pay.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function HolidaysSubmittedPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <HolidaysSubmittedContent />
        </Suspense>
    );
}
