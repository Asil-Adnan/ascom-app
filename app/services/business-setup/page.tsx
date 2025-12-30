'use client';

import Link from 'next/link';
import { NeoCard } from '@/components/ui/NeoCard';
import { NeoButton } from '@/components/ui/NeoButton';
import { NeoIcon } from '@/components/ui/NeoIcon';
import { ArrowLeft, Building2, Globe, Rocket, Landmark, FileText, CheckCircle } from 'lucide-react';

export default function BusinessSetupStartPage() {
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
                    <h1 className="text-3xl font-extrabold text-foreground">Business Setup</h1>
                    <p className="text-gray-500 font-medium">Launch your company in the UAE with expert guidance.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Main Promo (7 Cols) */}
                <div className="lg:col-span-7 flex flex-col justify-between">
                    <NeoCard className="p-10 min-h-[500px] relative overflow-hidden flex flex-col">
                        <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-red-50 opacity-50 blur-3xl pointer-events-none"></div>

                        <div className="relative z-10 flex-1">
                            <NeoIcon icon={Landmark} size={48} variant="inset" className="text-red-600 mb-8" />

                            <h2 className="text-4xl font-extrabold text-gray-800 mb-6 leading-tight">
                                Start Your Business <br />
                                <span className="text-red-600">Without the Hassle.</span>
                            </h2>
                            <p className="text-lg text-gray-500 font-medium leading-relaxed max-w-lg mb-8">
                                We streamline the entire process of company formation, from Trade License issuance to Visa allocation and Corporate Banking.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/50 border border-white/60 shadow-sm">
                                    <Globe className="text-red-500 mt-1" size={24} />
                                    <div>
                                        <h4 className="font-bold text-gray-800">Free Zone</h4>
                                        <p className="text-xs text-gray-500 mt-1">100% Ownership, Tax Benefits</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/50 border border-white/60 shadow-sm">
                                    <Landmark className="text-red-500 mt-1" size={24} />
                                    <div>
                                        <h4 className="font-bold text-gray-800">Mainland</h4>
                                        <p className="text-xs text-gray-500 mt-1">Trade Directly in UAE Market</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Link href="/services/business-setup/details" className="w-full relative z-10">
                            <NeoButton size="lg" className="w-full h-16 text-lg font-bold tracking-wide flex items-center justify-center gap-3 text-red-600 hover:bg-red-600 hover:text-white transition-colors">
                                <Rocket size={20} /> Start New Application
                            </NeoButton>
                        </Link>
                    </NeoCard>
                </div>

                {/* Right Side: Process (5 Cols) */}
                <div className="lg:col-span-5 space-y-6">
                    <div className="neo-raised p-8 h-full flex flex-col justify-center">
                        <h3 className="text-xl font-bold text-gray-700 mb-8 ml-2">How It Works</h3>

                        <div className="space-y-8 relative">
                            {/* Connecting Line */}
                            <div className="absolute left-[27px] top-6 bottom-6 w-0.5 bg-dashed bg-gray-300 -z-0"></div>

                            {[
                                { title: 'Choose License', desc: 'Select activity & jurisdiction', icon: FileText },
                                { title: 'Submit Documents', desc: 'Passport copies & photos', icon: Building2 },
                                { title: 'Receive License', desc: 'Get your soft & hard copies', icon: CheckCircle }
                            ].map((step, i) => (
                                <div key={i} className="flex items-center gap-6 relative z-10 bg-transparent">
                                    <div className="w-14 h-14 rounded-full neo-raised flex items-center justify-center text-red-500 bg-[#e0e5ec]">
                                        <step.icon size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-800">{step.title}</h4>
                                        <p className="text-sm text-gray-500">{step.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 pt-8 border-t border-gray-200">
                            <p className="text-center text-sm font-bold text-gray-400">Average Turnaround: <span className="text-red-600">3 Working Days</span></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
