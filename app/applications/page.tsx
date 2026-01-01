'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { NeumorphicCard } from '@/components/ui/NeumorphicCard';
import { getUserThreads } from '@/lib/actions/unified';
import { useRouter } from 'next/navigation';

export default function ApplicationsPage() {
    const { user } = useAuth();
    const router = useRouter();
    const [apps, setApps] = useState<any[]>([]);

    useEffect(() => {
        if (!user) return;
        getUserThreads(user.id).then(setApps);
    }, [user]);

    return (
        <div className="w-full max-w-6xl mx-auto pt-8">
            <h1 className="text-2xl font-bold text-slate-700 mb-8 px-4">My Applications</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
                {apps.map((app) => (
                    <NeumorphicCard
                        key={app.id}
                        className="p-6 cursor-pointer hover:scale-[1.02] transition-transform group"
                        onClick={() => router.push('/messages')} // For now, all point to communication. Ideally deep link to thread.
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                                {app.type.replace('_', ' ')}
                            </div>
                            <span className={`text-xs font-medium px-2 py-1 rounded-lg ${app.status === 'OPEN' ? 'bg-green-100 text-green-600' : 'bg-slate-200 text-slate-500'
                                }`}>
                                {app.status}
                            </span>
                        </div>

                        <h3 className="text-lg font-bold text-slate-800 mb-2">
                            Application #{app.id.slice(-4)}
                        </h3>

                        <div className="text-sm text-slate-500 mb-6">
                            Last update: {new Date(app.updatedAt).toLocaleDateString()}
                        </div>

                        <div className="pt-4 border-t border-slate-200/50 flex justify-between items-center text-sm">
                            <span className="text-slate-400">View Details</span>
                            <span className="text-red-500 font-medium group-hover:translate-x-1 transition-transform">→</span>
                        </div>
                    </NeumorphicCard>
                ))}

                {apps.length === 0 && (
                    <div className="col-span-full py-20 text-center text-slate-400">
                        No applications found. Start a new service from the dashboard!
                    </div>
                )}
            </div>
        </div>
    );
}
