'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { NeoCard } from '@/components/ui/NeoCard';
import { NeoInput } from '@/components/ui/NeoInput';
import { NeoButton } from '@/components/ui/NeoButton';
import { User, Lock, ArrowRight, ShieldCheck } from 'lucide-react';

import { useAuth } from '@/lib/auth-context';

export default function LoginPage() {
    const router = useRouter(); // Keeping router just in case, though login() handles it. Actually login() handles it.
    const { login } = useAuth();
    const [step, setStep] = useState<'email' | 'otp'>('email');
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');

    const handleSendOtp = (e: React.FormEvent) => {
        e.preventDefault();
        setTimeout(() => setStep('otp'), 500);
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (otp === '1234') {
            await login(email);
        } else {
            alert('Invalid OTP (Try 1234)');
        }
    };

    return (
        <main className="min-h-screen w-full flex items-center justify-center p-4 bg-background animate-in fade-in zoom-in duration-500">
            <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-transparent">

                {/* Left: Branding & Visual */}
                <div className="hidden md:flex flex-col justify-center space-y-8 p-8">
                    <div>
                        <h1 className="mb-8">
                            <img src="/brand/logo-full.png" alt="AllSupport" className="w-[280px] h-auto" />
                        </h1>
                        <p className="text-xl text-gray-500 font-medium leading-relaxed">
                            Your gateway to seamless visa, travel, and business services in the UAE.
                        </p>
                    </div>

                    <div className="flex gap-4">
                        <div className="neo-raised px-6 py-4 flex items-center gap-3 w-fit">
                            <ShieldCheck className="text-green-500" size={24} />
                            <div>
                                <p className="text-xs font-bold text-gray-400 uppercase">Trust Score</p>
                                <p className="font-bold text-gray-700">4.9/5 Excellent</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right: Login Form (Wide Neo Card) */}
                <NeoCard className="p-10 md:p-12 w-full max-w-lg mx-auto md:ml-auto">
                    <div className="mb-10 text-center md:text-left">
                        <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h2>
                        <p className="text-gray-500 font-medium">
                            {step === 'email' ? 'Enter your credentials to access your dashboard.' : `We sent a code to ${email}`}
                        </p>
                    </div>

                    {step === 'email' ? (
                        <form onSubmit={handleSendOtp} className="space-y-6">
                            <div className="space-y-3">
                                <label className="text-sm font-bold text-gray-400 uppercase tracking-wider ml-1">Email Address</label>
                                <div className="relative group">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-red-500 transition-colors" size={20} />
                                    <NeoInput
                                        type="email"
                                        placeholder="name@company.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        autoFocus
                                        className="pl-12 h-14 font-medium text-lg"
                                    />
                                </div>
                            </div>
                            <NeoButton type="submit" className="w-full h-14 text-lg font-bold group">
                                Continue <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
                            </NeoButton>
                        </form>
                    ) : (
                        <form onSubmit={handleLogin} className="space-y-6">
                            <div className="space-y-3">
                                <label className="text-sm font-bold text-gray-400 uppercase tracking-wider ml-1">One-Time Password</label>
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-red-500 transition-colors" size={20} />
                                    <NeoInput
                                        type="text"
                                        placeholder="• • • •"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                        maxLength={4}
                                        required
                                        autoFocus
                                        className="pl-12 h-14 font-bold text-2xl tracking-[0.5em] text-center"
                                    />
                                </div>
                            </div>

                            <NeoButton type="submit" className="w-full h-14 text-lg font-bold">
                                Verify & Login
                            </NeoButton>

                            <button
                                type="button"
                                onClick={() => setStep('email')}
                                className="w-full text-sm font-bold text-gray-400 hover:text-red-500 transition-colors"
                            >
                                Change Email Address
                            </button>
                        </form>
                    )}

                    <div className="mt-8 pt-6 border-t border-gray-100 text-center text-sm font-medium text-gray-500">
                        New to AllSupport?{' '}
                        <Link href="/signup" className="text-red-600 hover:underline font-bold">
                            Create Account
                        </Link>
                    </div>
                </NeoCard>
            </div>
        </main>
    );
}
