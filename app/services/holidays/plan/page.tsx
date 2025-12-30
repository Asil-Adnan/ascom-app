'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { NeoCard } from '@/components/ui/NeoCard';
import { NeoButton } from '@/components/ui/NeoButton';
import { NeoInput } from '@/components/ui/NeoInput';
import { NeoIcon } from '@/components/ui/NeoIcon';
import { ArrowLeft, Palmtree, MapPin, CheckCircle, HelpCircle, DollarSign } from 'lucide-react';

function HolidayPlanContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const type = searchParams.get('type') || 'Trip';

    const [notSureDest, setNotSureDest] = useState(false);
    const [destination, setDestination] = useState('');
    const [budget, setBudget] = useState('');
    const [inclusions, setInclusions] = useState<string[]>([]);

    const toggleInclusion = (item: string) => {
        if (inclusions.includes(item)) setInclusions(inclusions.filter(i => i !== item));
        else setInclusions([...inclusions, item]);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, save to DB here
        router.push('/services/holidays/documents');
    };

    return (
        <div className="w-full max-w-6xl mx-auto py-12 animate-in fade-in zoom-in duration-300">

            {/* Header */}
            <div className="flex items-center gap-4 mb-12">
                <Link href="/services/holidays">
                    <button className="w-12 h-12 rounded-xl neo-btn flex items-center justify-center text-gray-500 hover:text-pink-500 transition-colors">
                        <ArrowLeft size={22} strokeWidth={2.5} />
                    </button>
                </Link>
                <div>
                    <h1 className="text-3xl font-extrabold text-foreground">Plan Your {type}</h1>
                    <p className="text-gray-500 font-medium">Tell us where you want to go, or let us inspire you.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Main Form (7 Cols) */}
                <div className="lg:col-span-7 space-y-8">
                    <form onSubmit={handleSubmit} className="space-y-8">
                        <NeoCard className="p-10">
                            <div className="flex items-center gap-4 mb-8">
                                <NeoIcon icon={Palmtree} size={28} variant="inset" className="text-pink-500" />
                                <h3 className="text-xl font-bold text-gray-700">Trip Preferences</h3>
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <label className="text-sm font-bold text-gray-400 uppercase tracking-wider ml-1">Destination</label>
                                        <button
                                            type="button"
                                            onClick={() => setNotSureDest(!notSureDest)}
                                            className={`text-xs font-bold flex items-center gap-1 transition-colors ${notSureDest ? 'text-pink-500' : 'text-gray-400 hover:text-pink-500'}`}
                                        >
                                            <HelpCircle size={14} /> Not sure?
                                        </button>
                                    </div>

                                    {!notSureDest ? (
                                        <div className="relative group">
                                            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-pink-500 transition-colors" size={20} />
                                            <NeoInput
                                                placeholder="e.g. Maldives, Paris, Tokyo"
                                                value={destination}
                                                onChange={e => setDestination(e.target.value)}
                                                required={!notSureDest}
                                                className="pl-12 h-16 text-lg font-bold"
                                            />
                                        </div>
                                    ) : (
                                        <div className="p-4 rounded-xl bg-pink-50 border border-pink-100 flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-pink-500 shadow-sm">
                                                <Palmtree size={20} />
                                            </div>
                                            <div>
                                                <p className="font-bold text-gray-800 text-sm">Surprise Me!</p>
                                                <p className="text-xs text-gray-500">Our experts will suggest trending destinations.</p>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-4">
                                    <label className="text-sm font-bold text-gray-400 uppercase tracking-wider ml-1">Budget Per Person (AED)</label>
                                    <div className="relative group">
                                        <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-pink-500 transition-colors" size={20} />
                                        <NeoInput
                                            type="number"
                                            placeholder="e.g. 5000"
                                            value={budget}
                                            onChange={e => setBudget(e.target.value)}
                                            className="pl-12 h-16 text-lg font-bold"
                                        />
                                    </div>
                                </div>
                            </div>
                        </NeoCard>

                        <NeoCard className="p-10">
                            <h3 className="text-lg font-bold text-gray-700 mb-6">I need help with...</h3>
                            <div className="grid grid-cols-2 gap-4">
                                {['Flights', 'Hotels', 'Visa Assistance', 'Tours', 'Transfers', 'Travel Insurance'].map(item => (
                                    <div
                                        key={item}
                                        onClick={() => toggleInclusion(item)}
                                        className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-center gap-3 group ${inclusions.includes(item) ? 'bg-pink-50 border-pink-500/50' : 'bg-transparent border-transparent neo-shadow hover:bg-gray-50'}`}
                                    >
                                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${inclusions.includes(item) ? 'border-pink-500 bg-pink-500 text-white' : 'border-gray-300 text-transparent group-hover:border-pink-400'}`}>
                                            <CheckCircle size={12} fill="currentColor" className="text-white" />
                                        </div>
                                        <span className={`text-sm font-bold ${inclusions.includes(item) ? 'text-pink-700' : 'text-gray-500 group-hover:text-gray-700'}`}>{item}</span>
                                    </div>
                                ))}
                            </div>
                        </NeoCard>

                        <NeoButton size="lg" className="w-full h-16 text-lg font-bold tracking-wide bg-pink-600 hover:bg-pink-500 text-white shadow-xl shadow-pink-500/20">
                            Continue to Details
                        </NeoButton>
                    </form>
                </div>

                {/* Right Side: Inspiration (5 Cols) */}
                <div className="lg:col-span-5 space-y-6">
                    <div className="neo-raised p-8 h-full bg-pink-50/20 border border-pink-50/50">
                        <h3 className="text-xl font-bold text-gray-700 mb-8">Why Book With Us?</h3>

                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-pink-500 shrink-0">
                                    <CheckCircle size={20} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-800">Customized Itineraries</h4>
                                    <p className="text-xs text-gray-500 mt-1">We tailor every trip to your specific needs and budget.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-pink-500 shrink-0">
                                    <CheckCircle size={20} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-800">24/7 Support</h4>
                                    <p className="text-xs text-gray-500 mt-1">Always there for you, from takeoff to landing.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-pink-500 shrink-0">
                                    <CheckCircle size={20} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-800">Best Rate Guarantee</h4>
                                    <p className="text-xs text-gray-500 mt-1">Found a better price? We'll match it.</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-12 p-6 rounded-2xl bg-white/60 border border-white">
                            <p className="font-bold text-gray-800 text-sm mb-2">Popular Right Now</p>
                            <div className="flex items-center gap-2 overflow-x-auto pb-2">
                                <span className="px-3 py-1 rounded-full bg-pink-100 text-pink-600 text-xs font-bold whitespace-nowrap">Georgia</span>
                                <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-600 text-xs font-bold whitespace-nowrap">Maldives</span>
                                <span className="px-3 py-1 rounded-full bg-orange-100 text-orange-600 text-xs font-bold whitespace-nowrap">Thailand</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function HolidayPlanPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <HolidayPlanContent />
        </Suspense>
    );
}
