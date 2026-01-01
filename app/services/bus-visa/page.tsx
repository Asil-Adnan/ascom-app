'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { NeoCard } from '@/components/ui/NeoCard';
import { NeoButton } from '@/components/ui/NeoButton';
import { NeoInput } from '@/components/ui/NeoInput';
import { Users, BusFront, Bus, Calendar, MapPin, ArrowRight } from 'lucide-react';
import Link from 'next/link';

import { HorizontalDatePicker } from '@/components/ui/HorizontalDatePicker';
import { GlassSidebar } from '@/components/layout/GlassSidebar';
import { GlassCard } from '@/components/ui/GlassCard';

import { getAvailableBuses } from '@/app/actions/bus-management';
import { useEffect } from 'react';

export default function BusSearchPage() {
    const router = useRouter();
    const [searchParams, setSearchParams] = useState(() => {
        // Initialize with local date in YYYY-MM-DD format
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return {
            date: `${year}-${month}-${day}`, // Defaulting to today as typical starting point
            passengers: 1
        };
    });
    const [buses, setBuses] = useState<any[]>([]); // Using any for simplicity in prototype, ideally define BusListing type shared
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchBuses() {
            if (!searchParams.date) return;
            setLoading(true);
            const res = await getAvailableBuses(searchParams.date);
            if (res.success && res.data) {
                setBuses(res.data);
            } else {
                setBuses([]);
            }
            setLoading(false);
        }
        if (searchParams.date && searchParams.date !== 'flexible') {
            fetchBuses();
        }
    }, [searchParams.date]);

    // Fetch buses when date changes
    // (Hook is already defined above, duplicate code removed)

    return (
        <div className="min-h-screen bg-transparent">

            {/* 1. Floating Glass Sidebar */}


            {/* 2. Main Content Wrapper (Full Width for Max Visibility) */}
            <div className="px-4 md:px-6 pt-4 pb-12 w-full max-w-[1920px] mx-auto">

                {/* CENTER: Main Content (Date Picker + Bus List) */}
                <div className="flex-1 min-w-0">
                    {/* Horizontal Date Scroller - Top aligned */}
                    {/* 1. Date Picker Section (Full Width with Padding) */}
                    <div className="w-full mb-8 px-2 md:px-6">
                        <HorizontalDatePicker
                            selectedDate={searchParams.date}
                            onSelect={(d) => {
                                if (d === 'flexible') {
                                    router.push('/services/bus-visa/upload');
                                } else {
                                    setSearchParams(prev => ({ ...prev, date: d }));
                                }
                            }}
                        />
                    </div>

                    {/* 2. Main Content Split: Bus List (Left/Center) + Passenger Count (Right) */}
                    <div className="flex flex-col lg:flex-row gap-8 items-start justify-center">

                        {/* Left/Center: Bus List (Boxed width similar to previous design) */}
                        <div className="flex-1 max-w-5xl min-w-0 animate-in fade-in slide-in-from-bottom-4 duration-700">
                            <GlassCard className="p-4 space-y-6" frosted={true}>

                                {!searchParams.date ? (
                                    <div className="py-24 text-center opacity-50 bg-white/30 rounded-3xl border border-white/40">
                                        <BusFront size={64} className="mx-auto text-gray-300 mb-6" />
                                        <p className="text-gray-400 font-bold text-lg">Select a travel date above to view available buses.</p>
                                    </div>
                                ) : loading ? (
                                    <div className="py-24 text-center text-gray-400">Loading available buses...</div>
                                ) : buses.length === 0 ? (
                                    <div className="text-center py-12 text-gray-400 bg-white/50 rounded-3xl border border-dashed border-gray-200">
                                        <p>No buses available for this date.</p>
                                    </div>
                                ) : (
                                    buses.map((bus) => (
                                        <div key={bus.id} className="group relative bg-white/70 backdrop-blur-md rounded-2xl border border-white/60 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden mb-4">
                                            {/* Marketing Badge - Left Aligned */}
                                            {bus.marketing_badge && (
                                                <div className="absolute top-0 left-0 bg-red-600 text-white text-[10px] font-bold px-3 py-1 rounded-br-xl z-20 shadow-sm">
                                                    {bus.marketing_badge}
                                                </div>
                                            )}

                                            <div className="flex flex-col md:flex-row">
                                                {/* Left: Identity */}
                                                <div className="p-4 md:w-36 flex-shrink-0 flex flex-col justify-center border-b md:border-b-0 md:border-r border-gray-100 bg-gray-50/50 pt-8 md:pt-4">
                                                    <div className="flex items-center gap-3 md:flex-col md:gap-1 md:text-center">
                                                        <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-red-600">
                                                            <Bus size={18} />
                                                        </div>
                                                        <div>
                                                            <h3 className="font-bold text-gray-800 leading-tight text-sm md:text-base">{bus.bus_code}</h3>
                                                            <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider block mt-0.5">{bus.bus_class || 'Standard'}</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Middle: Journey Details */}
                                                <div className="p-4 flex-1 flex flex-col justify-center min-w-0">
                                                    <div className="flex items-start justify-between gap-4 mb-4">
                                                        {/* Pickup */}
                                                        <div className="text-left w-28 md:w-32">
                                                            <div className="text-lg font-bold text-gray-800">{bus.departure_time}</div>
                                                            <div className="text-[11px] font-bold text-black uppercase leading-tight mt-0.5 break-words" title={bus.pickup_point}>{bus.pickup_point}</div>
                                                        </div>

                                                        {/* Route Visual */}
                                                        <div className="flex-1 flex flex-col items-center px-2 mt-2">
                                                            <div className="w-full flex items-center gap-2">
                                                                <div className="h-1.5 w-1.5 rounded-full bg-red-200 flex-shrink-0"></div>
                                                                <div className="h-0.5 flex-1 bg-gradient-to-r from-red-200 to-gray-200"></div>
                                                                <div className="px-1.5 py-0.5 bg-gray-100 rounded text-[9px] font-bold text-gray-500 whitespace-nowrap">Al Ain Border</div>
                                                                <div className="h-0.5 flex-1 bg-gradient-to-r from-gray-200 to-gray-800"></div>
                                                                <div className="h-1.5 w-1.5 rounded-full bg-gray-800 flex-shrink-0"></div>
                                                            </div>
                                                        </div>

                                                        {/* Dropoff */}
                                                        <div className="text-right w-24 md:w-28">
                                                            <div className="text-lg font-bold text-gray-800">{bus.expected_arrival_time}</div>
                                                            <div className="text-[10px] font-medium text-gray-400 uppercase truncate" title={bus.dropoff_location}>{bus.dropoff_location}</div>
                                                        </div>
                                                    </div>

                                                    {/* Inclusions Area */}
                                                    <div className="space-y-2">
                                                        {/* Prominent UAE Visa Display */}
                                                        {bus.uae_visa_included && bus.uae_visa_duration && (
                                                            <div className="flex items-baseline gap-2">
                                                                <span className="text-xl font-black text-gray-900 leading-none tracking-tight">
                                                                    {bus.uae_visa_duration.replace(/_/g, ' ').replace('days', 'DAYS')}
                                                                </span>
                                                                <span className="text-[10px] font-bold text-red-600 uppercase bg-red-50 px-2 py-0.5 rounded border border-red-100">
                                                                    UAE Visa Included
                                                                </span>
                                                            </div>
                                                        )}

                                                        {/* Other Inclusions / Fallback */}
                                                        <div className="flex items-center flex-wrap gap-2">
                                                            {(!bus.oman_visa_included && !bus.uae_visa_included && !bus.food_included && !bus.accommodation_included) ? (
                                                                <div className="px-3 py-1 bg-gray-100 text-gray-600 text-[10px] font-bold uppercase tracking-wider rounded border border-gray-200">
                                                                    Bus Ticket Only
                                                                </div>
                                                            ) : (
                                                                <>
                                                                    {bus.oman_visa_included && (
                                                                        <div className="flex items-center gap-1.5 px-2 py-1 bg-green-50 rounded border border-green-100">
                                                                            <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                                                                            <span className="text-[10px] font-bold text-green-700">Oman Visa</span>
                                                                        </div>
                                                                    )}
                                                                    {bus.food_included && (
                                                                        <div className="flex items-center gap-1.5 px-2 py-1 bg-orange-50 rounded border border-orange-100">
                                                                            <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                                                                            <span className="text-[10px] font-bold text-orange-700">Food</span>
                                                                        </div>
                                                                    )}
                                                                    {bus.accommodation_included && (
                                                                        <div className="flex items-center gap-1.5 px-2 py-1 bg-blue-50 rounded border border-blue-100">
                                                                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                                                                            <span className="text-[10px] font-bold text-blue-700">Stay</span>
                                                                        </div>
                                                                    )}
                                                                </>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Right: Price & Action */}
                                                <div className="p-4 md:w-40 flex-shrink-0 flex flex-row md:flex-col items-center justify-between md:justify-center gap-3 border-t md:border-t-0 md:border-l border-gray-100 bg-gray-50/30">
                                                    <div className="text-right md:text-center">
                                                        <div className="flex items-baseline justify-end md:justify-center gap-1">
                                                            <span className="text-xs font-bold text-red-500">AED</span>
                                                            <span className="text-2xl font-black text-gray-900">{bus.base_price}</span>
                                                        </div>
                                                        <p className="text-[10px] text-gray-400 font-medium whitespace-nowrap">per passenger</p>
                                                    </div>

                                                    <Link href={`/services/bus-visa/upload?busId=${bus.id}`} className="block w-full md:w-auto">
                                                        <button className="w-full md:w-full px-4 py-2.5 bg-gray-900 hover:bg-black text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 group-hover:bg-red-600 group-hover:shadow-red-200/50">
                                                            Select <ArrowRight size={14} />
                                                        </button>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </GlassCard>
                        </div>

                        {/* Right Column: Passenger Count (Sticky) */}
                        <div className="w-full lg:w-72 shrink-0 sticky top-8">
                            <GlassCard className="p-5" frosted={true}>
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="font-bold text-gray-700 text-sm">Passengers</h3>
                                    <Users size={18} className="text-gray-400" />
                                </div>

                                <div className="flex items-center justify-between bg-white/30 backdrop-blur-md rounded-xl p-1 border border-white/50 shadow-inner h-12">
                                    <button
                                        onClick={() => setSearchParams(prev => ({ ...prev, passengers: Math.max(1, prev.passengers - 1) }))}
                                        className="w-10 h-full flex items-center justify-center text-gray-600 hover:text-red-500 hover:bg-white/50 rounded-lg transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                                        disabled={searchParams.passengers <= 1}
                                    >
                                        <span className="text-2xl leading-none -mt-1">-</span>
                                    </button>

                                    <span className="font-bold text-gray-700 text-lg w-12 text-center">
                                        {searchParams.passengers}
                                    </span>

                                    <button
                                        onClick={() => setSearchParams(prev => ({ ...prev, passengers: Math.min(10, prev.passengers + 1) }))}
                                        className="w-10 h-full flex items-center justify-center text-gray-600 hover:text-red-500 hover:bg-white/50 rounded-lg transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                                        disabled={searchParams.passengers >= 10}
                                    >
                                        <span className="text-2xl leading-none -mt-1">+</span>
                                    </button>
                                </div>
                            </GlassCard>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
