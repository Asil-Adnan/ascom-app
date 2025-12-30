'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
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
    const router = useRouter();

    // Reset sub-option when service changes
    const handleServiceChange = (id: string) => {
        setSelectedService(id);
        const options = SERVICE_OPTIONS[id as keyof typeof SERVICE_OPTIONS];
        // If there's only one default option (or simple service), we can auto-select it 
        // OR keep it null to force user to confirm. 
        // Let's reset to null to allow animation entry or explicit choice.
        setSubOption(null);
    };

    const handleProceed = () => {
        if (!selectedService) return;

        const options = SERVICE_OPTIONS[selectedService as keyof typeof SERVICE_OPTIONS];

        // If we have options but none selected, select the first/default or return
        // If it's a "simple" service with no explicit sub-options defined, 
        // we might just want to route to its main page.

        // Helper to get directory path
        const serviceDir = SERVICE_DIRECTORY_MAP[selectedService as keyof typeof SERVICE_DIRECTORY_MAP] || selectedService;

        if (selectedService === 'bus' && subOption) {
            // Bus uses dynamic route [id]
            router.push(`/services/${serviceDir}/${subOption}`);
        } else {
            // Default routing to the service's main page
            router.push(`/services/${serviceDir}`);
        }
    };

    // Get current options
    const currentOptions = SERVICE_OPTIONS[selectedService as keyof typeof SERVICE_OPTIONS] || [
        { id: 'default', label: `Proceed to ${services.find(s => s.id === selectedService)?.label}` }
    ];

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
                            onClick={() => handleServiceChange(service.id)}
                        />
                    ))}
                </div>
            </GlassCard>

            {/* 
               The "Action" Slab (Floating) 
               Shows specific options for selected service 
            */}
            {selectedService && (
                <GlassCard className="p-8 flex flex-col md:flex-row items-center justify-between gap-8 animate-in slide-in-from-bottom-2 min-h-[120px]">

                    {/* Options Area */}
                    <div className="flex-1 w-full md:w-auto flex flex-col items-start gap-4">
                        <div className="flex flex-wrap gap-4 justify-center md:justify-start w-full">
                            {currentOptions.map((opt) => (
                                <NeumorphicCheckbox
                                    key={opt.id}
                                    label={opt.label}
                                    checked={subOption === opt.id || (currentOptions.length === 1 && opt.id === 'default')}
                                    onChange={() => setSubOption(opt.id)}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Explore Button Area */}
                    <div className="w-full md:w-auto flex justify-center md:justify-end">
                        <ExploreButton
                            className="w-full sm:w-auto px-8 py-3"
                            onClick={handleProceed}
                        />
                    </div>

                </GlassCard>
            )}

        </div>
    );
}

// -- CONFIGURATION --

// Directory Mapping (Service ID -> Folder Name)
const SERVICE_DIRECTORY_MAP = {
    bus: 'bus-visa',
    flight: 'a2a',
    attest: 'attestation',
    tickets: 'tickets',
    family: 'family-visa',
    freelance: 'freelance-visa',
    umrah: 'umrah',
    holidays: 'holidays',
    business: 'business-setup',
    cargo: 'cargo',
    global: 'worldwide-visa',
    jobs: 'jobs',
};

// Sub-Options Configuration
const SERVICE_OPTIONS = {
    bus: [
        { id: 'change', label: 'Visa Change by Bus' },
        { id: 'umrah_bus', label: 'Umrah by Bus' },
        { id: 'saudi', label: 'Saudi Bus' },
    ],
    // Add other services if they have specific sub-options
    // Otherwise they will default to "Proceed to [Service Name]"
};
