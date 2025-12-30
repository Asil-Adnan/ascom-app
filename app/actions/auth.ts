'use server';

import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';

const COOKIE_NAME = 'allsupport_session_v2';

export async function loginAction(email: string) {
    try {
        let user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            // Auto-create demo user for migration continuity
            if (email === 'user@demo.com') {
                user = await prisma.user.create({
                    data: {
                        id: 'u1',
                        name: 'Demo User',
                        email: 'user@demo.com',
                        phone: '0501234567',
                        role: 'USER',
                    }
                });
            } else if (email === 'admin@demo.com') {
                user = await prisma.user.create({
                    data: {
                        id: 'a1',
                        name: 'Admin One',
                        email: 'admin@demo.com',
                        phone: '0509999999',
                        role: 'ADMIN',
                    }
                });
            } else {
                return { error: 'User not found' };
            }
        }

        const cookieStore = await cookies();
        cookieStore.set(COOKIE_NAME, user.id, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
            maxAge: 60 * 60 * 24 * 7 // 1 week
        });

        return { success: true, user };
    } catch (error) {
        console.error('Login Action Failed. Full Error:', error);
        if (error instanceof Error) {
            return { error: `Server Error: ${error.message}` };
        }
        return { error: 'Internal server error (Unknown cause)' };
    }
}

export async function logoutAction() {
    const cookieStore = await cookies();
    cookieStore.delete(COOKIE_NAME);
    redirect('/login');
}

export async function getSessionAction() {
    try {
        const cookieStore = await cookies();
        const userId = cookieStore.get(COOKIE_NAME)?.value;
        if (!userId) return null;

        const user = await prisma.user.findUnique({
            where: { id: userId },
        });

        return user;
    } catch (error) {
        return null;
    }
}

export async function registerAction(name: string, email: string, phone: string) {
    try {
        const existing = await prisma.user.findUnique({ where: { email } });
        if (existing) return { error: 'User already exists' };

        const user = await prisma.user.create({
            data: {
                name,
                email,
                phone,
                role: 'USER'
            }
        });

        const cookieStore = await cookies();
        cookieStore.set(COOKIE_NAME, user.id, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
            maxAge: 60 * 60 * 24 * 7
        });

        return { success: true, user };
    } catch (e) {
        console.error('Register error:', e);
        return { error: 'Registration failed' };
    }
}
