'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { NeoCard } from '@/components/ui/NeoCard';
import { NeoButton } from '@/components/ui/NeoButton';
import { NeoIcon } from '@/components/ui/NeoIcon';
import { ArrowLeft, Briefcase, FileText, CheckCircle, Edit3 } from 'lucide-react';
import { db } from '@/lib/db';
import { Application } from '@/types/schema';

function JobsReviewContent() {
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
        router.push(`/services/jobs/submitted?id=${appId}`);
    };

    if (!app) return <div className="p-12 text-center font-bold text-gray-500">Loading Application...</div>;

    return (
        <div className="w-full max-w-6xl mx-auto py-12 animate-in fade-in zoom-in duration-300">

            {/* Header */}
            <div className="flex items-center gap-4 mb-12">
                <Link href={`/services/jobs/documents?id=${appId}`}>
                    <button className="w-12 h-12 rounded-xl neo-btn flex items-center justify-center text-gray-500 hover:text-red-500 transition-colors">
                        <ArrowLeft size={22} strokeWidth={2.5} />
                    </button>
                </Link>
                <div>
                    <h1 className="text-3xl font-extrabold text-foreground">Final Review</h1>
                    <p className="text-gray-500 font-medium">Confirm your details before submission.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Main Summary (8 Cols) */}
                <div className="lg:col-span-8 space-y-8">
                    <NeoCard className="p-10">
                        <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
                            <h2 className="text-xl font-bold text-gray-800">Application Summary</h2>
                            <Link href={`/services/jobs/details?id=${appId}`}>
                                <button className="flex items-center gap-2 text-sm font-bold text-red-600 hover:text-red-500 transition-colors">
                                    <Edit3 size={16} /> Edit Details
                                </button>
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="flex items-start gap-4">
                                <NeoIcon icon={Briefcase} size={28} variant="inset" className="text-red-500" />
                                <div>
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Target Role</p>
                                    <p className="text-xl font-bold text-gray-800 mt-1">{app.data.targetRole}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <NeoIcon icon={FileText} size={28} variant="inset" className="text-red-600" />
                                <div>
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Years Experience</p>
                                    <p className="text-xl font-bold text-gray-800 mt-1">{app.data.experience} Years</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 pt-8 border-t border-gray-100">
                            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Documents Attached</h3>
                            <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 w-fit">
                                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center text-red-500 font-bold text-xs">PDF</div>
                                <div>
                                    <p className="font-bold text-gray-700">Resume_Final.pdf</p>
                                    <p className="text-xs text-gray-400">1.2 MB • Uploaded Just Now</p>
                                </div>
                                <CheckCircle size={18} className="text-green-500 ml-4" />
                            </div>
                        </div>
                    </NeoCard>

                    <NeoButton size="lg" className="w-full h-16 text-lg font-bold tracking-wide bg-red-600 hover:bg-green-500 text-white shadow-xl shadow-green-500/20" onClick={handleSubmit}>
                        Submit Application
                    </NeoButton>
                </div>

                {/* Right Side: What's Next (4 Cols) */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="neo-raised p-8 h-full bg-red-50/30 border border-red-50">
                        <h3 className="text-lg font-bold text-gray-800 mb-6">What happens next?</h3>

                        <div className="relative border-l-2 border-red-200 ml-3 pl-6 space-y-8">
                            <div className="relative">
                                <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-red-500 border-2 border-white z-10"></div>
                                <h4 className="font-bold text-gray-700">Review</h4>
                                <p className="text-xs text-gray-500 mt-1">Our HR experts review your profile.</p>
                            </div>
                            <div className="relative">
                                <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-red-200 border-2 border-white z-10"></div>
                                <h4 className="font-bold text-gray-700">Matching</h4>
                                <p className="text-xs text-gray-500 mt-1">We match you with open roles.</p>
                            </div>
                            <div className="relative">
                                <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-red-200 border-2 border-white z-10"></div>
                                <h4 className="font-bold text-gray-700">Interview</h4>
                                <p className="text-xs text-gray-500 mt-1">Direct interview scheduling.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function JobsReviewPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <JobsReviewContent />
        </Suspense>
    );
}
