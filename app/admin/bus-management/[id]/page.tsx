import { BusForm } from '@/components/admin/BusForm';
import { NeoButton } from '@/components/ui/NeoButton';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { getBusListingById } from '@/app/actions/bus-management';
import { notFound } from 'next/navigation';

export default async function EditBusPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    // Fetch data
    const { data: bus, success } = await getBusListingById(id);

    if (!success || !bus) {
        notFound();
    }

    return (
        <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
                <Link href="/admin/bus-management">
                    <NeoButton variant="secondary" size="sm" className="w-10 h-10 rounded-full p-0 flex items-center justify-center">
                        <ChevronLeft size={20} />
                    </NeoButton>
                </Link>
                <div>
                    <h2 className="text-2xl font-bold text-gray-700">Edit Bus</h2>
                    <p className="text-gray-400 font-medium">{bus.bus_code}</p>
                </div>
            </div>

            <BusForm bus={bus} isEditing={true} />
        </div>
    );
}
