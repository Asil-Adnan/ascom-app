'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { NeoCard } from '@/components/ui/NeoCard';
import { NeoInput } from '@/components/ui/NeoInput';
import { NeoButton } from '@/components/ui/NeoButton';
import { User, Mail, Phone, ArrowRight, ShieldCheck } from 'lucide-react';

export default function SignupPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.push('/dashboard');
    };

    return (
        <main className="min-h-screen w-full flex items-center justify-center p-4 bg-background animate-in fade-in zoom-in duration-500">
            <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-12 items-center bg-transparent">

                {/* Left: Branding & Visual */}
                <div className="hidden md:flex flex-col justify-center space-y-8 p-8">
                    <div>
                        <h1 className="text-5xl font-extrabold text-foreground tracking-tight mb-6 flex flex-col gap-4">
                            <span>Join</span>
                            <img src="/brand/logo-full.png" alt="AllSupport" className="w-[260px] h-auto" />
                        </h1>
                        <p className="text-xl text-gray-500 font-medium leading-relaxed">
                            Create an account to manage your visas, bookings, and business services in one place.
                        </p>
                    </div>

                    <ul className="space-y-4">
                        {[
                            'Instant access to 12+ Government Services',
                            'Real-time tracking of applications',
                            'Secure document vault'
                        ].map((item, i) => (
                            <li key={i} className="flex items-center gap-3 text-gray-600 font-bold">
                                <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                                    <ShieldCheck size={14} />
                                </div>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Right: Signup Form (Wide Neo Card) */}
                <NeoCard className="p-10 md:p-12 w-full max-w-lg mx-auto md:ml-auto">
                    <div className="mb-10 text-center md:text-left">
                        <h2 className="text-3xl font-bold text-gray-800 mb-2">Get Started</h2>
                        <p className="text-gray-500 font-medium">It only takes a minute to register.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-3">
                            <label className="text-sm font-bold text-gray-400 uppercase tracking-wider ml-1">Full Name</label>
                            <div className="relative group">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-red-500 transition-colors" size={20} />
                                <NeoInput
                                    placeholder="John Doe"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                    className="pl-12 h-14 font-medium"
                                />
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label className="text-sm font-bold text-gray-400 uppercase tracking-wider ml-1">Email Address</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-red-500 transition-colors" size={20} />
                                <NeoInput
                                    type="email"
                                    placeholder="name@company.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    required
                                    className="pl-12 h-14 font-medium"
                                />
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label className="text-sm font-bold text-gray-400 uppercase tracking-wider ml-1">Phone Number</label>
                            <div className="relative group">
                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-red-500 transition-colors" size={20} />
                                <NeoInput
                                    type="tel"
                                    placeholder="+971 50 000 0000"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    required
                                    className="pl-12 h-14 font-medium"
                                />
                            </div>
                        </div>

                        <NeoButton type="submit" className="w-full h-14 text-lg font-bold group mt-4">
                            Create Account <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
                        </NeoButton>
                    </form>

                    <div className="mt-8 pt-6 border-t border-gray-100 text-center text-sm font-medium text-gray-500">
                        Already have an account?{' '}
                        <Link href="/login" className="text-red-600 hover:underline font-bold">
                            Log in
                        </Link>
                    </div>
                </NeoCard>
            </div>
        </main>
    );
}
