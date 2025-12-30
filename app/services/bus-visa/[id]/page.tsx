'use client';

import Link from 'next/link';
import { NeoCard } from '@/components/ui/NeoCard';
import { NeoButton } from '@/components/ui/NeoButton';
import { NeoIcon } from '@/components/ui/NeoIcon';
import { ArrowLeft, CheckCircle, AlertCircle, Clock, MapPin, Bus, ShieldCheck, Coffee } from 'lucide-react';
import { useParams } from 'next/navigation';

export default function BusDetailsPage() {
    const params = useParams();
    const busId = params.id;

    return (
        <div className="w-full max-w-6xl mx-auto py-12 animate-in fade-in zoom-in duration-300">

            {/* Header */}
            <div className="flex items-center gap-4 mb-12">
                <Link href="/services/bus-visa/results">
                    <button className="w-12 h-12 rounded-xl neo-btn flex items-center justify-center text-gray-500 hover:text-red-500 transition-colors">
                        <ArrowLeft size={22} strokeWidth={2.5} />
                    </button>
                </Link>
                <div>
                    <h1 className="text-3xl font-extrabold text-foreground">Trip Details</h1>
                    <p className="text-gray-500 font-medium">Review your itinerary and inclusions.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-24">
                {/* Main Content (7 Cols) */}
                <div className="lg:col-span-7 space-y-8">
                    {/* Itinerary */}
                    <NeoCard className="p-8">
                        <div className="flex items-center gap-4 mb-8">
                            <NeoIcon icon={Clock} size={28} variant="inset" className="text-blue-500" />
                            <h2 className="text-xl font-bold text-gray-700">Journey Timeline</h2>
                        </div>

                        <div className="relative border-l-2 border-dashed border-gray-300 ml-6 pl-8 space-y-12">
                            <div className="relative">
                                <div className="absolute -left-[41px] top-1 w-6 h-6 rounded-full bg-blue-500 border-4 border-white shadow-md z-10"></div>
                                <p className="font-bold text-2xl text-blue-600">08:00 AM</p>
                                <h3 className="font-bold text-lg text-gray-800 mt-1">Departure from Dubai</h3>
                                <p className="text-sm text-gray-500 flex items-center gap-2 mt-2">
                                    <MapPin size={14} /> Deira City Center Point
                                </p>
                            </div>

                            <div className="relative">
                                <div className="absolute -left-[41px] top-1 w-6 h-6 rounded-full bg-gray-300 border-4 border-white shadow-sm z-10"></div>
                                <p className="font-bold text-xl text-gray-500">10:30 AM</p>
                                <h3 className="font-bold text-gray-700 mt-1">UAE Border Exit</h3>
                                <p className="text-sm text-gray-400 mt-1">Immigration Check</p>
                            </div>

                            <div className="relative">
                                <div className="absolute -left-[41px] top-1 w-6 h-6 rounded-full bg-gray-300 border-4 border-white shadow-sm z-10"></div>
                                <p className="font-bold text-xl text-gray-500">11:30 AM</p>
                                <h3 className="font-bold text-gray-700 mt-1">Oman Border Entry</h3>
                                <p className="text-sm text-gray-400 mt-1">Visa Processing Stop</p>
                            </div>

                            <div className="relative">
                                <div className="absolute -left-[41px] top-1 w-6 h-6 rounded-full bg-green-500 border-4 border-white shadow-md z-10"></div>
                                <p className="font-bold text-2xl text-green-600">01:00 PM</p>
                                <h3 className="font-bold text-lg text-gray-800 mt-1">Arrival in Oman</h3>
                                <p className="text-sm text-gray-500 mt-2">Check-in at Hotel / Rest Area</p>
                            </div>
                        </div>
                    </NeoCard>

                    {/* Policies */}
                    <NeoCard className="p-8 bg-orange-50/50 border border-orange-100">
                        <div className="flex items-start gap-4">
                            <AlertCircle size={28} className="text-orange-500 shrink-0 mt-1" />
                            <div>
                                <h3 className="font-bold text-lg text-orange-800 mb-2">Important Requirements</h3>
                                <ul className="list-disc list-inside text-sm text-orange-700 space-y-2 font-medium">
                                    <li>Passport must be valid for at least 6 months.</li>
                                    <li>Ensure no active travel bans or fines.</li>
                                    <li>Original Emirates ID is mandatory.</li>
                                </ul>
                            </div>
                        </div>
                    </NeoCard>
                </div>

                {/* Right Sidebar (5 Cols) */}
                <div className="lg:col-span-5 space-y-8">
                    <NeoCard className="p-8 sticky top-8">
                        <div className="flex items-center justify-between mb-8 pb-8 border-b border-gray-100">
                            <div>
                                <p className="text-sm font-bold text-gray-400 uppercase tracking-wider">Total Price</p>
                                <p className="text-4xl font-extrabold text-red-500">AED 350</p>
                            </div>
                            <div className="text-right">
                                <p className="font-bold text-gray-700">Per Person</p>
                                <p className="text-xs text-green-500 font-bold">All Inclusive</p>
                            </div>
                        </div>

                        <h3 className="font-bold text-gray-700 mb-4">Package Includes</h3>
                        <div className="grid grid-cols-2 gap-4 mb-8">
                            {[
                                { icon: Bus, label: 'Luxury Bus' },
                                { icon: ShieldCheck, label: 'Border Fees' },
                                { icon: Coffee, label: 'Refreshments' },
                                { icon: CheckCircle, label: 'Visa Assist' }
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50">
                                    <item.icon size={18} className="text-gray-500" />
                                    <span className="text-sm font-bold text-gray-600">{item.label}</span>
                                </div>
                            ))}
                        </div>

                        <Link href="/services/bus-visa/upload">
                            <NeoButton size="lg" className="w-full h-16 text-lg font-bold tracking-wide text-white bg-red-600 hover:bg-red-500 shadow-xl shadow-red-500/20">
                                Proceed to Booking
                            </NeoButton>
                        </Link>

                        <p className="text-center text-xs text-gray-400 mt-4 font-medium">
                            Secure payment powered by Stripe
                        </p>
                    </NeoCard>
                </div>
            </div>
        </div>
    );
}
