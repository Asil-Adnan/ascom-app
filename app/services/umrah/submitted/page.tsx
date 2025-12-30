'use client';

import { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { NeoCard } from '@/components/ui/NeoCard';
import { NeoButton } from '@/components/ui/NeoButton';
import { CheckCircle, Home, Moon } from 'lucide-react';

function UmrahSubmittedContent() {
    const searchParams = useSearchParams();
    const appId = searchParams.get('id');

    return (
        <div className="w-full max-w-6xl mx-auto py-12 animate-in fade-in zoom-in duration-300">

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                {/* Main Success Card (8 Cols) */}
                <div className="lg:col-span-8">
                    <NeoCard className="p-10 flex flex-col items-center text-center min-h-[500px] justify-center relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-500 to-green-600"></div>

                        <div className="relative z-10 mb-8">
                            <div className="w-24 h-24 rounded-full neo-inset flex items-center justify-center text-red-600 mb-6 mx-auto">
                                <Moon size={48} strokeWidth={2} className="fill-current" />
                            </div>
                            <h1 className="text-4xl font-extrabold text-gray-800 mb-4">Umrah Booking Confirmed!</h1>
                            <p className="text-lg text-gray-500 max-w-lg mx-auto leading-relaxed">
                                Mabrook! Your visa application has been initiated. You will receive your e-Visa via email shortly.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4 w-full max-w-md mb-8">
                            <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                                <p className="text-xs font-bold text-gray-400 uppercase">Booking Ref</p>
                                <p className="text-lg font-bold text-red-600">{appId || 'UMR-7782'}</p>
                            </div>
                            <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                                <p className="text-xs font-bold text-gray-400 uppercase">Status</p>
                                <p className="text-lg font-bold text-orange-500">Processing</p>
                            </div>
                        </div>

                        <Link href="/dashboard" className="relative z-10">
                            <NeoButton size="lg" className="h-14 px-8 text-lg font-bold flex items-center gap-2">
                                <Home size={20} /> Return to Dashboard
                            </NeoButton>
                        </Link>
                    </NeoCard>
                </div>

                {/* Right Side: Information (4 Cols) */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="neo-raised p-8 h-full bg-white/40 border border-white">
                        <h3 className="text-xl font-bold text-gray-700 mb-8">Important Notes</h3>

                        <ul className="space-y-6">
                            <li className="flex items-start gap-3">
                                <CheckCircle className="text-red-500 mt-1 shrink-0" size={20} />
                                <div>
                                    <h4 className="font-bold text-gray-800">Print Your Visa</h4>
                                    <p className="text-xs text-gray-500">Keep a physical copy for airport.</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <CheckCircle className="text-red-500 mt-1 shrink-0" size={20} />
                                <div>
                                    <h4 className="font-bold text-gray-800">Nusuk App</h4>
                                    <p className="text-xs text-gray-500">Download to book Rawdah permit.</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <CheckCircle className="text-red-500 mt-1 shrink-0" size={20} />
                                <div>
                                    <h4 className="font-bold text-gray-800">Zamzam Water</h4>
                                    <p className="text-xs text-gray-500">Permitted with Umrah visa.</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function UmrahSubmittedPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <UmrahSubmittedContent />
        </Suspense>
    );
}
