'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { NeoCard } from '@/components/ui/NeoCard';
import { NeoButton } from '@/components/ui/NeoButton';
import { NeoIcon } from '@/components/ui/NeoIcon';
import { ArrowLeft, Upload, FileText, CheckCircle, ShieldCheck, Info } from 'lucide-react';

export default function AttestationDocumentsPage() {
    const router = useRouter();

    const handleNext = () => {
        router.push('/services/attestation/review');
    };

    return (
        <div className="w-full max-w-6xl mx-auto py-12 animate-in fade-in zoom-in duration-300">

            {/* Header */}
            <div className="flex items-center gap-4 mb-12">
                <Link href="/services/attestation">
                    <button className="w-12 h-12 rounded-xl neo-btn flex items-center justify-center text-gray-500 hover:text-red-500 transition-colors">
                        <ArrowLeft size={22} strokeWidth={2.5} />
                    </button>
                </Link>
                <div>
                    <h1 className="text-3xl font-extrabold text-foreground">Upload Documents</h1>
                    <p className="text-gray-500 font-medium">Verify your certificates for attestation.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Main Upload (7 Cols) */}
                <div className="lg:col-span-7 space-y-8">
                    <NeoCard className="p-10 border-2 border-dashed border-gray-300 hover:border-blue-500 transition-colors cursor-pointer group relative overflow-hidden">
                        <div className="flex flex-col items-center justify-center py-12 text-center">
                            <div className="w-24 h-24 rounded-full neo-inset flex items-center justify-center text-blue-500 mb-6 group-hover:scale-110 transition-transform">
                                <Upload size={40} strokeWidth={1.5} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-800">Drag & Drop or Click to Upload</h3>
                            <p className="text-gray-400 mt-2 max-w-sm">
                                Upload clear scans of your original degree or birth certificate. Supported formats: PDF, JPG, PNG.
                            </p>
                        </div>
                        <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                    </NeoCard>

                    <div className="grid grid-cols-2 gap-6">
                        <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 flex items-center gap-3">
                            <FileText size={20} className="text-gray-400" />
                            <div>
                                <p className="font-bold text-gray-700">Scan_001.pdf</p>
                                <p className="text-xs text-gray-400">Ready to upload</p>
                            </div>
                        </div>
                        <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 flex items-center gap-3 opacity-50">
                            <div className="w-5 h-5 rounded-full border-2 border-gray-300"></div>
                            <p className="font-bold text-gray-400 text-sm">Add another file...</p>
                        </div>
                    </div>

                    <NeoButton size="lg" className="w-full h-16 text-lg font-bold tracking-wide" onClick={handleNext}>
                        Review & Confirm
                    </NeoButton>
                </div>

                {/* Right Side: Requirements (5 Cols) */}
                <div className="lg:col-span-5 space-y-6">
                    <div className="neo-raised p-8 h-full bg-blue-50/20 border border-blue-50">
                        <div className="flex items-center gap-4 mb-8">
                            <NeoIcon icon={ShieldCheck} size={28} variant="inset" className="text-blue-500" />
                            <h3 className="text-xl font-bold text-gray-700">Attestation Rules</h3>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <Info className="text-blue-500 mt-1 shrink-0" size={20} />
                                <div>
                                    <h4 className="font-bold text-gray-800">Originals Required</h4>
                                    <p className="text-sm text-gray-500 mt-1">We will arrange collection of your original documents via secure courier.</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <CheckCircle className="text-green-500 mt-1 shrink-0" size={20} />
                                <div>
                                    <h4 className="font-bold text-gray-800">MOFA Recognized</h4>
                                    <p className="text-sm text-gray-500 mt-1">All attestations are fully recognized by the Ministry of Foreign Affairs.</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 pt-8 border-t border-gray-200">
                            <p className="text-xs text-center text-gray-400 font-bold">
                                100% Secure Document Handling
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
