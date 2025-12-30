'use client';

import { useState, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { NeoCard } from '@/components/ui/NeoCard';
import { NeoButton } from '@/components/ui/NeoButton';
import { NeoInput } from '@/components/ui/NeoInput';
import { NeoIcon } from '@/components/ui/NeoIcon';
import { ArrowLeft, Globe, Map, Calendar, Search } from 'lucide-react';

function WorldwideDetailsContent() {
    const router = useRouter();

    const [destination, setDestination] = useState('');
    const [nationality, setNationality] = useState('');
    const [travelDate, setTravelDate] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.push('/services/worldwide-visa/documents');
    };

    return (
        <div className="w-full max-w-6xl mx-auto py-12 animate-in fade-in zoom-in duration-300">

            {/* Header */}
            <div className="flex items-center gap-4 mb-12">
                <Link href="/services/worldwide-visa">
                    <button className="w-12 h-12 rounded-xl neo-btn flex items-center justify-center text-gray-500 hover:text-red-600 transition-colors">
                        <ArrowLeft size={22} strokeWidth={2.5} />
                    </button>
                </Link>
                <div>
                    <h1 className="text-3xl font-extrabold text-foreground">Visa Search</h1>
                    <p className="text-gray-500 font-medium">Find visa requirements for any country.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Main Form (7 Cols) */}
                <div className="lg:col-span-7 space-y-8">
                    <form onSubmit={handleSubmit} className="space-y-8">
                        <NeoCard className="p-10">
                            <div className="flex items-center gap-4 mb-8">
                                <NeoIcon icon={Globe} size={28} variant="inset" className="text-red-600" />
                                <h3 className="text-xl font-bold text-gray-700">Trip Info</h3>
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-4">
                                    <label className="text-sm font-bold text-gray-400 uppercase tracking-wider ml-1">I want to travel to...</label>
                                    <div className="relative group">
                                        <Map className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-500 transition-colors" size={20} />
                                        <NeoInput
                                            placeholder="e.g. United Kingdom"
                                            value={destination}
                                            onChange={e => setDestination(e.target.value)}
                                            className="h-16 pl-12 text-lg font-bold"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <label className="text-sm font-bold text-gray-400 uppercase tracking-wider ml-1">I hold a passport from...</label>
                                    <NeoInput
                                        placeholder="e.g. India"
                                        value={nationality}
                                        onChange={e => setNationality(e.target.value)}
                                        className="h-14 font-bold"
                                    />
                                </div>

                                <div className="space-y-4">
                                    <label className="text-sm font-bold text-gray-400 uppercase tracking-wider ml-1">Planned Travel Date</label>
                                    <div className="relative group">
                                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-500 transition-colors" size={20} />
                                        <NeoInput
                                            type="date"
                                            value={travelDate}
                                            onChange={e => setTravelDate(e.target.value)}
                                            className="h-14 pl-12 font-bold text-gray-700"
                                        />
                                    </div>
                                </div>
                            </div>
                        </NeoCard>

                        <NeoButton size="lg" className="w-full h-16 text-lg font-bold tracking-wide bg-green-600 hover:bg-green-500 text-white shadow-xl shadow-green-500/20">
                            Check Requirements
                        </NeoButton>
                    </form>
                </div>

                {/* Right Side: Popular (5 Cols) */}
                <div className="lg:col-span-5 space-y-6">
                    <div className="neo-raised p-8 h-full bg-green-50/20 border border-green-50/50">
                        <div className="flex items-center gap-4 mb-6">
                            <NeoIcon icon={Search} size={28} variant="inset" className="text-red-600" />
                            <h3 className="text-xl font-bold text-gray-700">Trending Visas</h3>
                        </div>

                        <div className="space-y-4">
                            {[
                                { country: 'Schengen', processing: '15 Days', price: '450 AED' },
                                { country: 'USA', processing: '30 Days', price: '650 AED' },
                                { country: 'UK', processing: '20 Days', price: '550 AED' },
                                { country: 'Canada', processing: '45 Days', price: '700 AED' },
                            ].map((visa, idx) => (
                                <div key={idx} className="flex justify-between items-center p-4 rounded-xl bg-white/60 hover:bg-white cursor-pointer transition-colors group">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-red-600 font-bold text-xs group-hover:bg-green-600 group-hover:text-white transition-colors">
                                            {visa.country.substring(0, 2).toUpperCase()}
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-800 text-sm">{visa.country}</p>
                                            <p className="text-[10px] text-gray-500">{visa.processing}</p>
                                        </div>
                                    </div>
                                    <span className="font-bold text-green-700 text-sm">{visa.price}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function WorldwideDetailsPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <WorldwideDetailsContent />
        </Suspense>
    );
}
