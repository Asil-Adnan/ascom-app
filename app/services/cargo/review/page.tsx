'use client';

import { Suspense } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { NeoCard } from '@/components/ui/NeoCard';
import { NeoButton } from '@/components/ui/NeoButton';
import { NeoIcon } from '@/components/ui/NeoIcon';
import { ArrowLeft, Box, Plane, Scale } from 'lucide-react';

function CargoReviewContent() {
    const router = useRouter();

    const handleSubmit = () => {
        router.push('/services/cargo/submitted');
    };

    return (
        <div className="w-full max-w-6xl mx-auto py-12 animate-in fade-in zoom-in duration-300">

            {/* Header */}
            <div className="flex items-center gap-4 mb-12">
                <Link href="/services/cargo/documents">
                    <button className="w-12 h-12 rounded-xl neo-btn flex items-center justify-center text-gray-500 hover:text-orange-600 transition-colors">
                        <ArrowLeft size={22} strokeWidth={2.5} />
                    </button>
                </Link>
                <div>
                    <h1 className="text-3xl font-extrabold text-foreground">Review Quote</h1>
                    <p className="text-gray-500 font-medium">Verify shipment details.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Main Summary (8 Cols) */}
                <div className="lg:col-span-8 space-y-8">
                    <NeoCard className="p-10">
                        <h2 className="text-xl font-bold text-gray-800 mb-8 pb-4 border-b border-gray-100">Shipment Summary</h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            <div className="flex flex-col items-center p-4 rounded-xl bg-gray-50 text-center">
                                <NeoIcon icon={Box} size={24} variant="inset" className="text-orange-500 mb-3" />
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Route</p>
                                <p className="text-lg font-bold text-gray-800 mt-1">Dubai - London</p>
                            </div>
                            <div className="flex flex-col items-center p-4 rounded-xl bg-gray-50 text-center">
                                <NeoIcon icon={Scale} size={24} variant="inset" className="text-blue-500 mb-3" />
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Weight</p>
                                <p className="text-lg font-bold text-gray-800 mt-1">50 KG</p>
                            </div>
                            <div className="flex flex-col items-center p-4 rounded-xl bg-gray-50 text-center">
                                <NeoIcon icon={Plane} size={24} variant="inset" className="text-purple-500 mb-3" />
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Mode</p>
                                <p className="text-lg font-bold text-gray-800 mt-1">Air Freight</p>
                            </div>
                        </div>

                        <div className="bg-orange-50 p-6 rounded-2xl border border-orange-100 flex items-center justify-between">
                            <div>
                                <p className="text-xs font-bold text-orange-800 uppercase mb-1">Estimated Cost</p>
                                <p className="text-xs text-orange-600">Includes fuel surcharge</p>
                            </div>
                            <span className="font-extrabold text-3xl text-orange-600">1,250 AED</span>
                        </div>
                    </NeoCard>

                    <NeoButton size="lg" className="w-full h-16 text-lg font-bold tracking-wide bg-orange-600 hover:bg-orange-500 text-white shadow-xl shadow-orange-500/20" onClick={handleSubmit}>
                        Book Shipment
                    </NeoButton>
                </div>

                {/* Right Side: Disclaimer (4 Cols) */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="neo-raised p-8 h-full bg-white/60 border border-white">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">Terms & Conditions</h3>
                        <p className="text-xs text-gray-500 leading-relaxed mb-4">
                            By proceeding, you agree to our standard carriage terms. The final weight will be verified at our warehouse. Differences in weight may result in price adjustments.
                        </p>
                        <p className="text-xs text-gray-500 leading-relaxed">
                            Transit time is estimated at 3-5 working days for Air Freight.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function CargoReviewPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <CargoReviewContent />
        </Suspense>
    );
}
