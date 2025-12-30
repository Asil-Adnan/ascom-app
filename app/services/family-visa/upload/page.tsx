'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { NeoCard } from '@/components/ui/NeoCard';
import { NeoButton } from '@/components/ui/NeoButton';
import { NeoIcon } from '@/components/ui/NeoIcon';
import { ArrowLeft, Upload, FileText, CheckCircle, Smartphone } from 'lucide-react';

export default function FamilyUploadPage() {
    const router = useRouter();

    const handleNext = () => {
        // In a real app, this would validate and submit
        router.push('/dashboard');
    };

    return (
        <div className="w-full max-w-6xl mx-auto py-12 animate-in fade-in zoom-in duration-300">

            {/* Header */}
            <div className="flex items-center gap-4 mb-12">
                <Link href="/services/family-visa/dependents">
                    <button className="w-12 h-12 rounded-xl neo-btn flex items-center justify-center text-gray-500 hover:text-red-500 transition-colors">
                        <ArrowLeft size={22} strokeWidth={2.5} />
                    </button>
                </Link>
                <div>
                    <h1 className="text-3xl font-extrabold text-foreground">Upload Personal Documents</h1>
                    <p className="text-gray-500 font-medium">Securely provide documents for each family member.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Main Upload (7 Cols) */}
                <div className="lg:col-span-7 space-y-8">
                    {/* Dynamic list based on previous step mock */}
                    {[1].map((id, index) => (
                        <NeoCard key={id} className="p-8">
                            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                                <span className="w-8 h-8 rounded-full bg-red-100 text-red-500 flex items-center justify-center font-bold text-sm">#{index + 1}</span>
                                <h3 className="font-bold text-gray-700">Dependent Documents</h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {['Passport Scan', 'Visa Copy/Entry Stamps', 'Photo (White BG)', 'Birth/Marriage Cert'].map((doc, i) => (
                                    <div key={i} className="p-4 rounded-xl border-2 border-dashed border-gray-200 hover:border-red-500/50 hover:bg-red-50/10 cursor-pointer transition-all flex flex-col items-center justify-center text-center gap-3 h-32 group">
                                        <Upload size={24} className="text-gray-300 group-hover:text-red-500 transition-colors" />
                                        <span className="text-xs font-bold text-gray-600 group-hover:text-gray-800">{doc}</span>
                                    </div>
                                ))}
                            </div>
                        </NeoCard>
                    ))}

                    <NeoButton size="lg" className="w-full h-16 text-lg font-bold tracking-wide" onClick={handleNext}>
                        Submit Application
                    </NeoButton>
                </div>

                {/* Right Side: Tips (5 Cols) */}
                <div className="lg:col-span-5 space-y-6">
                    <div className="neo-raised p-8 h-full bg-red-50/20 border border-red-50/50">
                        <div className="flex items-center gap-4 mb-8">
                            <NeoIcon icon={Smartphone} size={28} variant="inset" className="text-red-500" />
                            <h3 className="text-xl font-bold text-gray-700">Easy Upload</h3>
                        </div>

                        <div className="space-y-6">
                            <p className="text-sm text-gray-600 leading-relaxed">
                                You can upload photos directly from your phone gallery. Ensure all text is readable and corners are visible.
                            </p>

                            <div className="space-y-4">
                                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/60">
                                    <CheckCircle size={18} className="text-green-500 flex-shrink-0" />
                                    <span className="font-bold text-gray-700 text-sm">Attested Certificates Required</span>
                                </div>
                                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/60">
                                    <CheckCircle size={18} className="text-green-500 flex-shrink-0" />
                                    <span className="font-bold text-gray-700 text-sm">Passports Valid &gt; 6 Months</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
