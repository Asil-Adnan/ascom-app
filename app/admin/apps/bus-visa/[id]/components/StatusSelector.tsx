'use client';

import { useState } from 'react';
import { updateApplicationStatus } from '@/app/actions/application-management';
import { Check, ChevronDown, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export function StatusSelector({ applicationId, currentStatus }: { applicationId: string, currentStatus: string }) {
    const [status, setStatus] = useState(currentStatus);
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const statuses = [
        { value: 'IN_PROCESS', label: 'In Process', color: 'bg-blue-100 text-blue-700' },
        { value: 'PENDING', label: 'Pending', color: 'bg-orange-100 text-orange-700' },
        { value: 'APPROVED', label: 'Approved', color: 'bg-green-100 text-green-700' },
        { value: 'REJECTED', label: 'Rejected', color: 'bg-red-100 text-red-700' },
        { value: 'COMPLETED', label: 'Completed', color: 'bg-gray-100 text-gray-700' }
    ];

    const currentStatusConfig = statuses.find(s => s.value === status) || statuses[0];

    const handleUpdate = async (newStatus: string) => {
        setLoading(true);
        setIsOpen(false);
        const res = await updateApplicationStatus(applicationId, newStatus);
        if (res.success) {
            setStatus(newStatus);
            toast.success(`Status updated to ${newStatus}`);
        } else {
            toast.error('Failed to update status');
        }
        setLoading(false);
    };

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold border transition-all ${currentStatusConfig.color} border-current/20 hover:opacity-80`}
            >
                {loading ? <Loader2 className="animate-spin" size={16} /> : currentStatusConfig.label}
                <ChevronDown size={16} />
            </button>

            {isOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 p-1 z-50 animate-in fade-in zoom-in-95 duration-200">
                    {statuses.map((s) => (
                        <button
                            key={s.value}
                            onClick={() => handleUpdate(s.value)}
                            className={`w-full text-left px-3 py-2 rounded-lg text-sm font-bold flex items-center justify-between hover:bg-gray-50 transition-colors ${status === s.value ? 'bg-gray-50 text-gray-900' : 'text-gray-500'}`}
                        >
                            {s.label}
                            {status === s.value && <Check size={14} className="text-black" />}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
