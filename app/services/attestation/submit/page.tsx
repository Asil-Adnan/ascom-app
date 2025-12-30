'use client';

import { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { NeoCard } from '@/components/ui/NeoCard';
import { NeoButton } from '@/components/ui/NeoButton';
import { NeoIcon } from '@/components/ui/NeoIcon';
import { ArrowLeft, Clock, Upload, Zap, Timer } from 'lucide-react';

function AttestationSubmitContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const type = searchParams.get('type') || 'Document';
    const [speed, setSpeed] = useState('normal');

    const handleSubmit = () => {
        router.push('/dashboard');
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
                    <h1 className="text-3xl font-extrabold text-foreground">Select Speed</h1>
                    <p className="text-gray-500 font-medium">Choose your processing timeline.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Main Options (7 Cols) */}
                <div className="lg:col-span-7 space-y-8">
                    <NeoCard className="p-10">
                        <h2 className="text-xl font-bold text-gray-700 mb-8">Processing Options</h2>

                        <div className="space-y-6">
                            <button
                                onClick={() => setSpeed('normal')}
                                className={`w-full p-6 rounded-2xl border-2 flex items-center justify-between transition-all group
                             ${speed === 'normal'
                                        ? 'border-blue-500 bg-blue-50/50 neo-inset'
                                        : 'border-gray-100 hover:border-blue-300 bg-white/50 neo-raised'}
                         `}
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${speed === 'normal' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-400'}`}>
                                        <Timer size={24} />
                                    </div>
                                    <div className="text-left">
                                        <h3 className="font-bold text-gray-800 text-lg">Standard</h3>
                                        <p className="text-sm text-gray-500">7-10 Working Days</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-extrabold text-xl text-gray-800">AED 450</p>
                                </div>
                            </button>

                            <button
                                onClick={() => setSpeed('express')}
                                className={`w-full p-6 rounded-2xl border-2 flex items-center justify-between transition-all group
                             ${speed === 'express'
                                        ? 'border-orange-500 bg-orange-50/50 neo-inset'
                                        : 'border-gray-100 hover:border-orange-300 bg-white/50 neo-raised'}
                         `}
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${speed === 'express' ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-400'}`}>
                                        <Zap size={24} fill="currentColor" />
                                    </div>
                                    <div className="text-left">
                                        <h3 className="font-bold text-gray-800 text-lg">Express</h3>
                                        <p className="text-sm text-gray-500">3-4 Working Days</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-extrabold text-xl text-orange-500">AED 850</p>
                                </div>
                            </button>
                        </div>
                    </NeoCard>

                    <NeoButton size="lg" className="w-full h-16 text-lg font-bold tracking-wide" onClick={handleSubmit}>
                        Proceed with {speed === 'express' ? 'Express' : 'Standard'}
                    </NeoButton>
                </div>

                {/* Right Side: Upload Reminder (5 Cols) */}
                <div className="lg:col-span-5 space-y-6">
                    <NeoCard className="p-8 h-full flex flex-col items-center justify-center text-center">
                        <div className="w-20 h-20 rounded-full neo-inset flex items-center justify-center text-gray-400 mb-6">
                            <Upload size={40} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-700">Document Upload</h3>
                        <p className="text-sm text-gray-500 mt-2 mb-8">
                            Don't forget to attach your {type} scan before proceeding.
                        </p>

                        <div className="w-full p-8 border-2 border-dashed border-gray-200 rounded-2xl hover:bg-gray-50 cursor-pointer transition-colors">
                            <p className="font-bold text-gray-400">Click to Browse</p>
                        </div>
                    </NeoCard>
                </div>
            </div>
        </div>
    );
}

export default function AttestationSubmitPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <AttestationSubmitContent />
        </Suspense>
    );
}
