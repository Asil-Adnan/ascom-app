'use client';

import { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { NeoCard } from '@/components/ui/NeoCard';
import { NeoButton } from '@/components/ui/NeoButton';
import { CheckCircle, Home, LayoutGrid, ArrowRight } from 'lucide-react';

function FreelanceSubmittedContent() {
    const searchParams = useSearchParams();
    const appId = searchParams.get('id');

    return (
        <div className="w-full max-w-6xl mx-auto py-12 animate-in fade-in zoom-in duration-300">

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                {/* Main Success Card (8 Cols) */}
                <div className="lg:col-span-8">
                    <NeoCard className="p-10 flex flex-col items-center text-center min-h-[500px] justify-center relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-50 rounded-bl-full opacity-50 pointer-events-none"></div>

                        <div className="relative z-10 mb-8">
                            <div className="w-24 h-24 rounded-full neo-inset flex items-center justify-center text-purple-500 mb-6 mx-auto">
                                <CheckCircle size={48} strokeWidth={2} />
                            </div>
                            <h1 className="text-4xl font-extrabold text-gray-800 mb-4">Application Success!</h1>
                            <p className="text-lg text-gray-500 max-w-lg mx-auto leading-relaxed">
                                Your freelance permit application has been submitted to the authority.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4 w-full max-w-md mb-8">
                            <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                                <p className="text-xs font-bold text-gray-400 uppercase">App ID</p>
                                <p className="text-lg font-bold text-indigo-600">{appId || 'FLP-2921'}</p>
                            </div>
                            <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                                <p className="text-xs font-bold text-gray-400 uppercase">Est. Completion</p>
                                <p className="text-lg font-bold text-gray-700">5 Days</p>
                            </div>
                        </div>

                        <Link href="/dashboard" className="relative z-10">
                            <NeoButton size="lg" className="h-14 px-8 text-lg font-bold flex items-center gap-2">
                                <Home size={20} /> Dashboard
                            </NeoButton>
                        </Link>
                    </NeoCard>
                </div>

                {/* Right Side: Next Steps (4 Cols) */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="neo-raised p-8 h-full bg-white/40 border border-white">
                        <h3 className="text-xl font-bold text-gray-700 mb-8">What comes next?</h3>

                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center font-bold text-sm shrink-0">1</div>
                                <div>
                                    <h4 className="font-bold text-gray-800">Initial Approval</h4>
                                    <p className="text-xs text-gray-500">Security clearance processing.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4 opacity-50">
                                <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center font-bold text-sm shrink-0">2</div>
                                <div>
                                    <h4 className="font-bold text-gray-800">Entry Permit</h4>
                                    <p className="text-xs text-gray-500">(If outside country)</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4 opacity-50">
                                <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center font-bold text-sm shrink-0">3</div>
                                <div>
                                    <h4 className="font-bold text-gray-800">Medical & ID</h4>
                                    <p className="text-xs text-gray-500">Physical medical test.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function FreelanceSubmittedPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <FreelanceSubmittedContent />
        </Suspense>
    );
}
