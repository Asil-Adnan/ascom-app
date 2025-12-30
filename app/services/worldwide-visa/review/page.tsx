'use client';

import { Suspense } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { NeoCard } from '@/components/ui/NeoCard';
import { NeoButton } from '@/components/ui/NeoButton';
import { NeoIcon } from '@/components/ui/NeoIcon';
import { ArrowLeft, Globe, Briefcase } from 'lucide-react';

function WorldwideReviewContent() {
    const router = useRouter();

    const handleSubmit = () => {
        router.push('/services/worldwide-visa/submitted');
    };

    return (
        <div className="w-full max-w-6xl mx-auto py-12 animate-in fade-in zoom-in duration-300">

            {/* Header */}
            <div className="flex items-center gap-4 mb-12">
                <Link href="/services/worldwide-visa/documents">
                    <button className="w-12 h-12 rounded-xl neo-btn flex items-center justify-center text-gray-500 hover:text-red-600 transition-colors">
                        <ArrowLeft size={22} strokeWidth={2.5} />
                    </button>
                </Link>
                <div>
                    <h1 className="text-3xl font-extrabold text-foreground">Review Application</h1>
                    <p className="text-gray-500 font-medium">Confirm details for United Kingdom Visa.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Main Summary (8 Cols) */}
                <div className="lg:col-span-8 space-y-8">
                    <NeoCard className="p-10">
                        <h2 className="text-xl font-bold text-gray-800 mb-8 pb-4 border-b border-gray-100">Visa Summary</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                            <div className="flex items-start gap-4">
                                <NeoIcon icon={Globe} size={28} variant="inset" className="text-green-500" />
                                <div>
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Destination</p>
                                    <p className="text-xl font-bold text-gray-800 mt-1">United Kingdom</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <NeoIcon icon={Briefcase} size={28} variant="inset" className="text-blue-500" />
                                <div>
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Visa Type</p>
                                    <p className="text-xl font-bold text-gray-800 mt-1">Standard Visitor (6 Months)</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                            <div className="flex justify-between items-center mb-2">
                                <span className="font-bold text-gray-700">Embassy Fee</span>
                                <span className="font-bold text-gray-800">485 AED</span>
                            </div>
                            <div className="flex justify-between items-center mb-4">
                                <span className="font-bold text-gray-700">Service Fee</span>
                                <span className="font-bold text-gray-800">150 AED</span>
                            </div>
                            <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                                <span className="font-extrabold text-green-800">Total</span>
                                <span className="font-extrabold text-2xl text-red-600">635 AED</span>
                            </div>
                        </div>
                    </NeoCard>

                    <NeoButton size="lg" className="w-full h-16 text-lg font-bold tracking-wide bg-green-600 hover:bg-green-500 text-white shadow-xl shadow-green-500/20" onClick={handleSubmit}>
                        Submit Application
                    </NeoButton>
                </div>

                {/* Right Side: Timeline (4 Cols) */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="neo-raised p-8 h-full bg-white/60 border border-white">
                        <h3 className="text-lg font-bold text-gray-800 mb-6">Processing Timeline</h3>

                        <div className="space-y-6 relative border-l-2 border-gray-200 ml-3 pl-8">
                            <div className="relative">
                                <div className="absolute -left-[39px] top-1 w-4 h-4 rounded-full bg-green-500 ring-4 ring-white"></div>
                                <h4 className="font-bold text-gray-800">Document Review</h4>
                                <p className="text-xs text-gray-500 mt-1">Today</p>
                            </div>
                            <div className="relative">
                                <div className="absolute -left-[39px] top-1 w-4 h-4 rounded-full bg-gray-300 ring-4 ring-white"></div>
                                <h4 className="font-bold text-gray-800">VFS Appointment</h4>
                                <p className="text-xs text-gray-500 mt-1">2-3 Days</p>
                            </div>
                            <div className="relative">
                                <div className="absolute -left-[39px] top-1 w-4 h-4 rounded-full bg-gray-300 ring-4 ring-white"></div>
                                <h4 className="font-bold text-gray-800">Decision Made</h4>
                                <p className="text-xs text-gray-500 mt-1">~15 Days</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function WorldwideReviewPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <WorldwideReviewContent />
        </Suspense>
    );
}
