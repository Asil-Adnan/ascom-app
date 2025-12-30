'use client';

import { useState } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { ServiceIcon } from '@/components/ui/ServiceIcon';
import { NeumorphicCheckbox } from '@/components/ui/NeumorphicCheckbox';
import { ExploreButton } from '@/components/ui/ExploreButton';
import {
    Bus, Plane, FileText, Ticket, User, Laptop,
    Moon, Palmtree, Landmark, Truck, Globe, Briefcase,
    CheckCircle2, Circle
} from 'lucide-react';

// Service Definition
// Microsoft Fluent UI 3D Emojis (High Quality, Apple-like)
const BASE_FLUENT_URL = "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets";

// Helper to construct URL
const fluentUrl = (dir: string, file: string) => `${BASE_FLUENT_URL}/${dir}/3D/${file}_3d.png`;

// Service Definition
const services = [
    {
        id: 'bus', label: 'Bus Visa', icon: Bus, color: 'red',
    },
    {
        id: 'flight', label: 'A2A Flight', icon: Plane, color: 'blue',
    },
    {
        id: 'attest', label: 'Attestation', icon: FileText, color: 'orange',
    },
    {
        id: 'tickets', label: 'Tickets', icon: Ticket, color: 'cyan',
    },
    {
        id: 'family', label: 'Family Visa', icon: User, color: 'purple',
    },
    {
        id: 'freelance', label: 'Freelance', icon: Laptop, color: 'emerald',
    },
    {
        id: 'umrah', label: 'Umrah Visa', icon: Moon, color: 'slate',
    },
    {
        id: 'holidays', label: 'Holidays', icon: Palmtree, color: 'orange',
    },
    {
        id: 'business', label: 'Business', icon: Landmark, color: 'blue',
    },
    {
        id: 'cargo', label: 'Cargo', icon: Truck, color: 'red',
    },
    {
        id: 'global', label: 'Global Visa', icon: Globe, color: 'cyan',
    },
    {
        id: 'jobs', label: 'Jobs', icon: Briefcase, color: 'purple',
    },
] as const;

export default function DashboardPage() {
    const [selectedService, setSelectedService] = useState('bus');
    const [subOption, setSubOption] = useState<string | null>(null);

    return (
        <div className="w-full max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">

            {/* 
               The Main Glass Slab 
               Level 2 Frost (Heavy)
            */}
            <GlassCard frosted className="p-8 sm:p-12 relative overflow-hidden">
                {/* Subtle inner shine */}
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/80 to-transparent opacity-50" />

                <h2 className="text-center text-sm font-bold tracking-[0.2em] text-slate-500 uppercase mb-10">
                    Select a Service
                </h2>

                {/* Grid */}
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-x-4 gap-y-10 place-items-center">
                    {services.map((service) => (
                        <ServiceIcon
                            key={service.id}
                            icon={service.icon}
                            label={service.label}
                            color={service.color} // Pass the liquid color
                            isActive={selectedService === service.id}
                            onClick={() => setSelectedService(service.id)}
                        />
                    ))}
                </div>
            </GlassCard>

            {/* 
               The "Action" Slab (Floating) 
               Shows specific options for selected service 
            */}
            {selectedService === 'bus' && (
                <GlassCard className="p-6 flex flex-col sm:flex-row items-center justify-between gap-6 animate-in slide-in-from-bottom-2">

                    {/* Options */}
                    <div className="flex flex-col gap-4 w-full sm:w-auto">
                        {[
                            { id: 'change', label: 'Visa Change by Bus' },
                            { id: 'umrah_bus', label: 'Umrah by Bus' },
                            { id: 'saudi', label: 'Saudi Bus' },
                        ].map((opt) => (
                            <NeumorphicCheckbox
                                key={opt.id}
                                label={opt.label}
                                checked={subOption === opt.id}
                                onChange={() => setSubOption(opt.id)}
                            />
                        ))}
                    </div>

                    {/* Explore Button */}
                    <ExploreButton className="w-full sm:w-auto" />

                </GlassCard>
            )}

        </div>
    );
}
