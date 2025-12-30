'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { NeoCard } from '@/components/ui/NeoCard';
import { NeoButton } from '@/components/ui/NeoButton';
import { NeoInput } from '@/components/ui/NeoInput';
import { NeoIcon } from '@/components/ui/NeoIcon';
import { ArrowLeft, Globe, Flag, Calendar, Plane, Info } from 'lucide-react';

export default function WorldwideVisaSearchPage() {
    const router = useRouter();
    const [searchParams, setSearchParams] = useState({
        destination: '',
        nationality: '',
        date: ''
    });

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.push('/services/worldwide-visa/selection');
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
                    <h1 className="text-3xl font-extrabold text-foreground">Worldwide Visa</h1>
                    <p className="text-gray-500 font-medium">Expert assistance for tourist and business visas globally.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Main Form (7 Cols) */}
                <div className="lg:col-span-7">
                    <NeoCard className="p-10">
                        <div className="flex items-center gap-4 mb-8">
                            <NeoIcon icon={Globe} size={32} variant="inset" className="text-red-500/80" />
                            <h2 className="text-xl font-bold text-gray-700">Check Requirements</h2>
                        </div>

                        <form onSubmit={handleSearch} className="space-y-8">

                            <div className="space-y-4">
                                <label className="text-sm font-bold text-gray-400 uppercase tracking-wider ml-1">Where do you want to go?</label>
                                <div className="relative group">
                                    <Plane className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-red-500 transition-colors" size={22} />
                                    <select
                                        className="w-full h-16 rounded-xl bg-background px-4 pl-12 text-lg font-bold neo-inset text-gray-700 appearance-none outline-none focus:ring-2 focus:ring-primary/50 cursor-pointer"
                                        value={searchParams.destination}
                                        onChange={(e) => setSearchParams({ ...searchParams, destination: e.target.value })}
                                        required
                                    >
                                        <option value="" disabled>Select Destination</option>
                                        <option value="UK">United Kingdom</option>
                                        <option value="Schengen">Schengen Area (Europe)</option>
                                        <option value="USA">United States</option>
                                        <option value="Saudi">Saudi Arabia</option>
                                        <option value="China">China</option>
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <label className="text-sm font-bold text-gray-400 uppercase tracking-wider ml-1">Your Nationality</label>
                                <div className="relative group">
                                    <Flag className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-red-500 transition-colors" size={22} />
                                    <select
                                        className="w-full h-16 rounded-xl bg-background px-4 pl-12 text-lg font-bold neo-inset text-gray-700 appearance-none outline-none focus:ring-2 focus:ring-primary/50 cursor-pointer"
                                        value={searchParams.nationality}
                                        onChange={(e) => setSearchParams({ ...searchParams, nationality: e.target.value })}
                                        required
                                    >
                                        <option value="" disabled>Select Nationality</option>
                                        <option value="UAE">United Arab Emirates</option>
                                        <option value="India">India</option>
                                        <option value="Philippines">Philippines</option>
                                        <option value="Pakistan">Pakistan</option>
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <label className="text-sm font-bold text-gray-400 uppercase tracking-wider ml-1">Tentative Travel Date</label>
                                <div className="relative group">
                                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-red-500 transition-colors" size={22} />
                                    <NeoInput
                                        type="date"
                                        required
                                        className="pl-12 h-16 font-bold text-lg text-gray-700"
                                        value={searchParams.date}
                                        onChange={(e) => setSearchParams({ ...searchParams, date: e.target.value })}
                                    />
                                </div>
                            </div>

                            <NeoButton type="submit" size="lg" className="w-full h-16 text-lg font-bold tracking-wide mt-6 text-red-600 hover:bg-red-500 hover:text-white transition-colors">
                                Discover Visa Options
                            </NeoButton>
                        </form>
                    </NeoCard>
                </div>

                {/* Right Side: Popular (5 Cols) */}
                <div className="lg:col-span-5 space-y-6">
                    <div className="neo-raised p-8 h-full">
                        <h3 className="text-lg font-bold text-gray-700 mb-6">Trending Destinations</h3>
                        <div className="space-y-4">
                            {[
                                { name: 'Schengen Area', price: 'AED 800', time: '15 Days' },
                                { name: 'United Kingdom', price: 'AED 1,200', time: '3 Weeks' },
                                { name: 'Saudi Arabia', price: 'AED 450', time: '24 Hours' }
                            ].map((item, i) => (
                                <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-white/50 border border-white/60 shadow-sm cursor-pointer hover:bg-white hover:shadow-md transition-all">
                                    <div>
                                        <p className="font-bold text-gray-800">{item.name}</p>
                                        <p className="text-xs text-gray-400 font-medium">Processing: {item.time}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold text-red-600">{item.price}</p>
                                        <ArrowLeft size={16} className="ml-auto rotate-180 text-gray-300" />
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 p-4 bg-red-50 rounded-xl flex items-start gap-3">
                            <Info size={20} className="text-red-500 mt-1 flex-shrink-0" />
                            <p className="text-xs text-red-800 leading-relaxed font-medium">
                                Visa requirements change frequently. We ensure your application meets the latest diplomatic standards to minimize rejection risk.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
