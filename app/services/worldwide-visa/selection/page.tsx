'use client';

import Link from 'next/link';
import { NeoCard } from '@/components/ui/NeoCard';
import { NeoButton } from '@/components/ui/NeoButton';
import { ArrowLeft, Clock, CreditCard, Check } from 'lucide-react';

const VISA_OPTIONS = [
    {
        id: 1,
        type: 'Tourist Visa',
        duration: '30 Days',
        processing: '3-5 Days',
        price: 450,
        features: ['Single Entry', 'Valid for 60 days']
    },
    {
        id: 2,
        type: 'Tourist Visa (Express)',
        duration: '30 Days',
        processing: '24 Hours',
        price: 650,
        features: ['Single Entry', 'Priority Processing']
    },
    {
        id: 3,
        type: 'Long Term Tourist',
        duration: '90 Days',
        processing: '5-7 Days',
        price: 850,
        features: ['Single Entry', 'Valid for 6 months']
    },
];

export default function VisaSelectionPage() {
    return (
        <div className="min-h-screen bg-background p-4 pb-20">
            <header className="flex items-center gap-4 mb-6">
                <Link href="/services/worldwide-visa">
                    <button className="p-2 rounded-xl neo-shadow active:neo-inset text-muted-foreground hover:text-primary transition-colors">
                        <ArrowLeft size={20} />
                    </button>
                </Link>
                <div>
                    <h1 className="text-xl font-bold text-foreground">Select Visa Type</h1>
                    <p className="text-xs text-muted-foreground">Destination: United Kingdom</p>
                </div>
            </header>

            <div className="space-y-6">
                {VISA_OPTIONS.map((visa) => (
                    <NeoCard key={visa.id} className="p-6">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-lg font-bold text-foreground">{visa.type}</h3>
                                <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                                    <Clock size={12} />
                                    {visa.processing}
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-xl font-bold text-primary">AED {visa.price}</p>
                                <p className="text-xs text-muted-foreground">inc. tax</p>
                            </div>
                        </div>

                        <div className="space-y-2 mb-6">
                            {visa.features.map((feat, i) => (
                                <div key={i} className="flex items-center gap-2 text-sm text-foreground/80">
                                    <Check size={14} className="text-green-500" />
                                    {feat}
                                </div>
                            ))}
                        </div>

                        <Link href={`/services/worldwide-visa/apply?type=${visa.id}`}>
                            <NeoButton className="w-full">
                                Select & Apply
                            </NeoButton>
                        </Link>
                    </NeoCard>
                ))}
            </div>
        </div>
    );
}
