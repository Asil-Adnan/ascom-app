'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { NeoCard } from '@/components/ui/NeoCard';
import { NeoButton } from '@/components/ui/NeoButton';
import { ArrowLeft, Award, Globe, Stamp, GraduationCap, Baby, Briefcase } from 'lucide-react';

export default function AttestationServicePage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        type: '',
        origin: '',
        destination: 'UAE'
    });

    const handleContinue = (e: React.FormEvent) => {
        e.preventDefault();
        router.push(`/services/attestation/submit?type=${formData.type}`);
    };

    const getIconForType = () => {
        switch (formData.type) {
            case 'Degree': return <GraduationCap size={40} />;
            case 'Birth': return <Baby size={40} />;
            case 'Commercial': return <Briefcase size={40} />;
            default: return <Award size={40} />;
        }
    };

    return (
        <div className="w-full max-w-6xl mx-auto py-12 animate-in fade-in zoom-in duration-300">

            {/* Header */}
            <div className="flex items-center gap-4 mb-12">
                <Link href="/dashboard">
                    <button className="w-12 h-12 rounded-xl neo-btn flex items-center justify-center text-gray-500 hover:text-red-500 transition-colors">
                        <ArrowLeft size={22} strokeWidth={2.5} />
                    </button>
                </Link>
                <div>
                    <h1 className="text-3xl font-extrabold text-foreground">Document Attestation</h1>
                    <p className="text-gray-500 font-medium">Certified attestation services for all your official documents.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Main Form (7 Cols) */}
                <div className="lg:col-span-7">
                    <NeoCard className="p-10">
                        <form onSubmit={handleContinue} className="space-y-8">

                            <div className="space-y-4">
                                <label className="text-sm font-bold text-gray-400 uppercase tracking-wider ml-1">Document Type</label>
                                <div className="grid grid-cols-2 gap-4">
                                    {['Degree', 'Marriage', 'Birth', 'Commercial'].map((type) => (
                                        <button
                                            key={type}
                                            type="button"
                                            onClick={() => setFormData({ ...formData, type })}
                                            className={`h-16 rounded-xl font-bold flex items-center justify-center gap-3 transition-all
                                   ${formData.type === type ? 'neo-inset text-red-600 border border-red-100' : 'neo-btn text-gray-500 hover:text-red-500'}
                                `}
                                        >
                                            {type}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-4">
                                <label className="text-sm font-bold text-gray-400 uppercase tracking-wider ml-1">Issued In (Origin)</label>
                                <div className="relative group">
                                    <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-red-500 transition-colors" size={22} />
                                    <select
                                        className="w-full h-16 rounded-xl bg-background px-4 pl-12 text-lg font-bold neo-inset text-gray-700 appearance-none outline-none focus:ring-2 focus:ring-primary/50 cursor-pointer"
                                        value={formData.origin}
                                        onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                                        required
                                    >
                                        <option value="" disabled>Select Country</option>
                                        <option value="UK">United Kingdom</option>
                                        <option value="USA">United States</option>
                                        <option value="India">India</option>
                                        <option value="Pakistan">Pakistan</option>
                                        <option value="Philippines">Philippines</option>
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <label className="text-sm font-bold text-gray-400 uppercase tracking-wider ml-1">Attestation For</label>
                                <div className="relative">
                                    <Stamp className="absolute left-4 top-1/2 -translate-y-1/2 text-red-500" size={22} />
                                    <div className="w-full h-16 rounded-xl bg-gray-100/50 px-4 pl-12 flex items-center text-lg font-bold text-gray-400 border border-transparent">
                                        United Arab Emirates
                                    </div>
                                </div>
                            </div>

                            <NeoButton type="submit" size="lg" className="w-full h-16 text-lg font-bold tracking-wide text-red-600 hover:text-white hover:bg-red-500 transition-colors mt-6">
                                Proceed to Upload
                            </NeoButton>
                        </form>
                    </NeoCard>
                </div>

                {/* Right Side: Document Preview (5 Cols) */}
                <div className="lg:col-span-5 flex flex-col gap-6">
                    <div className="neo-raised p-8 flex items-center gap-6">
                        <div className="w-16 h-16 rounded-full neo-inset flex items-center justify-center text-red-500">
                            {getIconForType()}
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-foreground">
                                {formData.type ? `${formData.type} Certificate` : 'Select Document'}
                            </h3>
                            <p className="text-sm text-gray-500">
                                {formData.origin ? `From ${formData.origin} to UAE` : 'Standard Attestation Process'}
                            </p>
                        </div>
                    </div>

                    <div className="neo-raised p-8 flex-1 flex flex-col items-center justify-center text-center space-y-6 min-h-[300px]">
                        <div className="w-32 h-40 bg-white shadow-sm border border-gray-100 flex flex-col items-center justify-center p-4 relative rotate-3 transition-transform hover:rotate-0 duration-500">
                            <div className="w-full h-2 bg-gray-200 mb-2"></div>
                            <div className="w-3/4 h-2 bg-gray-200 mb-2"></div>
                            <div className="w-full h-2 bg-gray-200 mb-2"></div>
                            <div className="w-1/2 h-2 bg-gray-200 mb-8"></div>
                            {/* Stamp */}
                            <div className="w-16 h-16 rounded-full border-4 border-red-500/30 flex items-center justify-center -rotate-12">
                                <span className="text-[10px] font-bold text-red-500 uppercase">Verified</span>
                            </div>
                        </div>
                        <p className="text-sm font-medium text-gray-400 max-w-xs">
                            We handle the complete attestation cycle from origin ministry to UAE MOFA.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
