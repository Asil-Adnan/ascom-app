'use client';

import { use, useState } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { NeoCard } from '@/components/ui/NeoCard';
import { NeoButton } from '@/components/ui/NeoButton';
import { MOCK_APPLICATIONS, getServiceIcon, Application } from '@/lib/mock-data';
import { ArrowLeft, Mail, Phone, Calendar, Clock, Download, CheckCircle, XCircle, AlertCircle, FileText } from 'lucide-react';

export default function ApplicationDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const app = MOCK_APPLICATIONS.find(a => a.id === id);
    const [status, setStatus] = useState(app?.status || 'Pending');

    if (!app) return notFound();

    const Icon = getServiceIcon(app.type);

    return (
        <div className="space-y-6 pb-20">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Link href="/admin/applications">
                    <button className="p-2.5 rounded-xl bg-white border border-gray-200 hover:border-primary hover:text-primary transition-colors text-muted-foreground shadow-sm">
                        <ArrowLeft size={20} />
                    </button>
                </Link>
                <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                        <h1 className="text-2xl font-bold text-foreground">Application {app.id}</h1>
                        <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold border border-primary/20">
                            {app.type}
                        </span>
                    </div>
                    <p className="text-muted-foreground text-sm flex items-center gap-2">
                        Created on {app.date} • via Web
                    </p>
                </div>
                <div className="flex gap-2">
                    <NeoButton variant="secondary" size="sm">Reject</NeoButton>
                    <NeoButton size="sm">Approve Application</NeoButton>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-6">
                {/* Main Content: Applicant & Details */}
                <div className="col-span-2 space-y-6">
                    <NeoCard className="p-6">
                        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                            <Icon size={20} className="text-primary" />
                            Service Details
                        </h3>
                        <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                            <div className="col-span-2 p-3 bg-gray-50 rounded-xl border border-gray-100">
                                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-1">Description</span>
                                <span className="font-medium text-lg">{app.description}</span>
                            </div>
                            {Object.entries(app.details).map(([key, value]) => (
                                <div key={key}>
                                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-1">
                                        {key.replace(/([A-Z])/g, ' $1').trim()}
                                    </span>
                                    <span className="font-medium">
                                        {Array.isArray(value) ? value.join(', ') : String(value)}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </NeoCard>

                    <NeoCard className="p-6">
                        <h3 className="text-lg font-bold mb-4">Uploaded Documents</h3>
                        <div className="grid grid-cols-2 gap-4">
                            {[1, 2].map((i) => (
                                <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-gray-200 hover:border-primary/50 hover:bg-primary/5 transition-all group cursor-pointer">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-muted-foreground group-hover:text-primary">
                                            <FileText size={20} />
                                        </div>
                                        <div>
                                            <p className="font-medium text-sm">Document_{i}.pdf</p>
                                            <p className="text-xs text-muted-foreground">1.2 MB</p>
                                        </div>
                                    </div>
                                    <button className="p-2 hover:text-primary"><Download size={18} /></button>
                                </div>
                            ))}
                        </div>
                    </NeoCard>
                </div>

                {/* Sidebar: User & Status */}
                <div className="space-y-6">
                    <NeoCard className="p-6">
                        <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4">Applicant</h3>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-lg">
                                {app.user.name.charAt(0)}
                            </div>
                            <div>
                                <p className="font-bold">{app.user.name}</p>
                                <p className="text-xs text-muted-foreground">Premium User</p>
                            </div>
                        </div>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3 text-sm">
                                <Mail size={16} className="text-muted-foreground" />
                                {app.user.email}
                            </div>
                            <div className="flex items-center gap-3 text-sm">
                                <Phone size={16} className="text-muted-foreground" />
                                {app.user.phone}
                            </div>
                        </div>
                    </NeoCard>

                    <NeoCard className="p-6">
                        <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4">Status History</h3>
                        <div className="relative pl-4 space-y-6 border-l-2 border-gray-100">
                            <div className="relative">
                                <div className="w-3 h-3 bg-primary rounded-full absolute -left-[21px] top-1.5 ring-4 ring-white" />
                                <p className="text-sm font-bold">Application Received</p>
                                <p className="text-xs text-muted-foreground">{app.date} • 10:30 AM</p>
                            </div>
                            <div className="relative">
                                <div className="w-3 h-3 bg-gray-200 rounded-full absolute -left-[21px] top-1.5 ring-4 ring-white" />
                                <p className="text-sm font-medium text-muted-foreground">Pending Review</p>
                                <p className="text-xs text-muted-foreground">Waiting for staff</p>
                            </div>
                        </div>
                    </NeoCard>
                </div>
            </div>
        </div>
    );
}
