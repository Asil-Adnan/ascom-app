'use client';

import Link from 'next/link';
import { NeoCard } from '@/components/ui/NeoCard';
import { NeoButton } from '@/components/ui/NeoButton';
import { useAuth } from '@/lib/auth-context';
import { ArrowLeft, Briefcase, FileText, CheckCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { db } from '@/lib/db';

export default function JobsStartPage() {
    const router = useRouter();
    const { user } = useAuth();

    const handleStart = async () => {
        if (!user) {
            router.push('/login');
            return;
        }

        const app = await db.createApplication(user.id, 'JOBS');
        router.push(`/services/jobs/details?id=${app.id}`);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] w-full max-w-6xl animate-in fade-in zoom-in duration-500">

            {/* Large Soft-Plastic Container */}
            <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 bg-transparent">

                {/* Left: Info Panel (Text) */}
                <div className="space-y-8 p-4">
                    <div>
                        <Link href="/dashboard" className="inline-flex items-center gap-2 text-gray-500 hover:text-red-500 transition-colors mb-6 group">
                            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                            <span className="font-bold">Back to Dashboard</span>
                        </Link>
                        <h1 className="text-5xl font-extrabold text-foreground leading-tight tracking-tight mb-4">
                            Find Your <span className="text-red-600">Dream Job</span> in Dubai
                        </h1>
                        <p className="text-lg text-gray-500 leading-relaxed font-medium">
                            We optimize your CV, rewrite your cover letter, and manually distribute your profile to 500+ top recruiters across the UAE.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <div className="neo-raised p-6 flex items-center gap-6">
                            <div className="w-14 h-14 rounded-full neo-inset flex items-center justify-center text-red-500">
                                <FileText size={28} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-700">CV Optimization</h3>
                                <p className="text-sm text-gray-500 font-medium">ATS-friendly formatting guaranteed</p>
                            </div>
                        </div>

                        <div className="neo-raised p-6 flex items-center gap-6">
                            <div className="w-14 h-14 rounded-full neo-inset flex items-center justify-center text-red-500">
                                <CheckCircle size={28} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-700">Recruiter Access</h3>
                                <p className="text-sm text-gray-500 font-medium">Direct submission to HR departments</p>
                            </div>
                        </div>
                    </div>

                    <div className="pt-4">
                        <NeoButton size="lg" className="w-64 h-16 text-xl font-bold tracking-wide text-red-600 hover:text-white hover:bg-red-500 transition-colors" onClick={handleStart}>
                            Start Application
                        </NeoButton>
                    </div>
                </div>

                {/* Right: Visual (Big Raised Card) */}
                <div className="hidden lg:flex items-center justify-center">
                    <div className="w-full aspect-square neo-raised flex items-center justify-center relative overflow-hidden group">
                        {/* Decorative Circles */}
                        <div className="absolute w-[120%] h-[120%] bg-gradient-to-br from-gray-100 to-transparent rounded-full opacity-50 blur-3xl pointer-events-none"></div>

                        <div className="relative z-10 w-64 h-64 neo-inset rounded-full flex items-center justify-center text-red-500">
                            <Briefcase size={120} strokeWidth={1.5} className="drop-shadow-sm" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
