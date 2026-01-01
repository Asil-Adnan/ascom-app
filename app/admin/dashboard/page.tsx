import { CheckCircle2, BusFront, Users, Globe, Palmtree, Moon, Ticket, GraduationCap, Briefcase, UserSquare2, Truck, UserCheck, Plane, FileCheck, AlertCircle, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
    const stats = [
        { label: 'Total Applications', value: '—', icon: FileCheck, color: 'text-blue-500' },
        { label: 'Pending Review', value: '0', icon: AlertCircle, color: 'text-orange-500' },
        { label: 'Active Users', value: '—', icon: Users, color: 'text-green-500' },
        { label: 'Revenue (Today)', value: 'AED 0', icon: TrendingUp, color: 'text-red-500' },
    ];

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-gray-700">Dashboard Overview</h2>
                    <p className="text-gray-400 font-medium">Welcome back, Admin.</p>
                </div>
                <button className="neo-btn px-6 py-3 text-sm font-bold text-gray-500 hover:text-red-500 transition-colors">
                    Download Report
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => (
                    <div key={stat.label} className="neo-raised p-6 flex items-center justify-between group cursor-pointer hover:scale-[1.02] transition-transform">
                        <div>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{stat.label}</p>
                            <p className="text-2xl font-bold mt-2 text-gray-700">{stat.value}</p>
                        </div>
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center neo-inset ${stat.color}`}>
                            <stat.icon size={24} strokeWidth={2.5} />
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Service Applications Grid */}
                <div className="neo-raised p-8 lg:col-span-2">
                    <h3 className="font-bold text-gray-700 mb-6">Service Applications</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {[
                            { name: 'Bus Visa', id: 'bus-visa', icon: BusFront, color: 'text-red-500' },
                            { name: 'Family Visa', id: 'family-visa', icon: Users, color: 'text-blue-500' },
                            { name: 'Worldwide Visa', id: 'worldwide-visa', icon: Globe, color: 'text-purple-500' },
                            { name: 'Holidays', id: 'holidays', icon: Palmtree, color: 'text-green-500' },
                            { name: 'Umrah', id: 'umrah', icon: Moon, color: 'text-indigo-500' },
                            { name: 'Tickets', id: 'tickets', icon: Ticket, color: 'text-yellow-500' },
                            { name: 'Attestation', id: 'attestation', icon: GraduationCap, color: 'text-teal-500' },
                            { name: 'Business Setup', id: 'business-setup', icon: Briefcase, color: 'text-orange-500' },
                            { name: 'Jobs', id: 'jobs', icon: UserSquare2, color: 'text-cyan-500' },
                            { name: 'Cargo', id: 'cargo', icon: Truck, color: 'text-amber-500' },
                            { name: 'Freelance Visa', id: 'freelance-visa', icon: UserCheck, color: 'text-pink-500' },
                            { name: 'A2A', id: 'a2a', icon: Plane, color: 'text-rose-500' },
                        ].map((app) => (
                            <Link
                                href={app.id === 'bus-visa' ? `/admin/apps/${app.id}` : '/admin/apps/coming-soon'}
                                key={app.id}
                            >
                                <div className="p-4 rounded-2xl neo-inset hover:bg-white/50 transition-colors flex flex-col items-center justify-center gap-3 cursor-pointer group h-full">
                                    <div className={`w-12 h-12 rounded-full bg-white flex items-center justify-center ${app.color} shadow-sm group-hover:scale-110 transition-transform`}>
                                        <app.icon size={24} strokeWidth={1.5} />
                                    </div>
                                    <div className="text-center">
                                        <p className="font-bold text-sm text-gray-700 group-hover:text-red-500 transition-colors">{app.name}</p>
                                        <p className="text-[10px] text-gray-400 font-bold uppercase mt-1">Manage</p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Recent Applications Table */}
                <div className="neo-raised p-8">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-bold text-gray-700">Recent Applications</h3>
                        <button className="text-xs font-bold text-red-500 hover:underline">View All</button>
                    </div>

                    <div className="space-y-4">
                        <div className="text-center py-8 text-gray-400 italic text-sm">
                            No recent activity found.
                        </div>
                    </div>
                </div>

                {/* System Alerts */}
                <div className="neo-raised p-8">
                    <h3 className="font-bold text-gray-700 mb-6">System Status</h3>
                    <div className="flex flex-col gap-4 items-center justify-center h-48 text-gray-400">
                        <div className="w-16 h-16 rounded-full neo-inset flex items-center justify-center text-green-500">
                            <CheckCircle2 size={32} strokeWidth={2.5} />
                        </div>
                        <p className="font-medium">All Systems Operational</p>
                    </div>
                </div>
            </div>
        </div>
    );
}


