'use client';

import Link from 'next/link';
import { NeoCard } from '@/components/ui/NeoCard';
import { NeoButton } from '@/components/ui/NeoButton';
import { ArrowLeft, Clock, Users, ShieldCheck, Bus, MapPin, Wifi, Coffee } from 'lucide-react';

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

export default function BusResultsPage() {
    return (
        <div className="w-full max-w-6xl mx-auto py-12 animate-in fade-in zoom-in duration-300">

            {/* Header */}
            <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-4">
                    <Link href="/services/bus-visa">
                        <button className="w-12 h-12 rounded-xl neo-btn flex items-center justify-center text-gray-500 hover:text-red-500 transition-colors">
                            <ArrowLeft size={22} strokeWidth={2.5} />
                        </button>
                    </Link>
                    <div>
                        <h1 className="text-3xl font-extrabold text-foreground">Available Buses</h1>
                        <p className="text-gray-500 font-medium">Dubai to Oman • {MOCK_BUSES.length} Options Found</p>
                    </div>
                </div>

                {/* Filters (Visual Only) */}
                <div className="flex gap-4">
                    <button className="neo-btn px-6 py-3 font-bold text-gray-500 text-sm hover:text-red-500">Filter by Price</button>
                    <button className="neo-btn px-6 py-3 font-bold text-gray-500 text-sm hover:text-red-500">Earliest Departure</button>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {MOCK_BUSES.map((bus) => (
                    <Link key={bus.id} href={`/services/bus-visa/${bus.id}`}>
                        <NeoCard className="p-8 group hover:-translate-y-1 transition-transform cursor-pointer border-l-4 border-transparent hover:border-red-500">
                            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">

                                {/* Left: Operator & Type */}
                                <div className="flex items-center gap-6 w-full lg:w-1/3">
                                    <div className="w-16 h-16 rounded-full neo-inset flex items-center justify-center text-gray-400 group-hover:text-red-500 transition-colors">
                                        <Bus size={32} strokeWidth={1.5} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-700">{bus.operator}</h3>
                                        <div className="flex items-center gap-2 mt-2">
                                            <span className="text-xs font-bold text-white bg-gray-400 px-2 py-1 rounded-md">{bus.type}</span>
                                            <span className="flx items-center gap-1 text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded-md flex">
                                                <ShieldCheck size={12} className="mr-1" /> {bus.badge}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Middle: Timing Line */}
                                <div className="flex items-center justify-center gap-6 w-full lg:w-1/3">
                                    <div className="text-center">
                                        <p className="text-xl font-bold text-gray-700">{bus.departs}</p>
                                        <p className="text-xs font-bold text-gray-400 uppercase">Dubai</p>
                                    </div>

                                    <div className="flex-1 flex flex-col items-center px-4">
                                        <p className="text-xs font-bold text-gray-400 mb-1">5h 00m</p>
                                        <div className="w-full h-1 bg-gray-200 rounded-full relative">
                                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-gray-400 rounded-full border-2 border-white group-hover:bg-red-500 transition-colors"></div>
                                        </div>
                                    </div>

                                    <div className="text-center">
                                        <p className="text-xl font-bold text-gray-700">{bus.arrives}</p>
                                        <p className="text-xs font-bold text-gray-400 uppercase">Oman</p>
                                    </div>
                                </div>

                                {/* Right: Price & Action */}
                                <div className="flex items-center justify-end gap-8 w-full lg:w-1/3">
                                    <div className="text-right">
                                        <p className="text-3xl font-extrabold text-red-500">AED {bus.price}</p>
                                        <p className="text-xs font-bold text-gray-400 uppercase">Per Passenger</p>
                                    </div>
                                    <NeoButton className="h-14 px-8 font-bold text-lg group-hover:text-white group-hover:bg-red-500 transition-colors">
                                        Select
                                    </NeoButton>
                                </div>

                            </div>

                            {/* Footer Stats */}
                            <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between text-gray-500 text-sm font-medium">
                                <div className="flex items-center gap-6">
                                    <span className="flex items-center gap-2"><Users size={16} /> {bus.seats} seats remaining</span>
                                    <span className="flex items-center gap-2"><Wifi size={16} /> Free Wi-Fi</span>
                                    <span className="flex items-center gap-2"><Coffee size={16} /> Snacks Included</span>
                                </div>
                                <span className="text-red-500 font-bold group-hover:underline">View Details &rarr;</span>
                            </div>
                        </NeoCard>
                    </Link>
                ))}
            </div>
        </div>
    );
}
