'use client';

import { useState, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { NeoCard } from '@/components/ui/NeoCard';
import { NeoButton } from '@/components/ui/NeoButton';
import { NeoInput } from '@/components/ui/NeoInput';
import { NeoIcon } from '@/components/ui/NeoIcon';
import { ArrowLeft, Box, Plane, Truck, Anchor, CheckCircle, Scale } from 'lucide-react';

function CargoDetailsContent() {
    const router = useRouter();

    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    const [weight, setWeight] = useState('');
    const [transportMode, setTransportMode] = useState('air');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.push('/services/cargo/documents');
    };

    return (
        <div className="w-full max-w-6xl mx-auto py-12 animate-in fade-in zoom-in duration-300">

            {/* Header */}
            <div className="flex items-center gap-4 mb-12">
                <Link href="/services/cargo">
                    <button className="w-12 h-12 rounded-xl neo-btn flex items-center justify-center text-gray-500 hover:text-orange-600 transition-colors">
                        <ArrowLeft size={22} strokeWidth={2.5} />
                    </button>
                </Link>
                <div>
                    <h1 className="text-3xl font-extrabold text-foreground">Shipment Details</h1>
                    <p className="text-gray-500 font-medium">Get a quote for your cargo.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Main Form (7 Cols) */}
                <div className="lg:col-span-7 space-y-8">
                    <form onSubmit={handleSubmit} className="space-y-8">
                        <NeoCard className="p-10">
                            <div className="flex items-center gap-4 mb-8">
                                <NeoIcon icon={Box} size={28} variant="inset" className="text-orange-600" />
                                <h3 className="text-xl font-bold text-gray-700">Cargo Specifics</h3>
                            </div>

                            <div className="space-y-6">
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <label className="text-sm font-bold text-gray-400 uppercase tracking-wider ml-1">Origin</label>
                                        <NeoInput
                                            placeholder="e.g. Dubai"
                                            value={origin}
                                            onChange={e => setOrigin(e.target.value)}
                                            className="h-14 font-bold"
                                        />
                                    </div>
                                    <div className="space-y-4">
                                        <label className="text-sm font-bold text-gray-400 uppercase tracking-wider ml-1">Destination</label>
                                        <NeoInput
                                            placeholder="e.g. London"
                                            value={destination}
                                            onChange={e => setDestination(e.target.value)}
                                            className="h-14 font-bold"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <label className="text-sm font-bold text-gray-400 uppercase tracking-wider ml-1">Total Weight (KG)</label>
                                    <div className="relative group">
                                        <Scale className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-500 transition-colors" size={20} />
                                        <NeoInput
                                            type="number"
                                            placeholder="e.g. 50"
                                            value={weight}
                                            onChange={e => setWeight(e.target.value)}
                                            className="pl-12 h-16 text-lg font-bold"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <label className="text-sm font-bold text-gray-400 uppercase tracking-wider ml-1">Transport Mode</label>
                                    <div className="grid grid-cols-3 gap-3">
                                        {[
                                            { id: 'air', icon: Plane, label: 'Air' },
                                            { id: 'sea', icon: Anchor, label: 'Sea' },
                                            { id: 'land', icon: Truck, label: 'Land' }
                                        ].map(mode => (
                                            <div
                                                key={mode.id}
                                                onClick={() => setTransportMode(mode.id)}
                                                className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex flex-col items-center gap-2 ${transportMode === mode.id ? 'bg-orange-50 border-orange-500' : 'bg-transparent border-transparent neo-shadow hover:bg-gray-50'}`}
                                            >
                                                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${transportMode === mode.id ? 'text-orange-600' : 'text-gray-400'}`}>
                                                    <mode.icon size={24} />
                                                </div>
                                                <span className={`text-sm font-bold ${transportMode === mode.id ? 'text-orange-700' : 'text-gray-500'}`}>{mode.label}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </NeoCard>

                        <NeoButton size="lg" className="w-full h-16 text-lg font-bold tracking-wide bg-orange-600 hover:bg-orange-500 text-white shadow-xl shadow-orange-500/20">
                            Calculate Quote
                        </NeoButton>
                    </form>
                </div>

                {/* Right Side: Info (5 Cols) */}
                <div className="lg:col-span-5 space-y-6">
                    <div className="neo-raised p-8 h-full bg-orange-50/20 border border-orange-50/50">
                        <div className="flex items-center gap-4 mb-6">
                            <NeoIcon icon={CheckCircle} size={28} variant="inset" className="text-orange-600" />
                            <h3 className="text-xl font-bold text-gray-700">Service Guarantee</h3>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="w-2 h-2 rounded-full bg-orange-400 mt-2 shrink-0"></div>
                                <div>
                                    <h4 className="font-bold text-gray-800">Door-to-Door Delivery</h4>
                                    <p className="text-xs text-gray-500 mt-1">We pick up from your location and deliver to the consignee's doorstep.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-2 h-2 rounded-full bg-orange-400 mt-2 shrink-0"></div>
                                <div>
                                    <h4 className="font-bold text-gray-800">Customs Clearance</h4>
                                    <p className="text-xs text-gray-500 mt-1">Full support with documentation and clearing agents.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-2 h-2 rounded-full bg-orange-400 mt-2 shrink-0"></div>
                                <div>
                                    <h4 className="font-bold text-gray-800">Tracking</h4>
                                    <p className="text-xs text-gray-500 mt-1">Real-time updates on your shipment status.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function CargoDetailsPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <CargoDetailsContent />
        </Suspense>
    );
}
