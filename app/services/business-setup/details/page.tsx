'use client';

import { useState, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { NeoCard } from '@/components/ui/NeoCard';
import { NeoButton } from '@/components/ui/NeoButton';
import { NeoInput } from '@/components/ui/NeoInput';
import { NeoIcon } from '@/components/ui/NeoIcon';
import { ArrowLeft, Building2, Globe, Users, FileText, CheckCircle, PieChart } from 'lucide-react';

function BusinessSetupDetailsContent() {
    const router = useRouter();

    const [companyName, setCompanyName] = useState('');
    const [activity, setActivity] = useState('');
    const [jurisdiction, setJurisdiction] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.push('/services/business-setup/documents');
    };

    return (
        <div className="w-full max-w-6xl mx-auto py-12 animate-in fade-in zoom-in duration-300">

            {/* Header */}
            <div className="flex items-center gap-4 mb-12">
                <Link href="/services/business-setup">
                    <button className="w-12 h-12 rounded-xl neo-btn flex items-center justify-center text-gray-500 hover:text-blue-600 transition-colors">
                        <ArrowLeft size={22} strokeWidth={2.5} />
                    </button>
                </Link>
                <div>
                    <h1 className="text-3xl font-extrabold text-foreground">Company Details</h1>
                    <p className="text-gray-500 font-medium">Structure your new business entity.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Main Form (7 Cols) */}
                <div className="lg:col-span-7 space-y-8">
                    <form onSubmit={handleSubmit} className="space-y-8">
                        <NeoCard className="p-10">
                            <div className="flex items-center gap-4 mb-8">
                                <NeoIcon icon={Building2} size={28} variant="inset" className="text-blue-600" />
                                <h3 className="text-xl font-bold text-gray-700">Basic Info</h3>
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-4">
                                    <label className="text-sm font-bold text-gray-400 uppercase tracking-wider ml-1">Proposed Company Name</label>
                                    <NeoInput
                                        placeholder="e.g. Acme Global Trading LLC"
                                        value={companyName}
                                        onChange={e => setCompanyName(e.target.value)}
                                        className="h-16 text-lg font-bold"
                                    />
                                    <p className="text-xs text-gray-400 ml-1">We will check availability with the DED.</p>
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <label className="text-sm font-bold text-gray-400 uppercase tracking-wider ml-1">Activity</label>
                                        <NeoInput
                                            placeholder="e.g. Marketing"
                                            value={activity}
                                            onChange={e => setActivity(e.target.value)}
                                            className="h-14 font-bold"
                                        />
                                    </div>
                                    <div className="space-y-4">
                                        <label className="text-sm font-bold text-gray-400 uppercase tracking-wider ml-1">Jurisdiction</label>
                                        <div className="grid grid-cols-2 gap-2">
                                            <button
                                                type="button"
                                                onClick={() => setJurisdiction('mainland')}
                                                className={`h-14 rounded-xl border-2 font-bold text-sm transition-all ${jurisdiction === 'mainland' ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-transparent bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
                                            >
                                                Mainland
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setJurisdiction('freezone')}
                                                className={`h-14 rounded-xl border-2 font-bold text-sm transition-all ${jurisdiction === 'freezone' ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-transparent bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
                                            >
                                                Freezone
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </NeoCard>

                        <NeoButton size="lg" className="w-full h-16 text-lg font-bold tracking-wide bg-blue-600 hover:bg-blue-500 text-white shadow-xl shadow-blue-500/20">
                            Continue to Documents
                        </NeoButton>
                    </form>
                </div>

                {/* Right Side: Info (5 Cols) */}
                <div className="lg:col-span-5 space-y-6">
                    <div className="neo-raised p-8 h-full bg-blue-50/20 border border-blue-50/50">
                        <div className="flex items-center gap-4 mb-6">
                            <NeoIcon icon={PieChart} size={28} variant="inset" className="text-blue-600" />
                            <h3 className="text-xl font-bold text-gray-700">Cost Estimator</h3>
                        </div>

                        <div className="space-y-4 mb-8">
                            <div className="flex justify-between items-center p-3 rounded-lg bg-white/60">
                                <span className="text-sm font-medium text-gray-600">Trade License</span>
                                <span className="font-bold text-gray-800">12,000 AED</span>
                            </div>
                            <div className="flex justify-between items-center p-3 rounded-lg bg-white/60">
                                <span className="text-sm font-medium text-gray-600">Visa Allocation (2)</span>
                                <span className="font-bold text-gray-800">5,000 AED</span>
                            </div>
                            <div className="flex justify-between items-center p-3 rounded-lg bg-blue-100/50 border border-blue-200">
                                <span className="text-sm font-bold text-blue-800">Est. Total</span>
                                <span className="font-bold text-blue-800">17,000 AED</span>
                            </div>
                        </div>

                        <p className="text-xs text-gray-500 leading-relaxed">
                            *Prices are indicative and subject to final activity selection and government fees.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function BusinessSetupDetailsPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <BusinessSetupDetailsContent />
        </Suspense>
    );
}
