import { Construction } from 'lucide-react';
import Link from 'next/link';

export default function ComingSoonPage() {
    return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6 text-gray-400">
                <Construction size={48} />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Service Under Development</h1>
            <p className="text-gray-500 max-w-md mb-8">
                This service module is currently being built. Please check back later or contact the system administrator.
            </p>
            <Link href="/admin/dashboard" className="neo-btn px-6 py-3 bg-white border border-gray-200 text-gray-600 font-bold rounded-xl hover:text-red-500 hover:border-red-200 transition-all shadow-sm hover:shadow-md">
                Return to Dashboard
            </Link>
        </div>
    );
}
