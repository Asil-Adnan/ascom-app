'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { NeoCard } from '@/components/ui/NeoCard';
import { NeoInput } from '@/components/ui/NeoInput';
import { NeoButton } from '@/components/ui/NeoButton';
import { Lock, ArrowRight, ShieldCheck, Briefcase, User } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';

export default function AdminLoginPage() {
    const { loginAdmin } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        await loginAdmin(username, password);
    };

    return (
        <main className="min-h-screen w-full flex items-center justify-center p-4 bg-background animate-in fade-in zoom-in duration-500">
            <div className="w-full max-w-lg">
                <NeoCard className="p-10 md:p-12 w-full">

                    <div className="flex flex-col items-center justify-center mb-8">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4 shadow-inner">
                            <Briefcase className="text-red-500" size={32} />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800">Staff Portal</h2>
                        <p className="text-gray-500 text-sm font-medium mt-2">Authorized Access Only</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-3">
                            <label className="text-sm font-bold text-gray-400 uppercase tracking-wider ml-1">Username</label>
                            <div className="relative group">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-red-500 transition-colors" size={20} />
                                <NeoInput
                                    type="text"
                                    placeholder="admin@internal"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                    className="pl-12 h-14 font-medium text-lg"
                                />
                            </div>
                        </div>
                        <div className="space-y-3">
                            <label className="text-sm font-bold text-gray-400 uppercase tracking-wider ml-1">Secure Password</label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-red-500 transition-colors" size={20} />
                                <NeoInput
                                    type="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="pl-12 h-14 font-medium text-lg"
                                />
                            </div>
                        </div>
                        <NeoButton type="submit" className="w-full h-14 text-lg font-bold group">
                            Authenticate <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
                        </NeoButton>
                    </form>

                    <div className="mt-8 pt-6 border-t border-gray-100 text-center text-sm font-medium text-gray-500">
                        Not a staff member?{' '}
                        <Link href="/login" className="text-red-600 hover:underline font-bold">
                            Go to User App
                        </Link>
                    </div>
                </NeoCard>
            </div>
        </main>
    );
}
