'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { NeoCard } from '@/components/ui/NeoCard';
import { NeoButton } from '@/components/ui/NeoButton';
import { NeoInput } from '@/components/ui/NeoInput';
import { NeoIcon } from '@/components/ui/NeoIcon';
import { ArrowLeft, Package, MapPin, Scale, DollarSign, Truck, Ship, Box, ArrowRight } from 'lucide-react';

export default function CargoPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        type: 'Personal',
        method: 'Air',
        weight: '',
        to: ''
    });

    const handleNext = (e: React.FormEvent) => {
        e.preventDefault();
        router.push('/services/cargo/details');
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
                    <h1 className="text-3xl font-extrabold text-foreground">Global Cargo</h1>
                    <p className="text-gray-500 font-medium">Reliable door-to-door shipping solutions.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Main Form (8 Cols) */}
                <div className="lg:col-span-8">
                    <NeoCard className="p-10">
                        <form onSubmit={handleNext} className="space-y-8">

                            {/* Cargo Type Selection */}
                            <div className="grid grid-cols-2 gap-8">
                                {['Personal', 'Commercial'].map((t) => (
                                    <button
                                        key={t}
                                        type="button"
                                        onClick={() => setFormData({ ...formData, type: t })}
                                        className={`h-24 rounded-2xl flex items-center justify-center gap-4 font-bold text-lg transition-all duration-300
                                    ${formData.type === t
                                                ? 'neo-inset text-blue-600 ring-1 ring-blue-600/20'
                                                : 'neo-raised text-gray-500 hover:text-blue-500'}
                                `}
                                    >
                                        <NeoIcon
                                            icon={t === 'Personal' ? Box : DollarSign}
                                            size={24}
                                            variant={formData.type === t ? 'raised' : 'inset'}
                                            className="scale-90"
                                        />
                                        {t}
                                    </button>
                                ))}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <label className="text-sm font-bold text-gray-400 uppercase tracking-wider ml-1">Destination</label>
                                    <div className="relative group">
                                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={22} />
                                        <select
                                            className="w-full h-16 rounded-xl bg-background px-4 pl-12 text-lg font-bold neo-inset text-gray-700 appearance-none outline-none focus:ring-2 focus:ring-primary/50 cursor-pointer"
                                            value={formData.to}
                                            onChange={(e) => setFormData({ ...formData, to: e.target.value })}
                                            required
                                        >
                                            <option value="" disabled>Select Country</option>
                                            <option value="Philippines">Philippines</option>
                                            <option value="India">India</option>
                                            <option value="Pakistan">Pakistan</option>
                                            <option value="UK">United Kingdom</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <label className="text-sm font-bold text-gray-400 uppercase tracking-wider ml-1">Est. Weight (kg)</label>
                                    <div className="relative group">
                                        <Scale className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={22} />
                                        <NeoInput
                                            type="number"
                                            required
                                            className="pl-12 h-16 font-bold text-lg"
                                            placeholder="e.g. 20"
                                            value={formData.weight}
                                            onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Method Selection */}
                            <div className="space-y-4">
                                <label className="text-sm font-bold text-gray-400 uppercase tracking-wider ml-1">Shipping Method</label>
                                <div className="flex gap-6">
                                    {['Air', 'Sea'].map((m) => (
                                        <button
                                            key={m}
                                            type="button"
                                            onClick={() => setFormData({ ...formData, method: m })}
                                            className={`flex-1 h-20 rounded-xl flex items-center justify-center gap-3 font-bold transition-all
                                    ${formData.method === m
                                                    ? 'bg-blue-600 text-white shadow-lg transform scale-[1.02]'
                                                    : 'bg-[#e0e5ec] text-gray-500 neo-btn hover:bg-gray-200'}
                                `}
                                        >
                                            {m === 'Air' ? <Package size={20} /> : <Ship size={20} />}
                                            {m} Cargo
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <NeoButton type="submit" size="lg" className="w-full h-16 text-lg font-bold tracking-wide mt-6">
                                Calculate Rate & Proceed <ArrowRight className="ml-2" />
                            </NeoButton>
                        </form>
                    </NeoCard>
                </div>

                {/* Right Side: Visual (4 Cols) */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="neo-raised p-8 h-full flex flex-col items-center justify-center text-center relative overflow-hidden group">
                        {/* Box Animation Visual */}
                        <div className="w-40 h-40 relative mb-8">
                            <div className="absolute inset-0 bg-blue-100 rounded-full opacity-20 animate-ping"></div>
                            <div className="relative z-10 w-full h-full neo-inset rounded-full flex items-center justify-center text-blue-500">
                                <Box size={64} strokeWidth={1} />
                            </div>
                            <div className="absolute top-0 right-0 p-2 bg-white rounded-lg shadow-sm animate-bounce delay-100">
                                <Package size={20} className="text-orange-500" />
                            </div>
                        </div>

                        <h3 className="text-xl font-bold text-gray-800">Track & Trace</h3>
                        <p className="text-sm text-gray-500 mt-2 px-2 max-w-xs">
                            Real-time updates for your shipment from pickup to delivery.
                        </p>

                        <div className="mt-8 w-full p-4 border-t border-gray-100">
                            <p className="font-mono text-xs text-gray-400">EX-DUBAI-2024</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
