import Link from 'next/link';

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-24">
            <div className="mb-8">
                <img src="/brand/logo-full.png" alt="AllSupport" className="w-[320px] h-auto" />
            </div>
            <div className="neo-shadow p-8 rounded-2xl bg-background">
                <p className="text-foreground">Welcome to the future of support services.</p>
                <div className="mt-8 flex justify-center">
                    <Link href="/login" className="px-6 py-2 neo-shadow rounded-full font-medium active:neo-inset text-primary transition-all hover:-translate-y-0.5">
                        Get Started
                    </Link>
                </div>
            </div>
        </main>
    )
}
