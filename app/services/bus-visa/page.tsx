'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { NeoCard } from '@/components/ui/NeoCard';
import { NeoButton } from '@/components/ui/NeoButton';
import { NeoInput } from '@/components/ui/NeoInput';
import { Users, BusFront, Bus } from 'lucide-react';
import Link from 'next/link';

import { HorizontalDatePicker } from '@/components/ui/HorizontalDatePicker';
import { GlassSidebar } from '@/components/layout/GlassSidebar';

const MOCK_BUSES = [
    {
        id: 1,
        operator: 'Al Khan Transport',
        departs: '08:00 AM',
        arrives: '01:00 PM',
        price: 350,
        seats: 5,
        type: 'Luxury AC',
        badge: 'Visa Change Eligible'
    },
    {
        id: 2,
        operator: 'Oman Express',
        departs: '09:30 AM',
        arrives: '02:30 PM',
        price: 320,
        seats: 12,
        type: 'Standard',
        badge: 'Visa Change Eligible'
    },
    {
        id: 3,
        operator: 'Royal Travel',
        departs: '11:00 AM',
        arrives: '04:00 PM',
        price: 400,
        seats: 2,
        type: 'VIP',
        badge: 'Fast Track'
    },
    {
        id: 4,
        operator: 'Gulf Transport',
        departs: '02:00 PM',
        arrives: '07:00 PM',
        price: 300,
        seats: 20,
        type: 'Standard',
        badge: 'Visa Change Eligible'
    },
];

export default function BusSearchPage() {
    const router = useRouter();
    const [searchParams, setSearchParams] = useState({
        date: '',
        passengers: 1
    });

    return (
        <div className="min-h-screen bg-transparent">

            {/* 1. Floating Glass Sidebar */}
            <GlassSidebar />

            {/* 2. Main Content Wrapper (Offset by Sidebar Width) */}
            <div className="pl-[320px] pr-8 pt-8 pb-12 flex gap-8 max-w-[1600px] mx-auto">

                {/* CENTER: Main Content (Date Picker + Bus List) */}
                <div className="flex-1 min-w-0">
                    {/* Horizontal Date Scroller - Top aligned */}
                    <div className="mb-6">
                        <HorizontalDatePicker
                            selectedDate={searchParams.date}
                            onSelect={(d) => setSearchParams(prev => ({ ...prev, date: d }))}
                        />
                    </div>

                    {/* Results List */}
                    <div className="space-y-3 animate-in slide-in-from-bottom-4 duration-500">
                        {!searchParams.date ? (
                            <div className="py-24 text-center opacity-50 bg-white/30 rounded-3xl border border-white/40">
                                <BusFront size={64} className="mx-auto text-gray-300 mb-6" />
                                <p className="text-gray-400 font-bold text-lg">Select a travel date above to view available buses.</p>
                            </div>
                        ) : (
                            MOCK_BUSES.concat(MOCK_BUSES).concat(MOCK_BUSES).slice(0, 9).map((bus, idx) => ( // Show 9 items
                                <Link key={`${bus.id}-${idx}`} href={`/services/bus-visa/${bus.id}`}>
                                    <NeoCard className="p-4 group hover:-translate-y-0.5 transition-transform cursor-pointer border-l-4 border-transparent hover:border-red-500">
                                        <div className="flex items-center justify-between gap-6">

                                            {/* Operator & Type */}
                                            <div className="flex items-center gap-4 w-[30%]">
                                                <div className="w-10 h-10 rounded-full neo-inset flex items-center justify-center text-gray-400 group-hover:text-red-500 transition-colors shrink-0">
                                                    <Bus size={20} strokeWidth={1.5} />
                                                </div>
                                                <div className="min-w-0">
                                                    <h3 className="font-bold text-gray-700 text-sm truncate">{bus.operator}</h3>
                                                    <span className="text-[10px] font-bold text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded-sm">{bus.type}</span>
                                                </div>
                                            </div>

                                            {/* Timing */}
                                            <div className="flex items-center justify-center gap-3 w-[40%]">
                                                <div className="text-center">
                                                    <p className="font-bold text-gray-700 text-sm">{bus.departs}</p>
                                                    <p className="text-[9px] font-bold text-gray-400 uppercase">DXB</p>
                                                </div>
                                                <div className="flex-1 h-0.5 bg-gray-200 rounded-full relative mx-2 max-w-[60px]">
                                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-gray-400 rounded-full group-hover:bg-red-500 transition-colors"></div>
                                                </div>
                                                <div className="text-center">
                                                    <p className="font-bold text-gray-700 text-sm">{bus.arrives}</p>
                                                    <p className="text-[9px] font-bold text-gray-400 uppercase">OMN</p>
                                                </div>
                                            </div>

                                            {/* Price & Action */}
                                            <div className="flex items-center justify-end gap-6 w-[30%]">
                                                <div className="text-right">
                                                    <p className="text-lg font-extrabold text-red-500">AED {bus.price}</p>
                                                </div>
                                                <NeoButton className="h-8 px-5 font-bold text-xs group-hover:text-white group-hover:bg-red-500 transition-colors">
                                                    Select
                                                </NeoButton>
                                            </div>
                                        </div>
                                    </NeoCard>
                                </Link>
                            ))
                        )}
                    </div>
                </div>

                {/* RIGHT SIDEBAR: Stats & Config */}
                <div className="w-72 shrink-0 space-y-6 sticky top-8 h-fit">
                    {/* Passenger Count */}
                    <NeoCard className="p-5">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-bold text-gray-700 text-sm">Passengers</h3>
                            <Users size={18} className="text-gray-400" />
                        </div>
                        <NeoInput
                            type="number"
                            min={1}
                            max={10}
                            className="h-12 font-bold text-gray-700 text-center text-lg shadow-inner"
                            value={searchParams.passengers}
                            onChange={(e) => setSearchParams({ ...searchParams, passengers: parseInt(e.target.value) })}
                        />
                    </NeoCard>

                    <div className="neo-raised p-6 text-center space-y-4">
                        <div className="w-16 h-16 mx-auto rounded-full neo-inset flex items-center justify-center text-red-500 mb-4">
                            <BusFront size={32} strokeWidth={1.5} />
                        </div>
                        <h3 className="text-sm font-bold text-gray-700">Daily Trips</h3>
                        <p className="text-xs text-gray-500 leading-relaxed px-2">
                            Comfortable, air-conditioned buses ensuring a smooth journey every day.
                        </p>
                        <div className="pt-4 border-t border-gray-100 flex justify-between items-center text-xs px-2">
                            <div className="text-center">
                                <span className="font-extrabold text-red-500 block text-lg">85</span>
                                <span className="text-gray-400 uppercase text-[9px] font-bold">AED Start</span>
                            </div>
                            <div className="text-center">
                                <span className="font-extrabold text-red-500 block text-lg">4.8</span>
                                <span className="text-gray-400 uppercase text-[9px] font-bold">Rating</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
