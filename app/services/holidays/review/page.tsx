'use client';

import { Suspense } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { NeoCard } from '@/components/ui/NeoCard';
import { NeoButton } from '@/components/ui/NeoButton';
import { NeoIcon } from '@/components/ui/NeoIcon';
import { ArrowLeft, Edit3, Palmtree, Tag, Calendar, CheckCircle } from 'lucide-react';

function HolidaysReviewContent() {
    const router = useRouter();

    const handleSubmit = () => {
        router.push('/services/holidays/submitted');
    };

    return (
        <div className="w-full max-w-6xl mx-auto py-12 animate-in fade-in zoom-in duration-300">

            {/* Header */}
            <div className="flex items-center gap-4 mb-12">
                <Link href="/services/holidays/documents">
                    <button className="w-12 h-12 rounded-xl neo-btn flex items-center justify-center text-gray-500 hover:text-pink-500 transition-colors">
                        <ArrowLeft size={22} strokeWidth={2.5} />
                    </button>
                </Link>
                <div>
                    <h1 className="text-3xl font-extrabold text-foreground">Review Inquiry</h1>
                    <p className="text-gray-500 font-medium">Confirm your travel preferences.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Main Summary (8 Cols) */}
                <div className="lg:col-span-8 space-y-8">
                    <NeoCard className="p-10">
                        <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
                            <h2 className="text-xl font-bold text-gray-800">Trip Summary</h2>
                            <Link href="/services/holidays/plan">
                                <button className="flex items-center gap-2 text-sm font-bold text-pink-600 hover:text-pink-500 transition-colors">
                                    <Edit3 size={16} /> Edit
                                </button>
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="flex items-start gap-4">
                                <NeoIcon icon={Palmtree} size={28} variant="inset" className="text-pink-500" />
                                <div>
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Destination</p>
                                    <p className="text-xl font-bold text-gray-800 mt-1">Maldives</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <NeoIcon icon={Tag} size={28} variant="inset" className="text-indigo-500" />
                                <div>
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Estimated Budget</p>
                                    <p className="text-xl font-bold text-gray-800 mt-1">15,000 AED</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 pt-8 border-t border-gray-100">
                            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Requested Services</h3>
                            <div className="flex flex-wrap gap-3">
                                {['Flights', 'Hotels', 'Visa'].map(item => (
                                    <span key={item} className="px-4 py-2 rounded-lg bg-pink-50 text-pink-700 font-bold text-sm border border-pink-100">
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </NeoCard>

                    <NeoButton size="lg" className="w-full h-16 text-lg font-bold tracking-wide bg-pink-600 hover:bg-pink-500 text-white shadow-xl shadow-pink-500/20" onClick={handleSubmit}>
                        Submit Inquiry
                    </NeoButton>
                </div>

                {/* Right Side: Promise (4 Cols) */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="neo-raised p-8 h-full bg-pink-50/20 max-h-[400px]">
                        <h3 className="text-lg font-bold text-gray-800 mb-6">Our Promise</h3>

                        <div className="space-y-6">
                            <div className="flex items-start gap-3">
                                <div className="mt-1 w-2 h-2 rounded-full bg-pink-500 shrink-0" />
                                <p className="text-sm text-gray-600 font-medium">Response within 2 hours</p>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="mt-1 w-2 h-2 rounded-full bg-pink-500 shrink-0" />
                                <p className="text-sm text-gray-600 font-medium">3 Custom Options</p>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="mt-1 w-2 h-2 rounded-full bg-pink-500 shrink-0" />
                                <p className="text-sm text-gray-600 font-medium">No Hidden Fees</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function HolidaysReviewPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <HolidaysReviewContent />
        </Suspense>
    );
}
