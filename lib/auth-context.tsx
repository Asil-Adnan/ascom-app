'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@/types/schema';
// import { db } from '@/lib/db'; // Deprecated
import { loginAction, logoutAction, registerAction, getSessionAction } from '@/app/actions/auth';
import { useRouter } from 'next/navigation';

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (email: string) => Promise<void>;
    register: (name: string, email: string, phone: string) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
    login: async () => { },
    register: async () => { },
    logout: async () => { }
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        // Check for existing session via Server Action (cookies)
        const checkSession = async () => {
            const user = await getSessionAction();
            console.log('[AuthContext] checking current user:', user);
            // Cast to match User interface if needed, or ensure Prisma type matches exactly
            setUser(user as unknown as User);
            setLoading(false);
        }
        checkSession();
    }, []);

    const login = async (email: string) => {
        console.log('[AuthContext] login attempt:', email);
        const result = await loginAction(email);
        if (result.success && result.user) {
            console.log('[AuthContext] login success:', result.user);
            setUser(result.user as unknown as User);
            router.push(result.user.role === 'ADMIN' ? '/admin' : '/dashboard');
        } else {
            console.log('[AuthContext] login failed');
            alert('Login failed: ' + (result.error || 'Unknown error'));
        }
    };

    const register = async (name: string, email: string, phone: string) => {
        const result = await registerAction(name, email, phone);
        if (result.success && result.user) {
            setUser(result.user as unknown as User);
            router.push('/dashboard');
        } else {
            alert('Registration failed: ' + result.error);
        }
    };

    const logout = async () => {
        await logoutAction();
        setUser(null);
        // router.push('/login'); // Done by action
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
