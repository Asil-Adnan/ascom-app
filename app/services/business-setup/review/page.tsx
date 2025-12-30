'use client';

import { Suspense } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { NeoCard } from '@/components/ui/NeoCard';
import { NeoButton } from '@/components/ui/NeoButton';
import { NeoIcon } from '@/components/ui/NeoIcon';
import { ArrowLeft, Building2, Globe, FileCheck } from 'lucide-react';

function BusinessSetupReviewContent() {
    const router = useRouter();

    const handleSubmit = () => {
        router.push('/services/business-setup/submitted');
    };

    return (
        <div className="w-full max-w-6xl mx-auto py-12 animate-in fade-in zoom-in duration-300">

            {/* Header */}
            <div className="flex items-center gap-4 mb-12">
                <Link href="/services/business-setup/documents">
                    <button className="w-12 h-12 rounded-xl neo-btn flex items-center justify-center text-gray-500 hover:text-red-600 transition-colors">
                        <ArrowLeft size={22} strokeWidth={2.5} />
                    </button>
                </Link>
                <div>
                    <h1 className="text-3xl font-extrabold text-foreground">Final Review</h1>
                    <p className="text-gray-500 font-medium">Double check your company structure.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Main Summary (8 Cols) */}
                <div className="lg:col-span-8 space-y-8">
                    <NeoCard className="p-10">
                        <h2 className="text-xl font-bold text-gray-800 mb-8 pb-4 border-b border-gray-100">Application Summary</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                            <div className="flex items-start gap-4">
                                <NeoIcon icon={Building2} size={28} variant="inset" className="text-red-500" />
                                <div>
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Company Name</p>
                                    <p className="text-xl font-bold text-gray-800 mt-1">Acme Global Trading LLC</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <NeoIcon icon={Globe} size={28} variant="inset" className="text-purple-500" />
                                <div>
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Jurisdiction</p>
                                    <p className="text-xl font-bold text-gray-800 mt-1">Mainland (DED)</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-red-50 p-6 rounded-2xl border border-blue-100">
                            <div className="flex justify-between items-center mb-2">
                                <span className="font-bold text-blue-900">Total Estimated Cost</span>
                                <span className="font-extrabold text-2xl text-red-600">17,000 AED</span>
                            </div>
                            <p className="text-xs text-red-500">Payable upon initial approval.</p>
                        </div>
                    </NeoCard>

                    <NeoButton size="lg" className="w-full h-16 text-lg font-bold tracking-wide bg-red-600 hover:bg-red-500 text-white shadow-xl shadow-blue-500/20" onClick={handleSubmit}>
                        Submit Application
                    </NeoButton>
                </div>

                {/* Right Side: Process (4 Cols) */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="neo-raised p-8 h-full bg-white/60 border border-white">
                        <h3 className="text-lg font-bold text-gray-800 mb-6">What Happens Next?</h3>

                        <div className="space-y-6">
                            <div className="flex items-start gap-3">
                                <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-bold text-xs">1</div>
                                <div>
                                    <p className="text-sm font-bold text-gray-700">Initial Approval</p>
                                    <p className="text-xs text-gray-500">2-3 Working Days</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-6 h-6 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center font-bold text-xs">2</div>
                                <div>
                                    <p className="text-sm font-bold text-gray-700">Trade Name Reservation</p>
                                    <p className="text-xs text-gray-500">1 Working Day</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-6 h-6 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center font-bold text-xs">3</div>
                                <div>
                                    <p className="text-sm font-bold text-gray-700">Payment & License</p>
                                    <p className="text-xs text-gray-500">Instant</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function BusinessSetupReviewPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <BusinessSetupReviewContent />
        </Suspense>
    );
}
