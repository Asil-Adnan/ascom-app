'use client';

import { useState } from 'react';
import Link from 'next/link';
import { NeoCard } from '@/components/ui/NeoCard';
import { NeoButton } from '@/components/ui/NeoButton';
import { Filter, MoreHorizontal, Search } from 'lucide-react';
// import { MOCK_APPLICATIONS, getServiceIcon, Application } from '@/lib/mock-data'; // Legacy mock import
import { getServiceIcon } from '@/lib/mock-data';

export default function AdminApplicationsPage() {
    const [filter, setFilter] = useState('All');
    const [search, setSearch] = useState('');

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Approved': return 'bg-green-100 text-green-700';
            case 'Rejected': return 'bg-red-100 text-red-700';
            case 'Under Review': return 'bg-orange-100 text-orange-700';
            case 'Quote Sent': return 'bg-blue-100 text-blue-700';
            case 'Action Needed': return 'bg-purple-100 text-purple-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    // const filteredApps = ... (Removed)

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold">Applications</h2>
                    <p className="text-sm text-muted-foreground">Manage all requests from one place.</p>
                </div>
                <div className="flex gap-2">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                        <input
                            placeholder="Search ID or Name"
                            className="h-10 pl-9 rounded-xl bg-white border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 w-64"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                    </div>
                    <NeoButton size="sm" variant="secondary" className="gap-2">
                        <Filter size={16} /> Filter
                    </NeoButton>
                </div>
            </div>

            <NeoCard className="p-0 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-50/50 text-muted-foreground font-medium border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4">ID</th>
                                <th className="px-6 py-4">Applicant</th>
                                <th className="px-6 py-4">Service</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Date</th>
                                <th className="px-6 py-4 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {/* Empty State */}
                            <tr>
                                <td colSpan={6} className="px-6 py-12 text-center text-gray-400 italic">
                                    No applications found in the database.
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </NeoCard>
        </div>
    );
}
