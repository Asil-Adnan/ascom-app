'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { NeoCard } from '@/components/ui/NeoCard';
import { NeoButton } from '@/components/ui/NeoButton';
import { NeoInput } from '@/components/ui/NeoInput';
import { ArrowLeft, MapPin, Calendar, Users, BusFront } from 'lucide-react';
import Link from 'next/link';

export default function BusSearchPage() {
    const router = useRouter();
    const [searchParams, setSearchParams] = useState({
        from: 'Dubai',
        to: 'Oman',
        date: '',
        passengers: 1
    });

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.push('/services/bus-visa/results');
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
                    <h1 className="text-3xl font-extrabold text-foreground">Bus Visa Change</h1>
                    <p className="text-gray-500 font-medium">Book your visa change trip seamlessly.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Main Form Area (Wide 7 cols) */}
                <div className="lg:col-span-7">
                    <NeoCard className="p-10">
                        <h2 className="text-xl font-bold text-gray-700 mb-8 flex items-center gap-3">
                            <span className="w-10 h-10 rounded-full neo-inset flex items-center justify-center text-red-500"><BusFront size={20} /></span>
                            Find Your Bus
                        </h2>

                        <form onSubmit={handleSearch} className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <label className="text-sm font-bold text-gray-400 uppercase tracking-wider ml-1">From</label>
                                    <div className="relative group">
                                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-red-500 transition-colors" size={20} />
                                        <NeoInput
                                            value={searchParams.from}
                                            readOnly
                                            className="pl-12 h-14 font-bold text-gray-700"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <label className="text-sm font-bold text-gray-400 uppercase tracking-wider ml-1">Destination</label>
                                    <div className="relative group">
                                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-red-500 transition-colors" size={20} />
                                        <NeoInput
                                            value={searchParams.to}
                                            readOnly
                                            className="pl-12 h-14 font-bold text-gray-700"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <label className="text-sm font-bold text-gray-400 uppercase tracking-wider ml-1">Travel Date</label>
                                    <div className="relative group">
                                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-red-500 transition-colors" size={20} />
                                        <NeoInput
                                            type="date"
                                            required
                                            className="pl-12 h-14 font-medium text-gray-700"
                                            value={searchParams.date}
                                            onChange={(e) => setSearchParams({ ...searchParams, date: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <label className="text-sm font-bold text-gray-400 uppercase tracking-wider ml-1">Passengers</label>
                                    <div className="relative group">
                                        <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-red-500 transition-colors" size={20} />
                                        <NeoInput
                                            type="number"
                                            min={1}
                                            max={10}
                                            className="pl-12 h-14 font-bold text-gray-700"
                                            value={searchParams.passengers}
                                            onChange={(e) => setSearchParams({ ...searchParams, passengers: parseInt(e.target.value) })}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4">
                                <NeoButton type="submit" size="lg" className="w-full h-16 text-lg font-bold tracking-wide text-red-600 hover:text-white hover:bg-red-500 transition-colors">
                                    Search Available Buses
                                </NeoButton>
                            </div>
                        </form>
                    </NeoCard>
                </div>

                {/* Right Side: Info / Stats (Wide 5 cols) */}
                <div className="lg:col-span-5 space-y-8">
                    <div className="neo-raised p-8 text-center space-y-4">
                        <div className="w-20 h-20 mx-auto rounded-full neo-inset flex items-center justify-center text-red-500 mb-4">
                            <BusFront size={40} strokeWidth={1.5} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-700">Daily Trips to Oman</h3>
                        <p className="text-gray-500">
                            Comfortable, air-conditioned buses ensuring a smooth visa change journey.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div className="neo-raised p-6 text-center">
                            <p className="text-3xl font-extrabold text-red-500 mb-1">AED 85</p>
                            <p className="text-xs font-bold text-gray-400 uppercase">Starting Price</p>
                        </div>
                        <div className="neo-raised p-6 text-center">
                            <p className="text-3xl font-extrabold text-red-500 mb-1">4.8/5</p>
                            <p className="text-xs font-bold text-gray-400 uppercase">User Rating</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
