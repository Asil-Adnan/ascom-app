'use server';

import { prisma } from '@/lib/prisma';
import { User } from '@/types/schema';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

// Simulation of "Auth Session" using cookies for this strict environment
const SESSION_COOKIE = 'auth_session';

// --- Actions ---

export async function loginAction(identifier: string) { // Email for User, Username for Admin
    // 1. Check if Admin (Username based, or Email if unique)
    // The requirement says: Admin uses Username, User uses Email/Phone.
    // Let's try to find by username first.

    // NOTE: In a real app we would separate these flows strictly as requested: 
    // "Admin users have a username... Normal user... email or mobile"
    // But loginAction might need to handle the initial routing or we have separate actions.

    // Actually, let's look at the UI I built/planned. 
    // I need distinct actions for clarity.
    return { success: false, error: 'Use specific login actions' };
}

export async function loginUserAction(contact: string, otp: string) {
    if (otp !== '1234') {
        return { success: false, error: 'Invalid OTP' };
    }

    try {
        // Find user by email OR phone
        const user = await prisma.user.findFirst({
            where: {
                OR: [
                    { email: contact },
                    { phone: contact }
                ],
                role: 'USER'
            }
        });

        if (!user) {
            return { success: false, error: 'User not found. Please register first.' };
        }

        // Create Session
        return await createSession(user);
    } catch (error) {
        console.error('Login Error:', error);
        return { success: false, error: 'System error' };
    }
}

export async function loginAdminAction(username: string, password: string) {
    try {
        const user = await prisma.user.findUnique({
            // @ts-ignore - Prisma client stale
            where: { username } as any
        });

        // Use 'as any' to bypass the missing 'password' property in the stale type definition
        if (!user || (user as any).password !== password) {
            return { success: false, error: 'Invalid credentials' };
        }

        if (user.role !== 'ADMIN' && user.role !== 'SUPER_ADMIN') {
            return { success: false, error: 'Unauthorized' };
        }

        return await createSession(user);

    } catch (error) {
        console.error('Admin Login Error:', error);
        return { success: false, error: 'System error' };
    }
}

export async function registerAction(name: string, email: string, phone: string) {
    try {
        // Check existing
        const existing = await prisma.user.findFirst({
            where: {
                OR: [{ email }, { phone }]
            }
        });

        if (existing) {
            return { success: false, error: 'User already exists' };
        }

        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                phone,
                role: 'USER'
            }
        });

        return await createSession(newUser);
    } catch (error) {
        return { success: false, error: 'Registration failed' };
    }
}

export async function logoutAction() {
    (await cookies()).delete(SESSION_COOKIE);
    return { success: true };
}

export async function getSessionAction() {
    const cookieStore = await cookies();
    const sessionId = cookieStore.get(SESSION_COOKIE)?.value;

    if (!sessionId) return null;

    try {
        const user = await prisma.user.findUnique({
            where: { id: sessionId }, // Simple ID-based session for this demo
            // @ts-ignore
            include: {
                profile: true,
                wallet: true
            } as any
        });
        return user;
    } catch (e) {
        return null;
    }
}

// Helper
async function createSession(user: any) {
    (await cookies()).set(SESSION_COOKIE, user.id, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
    return { success: true, user };
}
