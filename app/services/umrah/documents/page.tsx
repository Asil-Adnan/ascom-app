'use client';

import { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { NeoCard } from '@/components/ui/NeoCard';
import { NeoButton } from '@/components/ui/NeoButton';
import { NeoIcon } from '@/components/ui/NeoIcon';
import { ArrowLeft, Upload, FileText, CheckCircle, Smartphone } from 'lucide-react';
import { db } from '@/lib/db';

function UmrahDocumentsContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const appId = searchParams.get('id');

    const handleNext = async () => {
        if (!appId) return;
        await db.updateApplication(appId, { step: 3 });
        router.push(`/services/umrah/review?id=${appId}`);
    };

    return (
        <div className="w-full max-w-6xl mx-auto py-12 animate-in fade-in zoom-in duration-300">

            {/* Header */}
            <div className="flex items-center gap-4 mb-12">
                <Link href={`/services/umrah/details?id=${appId}`}>
                    <button className="w-12 h-12 rounded-xl neo-btn flex items-center justify-center text-gray-500 hover:text-red-500 transition-colors">
                        <ArrowLeft size={22} strokeWidth={2.5} />
                    </button>
                </Link>
                <div>
                    <h1 className="text-3xl font-extrabold text-foreground">Upload Passports</h1>
                    <p className="text-gray-500 font-medium">Secure visa processing requires valid passport copies.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Main Upload (7 Cols) */}
                <div className="lg:col-span-7 space-y-6">
                    {/* Dynamic for pilgrims - showing 1 for now */}
                    <NeoCard className="p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold">1</div>
                            <h3 className="font-bold text-gray-700">Primary Pilgrim</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-6 rounded-xl border-2 border-dashed border-gray-200 hover:border-green-500 transition-all cursor-pointer text-center group">
                                <Upload size={32} className="mx-auto text-gray-300 group-hover:text-green-500 mb-2 transition-colors" />
                                <p className="font-bold text-gray-600 text-sm">Passport Front</p>
                            </div>
                            <div className="p-6 rounded-xl border-2 border-dashed border-gray-200 hover:border-green-500 transition-all cursor-pointer text-center group">
                                <Upload size={32} className="mx-auto text-gray-300 group-hover:text-green-500 mb-2 transition-colors" />
                                <p className="font-bold text-gray-600 text-sm">Passport Back</p>
                            </div>
                        </div>
                    </NeoCard>

                    <NeoCard className="p-8 opacity-50">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 font-bold">2</div>
                                <h3 className="font-bold text-gray-400">Additional Pilgrim</h3>
                            </div>
                            <span className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-400 font-bold">Waiting...</span>
                        </div>
                    </NeoCard>

                    <div className="pt-8">
                        <NeoButton size="lg" className="w-full h-16 text-lg font-bold tracking-wide" onClick={handleNext}>
                            Review & Submit
                        </NeoButton>
                    </div>
                </div>

                {/* Right Side: Photo Spec (5 Cols) */}
                <div className="lg:col-span-5 space-y-6">
                    <div className="neo-raised p-8 h-full bg-white/50 border border-white">
                        <div className="flex items-center gap-4 mb-6">
                            <NeoIcon icon={Smartphone} size={28} variant="inset" className="text-green-600" />
                            <h3 className="text-xl font-bold text-gray-700">Photo Guide</h3>
                        </div>

                        <div className="space-y-4">
                            <div className="p-4 rounded-xl bg-red-50 border border-red-100">
                                <p className="font-bold text-red-800 text-sm mb-1">Do Not:</p>
                                <ul className="list-disc list-inside text-xs text-red-600 space-y-1">
                                    <li>Use flash that hides details</li>
                                    <li>Crop important information</li>
                                    <li>Use blurry or low-res images</li>
                                </ul>
                            </div>

                            <div className="p-4 rounded-xl bg-green-50 border border-green-100">
                                <p className="font-bold text-green-800 text-sm mb-1">Do Ensure:</p>
                                <ul className="list-disc list-inside text-xs text-green-600 space-y-1">
                                    <li>All 4 corners are visible</li>
                                    <li>Text is clear and readable</li>
                                    <li>Color scan is preferred</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function UmrahDocumentsPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <UmrahDocumentsContent />
        </Suspense>
    );
}
