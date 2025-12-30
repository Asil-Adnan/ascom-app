'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { NeoCard } from '@/components/ui/NeoCard';
import { NeoButton } from '@/components/ui/NeoButton';
import { NeoInput } from '@/components/ui/NeoInput';
import { NeoIcon } from '@/components/ui/NeoIcon';
import { ArrowLeft, Plus, X, Baby, User, Heart, Users, CheckCircle } from 'lucide-react';

export default function FamilyDependentsPage() {
    const router = useRouter();
    const [dependents, setDependents] = useState([
        { id: 1, name: '', relation: 'Spouse' }
    ]);

    const addDependent = () => {
        setDependents([...dependents, { id: Date.now(), name: '', relation: 'Child' }]);
    };

    const removeDependent = (id: number) => {
        if (dependents.length === 1) return;
        setDependents(dependents.filter(d => d.id !== id));
    };

    const updateDependent = (id: number, field: string, value: string) => {
        setDependents(dependents.map(d => d.id === id ? { ...d, [field]: value } : d));
    };

    return (
        <div className="w-full max-w-6xl mx-auto py-12 animate-in fade-in zoom-in duration-300">

            {/* Header */}
            <div className="flex items-center gap-4 mb-12">
                <Link href="/services/family-visa">
                    <button className="w-12 h-12 rounded-xl neo-btn flex items-center justify-center text-gray-500 hover:text-red-500 transition-colors">
                        <ArrowLeft size={22} strokeWidth={2.5} />
                    </button>
                </Link>
                <div>
                    <h1 className="text-3xl font-extrabold text-foreground">Add Family Members</h1>
                    <p className="text-gray-500 font-medium">Sponsor your spouse, children, or parents.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-24">
                {/* Main Form (7 Cols) */}
                <div className="lg:col-span-7 space-y-8">
                    {dependents.map((dep, index) => (
                        <NeoCard key={dep.id} className="p-8 relative group">
                            <div className="absolute top-8 right-8">
                                {index > 0 && (
                                    <button onClick={() => removeDependent(dep.id)} className="w-8 h-8 rounded-full bg-red-100 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all">
                                        <X size={16} strokeWidth={3} />
                                    </button>
                                )}
                            </div>

                            <div className="flex items-center gap-4 mb-6">
                                <NeoIcon icon={dep.relation === 'Spouse' ? Heart : dep.relation === 'Child' ? Baby : User} size={28} variant="inset" className="text-red-500" />
                                <h3 className="text-xl font-bold text-gray-700">Dependent #{index + 1}</h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <label className="text-sm font-bold text-gray-400 uppercase tracking-wider ml-1">Full Name</label>
                                    <NeoInput
                                        placeholder="As per passport"
                                        value={dep.name}
                                        onChange={(e) => updateDependent(dep.id, 'name', e.target.value)}
                                        className="font-bold"
                                    />
                                </div>
                                <div className="space-y-4">
                                    <label className="text-sm font-bold text-gray-400 uppercase tracking-wider ml-1">Relationship</label>
                                    <div className="relative">
                                        <select
                                            className="w-full h-12 rounded-xl bg-background px-4 text-sm neo-inset text-gray-700 font-bold outline-none focus:ring-2 focus:ring-red-500/20"
                                            value={dep.relation}
                                            onChange={(e) => updateDependent(dep.id, 'relation', e.target.value)}
                                        >
                                            <option value="Spouse">Spouse</option>
                                            <option value="Child">Child</option>
                                            <option value="Parent">Parent</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </NeoCard>
                    ))}

                    <button
                        onClick={addDependent}
                        className="w-full py-6 rounded-2xl border-2 border-dashed border-gray-300 text-gray-400 font-bold hover:border-red-500 hover:text-red-500 hover:bg-red-50 transition-all flex items-center justify-center gap-3 text-lg"
                    >
                        <Plus size={24} strokeWidth={3} />
                        Add Another Member
                    </button>
                </div>

                {/* Right Side: Summary & Action (5 Cols) */}
                <div className="lg:col-span-5 space-y-6">
                    <NeoCard className="p-8 sticky top-8">
                        <div className="flex items-center justify-between mb-8 pb-8 border-b border-gray-100">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                                    <CheckCircle size={24} strokeWidth={2.5} />
                                </div>
                                <div>
                                    <p className="font-bold text-gray-800">Sponsor Status</p>
                                    <p className="text-xs font-bold text-green-500 uppercase">Eligible</p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4 mb-8">
                            <div className="flex justify-between items-center px-4 py-3 rounded-xl bg-gray-50">
                                <span className="font-bold text-gray-500">Total Dependents</span>
                                <span className="font-extrabold text-gray-800 text-xl">{dependents.length}</span>
                            </div>
                            <div className="flex justify-between items-center px-4 py-3 rounded-xl bg-gray-50">
                                <span className="font-bold text-gray-500">Processing Fee</span>
                                <span className="font-bold text-red-500">AED {dependents.length * 3500}</span>
                            </div>
                        </div>

                        <Link href="/services/family-visa/upload">
                            <NeoButton size="lg" className="w-full h-16 text-lg font-bold tracking-wide text-white bg-red-600 hover:bg-red-500 shadow-xl shadow-red-500/20">
                                Proceed to Upload Docs ({dependents.length})
                            </NeoButton>
                        </Link>
                    </NeoCard>
                </div>
            </div>
        </div>
    );
}
