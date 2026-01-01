'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

// --- Types ---
export type BusListingData = {
    bus_code: string;
    is_active: boolean;
    is_visible: boolean;
    bus_class: string;
    pickup_point: string;
    departure_time: string;
    dropoff_location: string;
    expected_arrival_time: string;
    expected_return_time: string;
    base_price: number;
    visa_included_price?: number | null;
    oman_visa_included: boolean;
    uae_visa_included: boolean;
    uae_visa_duration?: string | null;
    food_included: boolean;
    accommodation_included: boolean;
    internal_notes?: string | null;
    marketing_badge?: string | null;
    exit_fee_included: boolean;
};

// Helper to serialize Decimal to number
const serializeBus = (bus: any) => ({
    ...bus,
    base_price: Number(bus.base_price),
    visa_included_price: bus.visa_included_price ? Number(bus.visa_included_price) : null,
    createdAt: bus.createdAt.toISOString(),
    updatedAt: bus.updatedAt.toISOString(),
    available_dates: bus.available_dates?.map((d: any) => ({
        ...d,
        date: d.date.toISOString(),
    })),
});

// --- GET ---
export async function getBusListings() {
    try {
        const buses = await prisma.busListing.findMany({
            orderBy: { createdAt: 'desc' },
            include: {
                available_dates: true,
            },
        });
        return { success: true, data: buses.map(serializeBus) };
    } catch (error) {
        console.error('getBusListings FAILED:', error);
        return { success: false, error: 'Failed to load bus listings.' };
    }
}

export async function getBusListingById(id: string) {
    try {
        const bus = await prisma.busListing.findUnique({
            where: { id },
            include: {
                available_dates: {
                    orderBy: { date: 'asc' },
                },
            },
        });
        if (!bus) return { success: false, error: 'Bus not found' };
        return { success: true, data: serializeBus(bus) };
    } catch (error) {
        console.error('getBusListingById FAILED:', error);
        return { success: false, error: 'Failed to fetch bus details' };
    }
}

export async function getAvailableBuses(dateStr: string) {
    try {
        // Validate date string
        if (!dateStr || isNaN(Date.parse(dateStr))) {
            console.error('Invalid date provided:', dateStr);
            return { success: false, error: 'Invalid date provided' };
        }

        const targetDate = new Date(dateStr);
        targetDate.setHours(0, 0, 0, 0);

        const nextDay = new Date(targetDate);
        nextDay.setDate(nextDay.getDate() + 1);

        const buses = await prisma.busListing.findMany({
            where: {
                is_active: true,
                is_visible: true,
                available_dates: {
                    some: {
                        date: {
                            gte: targetDate,
                            lt: nextDay
                        }
                    }
                }
            },
            orderBy: { departure_time: 'asc' }
        });

        return { success: true, data: buses.map(serializeBus) };
    } catch (error) {
        console.error('getAvailableBuses FAILED:', error);
        return { success: false, error: 'Failed to fetch available buses' };
    }
}

// --- CREATE ---
export async function createBusListing(data: BusListingData) {
    try {
        const bus = await prisma.busListing.create({
            data: {
                ...data,
                base_price: data.base_price,
                visa_included_price: data.visa_included_price,
            },
        });
        revalidatePath('/admin/bus-management');
        return { success: true, data: serializeBus(bus) };
    } catch (error) {
        console.error('Error creating bus:', error);
        return { success: false, error: error instanceof Error ? error.message : 'Failed to create bus listing' };
    }
}

// --- UPDATE ---
export async function updateBusListing(id: string, data: Partial<BusListingData>) {
    try {
        const bus = await prisma.busListing.update({
            where: { id },
            data: {
                ...data,
            },
        });
        revalidatePath('/admin/bus-management');
        revalidatePath('/admin/bus-management');
        revalidatePath(`/admin/bus-management/${id}`);
        return { success: true, data: serializeBus(bus) };
    } catch (error) {
        console.error('Error updating bus:', error);
        return { success: false, error: error instanceof Error ? error.message : 'Failed to update bus listing' };
    }
}

// --- DELETE ---
export async function deleteBusListing(id: string) {
    try {
        await prisma.busListing.delete({
            where: { id },
        });
        revalidatePath('/admin/bus-management');
        return { success: true };
    } catch (error) {
        console.error('Error deleting bus:', error);
        return { success: false, error: 'Failed to delete bus listing' };
    }
}

// --- DATES MANAGEMENT ---
export async function addBusDate(busId: string, date: Date) {
    try {
        // Check if exists
        const exists = await prisma.busDate.findFirst({
            where: {
                busId,
                date: {
                    equals: date
                }
            }
        });

        if (exists) return { success: true }; // Already exists

        await prisma.busDate.create({
            data: {
                busId,
                date,
            },
        });
        revalidatePath(`/admin/bus-management/${busId}`);
        return { success: true };
    } catch (error) {
        console.error('Error adding bus date:', error);
        return { success: false, error: 'Failed to add date' };
    }
}

export async function removeBusDate(dateId: string, busId: string) {
    try {
        await prisma.busDate.delete({
            where: { id: dateId },
        });
        revalidatePath(`/admin/bus-management/${busId}`);
        return { success: true };
    } catch (error) {
        console.error('Error removing bus date:', error);
        return { success: false, error: 'Failed to remove date' };
    }
}

export async function toggleBusVisibility(id: string, is_visible: boolean) {
    try {
        await prisma.busListing.update({
            where: { id },
            data: { is_visible },
        });
        revalidatePath('/admin/bus-management');
        return { success: true };
    } catch (error) {
        console.error('Error toggling visibility:', error);
        return { success: false, error: 'Failed to toggle visibility' };
    }
}

export async function duplicateBusListing(id: string) {
    try {
        const original = await prisma.busListing.findUnique({
            where: { id },
            include: { available_dates: true }
        });

        if (!original) return { success: false, error: 'Original bus not found' };

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id: _, createdAt, updatedAt, bus_code, available_dates, ...dataToCopy } = original;

        const newCode = `${original.bus_code}-COPY-${Date.now().toString().slice(-4)}`;

        const newBus = await prisma.busListing.create({
            data: {
                ...dataToCopy,
                bus_code: newCode,
                internal_notes: `Copy of ${original.bus_code}. ${original.internal_notes || ''}`,
                is_active: false, // Default to inactive for copies
            }
        });

        revalidatePath('/admin/bus-management');
        return { success: true, data: serializeBus(newBus) };

    } catch (error) {
        console.error('Error duplicating bus:', error);
        return { success: false, error: 'Failed to duplicate bus' };
    }
}
