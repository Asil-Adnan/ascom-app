'use client';

import Link from 'next/link';
import { NeoCard } from '@/components/ui/NeoCard';
import { NeoButton } from '@/components/ui/NeoButton';
import { ArrowLeft, Briefcase, DollarSign, Laptop, Sparkles, Globe, Coffee } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { db } from '@/lib/db';

export default function FreelanceStartPage() {
    const router = useRouter();
    const { user } = useAuth();

    const handleStart = async () => {
        if (!user) {
            router.push('/login');
            return;
        }

        const app = await db.createApplication(user.id, 'FREELANCE');
        router.push(`/services/freelance-visa/details?id=${app.id}`);
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
                    <h1 className="text-3xl font-extrabold text-foreground">Freelance Visa</h1>
                    <p className="text-gray-500 font-medium">Work independently in Dubai with a legal residency permit.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Main Visual & Action (7 Cols) */}
                <div className="lg:col-span-7 flex flex-col gap-8">
                    <NeoCard className="p-10 flex flex-col justify-between min-h-[400px] relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-red-50 to-transparent rounded-bl-[100px] opacity-50 -z-0"></div>

                        <div className="relative z-10">
                            <div className="w-20 h-20 rounded-full neo-inset flex items-center justify-center text-red-600 mb-8">
                                <Briefcase size={40} strokeWidth={1.5} />
                            </div>
                            <h2 className="text-4xl font-extrabold text-gray-800 mb-4 leading-tight">
                                Be Your Own Boss.<br />
                                <span className="text-red-600">Live Dubai.</span>
                            </h2>
                            <p className="text-lg text-gray-500 font-medium max-w-md leading-relaxed">
                                Get a renewable 2-year freelance residency. Zero income tax. No office required. Full independence.
                            </p>
                        </div>

                        <NeoButton size="lg" className="w-full md:w-auto md:px-12 h-16 text-lg font-bold tracking-wide mt-8 text-red-600 hover:bg-red-500 hover:text-white transition-colors" onClick={handleStart}>
                            Start Application
                        </NeoButton>
                    </NeoCard>

                    <div className="grid grid-cols-2 gap-6">
                        <div className="neo-raised p-6 flex items-center gap-4 group hover:-translate-y-1 transition-transform">
                            <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                                <DollarSign size={24} />
                            </div>
                            <div>
                                <p className="font-bold text-gray-700">Tax Free</p>
                                <p className="text-xs text-gray-400">0% Personal Income Tax</p>
                            </div>
                        </div>
                        <div className="neo-raised p-6 flex items-center gap-4 group hover:-translate-y-1 transition-transform">
                            <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                                <Globe size={24} />
                            </div>
                            <div>
                                <p className="font-bold text-gray-700">Global Access</p>
                                <p className="text-xs text-gray-400">Hub for International Business</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side: Benefits (5 Cols) */}
                <div className="lg:col-span-5 space-y-6">
                    <div className="neo-raised p-8 h-full flex flex-col justify-center">
                        <h3 className="text-xl font-bold text-gray-700 mb-8">Why Freelance?</h3>
                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full neo-inset flex items-center justify-center text-gray-400 mt-1">
                                    <Laptop size={20} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-800">Remote Work</h4>
                                    <p className="text-sm text-gray-500 mt-1">Work from home, cafes, or co-working spaces. No physical office tenancy required.</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full neo-inset flex items-center justify-center text-gray-400 mt-1">
                                    <Sparkles size={20} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-800">Family Sponsorship</h4>
                                    <p className="text-sm text-gray-500 mt-1">Eligible to sponsor your spouse and children for residency visas.</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full neo-inset flex items-center justify-center text-gray-400 mt-1">
                                    <Coffee size={20} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-800">Lifestyle</h4>
                                    <p className="text-sm text-gray-500 mt-1">Enjoy the Dubai lifestyle with full residency benefits including banking and driving license.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
