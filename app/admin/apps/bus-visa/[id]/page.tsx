import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { ArrowLeft, User, Calendar, MapPin, FileText, Download, CheckCircle, Clock } from 'lucide-react';
import { NeoCard } from '@/components/ui/NeoCard';
import { notFound } from 'next/navigation';

export default async function BusVisaAppDetailsPage({ params }: { params: { id: string } }) {
    // Await params before accessing properties
    const resolvedParams = await Promise.resolve(params);
    const { id } = resolvedParams;

    const app = await prisma.application.findUnique({
        where: { id },
        include: { user: true }
    });

    if (!app) notFound();

    const data = JSON.parse(app.data as string);
    const documents = JSON.parse(app.documents as string);

    return (
        <div className="space-y-8 animate-in fade-in duration-500 max-w-5xl mx-auto">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Link href="/admin/apps/bus-visa">
                    <button className="w-10 h-10 rounded-xl neo-btn flex items-center justify-center text-gray-500 hover:text-red-500 transition-colors">
                        <ArrowLeft size={20} strokeWidth={2.5} />
                    </button>
                </Link>
                <div>
                    <h1 className="text-2xl font-extrabold text-gray-700">Application Details</h1>
                    <p className="text-gray-400 font-medium">#{app.id}</p>
                </div>
                <div className="ml-auto flex gap-4">
                    <button className="neo-btn px-6 py-2 text-sm font-bold text-red-500 hover:bg-red-50">
                        Reject
                    </button>
                    <button className="neo-btn px-6 py-2 text-sm font-bold text-white bg-green-500 hover:bg-green-600">
                        Approve
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Applicant Info & Status */}
                <div className="space-y-6">
                    <NeoCard className="p-6">
                        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">Status</h3>
                        <div className={`flex items-center gap-3 p-4 rounded-xl ${app.status === 'PENDING'
                                ? 'bg-orange-50 text-orange-600 border border-orange-100'
                                : 'bg-green-50 text-green-600 border border-green-100'
                            }`}>
                            {app.status === 'PENDING' ? <Clock size={24} /> : <CheckCircle size={24} />}
                            <div>
                                <p className="font-bold text-lg">{app.status}</p>
                                <p className="text-xs opacity-80">Last updated: {new Date(app.updatedAt).toLocaleDateString()}</p>
                            </div>
                        </div>
                    </NeoCard>

                    <NeoCard className="p-6">
                        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">Applicant</h3>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-16 h-16 rounded-full neo-inset flex items-center justify-center font-bold text-2xl text-gray-500">
                                {app.user.name ? app.user.name.charAt(0) : 'U'}
                            </div>
                            <div>
                                <p className="font-bold text-gray-700">{app.user.name}</p>
                                <p className="text-sm text-gray-400">{app.user.email}</p>
                            </div>
                        </div>
                        <div className="space-y-4 pt-4 border-t border-gray-100">
                            <div className="flex items-center gap-3 text-gray-600">
                                <User size={16} />
                                <span className="text-sm font-medium">{app.user.phone}</span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-600">
                                <MapPin size={16} />
                                <span className="text-sm font-medium">United Arab Emirates</span>
                            </div>
                        </div>
                    </NeoCard>
                </div>

                {/* Middle/Right: Application Data */}
                <div className="lg:col-span-2 space-y-6">
                    <NeoCard className="p-8">
                        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-8">Passport Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <p className="text-xs font-bold text-gray-400 uppercase mb-1">Full Name</p>
                                <p className="text-lg font-bold text-gray-700">{data.name}</p>
                            </div>
                            <div>
                                <p className="text-xs font-bold text-gray-400 uppercase mb-1">Passport Number</p>
                                <p className="text-lg font-bold text-gray-700">{data.passportNumber}</p>
                            </div>
                            <div>
                                <p className="text-xs font-bold text-gray-400 uppercase mb-1">Nationality</p>
                                <p className="text-lg font-bold text-gray-700">{data.nationality}</p>
                            </div>
                            <div>
                                <p className="text-xs font-bold text-gray-400 uppercase mb-1">Expiry Date</p>
                                <div className="flex items-center gap-2 text-gray-700">
                                    <Calendar size={18} className="text-red-500" />
                                    <p className="text-lg font-bold">{data.expiryDate}</p>
                                </div>
                            </div>
                        </div>
                    </NeoCard>

                    <NeoCard className="p-8">
                        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">Uploaded Documents</h3>
                        <div className="space-y-3">
                            {documents.map((doc: string, idx: number) => (
                                <div key={idx} className="flex items-center justify-between p-4 rounded-xl border border-gray-100 bg-gray-50/50 hover:bg-gray-100 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-lg bg-red-50 text-red-500 flex items-center justify-center">
                                            <FileText size={20} />
                                        </div>
                                        <div>
                                            <p className="font-bold text-sm text-gray-700">{doc}</p>
                                            <p className="text-xs text-gray-400">PDF • 2.4 MB</p>
                                        </div>
                                    </div>
                                    <button className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:text-red-500 hover:border-red-500 transition-colors">
                                        <Download size={16} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </NeoCard>
                </div>
            </div>
        </div>
    );
}
