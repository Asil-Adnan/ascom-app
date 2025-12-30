'use client';

import { Users, FileCheck, AlertCircle, TrendingUp } from 'lucide-react';

export default function AdminDashboard() {
    const stats = [
        { label: 'Total Applications', value: '1,284', icon: FileCheck, color: 'text-blue-500' },
        { label: 'Pending Review', value: '42', icon: AlertCircle, color: 'text-orange-500' },
        { label: 'Active Users', value: '892', icon: Users, color: 'text-green-500' },
        { label: 'Revenue (Today)', value: 'AED 12k', icon: TrendingUp, color: 'text-red-500' },
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
                {/* Recent Applications Table */}
                <div className="neo-raised p-8">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-bold text-gray-700">Recent Applications</h3>
                        <button className="text-xs font-bold text-red-500 hover:underline">View All</button>
                    </div>

                    <div className="space-y-4">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-200/50 transition-colors cursor-pointer group">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full neo-inset flex items-center justify-center font-bold text-gray-500 group-hover:text-red-500 transition-colors">
                                        JD
                                    </div>
                                    <div>
                                        <p className="font-bold text-sm text-gray-700">John Doe</p>
                                        <p className="text-xs text-gray-400 font-medium">Bus Visa Change</p>
                                    </div>
                                </div>
                                <span className="px-3 py-1 bg-orange-100/50 border border-orange-200 text-orange-600 rounded-full text-xs font-bold">
                                    Pending
                                </span>
                            </div>
                        ))}
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

import { CheckCircle2 } from 'lucide-react';
