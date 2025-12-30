'use client';

import { Suspense } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { NeoCard } from '@/components/ui/NeoCard';
import { NeoButton } from '@/components/ui/NeoButton';
import { ArrowLeft, Upload, FileText, PackageCheck } from 'lucide-react';

function CargoDocumentsContent() {
    const router = useRouter();

    const handleNext = () => {
        router.push('/services/cargo/review');
    };

    return (
        <div className="w-full max-w-6xl mx-auto py-12 animate-in fade-in zoom-in duration-300">

            {/* Header */}
            <div className="flex items-center gap-4 mb-12">
                <Link href="/services/cargo/details">
                    <button className="w-12 h-12 rounded-xl neo-btn flex items-center justify-center text-gray-500 hover:text-orange-600 transition-colors">
                        <ArrowLeft size={22} strokeWidth={2.5} />
                    </button>
                </Link>
                <div>
                    <h1 className="text-3xl font-extrabold text-foreground">Cargo Documents</h1>
                    <p className="text-gray-500 font-medium">Upload necessary shipping docs.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Main Upload (7 Cols) */}
                <div className="lg:col-span-7 space-y-6">
                    <NeoCard className="p-8">
                        <div className="text-center mb-8">
                            <h3 className="text-lg font-bold text-gray-700">Commercial Invoice</h3>
                            <p className="text-sm text-gray-500">Required for customs</p>
                        </div>

                        <div className="p-8 rounded-xl border-2 border-dashed border-gray-200 hover:border-orange-500 transition-all cursor-pointer text-center group bg-gray-50/50 hover:bg-orange-50/10 mb-6">
                            <div className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-400 mx-auto mb-4 group-hover:text-orange-500 transition-colors">
                                <Upload size={24} />
                            </div>
                            <h4 className="font-bold text-gray-700 group-hover:text-orange-600 transition-colors">Upload Invoice</h4>
                            <p className="text-xs text-gray-400 mt-1">PDF or JPG</p>
                        </div>

                        <div className="text-center mb-4">
                            <h3 className="text-lg font-bold text-gray-700">Packing List</h3>
                            <p className="text-sm text-gray-500">Optional at this stage</p>
                        </div>

                        <div className="p-8 rounded-xl border-2 border-dashed border-gray-200 hover:border-orange-500 transition-all cursor-pointer text-center group bg-gray-50/50 hover:bg-orange-50/10">
                            <div className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-400 mx-auto mb-4 group-hover:text-orange-500 transition-colors">
                                <Upload size={24} />
                            </div>
                            <h4 className="font-bold text-gray-700 group-hover:text-orange-600 transition-colors">Upload Packing List</h4>
                        </div>
                    </NeoCard>

                    <NeoButton size="lg" className="w-full h-16 text-lg font-bold tracking-wide mt-8" onClick={handleNext}>
                        Proceed to Review
                    </NeoButton>
                </div>

                {/* Right Side: Info (5 Cols) */}
                <div className="lg:col-span-5 space-y-6">
                    <div className="neo-raised p-8 h-full bg-white/50 border border-white">
                        <div className="flex items-center gap-4 mb-6">
                            <PackageCheck size={28} className="text-orange-600" />
                            <h3 className="text-xl font-bold text-gray-700">Prohibited Items</h3>
                        </div>

                        <p className="text-sm text-gray-600 leading-relaxed mb-6">
                            Please ensure your shipmenet does not contain:
                        </p>

                        <ul className="list-disc list-inside text-sm text-gray-500 space-y-2 mb-6">
                            <li>Batteries (Lithium)</li>
                            <li>Flammable Liquids</li>
                            <li>Perishable Food (unless refrigerated container)</li>
                            <li>Illegal Substances</li>
                        </ul>

                        <div className="p-4 rounded-xl bg-orange-50 border border-orange-100">
                            <p className="font-bold text-orange-800 text-sm mb-1">Need Insurance?</p>
                            <p className="text-xs text-orange-700">
                                We offer cargo insurance at 1% of the declared value.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function CargoDocumentsPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <CargoDocumentsContent />
        </Suspense>
    );
}
