'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { NeoCard } from '@/components/ui/NeoCard';
import { NeoButton } from '@/components/ui/NeoButton';
import { NeoInput } from '@/components/ui/NeoInput';
import { NeoIcon } from '@/components/ui/NeoIcon';
import { ArrowLeft, User, ShieldCheck, Upload, Plane, CheckCircle, Info } from 'lucide-react';

export default function A2ADetailsPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        passport: '',
        expiry: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.push('/dashboard');
    };

    return (
        <div className="w-full max-w-6xl mx-auto py-12 animate-in fade-in zoom-in duration-300">

            {/* Header */}
            <div className="flex items-center gap-4 mb-12">
                <Link href="/services/a2a">
                    <button className="w-12 h-12 rounded-xl neo-btn flex items-center justify-center text-gray-500 hover:text-red-500 transition-colors">
                        <ArrowLeft size={22} strokeWidth={2.5} />
                    </button>
                </Link>
                <div>
                    <h1 className="text-3xl font-extrabold text-foreground">Passenger Details</h1>
                    <p className="text-gray-500 font-medium">Enter travel document information.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Main Form (7 Cols) */}
                <div className="lg:col-span-7">
                    <form onSubmit={handleSubmit} className="space-y-8">
                        <NeoCard className="p-10">
                            <div className="flex items-center gap-4 mb-8">
                                <NeoIcon icon={User} size={28} variant="inset" className="text-blue-500" />
                                <h3 className="text-xl font-bold text-gray-700">Passenger Information</h3>
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-4">
                                    <label className="text-sm font-bold text-gray-400 uppercase tracking-wider ml-1">Full Name</label>
                                    <div className="relative group">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={20} />
                                        <NeoInput
                                            placeholder="Name as per Passport"
                                            value={formData.name}
                                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                                            required
                                            className="pl-12 h-14 font-bold"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <label className="text-sm font-bold text-gray-400 uppercase tracking-wider ml-1">Passport Number</label>
                                    <NeoInput
                                        placeholder="e.g. N12345678"
                                        value={formData.passport}
                                        onChange={e => setFormData({ ...formData, passport: e.target.value })}
                                        required
                                        className="h-14 font-bold"
                                    />
                                </div>

                                <div className="space-y-4">
                                    <label className="text-sm font-bold text-gray-400 uppercase tracking-wider ml-1">Passport Expiry</label>
                                    <div className="relative group">
                                        <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={20} />
                                        <NeoInput
                                            type="date"
                                            value={formData.expiry}
                                            onChange={e => setFormData({ ...formData, expiry: e.target.value })}
                                            required
                                            className="pl-12 h-14 font-bold"
                                        />
                                    </div>
                                    <p className="text-xs font-bold text-orange-500 ml-2 mt-1 flex items-center gap-1">
                                        <Info size={12} /> Must be valid for at least 6 months
                                    </p>
                                </div>
                            </div>
                        </NeoCard>

                        <NeoCard className="p-8">
                            <div className="flex items-center gap-4 mb-6">
                                <NeoIcon icon={Upload} size={28} variant="inset" className="text-purple-500" />
                                <h3 className="text-xl font-bold text-gray-700">Required Documents</h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {['Passport Front Page', 'Passport Back Page', 'Photo (White BG)', 'Current Visa (Optional)'].map((doc, i) => (
                                    <div key={i} className="p-4 rounded-xl border-2 border-dashed border-gray-200 hover:border-purple-500/50 hover:bg-purple-50/10 cursor-pointer transition-all flex flex-col items-center justify-center text-center gap-2 group">
                                        <Upload size={24} className="text-gray-300 group-hover:text-purple-500 transition-colors" />
                                        <span className="text-xs font-bold text-gray-600">{doc}</span>
                                    </div>
                                ))}
                            </div>
                        </NeoCard>

                        <NeoButton type="submit" size="lg" className="w-full h-16 text-lg font-bold tracking-wide">
                            Submit A2A Request
                        </NeoButton>
                    </form>
                </div>

                {/* Right Side: Info (5 Cols) */}
                <div className="lg:col-span-5 space-y-6">
                    <div className="neo-raised p-8 h-full bg-blue-50/30 border border-blue-50/50">
                        <div className="flex items-center justify-center mb-8">
                            <NeoIcon icon={Plane} size={48} variant="raised" className="text-blue-500" />
                        </div>

                        <h3 className="text-xl font-bold text-gray-800 text-center mb-8">What is A2A?</h3>
                        <div className="space-y-6">
                            <p className="text-sm text-gray-600 leading-relaxed text-center px-4">
                                "Airport to Airport" visa change allows you to extend your stay by flying out and returning same-day. It's the fastest way to renew your tourist visa.
                            </p>

                            <div className="space-y-4 mt-8">
                                {[
                                    'Same Day Processing',
                                    'Ticket Included',
                                    'No Exit Stamp Needed',
                                    '99.9% Approval Rate'
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/60">
                                        <CheckCircle size={18} className="text-green-500 flex-shrink-0" />
                                        <span className="font-bold text-gray-700 text-sm">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
