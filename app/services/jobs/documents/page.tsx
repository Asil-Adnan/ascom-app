'use client';

import { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { NeoCard } from '@/components/ui/NeoCard';
import { NeoButton } from '@/components/ui/NeoButton';
import { NeoIcon } from '@/components/ui/NeoIcon';
import { ArrowLeft, Upload, FileText, CheckCircle, ShieldCheck } from 'lucide-react';
import { db } from '@/lib/db';

function JobsDocumentsContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const appId = searchParams.get('id');

    const handleNext = async () => {
        if (!appId) return;
        await db.updateApplication(appId, { step: 3 });
        router.push(`/services/jobs/review?id=${appId}`);
    };

    return (
        <div className="w-full max-w-6xl mx-auto py-12 animate-in fade-in zoom-in duration-300">

            {/* Header */}
            <div className="flex items-center gap-4 mb-12">
                <Link href={`/services/jobs/details?id=${appId}`}>
                    <button className="w-12 h-12 rounded-xl neo-btn flex items-center justify-center text-gray-500 hover:text-red-500 transition-colors">
                        <ArrowLeft size={22} strokeWidth={2.5} />
                    </button>
                </Link>
                <div>
                    <h1 className="text-3xl font-extrabold text-foreground">Upload Documents</h1>
                    <p className="text-gray-500 font-medium">Securely upload your CV and supporting files.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Main Upload Area (7 Cols) */}
                <div className="lg:col-span-7 space-y-6">
                    {/* CV Upload */}
                    <NeoCard className="p-8 group cursor-pointer border-2 border-transparent hover:border-red-500/20 transition-all">
                        <div className="flex items-start justify-between gap-6">
                            <div className="flex items-start gap-6">
                                <NeoIcon icon={FileText} size={32} variant="inset" className="text-red-500 group-hover:scale-110" />
                                <div>
                                    <h3 className="text-xl font-bold text-gray-800">Professional CV</h3>
                                    <p className="text-sm text-gray-500 mt-1">PDF, DOCX (Max 5MB)</p>
                                    <div className="flex gap-2 mt-4">
                                        <span className="text-xs font-bold bg-red-50 text-red-600 px-2 py-1 rounded-md">Required</span>
                                    </div>
                                </div>
                            </div>
                            <NeoButton className="px-6 h-12 font-bold text-red-600">Select File</NeoButton>
                        </div>

                        {/* Progress Bar Mock */}
                        <div className="mt-6 h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full bg-red-500 w-2/3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </div>
                    </NeoCard>

                    {/* Cover Letter Upload */}
                    <NeoCard className="p-8 group cursor-pointer border-2 border-transparent hover:border-purple-500/20 transition-all">
                        <div className="flex items-start justify-between gap-6">
                            <div className="flex items-start gap-6">
                                <NeoIcon icon={Upload} size={32} variant="inset" className="text-purple-500 group-hover:scale-110" />
                                <div>
                                    <h3 className="text-xl font-bold text-gray-800">Cover Letter</h3>
                                    <p className="text-sm text-gray-500 mt-1">Stand out to recruiters</p>
                                    <div className="flex gap-2 mt-4">
                                        <span className="text-xs font-bold bg-gray-100 text-gray-500 px-2 py-1 rounded-md">Optional</span>
                                    </div>
                                </div>
                            </div>
                            <NeoButton className="px-6 h-12 font-bold text-red-600">Select File</NeoButton>
                        </div>
                    </NeoCard>

                    <div className="pt-8 flex justify-end">
                        <NeoButton size="lg" className="w-full md:w-64 h-16 text-lg font-bold tracking-wide" onClick={handleNext}>
                            Review Application &rarr;
                        </NeoButton>
                    </div>
                </div>

                {/* Right Side: Security & Tips (5 Cols) */}
                <div className="lg:col-span-5 space-y-6">
                    <div className="neo-raised p-8 h-full flex flex-col items-center justify-center text-center">
                        <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center text-green-500 mb-6">
                            <ShieldCheck size={40} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800">Bank-Grade Security</h3>
                        <p className="text-gray-500 text-sm mt-3 px-8 leading-relaxed">
                            Your documents are encrypted and stored securely. We only share your data with verified employers.
                        </p>

                        <div className="mt-8 w-full space-y-4 text-left">
                            <div className="p-4 rounded-xl bg-white/50 border border-white/60 flex items-center gap-3">
                                <CheckCircle size={18} className="text-green-500" />
                                <span className="text-sm font-bold text-gray-600">ATS Friendly Formatting</span>
                            </div>
                            <div className="p-4 rounded-xl bg-white/50 border border-white/60 flex items-center gap-3">
                                <CheckCircle size={18} className="text-green-500" />
                                <span className="text-sm font-bold text-gray-600">Virus Scanned</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function JobsDocumentsPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <JobsDocumentsContent />
        </Suspense>
    );
}
