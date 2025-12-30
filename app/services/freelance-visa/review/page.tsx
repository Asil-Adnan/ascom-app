'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { NeoCard } from '@/components/ui/NeoCard';
import { NeoButton } from '@/components/ui/NeoButton';
import { NeoIcon } from '@/components/ui/NeoIcon';
import { ArrowLeft, Edit3, GraduationCap, LayoutGrid, CheckCircle } from 'lucide-react';
import { db } from '@/lib/db';
import { Application } from '@/types/schema';

function FreelanceReviewContent() {
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
        router.push(`/services/freelance-visa/submitted?id=${appId}`);
    };

    if (!app) return <div className="p-12 text-center font-bold text-gray-500">Loading Application...</div>;

    return (
        <div className="w-full max-w-6xl mx-auto py-12 animate-in fade-in zoom-in duration-300">

            {/* Header */}
            <div className="flex items-center gap-4 mb-12">
                <Link href={`/services/freelance-visa/documents?id=${appId}`}>
                    <button className="w-12 h-12 rounded-xl neo-btn flex items-center justify-center text-gray-500 hover:text-red-500 transition-colors">
                        <ArrowLeft size={22} strokeWidth={2.5} />
                    </button>
                </Link>
                <div>
                    <h1 className="text-3xl font-extrabold text-foreground">Confirm Details</h1>
                    <p className="text-gray-500 font-medium">Final review of your freelance permit application.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Main Summary (8 Cols) */}
                <div className="lg:col-span-8 space-y-8">
                    <NeoCard className="p-10">
                        <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
                            <h2 className="text-xl font-bold text-gray-800">Profile Summary</h2>
                            <Link href={`/services/freelance-visa/details?id=${appId}`}>
                                <button className="flex items-center gap-2 text-sm font-bold text-indigo-600 hover:text-indigo-500 transition-colors">
                                    <Edit3 size={16} /> Edit
                                </button>
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="flex items-start gap-4">
                                <NeoIcon icon={GraduationCap} size={28} variant="inset" className="text-indigo-500" />
                                <div>
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Education</p>
                                    <p className="text-xl font-bold text-gray-800 mt-1">{app.data.education}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <NeoIcon icon={LayoutGrid} size={28} variant="inset" className="text-red-600" />
                                <div>
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Category</p>
                                    <p className="text-xl font-bold text-gray-800 mt-1">{app.data.category}</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 pt-8 border-t border-gray-100">
                            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Uploaded Documents</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {['Degree_Cert.pdf', 'Passport.jpg'].map((doc, i) => (
                                    <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100">
                                        <CheckCircle size={16} className="text-green-500" />
                                        <span className="font-bold text-gray-600 text-sm">{doc}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </NeoCard>

                    <NeoButton size="lg" className="w-full h-16 text-lg font-bold tracking-wide bg-indigo-600 hover:bg-indigo-500 text-white shadow-xl shadow-indigo-500/20" onClick={handleSubmit}>
                        Submit for Approval
                    </NeoButton>
                </div>

                {/* Right Side: Timeline (4 Cols) */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="neo-raised p-8 h-full">
                        <h3 className="text-lg font-bold text-gray-800 mb-6">Timeline Estimate</h3>

                        <div className="relative border-l-2 border-indigo-200 ml-3 pl-6 space-y-8">
                            <div className="relative">
                                <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-indigo-500 border-2 border-white z-10"></div>
                                <h4 className="font-bold text-gray-700">Submission</h4>
                                <p className="text-xs text-gray-500 mt-1">Today</p>
                            </div>
                            <div className="relative">
                                <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-indigo-200 border-2 border-white z-10"></div>
                                <h4 className="font-bold text-gray-400">Security Approval</h4>
                                <p className="text-xs text-gray-400 mt-1">2-3 Working Days</p>
                            </div>
                            <div className="relative">
                                <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-indigo-200 border-2 border-white z-10"></div>
                                <h4 className="font-bold text-gray-400">License Issuance</h4>
                                <p className="text-xs text-gray-400 mt-1">Day 5</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function FreelanceReviewPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <FreelanceReviewContent />
        </Suspense>
    );
}
