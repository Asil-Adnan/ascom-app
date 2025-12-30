'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { NeoCard } from '@/components/ui/NeoCard';
import { NeoButton } from '@/components/ui/NeoButton';
import { NeoIcon } from '@/components/ui/NeoIcon';
import { ArrowLeft, Palmtree, Heart, Users, Briefcase, Map, Compass, Camera } from 'lucide-react';

export default function HolidaysPage() {
    const router = useRouter();
    const [selectedType, setSelectedType] = useState('');

    const tripTypes = [
        { id: 'leisure', name: 'Leisure', icon: Palmtree, desc: 'Relax and unwind' },
        { id: 'family', name: 'Family', icon: Users, desc: 'Fun for everyone' },
        { id: 'honeymoon', name: 'Honeymoon', icon: Heart, desc: 'Romantic getaways' },
        { id: 'adventure', name: 'Adventure', icon: Map, desc: 'Thrills & nature' },
    ];

    const handleNext = () => {
        if (selectedType) router.push(`/services/holidays/plan?type=${selectedType}`);
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
                    <h1 className="text-3xl font-extrabold text-foreground">Holidays & Getaways</h1>
                    <p className="text-gray-500 font-medium">Curated travel packages for every lifestyle.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Main Options (8 Cols) */}
                <div className="lg:col-span-8">
                    <NeoCard className="p-10 min-h-[500px] flex flex-col">
                        <h2 className="text-2xl font-bold text-primary mb-8 ml-2">Select Your Travel Style</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
                            {tripTypes.map((type) => (
                                <button
                                    key={type.id}
                                    onClick={() => setSelectedType(type.id)}
                                    className={`group relative p-6 rounded-2xl flex flex-col items-center justify-center text-center transition-all duration-300
                                 ${selectedType === type.id
                                            ? 'neo-inset scale-95 ring-2 ring-primary/10'
                                            : 'neo-raised hover:-translate-y-1 hover:text-primary'}
                             `}
                                >
                                    <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300">
                                        <NeoIcon
                                            icon={type.icon}
                                            size={32}
                                            variant={selectedType === type.id ? 'raised' : 'inset'}
                                            color={selectedType === type.id ? 'text-primary' : 'text-gray-400'}
                                        />
                                    </div>
                                    <h3 className={`text-lg font-bold mb-1 ${selectedType === type.id ? 'text-primary' : 'text-gray-700'}`}>
                                        {type.name}
                                    </h3>
                                    <p className="text-xs text-gray-400 font-medium">{type.desc}</p>

                                    {/* Selection Indicator */}
                                    {selectedType === type.id && (
                                        <div className="absolute top-4 right-4 w-3 h-3 bg-primary rounded-full shadow-lg animate-pulse" />
                                    )}
                                </button>
                            ))}
                        </div>

                        <NeoButton
                            size="lg"
                            className="w-full h-16 text-lg font-bold tracking-wide mt-8 disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={!selectedType}
                            onClick={handleNext}
                        >
                            Create My Itinerary
                        </NeoButton>
                    </NeoCard>
                </div>

                {/* Right Side: Inspiration (4 Cols) */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="neo-raised p-8 h-full flex flex-col items-center justify-center text-center relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-orange-400 to-red-500"></div>
                        <div className="mb-6">
                            <div className="w-20 h-20 mx-auto rounded-full neo-inset flex items-center justify-center text-orange-500 mb-4 transform rotate-12">
                                <Compass size={40} strokeWidth={1.5} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-700">Explore the World</h3>
                            <p className="text-sm text-gray-500 mt-2 px-2">
                                From the beaches of Maldives to the mountains of Georgia, we handle flights, hotels, and visas.
                            </p>
                        </div>

                        <div className="w-full p-4 bg-orange-50 rounded-xl border border-orange-100 mt-auto">
                            <div className="flex items-center gap-3 mb-2">
                                <Camera size={18} className="text-orange-500" />
                                <span className="text-xs font-bold text-orange-600 uppercase">Featured Destination</span>
                            </div>
                            <p className="font-bold text-lg text-gray-800">Georgia</p>
                            <p className="text-xs text-gray-500">Starting from AED 1,499</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
