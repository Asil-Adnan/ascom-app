'use client';

import { Suspense } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { NeoCard } from '@/components/ui/NeoCard';
import { NeoButton } from '@/components/ui/NeoButton';
import { NeoIcon } from '@/components/ui/NeoIcon';
import { ArrowLeft, Upload, FileText, BadgeCheck } from 'lucide-react';

function WorldwideDocumentsContent() {
    const router = useRouter();

    const handleNext = () => {
        router.push('/services/worldwide-visa/review');
    };

    return (
        <div className="w-full max-w-6xl mx-auto py-12 animate-in fade-in zoom-in duration-300">

            {/* Header */}
            <div className="flex items-center gap-4 mb-12">
                <Link href="/services/worldwide-visa/details">
                    <button className="w-12 h-12 rounded-xl neo-btn flex items-center justify-center text-gray-500 hover:text-red-600 transition-colors">
                        <ArrowLeft size={22} strokeWidth={2.5} />
                    </button>
                </Link>
                <div>
                    <h1 className="text-3xl font-extrabold text-foreground">Document Checklist</h1>
                    <p className="text-gray-500 font-medium">Standard requirements for UK Visa.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Main Upload (7 Cols) */}
                <div className="lg:col-span-7 space-y-6">
                    <NeoCard className="p-8">
                        <div className="grid grid-cols-1 gap-6">
                            <div className="p-6 rounded-xl border-2 border-dashed border-gray-200 hover:border-green-500 transition-all cursor-pointer flex items-center gap-4 group bg-gray-50/50 hover:bg-green-50/10">
                                <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-400 group-hover:text-green-500 transition-colors shrink-0">
                                    <Upload size={20} />
                                </div>
                                <div className="text-left">
                                    <h4 className="font-bold text-gray-700 group-hover:text-red-600 transition-colors">Passport Scan</h4>
                                    <p className="text-xs text-gray-400 mt-1">First and last page</p>
                                </div>
                            </div>

                            <div className="p-6 rounded-xl border-2 border-dashed border-gray-200 hover:border-green-500 transition-all cursor-pointer flex items-center gap-4 group bg-gray-50/50 hover:bg-green-50/10">
                                <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-400 group-hover:text-green-500 transition-colors shrink-0">
                                    <Upload size={20} />
                                </div>
                                <div className="text-left">
                                    <h4 className="font-bold text-gray-700 group-hover:text-red-600 transition-colors">Photo</h4>
                                    <p className="text-xs text-gray-400 mt-1">White background, biometric standard</p>
                                </div>
                            </div>

                            <div className="p-6 rounded-xl border-2 border-dashed border-gray-200 hover:border-green-500 transition-all cursor-pointer flex items-center gap-4 group bg-gray-50/50 hover:bg-green-50/10">
                                <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-400 group-hover:text-green-500 transition-colors shrink-0">
                                    <Upload size={20} />
                                </div>
                                <div className="text-left">
                                    <h4 className="font-bold text-gray-700 group-hover:text-red-600 transition-colors">Bank Statement</h4>
                                    <p className="text-xs text-gray-400 mt-1">Last 6 months</p>
                                </div>
                            </div>
                        </div>
                    </NeoCard>

                    <NeoButton size="lg" className="w-full h-16 text-lg font-bold tracking-wide mt-8" onClick={handleNext}>
                        Review & Pay
                    </NeoButton>
                </div>

                {/* Right Side: Info (5 Cols) */}
                <div className="lg:col-span-5 space-y-6">
                    <div className="neo-raised p-8 h-full bg-white/50 border border-white">
                        <div className="flex items-center gap-4 mb-6">
                            <NeoIcon icon={BadgeCheck} size={28} variant="inset" className="text-red-600" />
                            <h3 className="text-xl font-bold text-gray-700">Expert Review</h3>
                        </div>

                        <p className="text-sm text-gray-600 leading-relaxed mb-6">
                            Our visa experts will double-check your documents before submission to avoid rejection.
                        </p>

                        <div className="p-4 rounded-xl bg-green-50 border border-green-100 mb-4">
                            <p className="font-bold text-green-800 text-sm mb-1">Appointment Booking</p>
                            <p className="text-xs text-green-700">
                                We will schedule your biometric appointment at the nearest VFS center based on your availability.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function WorldwideDocumentsPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <WorldwideDocumentsContent />
        </Suspense>
    );
}
