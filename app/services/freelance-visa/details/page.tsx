'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { NeoCard } from '@/components/ui/NeoCard';
import { NeoButton } from '@/components/ui/NeoButton';
import { NeoIcon } from '@/components/ui/NeoIcon';
import { ArrowLeft, GraduationCap, LayoutGrid, CheckCircle } from 'lucide-react';
import { db } from '@/lib/db';

function FreelanceDetailsContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const appId = searchParams.get('id');
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        education: 'Bachelor',
        category: 'Media'
    });

    useEffect(() => {
        if (!appId) return;
        db.getApplication(appId).then(app => {
            if (app) {
                setFormData({
                    education: app.data.education || 'Bachelor',
                    category: app.data.category || 'Media'
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

        router.push(`/services/freelance-visa/documents?id=${appId}`);
    };

    if (loading) return <div className="p-12 text-center font-bold text-gray-500">Loading...</div>;

    return (
        <div className="w-full max-w-6xl mx-auto py-12 animate-in fade-in zoom-in duration-300">

            {/* Header */}
            <div className="flex items-center gap-4 mb-12">
                <Link href="/services/freelance-visa">
                    <button className="w-12 h-12 rounded-xl neo-btn flex items-center justify-center text-gray-500 hover:text-red-500 transition-colors">
                        <ArrowLeft size={22} strokeWidth={2.5} />
                    </button>
                </Link>
                <div>
                    <h1 className="text-3xl font-extrabold text-foreground">Eligibility Check</h1>
                    <p className="text-gray-500 font-medium">Select your profession and qualifications.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Main Form (8 Cols) */}
                <div className="lg:col-span-8">
                    <form onSubmit={handleNext} className="space-y-8">
                        <NeoCard className="p-10">
                            <div className="flex items-center gap-4 mb-8">
                                <NeoIcon icon={GraduationCap} size={28} variant="inset" className="text-indigo-500" />
                                <h3 className="text-xl font-bold text-gray-700">Professional Profile</h3>
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-4">
                                    <label className="text-sm font-bold text-gray-400 uppercase tracking-wider ml-1">Education Level</label>
                                    <div className="relative">
                                        <select
                                            className="w-full h-16 rounded-xl bg-background px-4 text-lg font-bold neo-inset text-gray-700 outline-none focus:ring-2 focus:ring-indigo-500/20"
                                            value={formData.education}
                                            onChange={e => setFormData({ ...formData, education: e.target.value })}
                                        >
                                            <option value="None">No Degree</option>
                                            <option value="Diploma">High School Diploma</option>
                                            <option value="Bachelor">Bachelor Degree</option>
                                            <option value="Master">Master Degree</option>
                                            <option value="PhD">PhD / Doctorate</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <label className="text-sm font-bold text-gray-400 uppercase tracking-wider ml-1">Freelance Category</label>
                                    <div className="relative">
                                        <select
                                            className="w-full h-16 rounded-xl bg-background px-4 text-lg font-bold neo-inset text-gray-700 outline-none focus:ring-2 focus:ring-indigo-500/20"
                                            value={formData.category}
                                            onChange={e => setFormData({ ...formData, category: e.target.value })}
                                        >
                                            <option value="Media">Media & Production</option>
                                            <option value="Tech">Tech & Development</option>
                                            <option value="Education">Education & Training</option>
                                            <option value="Marketing">Marketing & PR</option>
                                            <option value="Design">Art & Design</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </NeoCard>

                        <NeoButton type="submit" size="lg" className="w-full h-16 text-lg font-bold tracking-wide">
                            Continue to Documents
                        </NeoButton>
                    </form>
                </div>

                {/* Right Side: Benefits (4 Cols) */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="neo-raised p-8 h-full bg-indigo-50/20 border border-indigo-50/50">
                        <h3 className="text-xl font-bold text-gray-700 mb-8">Why it matters?</h3>
                        <div className="space-y-6">
                            <p className="text-sm text-gray-600 leading-relaxed">
                                Your education level helps determine which freelance permit tier you qualify for. Higher qualifications may unlock longer visa durations.
                            </p>

                            <div className="mt-8 p-4 rounded-xl bg-white/60 border border-white flex items-start gap-3">
                                <LayoutGrid className="text-indigo-500 mt-1" size={20} />
                                <div>
                                    <h4 className="font-bold text-gray-800">Category Selection</h4>
                                    <p className="text-xs text-gray-500 mt-1">Ensure your category matches your intended business activities to avoid fines.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function FreelanceDetailsPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <FreelanceDetailsContent />
        </Suspense>
    );
}
