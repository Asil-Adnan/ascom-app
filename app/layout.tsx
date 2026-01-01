'use client';

import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider, useAuth } from '@/lib/auth-context';
import { RedHeader } from '@/components/layout/RedHeader'; // "Cat Design" Header
import { AuroraBackground } from '@/components/ui/AuroraBackground';
import { BottomDock } from '@/components/layout/BottomDock';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Toaster } from 'sonner';

const inter = Inter({ subsets: ["latin"] });

// Inner component to handle conditional rendering based on auth/route
function AppShell({ children }: { children: React.ReactNode }) {
    const { user, loading } = useAuth();
    const pathname = usePathname();
    const router = useRouter();

    const publicRoutes = ['/login', '/signup', '/'];
    const authRedirectRoutes = ['/login', '/signup'];

    useEffect(() => {
        if (loading) return;

        const isPublic = publicRoutes.includes(pathname);

        // If not logged in and trying to access a protected route
        if (!user && !isPublic) {
            console.log('[AppShell] Unauthenticated on protected route. Redirecting to /login');
            router.replace('/login');
        }

        // If logged in and trying to access auth pages (login/signup)
        if (user && authRedirectRoutes.includes(pathname)) {
            console.log('[AppShell] Authenticated on public route. Redirecting to /dashboard');
            router.replace('/dashboard');
        }
    }, [user, loading, pathname, router]);

    // Show loading state
    if (loading) {
        return (
            <main className="min-h-screen bg-[#e0e5ec] flex items-center justify-center p-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
            </main>
        );
    }

    const isPublic = publicRoutes.includes(pathname);

    // If unauthenticated on protected route, show nothing (while redirecting)
    if (!user && !isPublic) return null;

    // If authenticated on auth route, show nothing (while redirecting)
    if (user && ['/login', '/signup'].includes(pathname)) return null;

    // Public Layout (For public routes, or Landing page even if logged in)
    if (isPublic) {
        return (
            <main className="min-h-screen bg-[#e0e5ec] flex items-center justify-center p-4">
                {children}
            </main>
        );
    }

    console.log('[AppShell] Rendering protected layout');

    // Hybrid Layout: Red Header (Top) + Glass Body + No Sidebar + Bottom Dock
    return (
        <div className="min-h-screen flex flex-col relative overflow-hidden text-slate-800">
            {/* New Animated Aurora Background */}
            <AuroraBackground />

            <RedHeader />

            {/* Main Content Area - z-0 to sit above background but below modals */}
            <main className="flex-1 flex flex-col items-center justify-start pt-12 px-4 md:px-8 overflow-y-auto pb-32 relative z-0 scrollbar-hide">
                {children}
            </main>

            <BottomDock />
        </div>
    );
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <AuthProvider>
                    <AppShell>
                        {children}
                    </AppShell>
                    <Toaster position="top-center" richColors closeButton />
                </AuthProvider>
            </body>
        </html>
    );
}


