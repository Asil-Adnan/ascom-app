import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { NeoCard } from '@/components/ui/NeoCard';
import { NeoButton } from '@/components/ui/NeoButton';
import { getServiceIcon } from '@/lib/mock-data';
import { ArrowLeft, Mail, Phone, Calendar, Clock, Download, CheckCircle, XCircle, AlertCircle, FileText, User, CreditCard } from 'lucide-react';

export default async function ApplicationDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const app = await prisma.application.findUnique({
        where: { id },
        include: { user: true }
    });

    if (!app) return notFound();

    // Parse JSON data
    let appData: any = {};
    let documents: any[] = [];
    try {
        appData = JSON.parse(app.data);
        documents = JSON.parse(app.documents);
    } catch (e) {
        console.error('Error parsing application data', e);
    }

    const { personalInfo, importantDates, busId, passportData } = appData;
    const Icon = getServiceIcon(app.type);

    return (
        <div className="space-y-6 pb-20">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Link href="/admin/dashboard"> {/* Changed to dashboard as applications list might not be main entry */}
                    <button className="p-2.5 rounded-xl bg-white border border-gray-200 hover:border-primary hover:text-primary transition-colors text-muted-foreground shadow-sm">
                        <ArrowLeft size={20} />
                    </button>
                </Link>
                <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                        <h1 className="text-2xl font-bold text-foreground">Application Details</h1>
                        <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold border border-primary/20">
                            {app.id}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold border ${app.status === 'IN_PROCESS' ? 'bg-blue-100 text-blue-700 border-blue-200' : 'bg-gray-100 text-gray-600 border-gray-200'}`}>
                            {app.status.replace('_', ' ')}
                        </span>
                    </div>
                    <p className="text-muted-foreground text-sm flex items-center gap-2">
                        Submitted on {app.createdAt.toLocaleDateString()} at {app.createdAt.toLocaleTimeString()}
                    </p>
                </div>
                <div className="flex gap-2">
                    <NeoButton variant="secondary" size="sm">Reject</NeoButton>
                    <NeoButton size="sm">Update Status</NeoButton>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-6">
                {/* Main Content: Details */}
                <div className="col-span-2 space-y-6">
                    {/* Personal Information */}
                    <NeoCard className="p-6">
                        <h3 className="text-lg font-bold mb-4 flex items-center gap-2 border-b pb-2">
                            <User size={20} className="text-blue-600" />
                            Personal Information
                        </h3>
                        <div className="grid grid-cols-2 gap-y-6 gap-x-8">
                            <div>
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">Full Name</span>
                                <span className="font-bold text-lg text-gray-800">{personalInfo?.name || app.user.name}</span>
                            </div>
                            <div>
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">Age</span>
                                <span className="font-medium text-gray-700">{personalInfo?.age || 'N/A'}</span>
                            </div>
                            <div>
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">Phone Number</span>
                                <span className="font-medium text-gray-700">{personalInfo?.phone || app.user.phone}</span>
                            </div>
                            <div>
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">WhatsApp</span>
                                <span className="font-medium text-gray-700">{personalInfo?.whatsapp || 'N/A'}</span>
                            </div>
                        </div>
                    </NeoCard>

                    {/* Service & Dates */}
                    <NeoCard className="p-6">
                        <h3 className="text-lg font-bold mb-4 flex items-center gap-2 border-b pb-2">
                            <Calendar size={20} className="text-orange-600" />
                            Service & Important Dates
                        </h3>
                        <div className="grid grid-cols-2 gap-y-6 gap-x-8">
                            <div className="col-span-2">
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">Service Type</span>
                                <div className="flex items-center gap-2">
                                    <Icon size={18} className="text-primary" />
                                    <span className="font-bold text-primary">{app.type}</span>
                                    {busId && <span className="text-xs bg-gray-100 px-2 py-0.5 rounded border">Bus ID: {busId}</span>}
                                </div>
                            </div>
                            <div>
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">Passport Expiry</span>
                                <span className={`font-mono font-medium ${!importantDates?.passportExpiry ? 'text-gray-400' : ''}`}>
                                    {importantDates?.passportExpiry || 'Not Provided'}
                                </span>
                            </div>
                            <div>
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">Visa Expiry</span>
                                <span className={`font-mono font-medium ${!importantDates?.visaExpiry ? 'text-gray-400' : ''}`}>
                                    {importantDates?.visaExpiry || 'Not Provided'}
                                </span>
                            </div>
                        </div>
                    </NeoCard>

                    {/* Documents */}
                    <NeoCard className="p-6">
                        <h3 className="text-lg font-bold mb-4 flex items-center gap-2 border-b pb-2">
                            <FileText size={20} className="text-green-600" />
                            Uploaded Documents
                        </h3>
                        {documents.length === 0 ? (
                            <p className="text-gray-400 text-sm italic">No documents uploaded.</p>
                        ) : (
                            <div className="grid grid-cols-2 gap-4">
                                {documents.map((doc: any, i: number) => (
                                    <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-gray-200 hover:border-primary/50 hover:bg-primary/5 transition-all group">
                                        <div className="flex items-center gap-3 overflow-hidden">
                                            <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-muted-foreground group-hover:text-primary shrink-0">
                                                <FileText size={20} />
                                            </div>
                                            <div className="min-w-0">
                                                <p className="font-bold text-sm truncate">{doc.label || doc.type || 'Document'}</p>
                                                <p className="text-xs text-muted-foreground truncate">{doc.name || 'filename.jpg'}</p>
                                            </div>
                                        </div>
                                        {/* In real app, this would be a real link */}
                                        <a href={doc.mockUrl} target="_blank" rel="noopener noreferrer" className="p-2 hover:text-primary shrink-0">
                                            <Download size={18} />
                                        </a>
                                    </div>
                                ))}
                            </div>
                        )}
                    </NeoCard>
                </div>

                {/* Sidebar: User & Status */}
                <div className="space-y-6">
                    <NeoCard className="p-6">
                        <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4">Account</h3>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-lg">
                                {app.user.name.charAt(0)}
                            </div>
                            <div>
                                <p className="font-bold">{app.user.name}</p>
                                <p className="text-xs text-muted-foreground">{app.user.email}</p>
                            </div>
                        </div>
                    </NeoCard>

                    <NeoCard className="p-6">
                        <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4">Internal Actions</h3>
                        <div className="space-y-3">
                            <NeoButton className="w-full justify-start" variant="ghost">
                                <Mail size={16} className="mr-2" /> Send Email Receipt
                            </NeoButton>
                            <NeoButton className="w-full justify-start" variant="ghost">
                                <MessageSquare size={16} className="mr-2" /> Message User
                            </NeoButton>
                        </div>
                    </NeoCard>
                </div>
            </div>
        </div>
    );
}

// Helper icon import
import { MessageSquare } from 'lucide-react';
