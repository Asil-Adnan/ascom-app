'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@/types/schema';
// import { db } from '@/lib/db'; // Deprecated
import { loginUserAction, loginAdminAction, logoutAction, registerAction, getSessionAction } from '@/lib/actions/auth';
import { checkUserStatusAction, smartLoginAction, smartSignupAction } from '@/lib/actions/auth-smart';
import { useRouter } from 'next/navigation';

interface AuthContextType {
    user: User | null;
    loading: boolean;
    loginUser: (contact: string, otp: string) => Promise<void>;
    loginAdmin: (username: string, pass: string) => Promise<void>;
    register: (name: string, email: string, phone: string) => Promise<void>;
    checkUserStatus: (identifier: string) => Promise<any>;
    smartLogin: (identifier: string, secret: string, type: 'password' | 'otp') => Promise<any>;
    smartRegister: (data: any) => Promise<any>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
    loginUser: async () => { },
    loginAdmin: async () => { },
    register: async () => { },
    checkUserStatus: async () => { },
    smartLogin: async () => { },
    smartRegister: async () => { },
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

    const loginUser = async (contact: string, otp: string) => {
        const result = await loginUserAction(contact, otp);
        if (result.success && 'user' in result) {
            setUser(result.user as unknown as User);
            router.push('/dashboard');
        } else {
            const errorMsg = 'error' in result ? result.error : 'Unknown error';
            alert('Login failed: ' + errorMsg);
        }
    };

    const loginAdmin = async (username: string, pass: string) => {
        const result = await loginAdminAction(username, pass);
        if (result.success && 'user' in result) {
            setUser(result.user as unknown as User);
            router.push(result.user.role === 'SUPER_ADMIN' ? '/super-admin' : '/admin');
        } else {
            const errorMsg = 'error' in result ? result.error : 'Check credentials';
            alert('Admin Login failed: ' + errorMsg);
        }
    };

    const register = async (name: string, email: string, phone: string) => {
        const result = await registerAction(name, email, phone);
        if (result.success && 'user' in result) {
            setUser(result.user as unknown as User);
            router.push('/dashboard');
        } else {
            const errorMsg = 'error' in result ? result.error : 'Registration failed';
            alert('Registration failed: ' + errorMsg);
        }
    };

    const checkUserStatus = async (identifier: string) => {
        return await checkUserStatusAction(identifier);
    };

    const smartLogin = async (identifier: string, secret: string, type: 'password' | 'otp') => {
        const result = await smartLoginAction(identifier, secret, type);
        if (result.success && 'user' in result) {
            setUser(result.user as unknown as User);
            router.push('/dashboard');
        }
        return result;
    };

    const smartRegister = async (data: any) => {
        const result = await smartSignupAction(data);
        if (result.success && 'user' in result) {
            setUser(result.user as unknown as User);
            router.push('/dashboard');
        }
        return result;
    };

    const logout = async () => {
        await logoutAction();
        setUser(null);
        // router.push('/login'); // Done by action
    };

    return (
        <AuthContext.Provider value={{ user, loading, loginUser, loginAdmin, register: async () => { }, checkUserStatus, smartLogin, smartRegister, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
