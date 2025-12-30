'use client';

import { Suspense } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { NeoCard } from '@/components/ui/NeoCard';
import { NeoButton } from '@/components/ui/NeoButton';
import { NeoIcon } from '@/components/ui/NeoIcon';
import { ArrowLeft, Upload, FileText, Smartphone } from 'lucide-react';

function HolidaysDocumentsContent() {
    const router = useRouter();

    const handleNext = () => {
        router.push('/services/holidays/review');
    };

    return (
        <div className="w-full max-w-6xl mx-auto py-12 animate-in fade-in zoom-in duration-300">

            {/* Header */}
            <div className="flex items-center gap-4 mb-12">
                <Link href="/services/holidays/plan">
                    <button className="w-12 h-12 rounded-xl neo-btn flex items-center justify-center text-gray-500 hover:text-pink-500 transition-colors">
                        <ArrowLeft size={22} strokeWidth={2.5} />
                    </button>
                </Link>
                <div>
                    <h1 className="text-3xl font-extrabold text-foreground">Travel Documents</h1>
                    <p className="text-gray-500 font-medium">Upload passports for accurate visa checks.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Main Upload (7 Cols) */}
                <div className="lg:col-span-7 space-y-6">
                    <NeoCard className="p-8">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 font-bold">1</div>
                            <div>
                                <h3 className="font-bold text-gray-700">Primary Traveler</h3>
                                <p className="text-xs text-gray-500">Provide passport details</p>
                            </div>
                        </div>

                        <div className="p-8 rounded-xl border-2 border-dashed border-gray-200 hover:border-pink-500 transition-all cursor-pointer text-center group bg-gray-50/50 hover:bg-pink-50/10">
                            <div className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-400 mx-auto mb-4 group-hover:text-pink-500 transition-colors">
                                <Upload size={24} />
                            </div>
                            <h4 className="font-bold text-gray-700 group-hover:text-pink-600 transition-colors">Upload Passport Scan</h4>
                            <p className="text-xs text-gray-400 mt-1">PDF, JPG or PNG (Max 5MB)</p>
                        </div>
                    </NeoCard>

                    <NeoCard className="p-8 opacity-60">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 font-bold">2</div>
                                <div>
                                    <h3 className="font-bold text-gray-400">Additional Travelers</h3>
                                    <p className="text-xs text-gray-400">Optional</p>
                                </div>
                            </div>
                            <NeoButton size="sm" className="bg-gray-200 text-gray-500 pointer-events-none">Add +</NeoButton>
                        </div>
                    </NeoCard>

                    <div className="pt-8">
                        <NeoButton size="lg" className="w-full h-16 text-lg font-bold tracking-wide" onClick={handleNext}>
                            Proceed to Review
                        </NeoButton>
                    </div>
                </div>

                {/* Right Side: Info (5 Cols) */}
                <div className="lg:col-span-5 space-y-6">
                    <div className="neo-raised p-8 h-full bg-white/50 border border-white">
                        <div className="flex items-center gap-4 mb-6">
                            <NeoIcon icon={Smartphone} size={28} variant="inset" className="text-pink-600" />
                            <h3 className="text-xl font-bold text-gray-700">Mobile Upload</h3>
                        </div>

                        <p className="text-sm text-gray-600 leading-relaxed mb-8">
                            You can take a photo of your passport directly from your phone. Ensure there is no glare and all text is readable.
                        </p>

                        <div className="p-4 rounded-xl bg-blue-50 border border-blue-100">
                            <p className="font-bold text-blue-800 text-sm mb-1">Why do we need this?</p>
                            <p className="text-xs text-blue-600">
                                Many destinations require passports to be valid for at least 6 months. We verify this automatically for you.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function HolidaysDocumentsPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <HolidaysDocumentsContent />
        </Suspense>
    );
}
