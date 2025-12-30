'use client';

import Link from 'next/link';
import { NeoCard } from '@/components/ui/NeoCard';
import { NeoButton } from '@/components/ui/NeoButton';
import { CheckCircle, Home, FileText, ArrowRight } from 'lucide-react';

export default function AttestationSubmittedPage() {
    return (
        <div className="w-full max-w-6xl mx-auto py-12 animate-in fade-in zoom-in duration-300">

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                {/* Main Success Card (8 Cols) */}
                <div className="lg:col-span-8">
                    <NeoCard className="p-10 flex flex-col items-center text-center min-h-[500px] justify-center relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-400 to-purple-500"></div>

                        <div className="relative z-10 mb-8">
                            <div className="w-24 h-24 rounded-full neo-inset flex items-center justify-center text-blue-500 mb-6 mx-auto">
                                <CheckCircle size={48} strokeWidth={2} />
                            </div>
                            <h1 className="text-4xl font-extrabold text-gray-800 mb-4">Attestation Request Sent!</h1>
                            <p className="text-lg text-gray-500 max-w-lg mx-auto leading-relaxed">
                                We have received your document details. Our courier partner will contact you shortly for collection.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4 w-full max-w-md mb-8">
                            <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                                <p className="text-xs font-bold text-gray-400 uppercase">Order ID</p>
                                <p className="text-lg font-bold text-blue-600">ATT-9281</p>
                            </div>
                            <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                                <p className="text-xs font-bold text-gray-400 uppercase">Status</p>
                                <p className="text-lg font-bold text-orange-500">Pending Collection</p>
                            </div>
                        </div>

                        <Link href="/dashboard" className="relative z-10">
                            <NeoButton size="lg" className="h-14 px-8 text-lg font-bold flex items-center gap-2">
                                <Home size={20} /> Back to Dashboard
                            </NeoButton>
                        </Link>
                    </NeoCard>
                </div>

                {/* Right Side: What Now (4 Cols) */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="neo-raised p-8 h-full">
                        <h3 className="text-xl font-bold text-gray-700 mb-8">Next Steps</h3>

                        <div className="relative border-l-2 border-dashed border-gray-300 ml-3 pl-8 space-y-8">
                            <div className="relative">
                                <div className="absolute -left-[39px] top-1 w-5 h-5 rounded-full bg-blue-500 border-4 border-white shadow-sm z-10"></div>
                                <h4 className="font-bold text-gray-800">Courier Pickup</h4>
                                <p className="text-xs text-gray-500 mt-1">Prepare original documents.</p>
                            </div>
                            <div className="relative">
                                <div className="absolute -left-[39px] top-1 w-5 h-5 rounded-full bg-gray-300 border-4 border-white shadow-sm z-10"></div>
                                <h4 className="font-bold text-gray-500">Ministry Processing</h4>
                                <p className="text-xs text-gray-400 mt-1">Verification in progress.</p>
                            </div>
                            <div className="relative">
                                <div className="absolute -left-[39px] top-1 w-5 h-5 rounded-full bg-gray-300 border-4 border-white shadow-sm z-10"></div>
                                <h4 className="font-bold text-gray-500">Delivery</h4>
                                <p className="text-xs text-gray-400 mt-1">Return of attested docs.</p>
                            </div>
                        </div>

                        <div className="mt-12">
                            <NeoButton className="w-full flex items-center justify-between text-left h-auto py-4 px-6 bg-white hover:bg-gray-50">
                                <div>
                                    <p className="text-xs font-bold text-gray-400">Need Help?</p>
                                    <p className="font-bold text-gray-700">Contact Support</p>
                                </div>
                                <ArrowRight size={16} className="text-gray-400" />
                            </NeoButton>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
