'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { NeoCard } from '@/components/ui/NeoCard';
import { NeoButton } from '@/components/ui/NeoButton';
import { NeoInput } from '@/components/ui/NeoInput';
import { ArrowLeft, User, Wallet, Home, Heart, Baby, CheckCircle } from 'lucide-react';

export default function FamilyVisaSponsorPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        salary: '',
        housing: 'Rented',
        designation: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (parseInt(formData.salary) < 4000) {
            alert('Minimum salary of 4000 AED is required for sponsorship eligibility.');
            return;
        }
        router.push('/services/family-visa/dependents');
    };

    return (
        <div className="w-full max-w-6xl mx-auto py-12 animate-in fade-in zoom-in duration-300">

            {/* Header */}
            <div className="flex items-center gap-4 mb-12">
                <Link href="/dashboard">
                    <button className="w-12 h-12 rounded-xl neo-btn flex items-center justify-center text-gray-500 hover:text-red-500 transition-colors">
                        <ArrowLeft size={22} strokeWidth={2.5} />
                    </button>
                </Link>
                <div>
                    <h1 className="text-3xl font-extrabold text-foreground">Family Sponsorship</h1>
                    <p className="text-gray-500 font-medium">Sponsor your loved ones in the UAE.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Main Form (7 Cols) */}
                <div className="lg:col-span-7">
                    <NeoCard className="p-10">
                        <form onSubmit={handleSubmit} className="space-y-8">

                            <div className="space-y-4">
                                <label className="text-sm font-bold text-gray-400 uppercase tracking-wider ml-1">Monthly Salary (AED)</label>
                                <div className="relative group">
                                    <Wallet className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-red-500 transition-colors" size={22} />
                                    <NeoInput
                                        type="number"
                                        placeholder="e.g. 5000"
                                        required
                                        className="pl-12 h-14 font-bold text-lg"
                                        value={formData.salary}
                                        onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                                    />
                                </div>
                                <p className="text-xs font-bold text-red-400 ml-2">* Minimum salary required: AED 4,000</p>
                            </div>

                            <div className="space-y-4">
                                <label className="text-sm font-bold text-gray-400 uppercase tracking-wider ml-1">Job Designation</label>
                                <div className="relative group">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-red-500 transition-colors" size={22} />
                                    <NeoInput
                                        placeholder="e.g. Engineer"
                                        required
                                        className="pl-12 h-14 font-bold text-gray-700"
                                        value={formData.designation}
                                        onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <label className="text-sm font-bold text-gray-400 uppercase tracking-wider ml-1">Accommodation Check</label>
                                <div className="relative group">
                                    <Home className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-red-500 transition-colors" size={22} />
                                    <select
                                        className="w-full h-14 rounded-xl bg-background px-4 pl-12 text-lg font-bold neo-inset text-gray-700 appearance-none outline-none focus:ring-2 focus:ring-primary/50 cursor-pointer"
                                        value={formData.housing}
                                        onChange={(e) => setFormData({ ...formData, housing: e.target.value })}
                                    >
                                        <option value="Rented">Rented Apartment</option>
                                        <option value="Owned">Owned Property</option>
                                        <option value="Company">Company Accommodation</option>
                                    </select>
                                </div>
                            </div>

                            <NeoButton type="submit" size="lg" className="w-full h-16 text-lg font-bold tracking-wide text-red-600 hover:text-white hover:bg-red-500 transition-colors mt-6">
                                Check Eligibility & Proceed
                            </NeoButton>
                        </form>
                    </NeoCard>
                </div>

                {/* Right Side: Family Visual (5 Cols) */}
                <div className="lg:col-span-5 flex flex-col gap-6">
                    <div className="neo-raised p-8 flex items-center gap-6">
                        <div className="w-16 h-16 rounded-full neo-inset flex items-center justify-center text-red-500">
                            <Heart size={32} fill="currentColor" className="text-red-500/20" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-foreground">Bring Them Home</h3>
                            <p className="text-sm text-gray-500">
                                Secure residence visas for your spouse, children, and parents.
                            </p>
                        </div>
                    </div>

                    <div className="neo-raised p-8 flex-1">
                        <h4 className="text-lg font-bold text-gray-700 mb-6">Eligibility Criteria</h4>
                        <ul className="space-y-4">
                            {[
                                'Valid Residency Visa',
                                'Minimum Salary of AED 4,000',
                                'Attested Marriage Certificate',
                                'Tenancy Contract (Ejari)'
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-gray-600 font-medium">
                                    <CheckCircle size={18} className="text-green-500 flex-shrink-0" />
                                    {item}
                                </li>
                            ))}
                        </ul>

                        <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-xs font-bold uppercase tracking-wider">
                                <Baby size={14} /> New Born Services Available
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
