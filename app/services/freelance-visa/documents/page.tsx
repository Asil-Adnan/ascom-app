'use client';

import { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { NeoCard } from '@/components/ui/NeoCard';
import { NeoButton } from '@/components/ui/NeoButton';
import { NeoIcon } from '@/components/ui/NeoIcon';
import { ArrowLeft, Upload, GraduationCap, Briefcase, FileText, CheckCircle } from 'lucide-react';
import { db } from '@/lib/db';

function FreelanceDocumentsContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const appId = searchParams.get('id');

    const handleNext = async () => {
        if (!appId) return;
        await db.updateApplication(appId, { step: 3 });
        router.push(`/services/freelance-visa/review?id=${appId}`);
    };

    return (
        <div className="w-full max-w-6xl mx-auto py-12 animate-in fade-in zoom-in duration-300">

            {/* Header */}
            <div className="flex items-center gap-4 mb-12">
                <Link href={`/services/freelance-visa/details?id=${appId}`}>
                    <button className="w-12 h-12 rounded-xl neo-btn flex items-center justify-center text-gray-500 hover:text-red-500 transition-colors">
                        <ArrowLeft size={22} strokeWidth={2.5} />
                    </button>
                </Link>
                <div>
                    <h1 className="text-3xl font-extrabold text-foreground">Upload Qualifications</h1>
                    <p className="text-gray-500 font-medium">Provide proof of education and portfolio.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Main Upload (7 Cols) */}
                <div className="lg:col-span-7 space-y-6">
                    {/* Degree Upload */}
                    <NeoCard className="p-8 group cursor-pointer border-2 border-transparent hover:border-indigo-500/20 transition-all">
                        <div className="flex items-start justify-between gap-6">
                            <div className="flex items-start gap-6">
                                <NeoIcon icon={GraduationCap} size={32} variant="inset" className="text-indigo-500 group-hover:scale-110" />
                                <div>
                                    <h3 className="text-xl font-bold text-gray-800">Degree Certificate</h3>
                                    <p className="text-sm text-gray-500 mt-1">Attested Copy (PDF/JPG)</p>
                                    <div className="flex gap-2 mt-4">
                                        <span className="text-xs font-bold bg-indigo-50 text-indigo-600 px-2 py-1 rounded-md">Required</span>
                                    </div>
                                </div>
                            </div>
                            <NeoButton className="px-6 h-12 font-bold text-indigo-600">Upload</NeoButton>
                        </div>
                    </NeoCard>

                    {/* Portfolio Upload */}
                    <NeoCard className="p-8 group cursor-pointer border-2 border-transparent hover:border-purple-500/20 transition-all">
                        <div className="flex items-start justify-between gap-6">
                            <div className="flex items-start gap-6">
                                <NeoIcon icon={Briefcase} size={32} variant="inset" className="text-purple-500 group-hover:scale-110" />
                                <div>
                                    <h3 className="text-xl font-bold text-gray-800">Portfolio / CV</h3>
                                    <p className="text-sm text-gray-500 mt-1">Proof of experience</p>
                                    <div className="flex gap-2 mt-4">
                                        <span className="text-xs font-bold bg-indigo-50 text-indigo-600 px-2 py-1 rounded-md">Required</span>
                                    </div>
                                </div>
                            </div>
                            <NeoButton className="px-6 h-12 font-bold text-purple-600">Upload</NeoButton>
                        </div>
                    </NeoCard>

                    {/* Passport Upload */}
                    <NeoCard className="p-8 group cursor-pointer border-2 border-transparent hover:border-gray-500/20 transition-all">
                        <div className="flex items-start justify-between gap-6">
                            <div className="flex items-start gap-6">
                                <NeoIcon icon={FileText} size={32} variant="inset" className="text-gray-500 group-hover:scale-110" />
                                <div>
                                    <h3 className="text-xl font-bold text-gray-800">Passport Copy</h3>
                                    <p className="text-sm text-gray-500 mt-1">Front page with photo</p>
                                    <div className="flex gap-2 mt-4">
                                        <span className="text-xs font-bold bg-indigo-50 text-indigo-600 px-2 py-1 rounded-md">Required</span>
                                    </div>
                                </div>
                            </div>
                            <NeoButton className="px-6 h-12 font-bold text-gray-600">Upload</NeoButton>
                        </div>
                    </NeoCard>

                    <div className="pt-8">
                        <NeoButton size="lg" className="w-full h-16 text-lg font-bold tracking-wide" onClick={handleNext}>
                            Review & Submit
                        </NeoButton>
                    </div>
                </div>

                {/* Right Side: Verification (5 Cols) */}
                <div className="lg:col-span-5 space-y-6">
                    <div className="neo-raised p-8 h-full bg-white/50 border border-white">
                        <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center text-green-500 mb-6 mx-auto">
                            <CheckCircle size={40} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 text-center">Verification Process</h3>
                        <p className="text-gray-500 text-sm mt-3 text-center leading-relaxed">
                            Our legal team reviews all documents within 24 hours to ensure they meet Dubai Development Authority standards.
                        </p>

                        <div className="mt-8 w-full p-6 rounded-2xl bg-indigo-50 border border-indigo-100">
                            <p className="font-bold text-indigo-900 text-center text-sm">
                                Need Attestation Service?
                            </p>
                            <p className="text-xs text-indigo-600 text-center mt-2">
                                You can add attestation service later if your degree is not yet attested.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function FreelanceDocumentsPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <FreelanceDocumentsContent />
        </Suspense>
    );
}
