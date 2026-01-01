'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function updateApplicationStatus(applicationId: string, status: string) {
    try {
        await prisma.application.update({
            where: { id: applicationId },
            data: { status }
        });

        // Notify user via message (system message)
        await prisma.message.create({
            data: {
                threadId: applicationId,
                content: `Application status updated to: ${status}`,
                senderRole: 'SYSTEM',
                senderId: 'SYSTEM',
                type: 'STATUS_UPDATE'
            }
        });

        revalidatePath(`/admin/apps/bus-visa/${applicationId}`);
        revalidatePath('/user/applications');
        return { success: true };
    } catch (error) {
        console.error('Failed to update status:', error);
        return { success: false, error: 'Failed to update status' };
    }
}

export async function sendApplicationMessage(applicationId: string, content: string, type: string = 'TEXT', senderId: string = 'ADMIN') {
    try {
        await prisma.message.create({
            data: {
                threadId: applicationId,
                content,
                type, // 'TEXT', 'FILE', 'IMAGE'
                senderRole: 'ADMIN',
                senderId
            }
        });

        revalidatePath(`/admin/apps/bus-visa/${applicationId}`);
        revalidatePath('/user/applications');
        return { success: true };
    } catch (error) {
        console.error('Failed to send message:', error);
        return { success: false, error: 'Failed to send message' };
    }
}

export async function getUserApplications(email?: string) {
    try {
        // If no email provided, return empty or fetch for a default demo user if desired.
        // For this demo, we'll fetch all if email is missing or specific one.
        const where = email ? { user: { email } } : {};

        const apps = await prisma.application.findMany({
            where,
            include: {
                user: true,
                messages: { orderBy: { createdAt: 'asc' } }
            },
            orderBy: { createdAt: 'desc' }
        });

        // Serialize dates and decimals
        return { success: true, data: JSON.parse(JSON.stringify(apps)) };
    } catch (error) {
        console.error('Failed to fetch user applications:', error);
        return { success: false, error: 'Failed to fetch applications' };
    }
}


