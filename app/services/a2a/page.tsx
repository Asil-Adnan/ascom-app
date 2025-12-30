'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { NeoCard } from '@/components/ui/NeoCard';
import { NeoButton } from '@/components/ui/NeoButton';
import { NeoInput } from '@/components/ui/NeoInput';
import { ArrowLeft, Plane, Repeat, Calendar, ArrowRight, Map } from 'lucide-react';

export default function A2APage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        type: 'Round Trip',
        origin: 'Dubai (DXB)',
        dest: '',
        depart: '',
        return: ''
    });

    const handleNext = (e: React.FormEvent) => {
        e.preventDefault();
        router.push('/services/a2a/details');
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
                    <h1 className="text-3xl font-extrabold text-foreground">A2A Flight Booking</h1>
                    <p className="text-gray-500 font-medium">Airport-to-Airport Visa Change Flights</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Main Form (8 Cols) */}
                <div className="lg:col-span-8">
                    <NeoCard className="p-10">
                        <form onSubmit={handleNext} className="space-y-8">

                            {/* Trip Type Toggle */}
                            <div className="flex p-2 bg-gray-200/50 rounded-2xl">
                                {['Round Trip', 'Multi-City'].map((t) => (
                                    <button
                                        key={t}
                                        type="button"
                                        onClick={() => setFormData({ ...formData, type: t })}
                                        className={`flex-1 py-4 rounded-xl flex items-center justify-center gap-3 font-bold transition-all duration-300
                                ${formData.type === t
                                                ? 'bg-[#e0e5ec] neo-btn text-red-600 shadow-md'
                                                : 'text-gray-500 hover:text-gray-700'}
                            `}
                                    >
                                        {t === 'Round Trip' ? <Repeat size={20} strokeWidth={2.5} /> : <Plane size={20} strokeWidth={2.5} />}
                                        {t}
                                    </button>
                                ))}
                            </div>

                            {/* Route Inputs (Visual Connection) */}
                            <div className="relative pl-8 border-l-2 border-dashed border-gray-300 space-y-8">
                                <div className="relative">
                                    <div className="absolute -left-[41px] top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-red-500 border-4 border-[#e0e5ec] shadow-md z-10"></div>
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">From</label>
                                    <NeoInput
                                        value={formData.origin}
                                        readOnly
                                        className="h-14 font-bold text-gray-700"
                                    />
                                </div>

                                <div className="relative">
                                    <div className="absolute -left-[41px] top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white border-4 border-red-500 shadow-md z-10"></div>
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">To</label>
                                    <NeoInput
                                        placeholder="e.g. Muscat (MCT)"
                                        value={formData.dest}
                                        onChange={(e) => setFormData({ ...formData, dest: e.target.value })}
                                        required
                                        className="h-14 font-bold text-gray-700"
                                    />
                                </div>
                            </div>

                            {/* Dates */}
                            <div className="grid grid-cols-2 gap-8 pt-4">
                                <div className="space-y-3">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Departure</label>
                                    <div className="relative group">
                                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-red-500 transition-colors" size={20} />
                                        <NeoInput
                                            type="date"
                                            value={formData.depart}
                                            onChange={(e) => setFormData({ ...formData, depart: e.target.value })}
                                            required
                                            className="pl-12 h-14 font-bold text-gray-700"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Return</label>
                                    <div className="relative group">
                                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-red-500 transition-colors" size={20} />
                                        <NeoInput
                                            type="date"
                                            value={formData.return}
                                            onChange={(e) => setFormData({ ...formData, return: e.target.value })}
                                            required={formData.type === 'Round Trip'}
                                            className="pl-12 h-14 font-bold text-gray-700"
                                        />
                                    </div>
                                </div>
                            </div>

                            <NeoButton type="submit" size="lg" className="w-full h-16 text-lg font-bold tracking-wide text-red-600 hover:text-white hover:bg-red-500 transition-colors mt-8">
                                Search Flights
                            </NeoButton>
                        </form>
                    </NeoCard>
                </div>

                {/* Right Visual (4 Cols) */}
                <div className="lg:col-span-4 space-y-8">
                    <div className="neo-raised p-8 flex flex-col items-center justify-center text-center h-full min-h-[400px] relative overflow-hidden">
                        <div className="absolute inset-0 opacity-10 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg')] bg-cover bg-center"></div>
                        <div className="relative z-10 w-32 h-32 rounded-full neo-inset flex items-center justify-center text-red-500 mb-6">
                            <Plane size={64} strokeWidth={1} className="drop-shadow-sm" />
                        </div>
                        <h3 className="text-2xl font-extrabold text-gray-700 mb-2">Fly Anywhere</h3>
                        <p className="text-gray-500 font-medium px-4">
                            Best rates for visa change flights to Muscat, Bahrain, Kuwait, and more.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
