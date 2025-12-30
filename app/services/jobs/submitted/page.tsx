'use client';

import { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { NeoCard } from '@/components/ui/NeoCard';
import { NeoButton } from '@/components/ui/NeoButton';
import { NeoIcon } from '@/components/ui/NeoIcon';
import { CheckCircle, Home, FileSearch, Bell } from 'lucide-react';

function JobsSubmittedContent() {
    const searchParams = useSearchParams();
    const appId = searchParams.get('id');

    return (
        <div className="w-full max-w-6xl mx-auto py-12 animate-in fade-in zoom-in duration-300">

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                {/* Main Success Card (8 Cols) */}
                <div className="lg:col-span-8">
                    <NeoCard className="p-10 flex flex-col items-center text-center min-h-[500px] justify-center relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-green-50 rounded-bl-full opacity-50 pointer-events-none"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-green-50 rounded-tr-full opacity-50 pointer-events-none"></div>

                        <div className="relative z-10 mb-8">
                            <div className="w-24 h-24 rounded-full neo-inset flex items-center justify-center text-green-500 mb-6 mx-auto">
                                <CheckCircle size={48} strokeWidth={2} />
                            </div>
                            <h1 className="text-4xl font-extrabold text-gray-800 mb-4">Application Submitted!</h1>
                            <p className="text-lg text-gray-500 max-w-lg mx-auto leading-relaxed">
                                Your job application has been securely received. Our recruitment team is now reviewing your profile.
                            </p>
                        </div>

                        <div className="relative z-10 p-6 bg-white/60 rounded-2xl border border-white max-w-md w-full mb-8">
                            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Application ID</p>
                            <p className="text-3xl font-mono font-bold text-red-600 tracking-wider select-all">{appId || 'Job-1289'}</p>
                        </div>

                        <Link href="/dashboard" className="relative z-10">
                            <NeoButton size="lg" className="h-14 px-8 text-lg font-bold flex items-center gap-2">
                                <Home size={20} /> Return to Dashboard
                            </NeoButton>
                        </Link>
                    </NeoCard>
                </div>

                {/* Right Side: What Now (4 Cols) */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="neo-raised p-8 h-full">
                        <h3 className="text-xl font-bold text-gray-700 mb-8">Track Progress</h3>

                        <div className="space-y-6">
                            <div className="flex items-start gap-4 opacity-50">
                                <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center font-bold shrink-0">
                                    1
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-800">Submitted</h4>
                                    <p className="text-sm text-gray-500">Application received.</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full neo-inset text-blue-500 flex items-center justify-center font-bold shrink-0 animate-pulse">
                                    2
                                </div>
                                <div>
                                    <h4 className="font-bold text-blue-600">Under Review</h4>
                                    <p className="text-sm text-blue-400">Current Status</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 opacity-50">
                                <div className="w-10 h-10 rounded-full neo-raised text-gray-400 flex items-center justify-center font-bold shrink-0">
                                    3
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-600">Interview</h4>
                                    <p className="text-sm text-gray-500">Dependent on review.</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-12 p-4 bg-yellow-50 rounded-xl border border-yellow-100 flex items-center gap-3">
                            <Bell size={20} className="text-yellow-600" />
                            <p className="text-xs font-bold text-yellow-700">We will notify you via email upon any status change.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function JobsSubmittedPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <JobsSubmittedContent />
        </Suspense>
    );
}
