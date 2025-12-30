'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { NeoCard } from '@/components/ui/NeoCard';
import { NeoButton } from '@/components/ui/NeoButton';
import { NeoInput } from '@/components/ui/NeoInput';
import { ArrowLeft, User, Briefcase, ChevronRight } from 'lucide-react';
import { db } from '@/lib/db';

function JobsDetailsContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const appId = searchParams.get('id');
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        targetRole: '',
        experience: '0-2'
    });

    useEffect(() => {
        if (!appId) return;
        db.getApplication(appId).then(app => {
            if (app) {
                setFormData({
                    targetRole: app.data.targetRole || '',
                    experience: app.data.experience || '0-2'
                });
                setLoading(false);
            }
        });
    }, [appId]);

    const handleNext = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!appId) return;

        await db.updateApplication(appId, {
            step: 2,
            data: { ...formData }
        });

        router.push(`/services/jobs/documents?id=${appId}`);
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="w-full max-w-4xl mx-auto py-12 animate-in fade-in zoom-in duration-300">
            <header className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-4">
                    <Link href="/services/jobs">
                        <button className="w-12 h-12 rounded-xl neo-btn flex items-center justify-center text-gray-500 hover:text-red-500 transition-colors">
                            <ArrowLeft size={22} strokeWidth={2.5} />
                        </button>
                    </Link>
                    <div>
                        <h1 className="text-3xl font-extrabold text-foreground">Career Goals</h1>
                        <p className="text-gray-500 font-medium">Tell us about your professional aspirations.</p>
                    </div>
                </div>
                <div className="text-sm font-bold text-gray-400 uppercase tracking-widest">Step 1 of 4</div>
            </header>

            <form onSubmit={handleNext} className="space-y-8">
                <NeoCard className="p-10 space-y-8">
                    <div className="space-y-6">
                        <div className="space-y-3">
                            <label className="text-base font-bold text-gray-600 ml-1">Target Role</label>
                            <div className="relative group">
                                <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-red-500 transition-colors" size={20} />
                                <NeoInput
                                    placeholder="e.g. Sales Manager, Accountant"
                                    required
                                    className="pl-12 h-16 text-lg"
                                    value={formData.targetRole}
                                    onChange={e => setFormData({ ...formData, targetRole: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label className="text-base font-bold text-gray-600 ml-1">Years of Experience</label>
                            <div className="grid grid-cols-4 gap-6">
                                {['0-2', '3-5', '5-8', '8+'].map((yr) => (
                                    <button
                                        key={yr}
                                        type="button"
                                        onClick={() => setFormData({ ...formData, experience: yr })}
                                        className={`h-16 rounded-xl font-bold text-lg transition-all 
                                ${formData.experience === yr
                                                ? 'neo-inset text-red-600 border border-red-100'
                                                : 'neo-btn text-gray-500 hover:text-red-500'}
                           `}
                                    >
                                        {yr} Yrs
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </NeoCard>

                <div className="flex justify-end pt-4">
                    <NeoButton type="submit" size="lg" className="w-64 h-16 text-xl font-bold tracking-wide text-red-600 hover:text-white hover:bg-red-500 flex items-center gap-3">
                        Next Step <ChevronRight size={24} strokeWidth={3} />
                    </NeoButton>
                </div>
            </form>
        </div>
    );
}

export default function JobsDetailsPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <JobsDetailsContent />
        </Suspense>
    );
}
