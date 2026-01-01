import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { ArrowLeft, User, Calendar, MapPin, FileText, Download, CheckCircle, Clock, MessageSquare, Send, Paperclip, BusFront, AlertCircle } from 'lucide-react';
import { NeoCard } from '@/components/ui/NeoCard';
import { notFound } from 'next/navigation';
import { updateApplicationStatus, sendApplicationMessage } from '@/app/actions/application-management';
// We'll use a client component wrapper for the interactive parts if simple enough,
// but let's try to keep it server-first where possible and use small client islands.
import { StatusSelector } from './components/StatusSelector';
import { ChatInterface } from './components/ChatInterface';

export default async function BusVisaAppDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const app = await prisma.application.findUnique({
        where: { id },
        include: {
            user: true,
            messages: { orderBy: { createdAt: 'asc' } }
        }
    });

    if (!app) notFound();

    const data = JSON.parse(app.data as string);
    const documents = JSON.parse(app.documents as string);

    // Fetch Bus Details if busId exists
    let busDetails = null;
    if (data.busId) {
        busDetails = await prisma.busListing.findUnique({
            where: { id: data.busId },
            include: { available_dates: true }
        });
    }

    // Helper to check if file is image
    const isImage = (filename: string) => /\.(jpg|jpeg|png|webp)$/i.test(filename || '');

    return (
        <div className="space-y-8 animate-in fade-in duration-500 max-w-6xl mx-auto pb-20">
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
                <div className="ml-auto">
                    <StatusSelector applicationId={app.id} currentStatus={app.status} />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Applicant & Bus Info */}
                <div className="space-y-6">
                    <NeoCard className="p-6">
                        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">Overview</h3>
                        <div className={`flex items-center gap-3 p-4 rounded-xl mb-6 ${app.status === 'IN_PROCESS'
                                ? 'bg-blue-50 text-blue-600 border border-blue-100'
                                : app.status === 'APPROVED' || app.status === 'COMPLETED'
                                    ? 'bg-green-50 text-green-600 border border-green-100'
                                    : app.status === 'REJECTED'
                                        ? 'bg-red-50 text-red-600 border border-red-100'
                                        : 'bg-gray-50 text-gray-600 border border-gray-100'
                            } `}>
                            {app.status === 'IN_PROCESS' ? <Clock size={24} /> : <CheckCircle size={24} />}
                            <div>
                                <p className="font-bold text-lg">{app.status.replace('_', ' ')}</p>
                                <p className="text-xs opacity-80">Submitted: {new Date(app.createdAt).toLocaleDateString()}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 rounded-full neo-inset flex items-center justify-center font-bold text-xl text-gray-500">
                                {data.personalInfo?.name?.charAt(0) || app.user.name.charAt(0)}
                            </div>
                            <div>
                                <p className="font-bold text-gray-700">{data.personalInfo?.name || app.user.name}</p>
                                <p className="text-sm text-gray-400">{app.user.email}</p>
                            </div>
                        </div>
                        <div className="space-y-2 text-sm text-gray-600 border-t pt-4">
                            <div className="flex justify-between">
                                <span>Phone:</span>
                                <span className="font-bold">{data.personalInfo?.phone || app.user.phone}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>WhatsApp:</span>
                                <span className="font-bold">{data.personalInfo?.whatsapp || 'N/A'}</span>
                            </div>
                        </div>
                    </NeoCard>

                    {/* Bus Details Card */}
                    {busDetails && (
                        <NeoCard className="p-6 bg-red-50/30 border-red-100">
                            <div className="flex items-center gap-3 mb-4 text-red-600">
                                <BusFront size={20} />
                                <h3 className="text-sm font-bold uppercase tracking-widest">Bus Details</h3>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <p className="text-xs text-gray-400 uppercase font-bold">Trip</p>
                                    <p className="font-bold text-gray-800">{busDetails.bus_code}</p>
                                    <p className="text-sm text-gray-600">Al Ain Border Run</p>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-xs text-gray-400 uppercase font-bold">Departs</p>
                                        <p className="font-bold text-gray-800">{busDetails.departure_time}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400 uppercase font-bold">Returns</p>
                                        <p className="font-bold text-gray-800">{busDetails.expected_return_time}</p>
                                    </div>
                                </div>
                                <div className="pt-2 border-t border-red-100">
                                    <p className="text-xs text-gray-400 uppercase font-bold">Total Price</p>
                                    <p className="font-xl font-black text-red-600">AED {Number(busDetails.base_price)}</p>
                                </div>
                            </div>
                        </NeoCard>
                    )}
                </div>

                {/* Middle: Documents & Details */}
                <div className="space-y-6">
                    <NeoCard className="p-6">
                        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">Passport Data</h3>
                        <div className="grid grid-cols-1 gap-4">
                            <div className="p-3 bg-gray-50 rounded-lg">
                                <p className="text-xs text-gray-400 font-bold uppercase">Passport No</p>
                                <p className="font-mono text-lg font-bold text-gray-800">{data.passportData?.passportNumber || 'N/A'}</p>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-3 bg-gray-50 rounded-lg">
                                    <p className="text-xs text-gray-400 font-bold uppercase">Nationality</p>
                                    <p className="font-bold text-gray-800">{data.passportData?.nationality || 'N/A'}</p>
                                </div>
                                <div className="p-3 bg-gray-50 rounded-lg">
                                    <p className="text-xs text-gray-400 font-bold uppercase">Age</p>
                                    <p className="font-bold text-gray-800">{data.personalInfo?.age || 'N/A'}</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-3 bg-red-50 rounded-lg border border-red-100">
                                    <p className="text-xs text-red-400 font-bold uppercase">Passport Expiry</p>
                                    <p className="font-bold text-red-900">{data.importantDates?.passportExpiry || 'N/A'}</p>
                                </div>
                                <div className="p-3 bg-orange-50 rounded-lg border border-orange-100">
                                    <p className="text-xs text-orange-400 font-bold uppercase">Visa Expiry</p>
                                    <p className="font-bold text-orange-900">{data.importantDates?.visaExpiry || 'N/A'}</p>
                                </div>
                            </div>
                        </div>
                    </NeoCard>

                    <NeoCard className="p-6">
                        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">Uploaded Documents</h3>
                        <div className="grid grid-cols-2 gap-4">
                            {documents.map((doc: any, idx: number) => {
                                const filename = doc.name || doc.type || 'file';
                                const isImg = isImage(filename);
                                return (
                                    <div key={idx} className="group relative rounded-xl border border-gray-200 overflow-hidden bg-gray-50 hover:shadow-md transition-all">
                                        <div className="aspect-video bg-gray-100 flex items-center justify-center relative">
                                            {/* Preview Mockup */}
                                            {doc.mockUrl && isImg ? (
                                                <img src={doc.mockUrl} alt={filename} className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="flex flex-col items-center justify-center text-gray-300">
                                                    <FileText size={32} />
                                                    <span className="text-xs font-bold mt-2">PDF Document</span>
                                                </div>
                                            )}

                                            {/* Hover Actions */}
                                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                                <a href={doc.mockUrl || '#'} target="_blank" className="p-2 bg-white rounded-full text-gray-800 hover:text-red-500">
                                                    <Download size={18} />
                                                </a>
                                            </div>
                                        </div>
                                        <div className="p-3 bg-white border-t border-gray-100">
                                            <p className="text-xs font-bold text-gray-700 truncate">{doc.label || doc.type}</p>
                                            <p className="text-[10px] text-gray-400 truncate">{filename}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </NeoCard>
                </div>

                {/* Right Column: Communication */}
                <div className="space-y-6">
                    <ChatInterface applicationId={app.id} initialMessages={app.messages} />
                </div>
            </div>
        </div>
    );
}
