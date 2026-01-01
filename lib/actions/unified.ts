'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { ServiceType, Role } from '@/types/schema';

// --- Unified Types ---

export interface UnifiedMessage {
    id: string;
    content: string;
    role: 'USER' | 'ADMIN';
    createdAt: string;
    attachments: { url: string; name: string; type: string }[];
    senderId: string;
}

export interface UnifiedApplication {
    id: string;
    type: string;
    status: string;
    updatedAt: string;
    user: {
        name: string;
        email: string;
    };
    lastMessage?: UnifiedMessage;
}

// --- Server Actions ---

// 1. Send Message (Global)
// Supports sending to an existing App thread OR creating a new "General" thread if no ID provided
export async function sendMessage(
    userId: string,
    role: Role,
    content: string,
    attachments: { url: string; name: string; type: string }[] = [],
    contextId?: string // applicationId. If missing, we create a new GENERAL thread.
) {
    let threadId = contextId;

    // If no context, create a new "General" Application thread
    if (!threadId) {
        const newApp = await prisma.application.create({
            data: {
                id: `chat-${Date.now()}`,
                userId,
                type: 'GENERAL_CHAT',
                status: 'OPEN',
                data: '{}',
                documents: '[]',
            }
        });
        threadId = newApp.id;
    }

    // Create the message
    const message = await prisma.message.create({
        data: {
            threadId: threadId!,
            senderId: userId,
            senderRole: role,
            content,
            type: attachments.length > 0 ? 'FILE' : 'TEXT',
            attachments: JSON.stringify(attachments),
            userId: role === 'USER' ? userId : undefined, // Link to user if user sent it
        }
    });

    // Update Application timestamp
    await prisma.application.update({
        where: { id: threadId },
        data: { updatedAt: new Date() }
    });

    revalidatePath('/messages');
    revalidatePath('/admin');
    return { success: true, message };
}

// 2. Get User Messages (Global View)
// Returns all messages for a user, grouped by Thread (Application)
export async function getUserThreads(userId: string) {
    const apps = await prisma.application.findMany({
        where: { userId },
        include: {
            messages: {
                orderBy: { createdAt: 'desc' },
                take: 1
            }
        },
        orderBy: { updatedAt: 'desc' }
    });

    return apps.map(app => ({
        id: app.id,
        type: app.type,
        status: app.status,
        updatedAt: app.updatedAt.toISOString(),
        lastMessage: app.messages[0] ? {
            content: app.messages[0].content,
            createdAt: app.messages[0].createdAt.toISOString()
        } : null
    }));
}

// 3. Get Thread Messages
export async function getThreadMessages(threadId: string) {
    const messages = await prisma.message.findMany({
        where: { threadId },
        orderBy: { createdAt: 'asc' }
    });

    return messages.map(msg => ({
        id: msg.id,
        content: msg.content,
        role: msg.senderRole as 'USER' | 'ADMIN',
        createdAt: msg.createdAt.toISOString(),
        attachments: msg.attachments ? JSON.parse(msg.attachments) : [],
        senderId: msg.senderId
    }));
}

// 4. Create Application (Service Submission)
export async function createServiceApplication(
    userId: string,
    type: string,
    data: any,
    documents: any[]
) {
    const app = await prisma.application.create({
        data: {
            id: `${type.substring(0, 3).toUpperCase()}-${Date.now().toString().slice(-6)}`,
            userId,
            type,
            status: 'SUBMITTED',
            data: JSON.stringify(data),
            documents: JSON.stringify(documents),
        }
    });

    revalidatePath('/applications');
    return app;
}

// 5. Admin: Get Global Threads
export async function getGlobalThreads() {
    const apps = await prisma.application.findMany({
        include: {
            user: { select: { name: true, email: true } },
            messages: {
                orderBy: { createdAt: 'desc' },
                take: 1
            }
        },
        orderBy: { updatedAt: 'desc' }
    });

    return apps;
}
