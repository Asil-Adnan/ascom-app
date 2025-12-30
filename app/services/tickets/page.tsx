'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { NeoCard } from '@/components/ui/NeoCard';
import { NeoButton } from '@/components/ui/NeoButton';
import { NeoInput } from '@/components/ui/NeoInput';
import { ArrowLeft, Plane, Bus, Train, Calendar, MapPin, Users, Ticket } from 'lucide-react';

export default function TicketsPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        type: 'Flight',
        from: 'Dubai',
        to: '',
        date: '',
        passengers: '1'
    });

    const handleNext = (e: React.FormEvent) => {
        e.preventDefault();
        router.push(`/services/tickets/details?type=${formData.type}`);
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
                    <h1 className="text-3xl font-extrabold text-foreground">Global Tickets</h1>
                    <p className="text-gray-500 font-medium">Book Flights, Buses, and Trains worldwide.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Main Form (7 Cols) */}
                <div className="lg:col-span-7">
                    <NeoCard className="p-10">
                        <form onSubmit={handleNext} className="space-y-8">

                            {/* Transport Type Selector */}
                            <div className="flex p-2 bg-gray-200/50 rounded-2xl mb-8">
                                {['Flight', 'Bus', 'Train'].map((t) => (
                                    <button
                                        key={t}
                                        type="button"
                                        onClick={() => setFormData({ ...formData, type: t })}
                                        className={`flex-1 py-4 rounded-xl flex items-center justify-center gap-2 font-bold transition-all duration-300
                                ${formData.type === t
                                                ? 'bg-[#e0e5ec] neo-btn text-red-600 shadow-md'
                                                : 'text-gray-500 hover:text-gray-700'}
                            `}
                                    >
                                        {t === 'Flight' && <Plane size={20} strokeWidth={2.5} />}
                                        {t === 'Bus' && <Bus size={20} strokeWidth={2.5} />}
                                        {t === 'Train' && <Train size={20} strokeWidth={2.5} />}
                                        {t}
                                    </button>
                                ))}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-3">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">From</label>
                                    <div className="relative group">
                                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-red-500 transition-colors" size={20} />
                                        <NeoInput
                                            value={formData.from}
                                            onChange={(e) => setFormData({ ...formData, from: e.target.value })}
                                            className="pl-12 h-14 font-bold text-gray-700"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">To</label>
                                    <div className="relative group">
                                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-red-500 transition-colors" size={20} />
                                        <NeoInput
                                            placeholder="City or Airport"
                                            value={formData.to}
                                            onChange={(e) => setFormData({ ...formData, to: e.target.value })}
                                            className="pl-12 h-14 font-bold text-gray-700"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-3">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Date</label>
                                    <div className="relative group">
                                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-red-500 transition-colors" size={20} />
                                        <NeoInput
                                            type="date"
                                            value={formData.date}
                                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                            className="pl-12 h-14 font-bold text-gray-700"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Passengers</label>
                                    <div className="relative group">
                                        <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-red-500 transition-colors" size={20} />
                                        <NeoInput
                                            type="number"
                                            min="1"
                                            value={formData.passengers}
                                            onChange={(e) => setFormData({ ...formData, passengers: e.target.value })}
                                            className="pl-12 h-14 font-bold text-gray-700"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4">
                                <NeoButton type="submit" size="lg" className="w-full h-16 text-lg font-bold tracking-wide text-red-600 hover:text-white hover:bg-red-500 transition-colors">
                                    Proceed to Seat Selection
                                </NeoButton>
                            </div>
                        </form>
                    </NeoCard>
                </div>

                {/* Right Visual (5 Cols) */}
                <div className="lg:col-span-5 space-y-6">
                    <div className="neo-raised p-8 h-full min-h-[400px] flex flex-col items-center justify-center text-center relative overflow-hidden group">
                        {/* Ticket Stub Visual */}
                        <div className="relative w-64 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transform group-hover:-rotate-3 transition-transform duration-500">
                            <div className="h-4 bg-red-500 w-full"></div>
                            <div className="p-6 space-y-4">
                                <div className="flex justify-between items-center text-gray-400 text-xs uppercase font-bold">
                                    <span>DXB</span>
                                    <Plane size={16} className="text-red-500" />
                                    <span>LHR</span>
                                </div>
                                <div className="h-px bg-dashed bg-gray-200"></div>
                                <div className="flex justify-between">
                                    <div className="text-left">
                                        <p className="text-[10px] text-gray-400 uppercase">Passenger</p>
                                        <p className="font-bold text-sm">Guest User</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[10px] text-gray-400 uppercase">Seat</p>
                                        <p className="font-bold text-sm">12A</p>
                                    </div>
                                </div>
                                <div className="h-16 bg-gray-100 rounded-md flex items-center justify-center">
                                    {/* Barcode Mock */}
                                    <div className="flex gap-1 h-8 opacity-50">
                                        {[...Array(20)].map((_, i) => (
                                            <div key={i} className={`w-1 bg-black ${i % 3 === 0 ? 'h-full' : 'h-3/4'}`}></div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            {/* Cutouts */}
                            <div className="absolute top-1/2 -left-3 w-6 h-6 bg-[#e0e5ec] rounded-full shadow-inner"></div>
                            <div className="absolute top-1/2 -right-3 w-6 h-6 bg-[#e0e5ec] rounded-full shadow-inner"></div>
                        </div>

                        <div className="mt-8">
                            <h3 className="text-xl font-bold text-gray-700">Best Price Guarantee</h3>
                            <p className="text-gray-500 text-sm mt-2 max-w-xs mx-auto">
                                We scan 500+ airlines and transport providers to find you the lowest fares instantly.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
