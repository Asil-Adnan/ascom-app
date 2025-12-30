'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { NeoCard } from '@/components/ui/NeoCard';
import { NeoButton } from '@/components/ui/NeoButton';
import { NeoIcon } from '@/components/ui/NeoIcon';
import { ArrowLeft, Edit3, Users, Calendar, CheckCircle } from 'lucide-react';
import { db } from '@/lib/db';
import { Application } from '@/types/schema';

function UmrahReviewContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const appId = searchParams.get('id');
    const [app, setApp] = useState<Application | null>(null);

    useEffect(() => {
        if (appId) {
            db.getApplication(appId).then(data => setApp(data || null));
        }
    }, [appId]);

    const handleSubmit = async () => {
        if (!appId) return;
        await db.updateApplication(appId, { status: 'SUBMITTED', step: 4 });
        router.push(`/services/umrah/submitted?id=${appId}`);
    };

    if (!app) return <div className="p-12 text-center font-bold text-gray-500">Loading Application...</div>;

    return (
        <div className="w-full max-w-6xl mx-auto py-12 animate-in fade-in zoom-in duration-300">

            {/* Header */}
            <div className="flex items-center gap-4 mb-12">
                <Link href={`/services/umrah/documents?id=${appId}`}>
                    <button className="w-12 h-12 rounded-xl neo-btn flex items-center justify-center text-gray-500 hover:text-red-500 transition-colors">
                        <ArrowLeft size={22} strokeWidth={2.5} />
                    </button>
                </Link>
                <div>
                    <h1 className="text-3xl font-extrabold text-foreground">Review Trip</h1>
                    <p className="text-gray-500 font-medium">Final check before visa submission.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Main Summary (8 Cols) */}
                <div className="lg:col-span-8 space-y-8">
                    <NeoCard className="p-10">
                        <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
                            <h2 className="text-xl font-bold text-gray-800">Trip Summary</h2>
                            <Link href={`/services/umrah/details?id=${appId}`}>
                                <button className="flex items-center gap-2 text-sm font-bold text-red-600 hover:text-red-500 transition-colors">
                                    <Edit3 size={16} /> Edit
                                </button>
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="flex items-start gap-4">
                                <NeoIcon icon={Users} size={28} variant="inset" className="text-red-600" />
                                <div>
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Pilgrims</p>
                                    <p className="text-xl font-bold text-gray-800 mt-1">{app.data.pilgrims} Person(s)</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <NeoIcon icon={Calendar} size={28} variant="inset" className="text-orange-500" />
                                <div>
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Travel Date</p>
                                    <p className="text-xl font-bold text-gray-800 mt-1">{app.data.date || 'Not Selected'}</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 pt-8 border-t border-gray-100">
                            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Payment Breakdown</h3>
                            <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                <span className="font-bold text-gray-600">Visas x {app.data.pilgrims}</span>
                                <span className="font-bold text-gray-800">AED {Number(app.data.pilgrims) * 600}</span>
                            </div>
                            <div className="flex justify-between items-center py-2 text-lg mt-2">
                                <span className="font-extrabold text-gray-800">Total Payable</span>
                                <span className="font-extrabold text-red-500">AED {(Number(app.data.pilgrims) * 600) + 50}</span>
                            </div>
                        </div>
                    </NeoCard>

                    <NeoButton size="lg" className="w-full h-16 text-lg font-bold tracking-wide bg-green-600 hover:bg-red-500 text-white shadow-xl shadow-green-500/20" onClick={handleSubmit}>
                        Confirm & Pay Securely
                    </NeoButton>
                </div>

                {/* Right Side: Guarantee (4 Cols) */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="neo-raised p-8 h-full bg-red-50/20 border border-green-50">
                        <h3 className="text-lg font-bold text-gray-800 mb-6">Our Guarantee</h3>

                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <CheckCircle className="text-red-600 mt-1 shrink-0" size={20} />
                                <p className="text-sm text-gray-600 font-medium">99.8% Visa Approval Rate</p>
                            </div>
                            <div className="flex items-start gap-3">
                                <CheckCircle className="text-red-600 mt-1 shrink-0" size={20} />
                                <p className="text-sm text-gray-600 font-medium">Full Refund on Rejection*</p>
                            </div>
                            <div className="flex items-start gap-3">
                                <CheckCircle className="text-red-600 mt-1 shrink-0" size={20} />
                                <p className="text-sm text-gray-600 font-medium">24/7 Support in Saudi</p>
                            </div>
                        </div>

                        <p className="text-[10px] text-gray-400 mt-8">*Terms and conditions apply.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function UmrahReviewPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <UmrahReviewContent />
        </Suspense>
    );
}
