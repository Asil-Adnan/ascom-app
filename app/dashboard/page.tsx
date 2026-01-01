'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { NeumorphicCard } from '@/components/ui/NeumorphicCard';
import { ServiceIcon } from '@/components/ui/ServiceIcon';
import { ExploreButton } from '@/components/ui/ExploreButton';
import {
    BiBus, BiFile, BiPurchaseTag, BiUser, BiLaptop,
    BiMoon, BiSun, BiBuilding, BiPackage, BiGlobe, BiBriefcase
} from 'react-icons/bi';
import { MdFlight } from 'react-icons/md';

// Service Definition
const services = [
    {
        id: 'bus', label: 'Bus Visa', icon: BiBus,
    },
    {
        id: 'flight', label: 'A2A Flight', icon: MdFlight,
    },
    {
        id: 'attest', label: 'Attestation', icon: BiFile,
    },
    {
        id: 'tickets', label: 'Tickets', icon: BiPurchaseTag,
    },
    {
        id: 'family', label: 'Family Visa', icon: BiUser,
    },
    {
        id: 'freelance', label: 'Freelance', icon: BiLaptop,
    },
    {
        id: 'umrah', label: 'Umrah Visa', icon: BiMoon,
    },
    {
        id: 'holidays', label: 'Holidays', icon: BiSun,
    },
    {
        id: 'business', label: 'Business', icon: BiBuilding,
    },
    {
        id: 'cargo', label: 'Cargo', icon: BiPackage,
    },
    {
        id: 'global', label: 'Global Visa', icon: BiGlobe,
    },
    {
        id: 'jobs', label: 'Jobs', icon: BiBriefcase,
    },
] as const;

export default function DashboardPage() {
    const [selectedService, setSelectedService] = useState('bus');
    const router = useRouter();

    // Reset sub-option when service changes
    const handleServiceChange = (id: string) => {
        setSelectedService(id);
    };

    const handleProceed = () => {
        if (!selectedService) return;

        // Helper to get directory path
        const serviceDir = SERVICE_DIRECTORY_MAP[selectedService as keyof typeof SERVICE_DIRECTORY_MAP] || selectedService;

        // Default routing to the service's main page
        router.push(`/services/${serviceDir}`);
    };

    // Get current details
    const currentDetails = SERVICE_DETAILS[selectedService as keyof typeof SERVICE_DETAILS] || {
        title: services.find(s => s.id === selectedService)?.label || 'Service',
        description: `Explore our premium ${services.find(s => s.id === selectedService)?.label} services.`
    };

    return (
        <div className="w-full max-w-5xl flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700 mx-auto">

            {/* 
               The Main Neumorphic Slab 
            */}
            <NeumorphicCard className="p-6 sm:p-8 relative overflow-hidden flex-shrink-0">
                <h2 className="text-center text-xs font-bold tracking-[0.2em] text-slate-500 uppercase mb-6">
                    Select a Service
                </h2>

                {/* Grid */}
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-x-4 gap-y-6 place-items-center">
                    {services.map((service) => (
                        <ServiceIcon
                            key={service.id}
                            icon={service.icon}
                            label={service.label}
                            isActive={selectedService === service.id}
                            onClick={() => handleServiceChange(service.id)}
                        />
                    ))}
                </div>
            </NeumorphicCard>

            {/* 
               The "Action" Slab (Floating) 
               Shows specific details for selected service 
            */}
            {selectedService && (
                <NeumorphicCard className="p-6 flex flex-col md:flex-row items-center justify-between gap-6 animate-in slide-in-from-bottom-2 min-h-[100px]">

                    {/* Text Area */}
                    <div className="flex-1 w-full md:w-auto flex flex-col items-start gap-2">
                        <h3 className="text-lg font-bold text-slate-700">
                            {currentDetails.title}
                        </h3>
                        <p className="text-sm text-slate-500 leading-relaxed max-w-2xl font-medium">
                            {currentDetails.description}
                        </p>
                    </div>

                    {/* Explore Button Area */}
                    <div className="w-full md:w-auto flex justify-center md:justify-end">
                        <ExploreButton
                            className="w-full sm:w-auto px-8 py-3 shadow-neumorphic-sm hover:shadow-neumorphic-pressed transition-all"
                            onClick={handleProceed}
                        />
                    </div>

                </NeumorphicCard>
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

// Service Details Configuration
const SERVICE_DETAILS = {
    bus: {
        title: 'Visa Change by Bus',
        description: 'Renew your UAE visa without flying. A convenient round-trip bus service to Oman and back, suitable for 30-day or 60-day visa renewal.'
    },
    // Add other services specific text here as needed
};
