import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { ArrowLeft, FileText, CheckCircle, Clock } from 'lucide-react';
import { NeoCard } from '@/components/ui/NeoCard';

export default async function BusVisaAppsPage() {
    const apps = await prisma.application.findMany({
        where: { type: 'BUS_VISA' },
        include: { user: true },
        orderBy: { updatedAt: 'desc' }
    });

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex items-center gap-4">
                <Link href="/admin/dashboard">
                    <button className="w-10 h-10 rounded-xl neo-btn flex items-center justify-center text-gray-500 hover:text-red-500 transition-colors">
                        <ArrowLeft size={20} strokeWidth={2.5} />
                    </button>
                </Link>
                <div>
                    <h1 className="text-2xl font-extrabold text-gray-700">Bus Visa Applications</h1>
                    <p className="text-gray-400 font-medium">Manage and review incoming requests.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {apps.length === 0 ? (
                    <div className="p-12 text-center text-gray-400 bg-white/50 rounded-2xl border border-gray-100">
                        <FileText size={48} className="mx-auto mb-4 opacity-20" />
                        <p>No applications found.</p>
                    </div>
                ) : (
                    apps.map((app) => {
                        const data = JSON.parse(app.data as string);
                        return (
                            <Link href={`/admin/apps/bus-visa/${app.id}`} key={app.id}>
                                <div className="neo-raised p-6 flex items-center justify-between group hover:border-red-200 transition-all cursor-pointer">
                                    <div className="flex items-center gap-6">
                                        <div className="w-12 h-12 rounded-full neo-inset flex items-center justify-center font-bold text-gray-500 group-hover:text-red-500 transition-colors shrink-0">
                                            {data.name ? data.name.charAt(0) : '?'}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-700 text-lg group-hover:text-red-500 transition-colors">
                                                {data.name || 'Unknown Applicant'}
                                            </h3>
                                            <div className="flex items-center gap-4 text-xs text-gray-400 mt-1">
                                                <span className="font-bold">ID: {app.id}</span>
                                                <span>•</span>
                                                <span>{new Date(app.createdAt).toLocaleDateString()}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-6">
                                        <div className="text-right hidden md:block">
                                            <p className="text-xs font-bold text-gray-400 uppercase">Passport</p>
                                            <p className="font-bold text-gray-700">{data.passportNumber}</p>
                                        </div>
                                        <div className={`px-4 py-2 rounded-full border text-xs font-bold flex items-center gap-2 ${app.status === 'PENDING'
                                                ? 'bg-orange-50 border-orange-200 text-orange-600'
                                                : 'bg-green-50 border-green-200 text-green-600'
                                            }`}>
                                            {app.status === 'PENDING' ? <Clock size={14} /> : <CheckCircle size={14} />}
                                            {app.status}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        );
                    })
                )}
            </div>
        </div>
    );
}
