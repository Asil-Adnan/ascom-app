'use client';

import { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { NeoCard } from '@/components/ui/NeoCard';
import { NeoButton } from '@/components/ui/NeoButton';
import { NeoInput } from '@/components/ui/NeoInput';
import { NeoIcon } from '@/components/ui/NeoIcon';
import { ArrowLeft, User, MessageSquare, Upload, Ticket, Star, ShieldCheck } from 'lucide-react';

function TicketDetailsContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const type = searchParams.get('type') || 'Ticket';

    const [formData, setFormData] = useState({
        name: '',
        nationality: '',
        notes: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.push('/dashboard');
    };

    return (
        <div className="w-full max-w-6xl mx-auto py-12 animate-in fade-in zoom-in duration-300">

            {/* Header */}
            <div className="flex items-center gap-4 mb-12">
                <Link href="/services/tickets">
                    <button className="w-12 h-12 rounded-xl neo-btn flex items-center justify-center text-gray-500 hover:text-red-500 transition-colors">
                        <ArrowLeft size={22} strokeWidth={2.5} />
                    </button>
                </Link>
                <div>
                    <h1 className="text-3xl font-extrabold text-foreground">Passenger Details</h1>
                    <p className="text-gray-500 font-medium">Complete your booking information.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-20">
                {/* Main Form (8 Cols) */}
                <div className="lg:col-span-8">
                    <form onSubmit={handleSubmit} className="space-y-8">
                        <NeoCard className="p-10">
                            <div className="flex items-center gap-4 mb-8">
                                <NeoIcon icon={User} size={28} variant="inset" className="text-orange-500" />
                                <h3 className="text-xl font-bold text-gray-700">Passenger Info</h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <label className="text-sm font-bold text-gray-400 uppercase tracking-wider ml-1">Full Name</label>
                                    <div className="relative group">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-500 transition-colors" size={20} />
                                        <NeoInput
                                            placeholder="John Doe"
                                            value={formData.name}
                                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                                            required
                                            className="pl-12 h-14 font-bold"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <label className="text-sm font-bold text-gray-400 uppercase tracking-wider ml-1">Nationality</label>
                                    <NeoInput
                                        placeholder="e.g. British"
                                        value={formData.nationality}
                                        onChange={e => setFormData({ ...formData, nationality: e.target.value })}
                                        required
                                        className="h-14 font-bold"
                                    />
                                </div>
                            </div>

                            <div className="mt-8 space-y-4">
                                <label className="text-sm font-bold text-gray-400 uppercase tracking-wider ml-1">Special Requests</label>
                                <div className="relative group">
                                    <MessageSquare className="absolute left-4 top-4 text-gray-400 group-focus-within:text-orange-500 transition-colors" size={20} />
                                    <textarea
                                        className="w-full h-32 rounded-xl bg-background p-4 pl-12 text-lg font-bold neo-inset text-gray-700 outline-none focus:ring-2 focus:ring-primary/50 resize-none transition-shadow"
                                        placeholder="Window seat, vegan meal, extra legroom..."
                                        value={formData.notes}
                                        onChange={e => setFormData({ ...formData, notes: e.target.value })}
                                    />
                                </div>
                            </div>
                        </NeoCard>

                        <NeoCard className="p-8 border-2 border-dashed border-gray-200 hover:border-orange-500/50 hover:bg-orange-50/10 transition-all cursor-pointer group">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-6">
                                    <div className="w-16 h-16 rounded-full neo-inset flex items-center justify-center text-gray-400 group-hover:text-orange-500 transition-colors">
                                        <Upload size={32} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg text-gray-700">Upload Passport / ID</h4>
                                        <p className="text-sm text-gray-500">Required for international travel</p>
                                    </div>
                                </div>
                                <NeoButton className="px-6 h-12">Select File</NeoButton>
                            </div>
                        </NeoCard>

                        <NeoButton type="submit" size="lg" className="w-full h-16 text-lg font-bold tracking-wide">
                            Confirm {type}
                        </NeoButton>
                    </form>
                </div>

                {/* Right Side: Features (4 Cols) */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="neo-raised p-8 h-full flex flex-col items-center text-center">
                        <div className="w-20 h-20 rounded-full bg-orange-50 flex items-center justify-center text-orange-500 mb-6">
                            <Ticket size={40} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800">Premium Booking</h3>
                        <p className="text-sm text-gray-500 mt-2 px-4 mb-8">
                            Enjoy exclusive rates and 24/7 support with your booking.
                        </p>

                        <div className="w-full space-y-4 text-left">
                            <div className="flex items-center gap-4 p-4 rounded-xl bg-white/50 border border-white/60">
                                <ShieldCheck className="text-green-500" size={24} />
                                <div>
                                    <p className="font-bold text-gray-700">Free Cancellation</p>
                                    <p className="text-xs text-gray-400">Up to 24h before trip</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 p-4 rounded-xl bg-white/50 border border-white/60">
                                <Star className="text-yellow-500 fill-current" size={24} />
                                <div>
                                    <p className="font-bold text-gray-700">Best Price Guarantee</p>
                                    <p className="text-xs text-gray-400">We match any lower price</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function TicketDetailsPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <TicketDetailsContent />
        </Suspense>
    );
}
