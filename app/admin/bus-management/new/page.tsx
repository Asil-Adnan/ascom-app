import { BusForm } from '@/components/admin/BusForm';
import { NeoButton } from '@/components/ui/NeoButton';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export default function NewBusPage() {
    return (
        <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
                <Link href="/admin/bus-management">
                    <NeoButton variant="secondary" size="sm" className="w-10 h-10 rounded-full p-0 flex items-center justify-center">
                        <ChevronLeft size={20} />
                    </NeoButton>
                </Link>
                <div>
                    <h2 className="text-2xl font-bold text-gray-700">Add New Bus</h2>
                    <p className="text-gray-400 font-medium">Create a new route and schedule.</p>
                </div>
            </div>

            <BusForm />
        </div>
    );
}
