'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { NeoCard } from '@/components/ui/NeoCard';
import { NeoButton } from '@/components/ui/NeoButton';
import { NeoInput } from '@/components/ui/NeoInput';
import { NeoIcon } from '@/components/ui/NeoIcon';
import { ArrowLeft, Users, Calendar, Moon } from 'lucide-react';
import { db } from '@/lib/db';
import { Application } from '@/types/schema';

function UmrahDetailsContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const appId = searchParams.get('id');
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        pilgrims: '1',
        date: ''
    });

    useEffect(() => {
        if (!appId) return;
        db.getApplication(appId).then(app => {
            if (app) {
                setFormData({
                    pilgrims: app.data.pilgrims || '1',
                    date: app.data.date || ''
                });
                setLoading(false);
            }
        });
    }, [appId]);

    const handleNext = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!appId) return;

        await db.updateApplication(appId, {
            step: 2,
            data: { ...formData }
        });

        router.push(`/services/umrah/documents?id=${appId}`);
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="w-full max-w-6xl mx-auto py-12 animate-in fade-in zoom-in duration-300">

            {/* Header */}
            <div className="flex items-center gap-4 mb-12">
                <Link href="/services/umrah">
                    <button className="w-12 h-12 rounded-xl neo-btn flex items-center justify-center text-gray-500 hover:text-red-500 transition-colors">
                        <ArrowLeft size={22} strokeWidth={2.5} />
                    </button>
                </Link>
                <div>
                    <h1 className="text-3xl font-extrabold text-foreground">Pilgrims Info</h1>
                    <p className="text-gray-500 font-medium">Plan your spiritual journey details.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Main Form (7 Cols) */}
                <div className="lg:col-span-7">
                    <form onSubmit={handleNext} className="space-y-8">
                        <NeoCard className="p-10">
                            <div className="flex items-center gap-4 mb-8">
                                <NeoIcon icon={Moon} size={28} variant="inset" className="text-green-600" />
                                <h3 className="text-xl font-bold text-gray-700">Trip Configuration</h3>
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-4">
                                    <label className="text-sm font-bold text-gray-400 uppercase tracking-wider ml-1">Number of Pilgrims</label>
                                    <div className="relative group">
                                        <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-600 transition-colors" size={20} />
                                        <NeoInput
                                            type="number"
                                            min="1"
                                            required
                                            className="pl-12 h-16 font-bold text-xl"
                                            value={formData.pilgrims}
                                            onChange={e => setFormData({ ...formData, pilgrims: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <label className="text-sm font-bold text-gray-400 uppercase tracking-wider ml-1">Approximate Travel Date</label>
                                    <div className="relative group">
                                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-600 transition-colors" size={20} />
                                        <NeoInput
                                            type="date"
                                            required
                                            className="pl-12 h-16 font-bold text-lg"
                                            value={formData.date}
                                            onChange={e => setFormData({ ...formData, date: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>
                        </NeoCard>

                        <NeoButton type="submit" size="lg" className="w-full h-16 text-lg font-bold tracking-wide">
                            Continue to Documents
                        </NeoButton>
                    </form>
                </div>

                {/* Right Side: Total Calculation (5 Cols) */}
                <div className="lg:col-span-5 space-y-6">
                    <div className="neo-raised p-8 h-full bg-green-50/20 border border-green-50/50">
                        <h3 className="text-xl font-bold text-gray-700 mb-8">Estimated Cost</h3>

                        <div className="space-y-4 mb-8">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-500 font-medium">Visa Fee (per person)</span>
                                <span className="font-bold text-gray-800">AED 600</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-500 font-medium">Optimization Fee</span>
                                <span className="font-bold text-gray-800">AED 50</span>
                            </div>
                            <div className="h-px bg-gray-200 my-2"></div>
                            <div className="flex justify-between items-center text-lg">
                                <span className="font-bold text-gray-800">Total Estimation</span>
                                <span className="font-extrabold text-green-600">AED {(Number(formData.pilgrims) * 600) + 50}</span>
                            </div>
                        </div>

                        <div className="p-4 rounded-xl bg-white/60 text-center">
                            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Note</p>
                            <p className="text-xs text-gray-500 mt-1">
                                Final price may vary based on hotel selection in package mode.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function UmrahDetailsPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <UmrahDetailsContent />
        </Suspense>
    );
}
