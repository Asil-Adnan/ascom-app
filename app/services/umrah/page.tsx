'use client';

import Link from 'next/link';
import { NeoCard } from '@/components/ui/NeoCard';
import { NeoButton } from '@/components/ui/NeoButton';
import { ArrowLeft, MoonStar, MapPin, CheckCircle, Bus, Hotel, Star } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { db } from '@/lib/db';

export default function UmrahStartPage() {
    const router = useRouter();
    const { user } = useAuth();

    const handleStart = async () => {
        if (!user) {
            router.push('/login');
            return;
        }
        const app = await db.createApplication(user.id, 'UMRAH');
        router.push(`/services/umrah/details?id=${app.id}`);
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
                    <h1 className="text-3xl font-extrabold text-foreground">Umrah Services</h1>
                    <p className="text-gray-500 font-medium">Complete spiritual journey packages and visa processing.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Main Promo (7 Cols) */}
                <div className="lg:col-span-7 flex flex-col justify-between">
                    <NeoCard className="p-10 relative overflow-hidden min-h-[500px] flex flex-col">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-red-50 to-transparent rounded-bl-full opacity-60 -z-0"></div>

                        <div className="relative z-10 flex-1">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-16 h-16 rounded-full neo-inset flex items-center justify-center text-red-600">
                                    <MoonStar size={32} strokeWidth={1.5} />
                                </div>
                                <div className="h-px flex-1 bg-gradient-to-r from-gray-200 to-transparent"></div>
                            </div>

                            <h2 className="text-4xl font-extrabold text-gray-800 mb-6 font-serif">
                                Your Spiritual <br />
                                Journey Begins Here.
                            </h2>
                            <p className="text-lg text-gray-500 font-medium leading-relaxed max-w-lg">
                                We facilitate seamless Umrah visa processing, including transport and accommodation options, so you can focus entirely on your worship.
                            </p>
                        </div>

                        <div className="relative z-10 grid grid-cols-2 gap-4 my-8">
                            {['Visa Issuance', 'Flight Booking', 'Hotel Stats', 'Ground Transport'].map((item, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <CheckCircle size={20} className="text-red-500" />
                                    <span className="font-bold text-gray-600">{item}</span>
                                </div>
                            ))}
                        </div>

                        <NeoButton size="lg" className="w-full h-16 text-lg font-bold tracking-wide text-red-700 hover:bg-green-600 hover:text-white transition-colors" onClick={handleStart}>
                            Start Umrah Application
                        </NeoButton>
                    </NeoCard>
                </div>

                {/* Right Side: Packages / Visuals (5 Cols) */}
                <div className="lg:col-span-5 space-y-8">
                    <div className="neo-raised p-8 text-center bg-[#e0e5ec]">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Most Popular</p>
                        <h3 className="text-2xl font-bold text-gray-800 mb-1">Bus Package</h3>
                        <p className="text-red-600 font-extrabold text-3xl mb-6">AED 600 <span className="text-sm font-medium text-gray-400">/ person</span></p>

                        <div className="space-y-4 text-left px-4">
                            <div className="flex items-center gap-4 p-3 bg-white/50 rounded-xl">
                                <Bus size={20} className="text-gray-400" />
                                <div>
                                    <p className="font-bold text-sm">Luxury Bus Transport</p>
                                    <p className="text-xs text-gray-400">Dubai - Makkah - Madinah</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 p-3 bg-white/50 rounded-xl">
                                <Hotel size={20} className="text-gray-400" />
                                <div>
                                    <p className="font-bold text-sm">3 Star Accommodation</p>
                                    <p className="text-xs text-gray-400">10 Days / 9 Nights</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div className="neo-raised p-6 text-center">
                            <Star size={24} className="text-yellow-300 mx-auto mb-2 fill-current" />
                            <p className="font-bold text-xl">4.9</p>
                            <p className="text-xs text-gray-400 uppercase">Customer Rating</p>
                        </div>
                        <div className="neo-raised p-6 text-center">
                            <MapPin size={24} className="text-red-500 mx-auto mb-2" />
                            <p className="font-bold text-xl">2 Cities</p>
                            <p className="text-xs text-gray-400 uppercase">Makkah & Madinah</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
