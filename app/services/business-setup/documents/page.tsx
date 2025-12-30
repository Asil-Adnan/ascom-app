'use client';

import { Suspense } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { NeoCard } from '@/components/ui/NeoCard';
import { NeoButton } from '@/components/ui/NeoButton';
import { NeoIcon } from '@/components/ui/NeoIcon';
import { ArrowLeft, Upload, FileCheck, ShieldCheck } from 'lucide-react';

function BusinessSetupDocumentsContent() {
    const router = useRouter();

    const handleNext = () => {
        router.push('/services/business-setup/review');
    };

    return (
        <div className="w-full max-w-6xl mx-auto py-12 animate-in fade-in zoom-in duration-300">

            {/* Header */}
            <div className="flex items-center gap-4 mb-12">
                <Link href="/services/business-setup/details">
                    <button className="w-12 h-12 rounded-xl neo-btn flex items-center justify-center text-gray-500 hover:text-blue-600 transition-colors">
                        <ArrowLeft size={22} strokeWidth={2.5} />
                    </button>
                </Link>
                <div>
                    <h1 className="text-3xl font-extrabold text-foreground">Required Documents</h1>
                    <p className="text-gray-500 font-medium">KYC for shareholders.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Main Upload (7 Cols) */}
                <div className="lg:col-span-7 space-y-6">
                    <NeoCard className="p-8">
                        <div className="text-center mb-8">
                            <h3 className="text-lg font-bold text-gray-700">Shareholder 1 (You)</h3>
                            <p className="text-sm text-gray-500">Upload clear scans</p>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div className="p-6 rounded-xl border-2 border-dashed border-gray-200 hover:border-blue-500 transition-all cursor-pointer text-center group bg-gray-50/50 hover:bg-blue-50/10 flex flex-col items-center">
                                <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-400 mb-3 group-hover:text-blue-500 transition-colors">
                                    <Upload size={20} />
                                </div>
                                <h4 className="font-bold text-gray-700 text-sm group-hover:text-blue-600">Passport Copy</h4>
                            </div>
                            <div className="p-6 rounded-xl border-2 border-dashed border-gray-200 hover:border-blue-500 transition-all cursor-pointer text-center group bg-gray-50/50 hover:bg-blue-50/10 flex flex-col items-center">
                                <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-400 mb-3 group-hover:text-blue-500 transition-colors">
                                    <Upload size={20} />
                                </div>
                                <h4 className="font-bold text-gray-700 text-sm group-hover:text-blue-600">Visit Visa / UID</h4>
                            </div>
                        </div>
                    </NeoCard>

                    <NeoButton size="lg" className="w-full h-16 text-lg font-bold tracking-wide mt-8" onClick={handleNext}>
                        Review Application
                    </NeoButton>
                </div>

                {/* Right Side: Info (5 Cols) */}
                <div className="lg:col-span-5 space-y-6">
                    <div className="neo-raised p-8 h-full bg-white/50 border border-white">
                        <div className="flex items-center gap-4 mb-6">
                            <NeoIcon icon={ShieldCheck} size={28} variant="inset" className="text-green-600" />
                            <h3 className="text-xl font-bold text-gray-700">Data Privacy</h3>
                        </div>

                        <p className="text-sm text-gray-600 leading-relaxed mb-6">
                            Your documents are encrypted and shared directly with the relevant government authorities (DED / Freezone) for pre-approval.
                        </p>

                        <div className="flex items-center gap-3 p-4 rounded-xl bg-green-50 text-green-700 border border-green-100">
                            <FileCheck size={20} />
                            <p className="text-xs font-bold">100% Compliance Check Included</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function BusinessSetupDocumentsPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <BusinessSetupDocumentsContent />
        </Suspense>
    );
}
