'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { NeoCard } from '@/components/ui/NeoCard';
import { NeoButton } from '@/components/ui/NeoButton';
import { NeoInput } from '@/components/ui/NeoInput';
import { createBusListing, updateBusListing, addBusDate, removeBusDate, BusListingData } from '@/app/actions/bus-management';
import { ChevronLeft, ChevronRight, Save, Trash2, Calendar as CalendarIcon, Check } from 'lucide-react';

interface BusFormProps {
    bus?: any; // Using any for simplicity with Prisma types in client component
    isEditing?: boolean;
}

export function BusForm({ bus, isEditing = false }: BusFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    // Form State
    const [formData, setFormData] = useState<BusListingData>({
        bus_code: bus?.bus_code || '',
        is_active: bus?.is_active ?? true,
        is_visible: bus?.is_visible ?? true,
        bus_class: bus?.bus_class || 'Standard',
        pickup_point: bus?.pickup_point || 'Deira City Center (Exit 2)',
        departure_time: bus?.departure_time || '08:00 AM',
        dropoff_location: bus?.dropoff_location || 'Muscat (Ruwi Bus Station)',
        expected_arrival_time: bus?.expected_arrival_time || '01:00 PM',
        expected_return_time: bus?.expected_return_time || '01:00 PM',
        base_price: bus ? Number(bus.base_price) : 300,
        visa_included_price: bus?.visa_included_price ? Number(bus.visa_included_price) : null,
        oman_visa_included: bus?.oman_visa_included ?? false,
        uae_visa_included: bus?.uae_visa_included ?? false,
        uae_visa_duration: bus?.uae_visa_duration || '30_days',
        food_included: bus?.food_included ?? false,
        accommodation_included: bus?.accommodation_included ?? false,
        exit_fee_included: bus?.exit_fee_included ?? false,
        internal_notes: bus?.internal_notes || '',
        marketing_badge: bus?.marketing_badge || '',
    });

    // Calendar State
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDates, setSelectedDates] = useState<string[]>(
        bus?.available_dates?.map((d: any) => new Date(d.date).toISOString().split('T')[0]) || []
    );

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            let result;
            if (isEditing && bus) {
                result = await updateBusListing(bus.id, formData);
            } else {
                result = await createBusListing(formData);
            }

            if (result.success) {
                const busId = result.data?.id || bus?.id;

                // Handle Date Updates if needed (For simplified "Edit" we might do it differently, 
                // but for now let's assume specific date actions are done via the calendar clicks individually 
                // OR we batch save. For simplicity in this "Functional" prototype, clicking a date toggles it immediately if searching/editing).

                // Ideally for "New", we save the bus first, then add dates. 
                // Or we can't add dates until the bus exists. 
                // Let's redirect to Edit screen after Create to manage dates, or handle it here.

                if (!isEditing) {
                    // Redirect to edit page to manage dates more effectively or just go back to list
                    router.push('/admin/bus-management');
                } else {
                    router.push('/admin/bus-management');
                }
                router.refresh();
            } else {
                alert(`Error submitting form: ${result.error}`);
            }
        } catch (error) {
            console.error(error);
            alert('An unexpected error occurred');
        } finally {
            setLoading(false);
        }
    };

    // Calendar Helpers
    const getDaysInMonth = (date: Date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const days = new Date(year, month + 1, 0).getDate();
        const firstDay = new Date(year, month, 1).getDay();
        return { days, firstDay };
    };

    const { days, firstDay } = getDaysInMonth(currentMonth);

    const toggleDate = async (day: number) => {
        if (!isEditing || !bus) {
            alert('Please create and save the bus listing first before adding dates.');
            return;
        }

        const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
        // Adjust for timezone offset to ensure "YYYY-MM-DD" matches whatever we expect, 
        // but typically "noon" is safe for date-only storage.
        date.setHours(12, 0, 0, 0);

        const dateStr = date.toISOString().split('T')[0];
        const isSelected = selectedDates.includes(dateStr);

        setLoading(true);
        if (isSelected) {
            // Find ID to remove
            const dateRecord = bus.available_dates.find((d: any) => new Date(d.date).toISOString().split('T')[0] === dateStr);
            if (dateRecord) {
                await removeBusDate(dateRecord.id, bus.id);
                setSelectedDates(prev => prev.filter(d => d !== dateStr));
            }
        } else {
            await addBusDate(bus.id, date);
            setSelectedDates(prev => [...prev, dateStr]);
        }
        setLoading(false);
        router.refresh();
    };

    const changeMonth = (delta: number) => {
        const newDate = new Date(currentMonth);
        newDate.setMonth(newDate.getMonth() + delta);
        setCurrentMonth(newDate);
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Form Fields */}
            <div className="lg:col-span-2 space-y-6">
                <form onSubmit={handleSubmit}>
                    <NeoCard className="p-8 space-y-8">
                        {/* Section 1: Basic Info */}
                        <div>
                            <h3 className="text-lg font-bold text-gray-700 mb-4 flex items-center gap-2">
                                <span className="w-8 h-8 rounded-full bg-red-100 text-red-500 flex items-center justify-center text-xs">1</span>
                                Basic Information
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase">Bus Code</label>
                                    <NeoInput
                                        value={formData.bus_code}
                                        onChange={e => setFormData({ ...formData, bus_code: e.target.value })}
                                        placeholder="e.g. DXB-OMN-001"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase">Bus Class</label>
                                    <NeoInput
                                        value={formData.bus_class || 'Standard'}
                                        onChange={e => setFormData({ ...formData, bus_class: e.target.value })}
                                        placeholder="e.g. Standard, Luxury, VIP"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase">Internal Notes</label>
                                    <NeoInput
                                        value={formData.internal_notes || ''}
                                        onChange={e => setFormData({ ...formData, internal_notes: e.target.value })}
                                        placeholder="Admin only notes..."
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Section 2: Route & Schedule */}
                        <div>
                            <h3 className="text-lg font-bold text-gray-700 mb-4 flex items-center gap-2">
                                <span className="w-8 h-8 rounded-full bg-red-100 text-red-500 flex items-center justify-center text-xs">2</span>
                                Route & Schedule
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase">Pickup Point</label>
                                    <NeoInput
                                        value={formData.pickup_point}
                                        onChange={e => setFormData({ ...formData, pickup_point: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase">Departure Time</label>
                                    <NeoInput
                                        type="time" // Using simple time input roughly, or text if "08:00 AM" format preferred
                                        // But for simplicity let's stick to text if we want "08:00 AM" exactly
                                        value={formData.departure_time}
                                        onChange={e => setFormData({ ...formData, departure_time: e.target.value })}
                                        placeholder="08:00 AM"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase">Dropoff Location</label>
                                    <NeoInput
                                        value={formData.dropoff_location}
                                        onChange={e => setFormData({ ...formData, dropoff_location: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase">Arrival Time</label>
                                    <NeoInput
                                        value={formData.expected_arrival_time}
                                        onChange={e => setFormData({ ...formData, expected_arrival_time: e.target.value })}
                                        placeholder="01:00 PM"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase">Return Time</label>
                                    <NeoInput
                                        value={formData.expected_return_time}
                                        onChange={e => setFormData({ ...formData, expected_return_time: e.target.value })}
                                        placeholder="01:00 PM"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Section 3: Pricing & Inclusions */}
                        <div>
                            <h3 className="text-lg font-bold text-gray-700 mb-4 flex items-center gap-2">
                                <span className="w-8 h-8 rounded-full bg-red-100 text-red-500 flex items-center justify-center text-xs">3</span>
                                Pricing & Details
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase">Base Price (AED)</label>
                                    <NeoInput
                                        type="number"
                                        value={formData.base_price}
                                        onChange={e => setFormData({ ...formData, base_price: Number(e.target.value) })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase">Via Included Price (AED)</label>
                                    <NeoInput
                                        type="number"
                                        value={formData.visa_included_price || ''}
                                        onChange={e => setFormData({ ...formData, visa_included_price: e.target.value ? Number(e.target.value) : null })}
                                        placeholder="Optional"
                                    />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:bg-gray-50 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={formData.oman_visa_included}
                                        onChange={e => setFormData({ ...formData, oman_visa_included: e.target.checked })}
                                        className="w-5 h-5 text-red-500 rounded focus:ring-red-500"
                                    />
                                    <span className="font-bold text-gray-700">Oman Visa Included</span>
                                </label>

                                <label className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:bg-gray-50 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={formData.uae_visa_included}
                                        onChange={e => setFormData({ ...formData, uae_visa_included: e.target.checked })}
                                        className="w-5 h-5 text-red-500 rounded focus:ring-red-500"
                                    />
                                    <span className="font-bold text-gray-700">UAE Visa Included</span>
                                </label>

                                {formData.uae_visa_included && (
                                    <div className="pl-8">
                                        <select
                                            value={formData.uae_visa_duration || '30_days'}
                                            onChange={e => setFormData({ ...formData, uae_visa_duration: e.target.value })}
                                            className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200 font-medium text-gray-700"
                                        >
                                            <option value="30_days">30 Days Visa</option>
                                            <option value="60_days">60 Days Visa</option>
                                        </select>
                                    </div>
                                )}

                                <label className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:bg-gray-50 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={formData.food_included}
                                        onChange={e => setFormData({ ...formData, food_included: e.target.checked })}
                                        className="w-5 h-5 text-red-500 rounded focus:ring-red-500"
                                    />
                                    <span className="font-bold text-gray-700">Food Included</span>
                                </label>

                                <label className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:bg-gray-50 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={formData.accommodation_included}
                                        onChange={e => setFormData({ ...formData, accommodation_included: e.target.checked })}
                                        className="w-5 h-5 text-red-500 rounded focus:ring-red-500"
                                    />
                                    <span className="font-bold text-gray-700">Accommodation Included</span>
                                </label>

                                <label className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:bg-gray-50 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={formData.exit_fee_included}
                                        onChange={e => setFormData({ ...formData, exit_fee_included: e.target.checked })}
                                        className="w-5 h-5 text-red-500 rounded focus:ring-red-500"
                                    />
                                    <span className="font-bold text-gray-700">Exit Fee Included</span>
                                </label>
                            </div>

                            <div className="mt-6 space-y-2">
                                <label className="text-xs font-bold text-gray-400 uppercase">Marketing Badge</label>
                                <NeoInput
                                    value={formData.marketing_badge || ''}
                                    onChange={e => setFormData({ ...formData, marketing_badge: e.target.value })}
                                    placeholder="e.g. SOLD OUT, SELLING FAST"
                                />
                                <p className="text-xs text-gray-400">Text displayed on the bus card to highlight status.</p>
                            </div>
                        </div>

                        {/* Submit */}
                        <div className="pt-6 border-t border-gray-100">
                            <NeoButton
                                type="submit"
                                className="w-full justify-center py-4 text-base bg-red-500 text-white hover:bg-red-600"
                                disabled={loading}
                            >
                                <Save size={20} className="mr-2" />
                                {loading ? 'Saving...' : 'Save Bus Listing'}
                            </NeoButton>
                        </div>
                    </NeoCard>
                </form>
            </div>

            {/* Right Column: Calendar (Only visible in Edit Mode) */}
            <div className="space-y-6">
                <NeoCard className="p-6">
                    <h3 className="text-lg font-bold text-gray-700 mb-4 flex items-center justify-between">
                        <span>Availability</span>
                        <CalendarIcon size={20} className="text-gray-400" />
                    </h3>

                    {!isEditing ? (
                        <div className="text-center py-12 text-gray-400 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                            <p className="text-sm">Save the listing first to manage available dates.</p>
                        </div>
                    ) : (
                        <div>
                            {/* Month Nav */}
                            <div className="flex items-center justify-between mb-4">
                                <button onClick={() => changeMonth(-1)} className="p-2 hover:bg-gray-100 rounded-lg">
                                    <ChevronLeft size={20} className="text-gray-500" />
                                </button>
                                <span className="font-bold text-gray-700">
                                    {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                                </span>
                                <button onClick={() => changeMonth(1)} className="p-2 hover:bg-gray-100 rounded-lg">
                                    <ChevronRight size={20} className="text-gray-500" />
                                </button>
                            </div>

                            {/* Grid */}
                            <div className="grid grid-cols-7 gap-1 text-center mb-2">
                                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
                                    <span key={d} className="text-[10px] uppercase font-bold text-gray-400">{d}</span>
                                ))}
                            </div>
                            <div className="grid grid-cols-7 gap-1">
                                {Array.from({ length: firstDay }).map((_, i) => (
                                    <div key={`empty-${i}`} className="aspect-square" />
                                ))}
                                {Array.from({ length: days }).map((_, i) => {
                                    const day = i + 1;
                                    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day, 12, 0, 0, 0); // Noon for safety
                                    const dateStr = date.toISOString().split('T')[0];
                                    const isSelected = selectedDates.includes(dateStr);

                                    // Check if date is in past
                                    const today = new Date();
                                    today.setHours(0, 0, 0, 0);
                                    const isPast = date < today;

                                    return (
                                        <button
                                            key={day}
                                            onClick={() => toggleDate(day)}
                                            disabled={loading}
                                            className={`
                                                aspect-square rounded-lg flex items-center justify-center text-sm font-bold transition-all
                                                ${isSelected
                                                    ? 'bg-red-500 text-white shadow-md shadow-red-500/30 scale-105'
                                                    : 'bg-gray-50 text-gray-700 hover:bg-white hover:shadow-md hover:scale-110 border border-transparent hover:border-gray-100'
                                                }
                                                ${isPast ? 'opacity-30' : ''}
                                            `}
                                        >
                                            {day}
                                        </button>
                                    );
                                })}
                            </div>

                            <div className="mt-6 pt-6 border-t border-gray-100">
                                <p className="text-xs text-gray-400 text-center">
                                    Select dates to mark this bus as available.
                                    <br />Current Selection: <span className="font-bold text-red-500">{selectedDates.length} days</span>
                                </p>
                            </div>
                        </div>
                    )}
                </NeoCard>
            </div>
        </div >
    );
}

