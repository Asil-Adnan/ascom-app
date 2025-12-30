'use client';

import { Suspense } from 'react';
import Link from 'next/link';
import { NeoCard } from '@/components/ui/NeoCard';
import { NeoButton } from '@/components/ui/NeoButton';
import { CheckCircle, Home, Box } from 'lucide-react';

function CargoSubmittedContent() {
    return (
        <div className="w-full max-w-6xl mx-auto py-12 animate-in fade-in zoom-in duration-300">

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                {/* Main Success Card (8 Cols) */}
                <div className="lg:col-span-8">
                    <NeoCard className="p-10 flex flex-col items-center text-center min-h-[500px] justify-center relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-50 rounded-bl-full opacity-50 pointer-events-none"></div>

                        <div className="relative z-10 mb-8">
                            <div className="w-24 h-24 rounded-full neo-inset flex items-center justify-center text-orange-500 mb-6 mx-auto">
                                <Box size={48} strokeWidth={2} />
                            </div>
                            <h1 className="text-4xl font-extrabold text-gray-800 mb-4">Shipment Booked!</h1>
                            <p className="text-lg text-gray-500 max-w-lg mx-auto leading-relaxed">
                                Your pickup has been scheduled. A driver will be in touch shortly.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4 w-full max-w-md mb-8">
                            <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                                <p className="text-xs font-bold text-gray-400 uppercase">Tracking ID</p>
                                <p className="text-lg font-bold text-orange-600">SHP-8842</p>
                            </div>
                            <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                                <p className="text-xs font-bold text-gray-400 uppercase">Est. Pickup</p>
                                <p className="text-lg font-bold text-gray-700">Tomorrow, 10 AM</p>
                            </div>
                        </div>

                        <Link href="/dashboard" className="relative z-10">
                            <NeoButton size="lg" className="h-14 px-8 text-lg font-bold flex items-center gap-2">
                                <Home size={20} /> Return to Dashboard
                            </NeoButton>
                        </Link>
                    </NeoCard>
                </div>

                {/* Right Side: Tips (4 Cols) */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="neo-raised p-8 h-full bg-white/40 border border-white">
                        <h3 className="text-xl font-bold text-gray-700 mb-8">Packaging Tips</h3>

                        <div className="space-y-4">
                            <div className="p-4 rounded-xl bg-orange-50 border border-orange-100">
                                <p className="font-bold text-orange-800 text-sm mb-1">Labeling</p>
                                <p className="text-xs text-orange-700">
                                    Attach the tracking label clearly on the top of the box.
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-blue-50 border border-blue-100">
                                <p className="font-bold text-blue-800 text-sm mb-1">Fragile Items</p>
                                <p className="text-xs text-blue-700">
                                    Use bubble wrap and mark "Fragile" on all sides.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function CargoSubmittedPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <CargoSubmittedContent />
        </Suspense>
    );
}
