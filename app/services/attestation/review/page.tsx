'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { NeoCard } from '@/components/ui/NeoCard';
import { NeoButton } from '@/components/ui/NeoButton';
import { NeoIcon } from '@/components/ui/NeoIcon';
import { ArrowLeft, Globe, FileCheck, CheckCircle2, Clock } from 'lucide-react';

export default function AttestationReviewPage() {
    const router = useRouter();

    const handleSubmit = () => {
        router.push('/services/attestation/submitted');
    };

    return (
        <div className="w-full max-w-6xl mx-auto py-12 animate-in fade-in zoom-in duration-300">

            {/* Header */}
            <div className="flex items-center gap-4 mb-12">
                <Link href="/services/attestation/documents">
                    <button className="w-12 h-12 rounded-xl neo-btn flex items-center justify-center text-gray-500 hover:text-red-500 transition-colors">
                        <ArrowLeft size={22} strokeWidth={2.5} />
                    </button>
                </Link>
                <div>
                    <h1 className="text-3xl font-extrabold text-foreground">Review Order</h1>
                    <p className="text-gray-500 font-medium">Confirm your attestation details.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Main Summary (8 Cols) */}
                <div className="lg:col-span-8 space-y-8">
                    <NeoCard className="p-10">
                        <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
                            <h2 className="text-xl font-bold text-gray-800">Service Summary</h2>
                            <Link href="/services/attestation">
                                <button className="text-sm font-bold text-blue-600 hover:underline">Edit Details</button>
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50">
                                <div className="w-12 h-12 rounded-xl bg-white neo-shadow flex items-center justify-center text-blue-500">
                                    <FileCheck size={24} />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-gray-400 uppercase">Document Type</p>
                                    <p className="text-lg font-bold text-gray-800">Degree Certificate</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50">
                                <div className="w-12 h-12 rounded-xl bg-white neo-shadow flex items-center justify-center text-purple-500">
                                    <Globe size={24} />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-gray-400 uppercase">Origin Country</p>
                                    <p className="text-lg font-bold text-gray-800">United Kingdom</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 space-y-4">
                            <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                <span className="font-bold text-gray-500">Attestation Fee</span>
                                <span className="font-bold text-gray-800">AED 450.00</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                <span className="font-bold text-gray-500">Courier Service</span>
                                <span className="font-bold text-green-600">FREE</span>
                            </div>
                            <div className="flex justify-between items-center py-2 text-xl">
                                <span className="font-extrabold text-gray-800">Total</span>
                                <span className="font-extrabold text-red-500">AED 450.00</span>
                            </div>
                        </div>
                    </NeoCard>

                    <NeoButton size="lg" className="w-full h-16 text-lg font-bold tracking-wide bg-blue-600 hover:bg-blue-500 text-white shadow-xl shadow-blue-500/20" onClick={handleSubmit}>
                        Confirm & Pay Securely
                    </NeoButton>
                </div>

                {/* Right Side: Guarantee (4 Cols) */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="neo-raised p-8 h-full flex flex-col items-center text-center">
                        <div className="w-20 h-20 rounded-full neo-inset flex items-center justify-center text-green-500 mb-6">
                            <CheckCircle2 size={40} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800">Peace of Mind</h3>
                        <p className="text-sm text-gray-500 mt-2 mb-8">
                            Track your document every step of the way with our real-time updates.
                        </p>

                        <div className="w-full p-4 rounded-xl bg-yellow-50 border border-yellow-100 flex items-center gap-3 text-left">
                            <Clock size={20} className="text-yellow-600 flex-shrink-0" />
                            <div>
                                <p className="font-bold text-gray-800 text-sm">Estimated Completion</p>
                                <p className="text-xs text-gray-500">7-10 Working Days</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
