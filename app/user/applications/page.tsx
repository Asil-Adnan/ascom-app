'use client';

import { NeoCard } from '@/components/ui/NeoCard';
import { Bus, Clock, CheckCircle, AlertOctagon, Loader2, MessageSquare, AlertCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { getUserApplications } from '@/app/actions/application-management';
import Link from 'next/link';

export default function UserApplicationsPage() {
    const { user, loading: authLoading } = useAuth();
    const [applications, setApplications] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (authLoading) return;

        const fetchApps = async () => {
            // If user is logged in, use their email. If not (for this demo flow), 
            // we might want to show all or nothing. Let's assume for demo continuity 
            // we try to fetch by the demo email if no user is strictly logged in, 
            // or just fetch all if no email provided (controlled by backend).
            // For safety, we only fetch if we have an identifier or just fetch all for demo.

            setLoading(true);
            const res = await getUserApplications(user?.email || undefined);
            if (res.success) {
                setApplications(res.data);
            }
            setLoading(false);
        };

        fetchApps();
    }, [user, authLoading]);

    if (authLoading || (loading && applications.length === 0)) {
        return (
            <div className="min-h-screen bg-gray-50/50 flex items-center justify-center">
                <Loader2 className="animate-spin text-blue-500" size={32} />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50/50 p-6 md:p-12 pb-32">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-extrabold text-gray-800 mb-2">My Applications</h1>
                <p className="text-gray-500 mb-8">Track the status of your visa and travel requests.</p>

                <div className="space-y-4">
                    {applications.length === 0 ? (
                        <div className="text-center py-12 bg-white rounded-2xl border border-gray-100">
                            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300">
                                <Bus size={32} />
                            </div>
                            <h3 className="font-bold text-gray-700">No applications found</h3>
                            <p className="text-sm text-gray-400 mt-1">Start a new application to see it here.</p>
                            <Link href="/services/bus-visa">
                                <button className="mt-4 px-6 py-2 bg-primary text-white font-bold rounded-xl text-sm hover:bg-primary/90 transition-colors">
                                    Book Now
                                </button>
                            </Link>
                        </div>
                    ) : (
                        applications.map((app) => (
                            <div key={app.id} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <NeoCard className={`p-6 border-l-4 ${app.status === 'APPROVED' ? 'border-l-green-500' :
                                        app.status === 'REJECTED' ? 'border-l-red-500' :
                                            'border-l-blue-500'
                                    }`}>
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-start gap-4">
                                            <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${app.status === 'APPROVED' ? 'bg-green-50 text-green-500' :
                                                    app.status === 'REJECTED' ? 'bg-red-50 text-red-500' :
                                                        'bg-blue-50 text-blue-500'
                                                }`}>
                                                {app.type === 'BUS_VISA' ? <Bus size={24} /> : <FileText size={24} />}
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <h3 className="font-bold text-gray-800 text-lg">Bus Visa Package</h3>
                                                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${app.status === 'APPROVED' ? 'bg-green-100 text-green-700' :
                                                            app.status === 'REJECTED' ? 'bg-red-100 text-red-700' :
                                                                'bg-blue-100 text-blue-700'
                                                        }`}>
                                                        {app.status.replace('_', ' ')}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-gray-500">ID: {app.id}</p>
                                                <p className="text-xs text-gray-400 mt-1">Submitted on {new Date(app.createdAt).toLocaleDateString()}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Messages / Updates Preview */}
                                    {app.messages && app.messages.length > 0 && (
                                        <div className="mt-6 pt-4 border-t border-gray-100">
                                            <p className="text-xs font-bold text-gray-400 uppercase mb-2">Latest Update</p>
                                            <div className="bg-gray-50 rounded-xl p-3 text-sm text-gray-600 flex gap-3">
                                                <MessageSquare size={16} className="mt-0.5 text-primary shrink-0" />
                                                <div className="flex-1">
                                                    <p className="font-medium text-gray-800">
                                                        {app.messages[app.messages.length - 1].senderRole === 'ADMIN' ? 'Support Team' : 'System update'}
                                                    </p>
                                                    <p className="line-clamp-2">{app.messages[app.messages.length - 1].content}</p>
                                                </div>
                                                <span className="text-xs text-gray-400 whitespace-nowrap">
                                                    {new Date(app.messages[app.messages.length - 1].createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </span>
                                            </div>
                                        </div>
                                    )}

                                    {/* Action Buttons (Future expansion) */}
                                    {app.status === 'APPROVED' && (
                                        <div className="mt-4 flex gap-2">
                                            <button className="text-xs font-bold bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors">
                                                Download Visa
                                            </button>
                                        </div>
                                    )}
                                </NeoCard>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
// Helper import (FileText was missing in original imports list above)
import { FileText } from 'lucide-react';
