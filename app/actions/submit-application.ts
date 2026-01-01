'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function submitBusVisaApplication(data: any) {
    try {
        const { passportData, documents } = data;

        // In a real app, you'd get the user ID from the session
        // Find a default user or create one for the application
        let user = await prisma.user.findFirst();
        if (!user) {
            user = await prisma.user.create({
                data: {
                    name: 'Demo User',
                    email: 'demo@example.com',
                    phone: '0000000000',
                    role: 'USER'
                }
            });
        }

        // precise validation would happen here using Zod

        const applicationId = `APP-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

        await prisma.application.create({
            data: {
                id: applicationId,
                userId: user.id,
                type: 'BUS_VISA',
                status: 'PENDING',
                step: 2,
                data: JSON.stringify(passportData),
                documents: JSON.stringify(documents || []),
            }
        });

        revalidatePath('/admin/dashboard');
        return { success: true, applicationId };

    } catch (error) {
        console.error('Failed to submit application:', error);
        return { success: false, error: 'Failed to submit application' };
    }
}
