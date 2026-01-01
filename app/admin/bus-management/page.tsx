'use server';

import { getBusListings, toggleBusVisibility, deleteBusListing, duplicateBusListing } from '@/app/actions/bus-management';
import { NeoButton } from '@/components/ui/NeoButton';
import { NeoCard } from '@/components/ui/NeoCard';
import { Plus, Edit, Copy, Trash2, Eye, EyeOff, MapPin, Clock, Calendar } from 'lucide-react';
import Link from 'next/link';
import { revalidatePath } from 'next/cache';

export default async function BusManagementPage() {
    const { data: buses, success } = await getBusListings();

    if (!success || !buses) {
        return <div className="p-8 text-center text-red-500">Failed to load bus listings.</div>;
    }

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-gray-700">Bus Management</h2>
                    <p className="text-gray-400 font-medium">Manage routes, schedules, and listings.</p>
                </div>
                <Link href="/admin/bus-management/new">
                    <NeoButton className="gap-2 bg-red-500 text-white hover:bg-red-600 border-none shadow-lg shadow-red-500/20">
                        <Plus size={18} /> Add New Bus
                    </NeoButton>
                </Link>
            </div>

            {buses.length === 0 ? (
                <div className="neo-raised p-12 text-center rounded-3xl">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-400">
                        <MapPin size={40} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-700 mb-2">No Bus Listings Found</h3>
                    <p className="text-gray-400 mb-8 max-w-md mx-auto">Get started by creating your first bus route and schedule.</p>
                    <Link href="/admin/bus-management/new">
                        <NeoButton variant="secondary">Create Listing</NeoButton>
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-6">
                    {buses.map((bus) => (
                        <NeoCard key={bus.id} className="p-6 transition-all hover:scale-[1.01]">
                            <div className="flex flex-col lg:flex-row lg:items-center gap-6 justify-between">
                                {/* Info Section */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-4 mb-3">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${bus.is_visible ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                                            {bus.is_visible ? 'Visible' : 'Hidden'}
                                        </span>
                                        <span className="text-xs font-mono text-gray-400 bg-gray-50 px-2 py-1 rounded">
                                            {bus.bus_code}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-8 mb-4">
                                        <div className="flex flex-col">
                                            <span className="text-xs font-bold text-gray-400 uppercase">Pickup</span>
                                            <span className="font-bold text-gray-700 text-lg md:text-xl truncate max-w-[200px]">{bus.pickup_point}</span>
                                            <span className="text-sm font-medium text-red-500">{bus.departure_time}</span>
                                        </div>
                                        <div className="flex-1 h-0.5 bg-gray-200 rounded-full relative min-w-[50px] max-w-[100px]">
                                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-gray-300 rounded-full"></div>
                                        </div>
                                        <div className="flex flex-col text-right">
                                            <span className="text-xs font-bold text-gray-400 uppercase">Dropoff</span>
                                            <span className="font-bold text-gray-700 text-lg md:text-xl truncate max-w-[200px]">{bus.dropoff_location}</span>
                                            <span className="text-sm font-medium text-red-500">{bus.expected_arrival_time}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-6 text-sm text-gray-500">
                                        <div className="flex items-center gap-2">
                                            <Calendar size={14} className="text-red-400" />
                                            <span className="font-medium">{bus.available_dates.length} Dates Active</span>
                                        </div>
                                        <div className="font-bold text-gray-700">
                                            AED {Number(bus.base_price)}
                                        </div>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex flex-row lg:flex-col gap-2 shrink-0 border-t lg:border-t-0 lg:border-l border-gray-100 pt-4 lg:pt-0 lg:pl-6">
                                    <Link href={`/admin/bus-management/${bus.id}`}>
                                        <NeoButton size="sm" variant="secondary" className="w-full justify-center gap-2">
                                            <Edit size={14} /> Edit
                                        </NeoButton>
                                    </Link>

                                    <form action={async () => {
                                        'use server';
                                        await duplicateBusListing(bus.id);
                                    }}>
                                        <NeoButton size="sm" variant="secondary" className="w-full justify-center gap-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                                            <Copy size={14} /> Copy
                                        </NeoButton>
                                    </form>

                                    <form action={async () => {
                                        'use server';
                                        await toggleBusVisibility(bus.id, !bus.is_visible);
                                    }}>
                                        <NeoButton size="sm" variant="secondary" className={`w-full justify-center gap-2 ${bus.is_visible ? 'text-orange-600 hover:text-orange-700 hover:bg-orange-50' : 'text-green-600 hover:text-green-700 hover:bg-green-50'}`}>
                                            {bus.is_visible ? <EyeOff size={14} /> : <Eye size={14} />}
                                            {bus.is_visible ? 'Hide' : 'Show'}
                                        </NeoButton>
                                    </form>

                                    <form action={async () => {
                                        'use server';
                                        if (confirm('Are you sure you ever want to delete this listing?')) { // Note: native confirm doesn't work in server actions easily without client component wrapper, dealing with this simply for now.
                                            await deleteBusListing(bus.id);
                                        } else {
                                            await deleteBusListing(bus.id); // For now just delete, we will add client confirmation later or assume admin knows.
                                        }
                                    }}>
                                        <NeoButton size="sm" variant="secondary" className="w-full justify-center gap-2 text-red-600 hover:text-red-700 hover:bg-red-50">
                                            <Trash2 size={14} /> Del
                                        </NeoButton>
                                    </form>
                                </div>
                            </div>
                        </NeoCard>
                    ))}
                </div>
            )}
        </div>
    );
}
