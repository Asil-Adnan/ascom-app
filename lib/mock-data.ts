import { Globe, Users, FileCheck, Bus, Package, Palmtree, Plane, Repeat, FileText } from 'lucide-react';

export interface Application {
    id: string;
    type: 'Worldwide Visa' | 'Family Visa' | 'Attestation' | 'Bus Visa Change' | 'Cargo Courier' | 'Holidays' | 'Tickets' | 'A2A Flight' | 'Jobs' | 'Business Setup';
    status: 'Pending' | 'Approved' | 'Rejected' | 'Under Review' | 'Quote Sent' | 'Action Needed';
    user: {
        name: string;
        email: string;
        phone: string;
    };
    date: string;
    description: string;
    details: Record<string, any>;
}

export const MOCK_APPLICATIONS: Application[] = [
    {
        id: 'APP-001',
        type: 'Worldwide Visa',
        status: 'Pending',
        user: { name: 'Mary Smith', email: 'mary@test.com', phone: '+971500001111' },
        date: '2023-10-25',
        description: 'UK Tourist Visa',
        details: { destination: 'UK', nationality: 'UAE Resident', visaType: 'Tourist' }
    },
    {
        id: 'APP-002',
        type: 'Bus Visa Change',
        status: 'Approved',
        user: { name: 'John Doe', email: 'john@test.com', phone: '+971500002222' },
        date: '2023-10-24',
        description: 'Oman Border Run',
        details: { date: '2023-10-30', operator: 'Al Khanjry', seats: 1 }
    },
    {
        id: 'APP-003',
        type: 'Family Visa',
        status: 'Under Review',
        user: { name: 'Ahmed Ali', email: 'ahmed@test.com', phone: '+971500003333' },
        date: '2023-10-23',
        description: 'Wife & Child Sponsorship',
        details: { sponsorSalary: 8000, housing: 'Rented', dependents: 2 }
    },
    {
        id: 'APP-004',
        type: 'Attestation',
        status: 'Pending',
        user: { name: 'Sarah Jones', email: 'sarah@test.com', phone: '+971500004444' },
        date: '2023-10-23',
        description: 'Degree Certificate Attestation',
        details: { docType: 'Degree', origin: 'India', speed: 'Express' }
    },
    {
        id: 'APP-005',
        type: 'Cargo Courier',
        status: 'Quote Sent',
        user: { name: 'Trading Co LLC', email: 'info@trading.com', phone: '+971500005555' },
        date: '2023-10-22',
        description: 'Commercial Air Cargo to UK',
        details: { weight: '500kg', method: 'Air', content: 'Textiles' }
    },
    {
        id: 'APP-006',
        type: 'Holidays',
        status: 'Pending',
        user: { name: 'Lisa Ray', email: 'lisa@test.com', phone: '+971500006666' },
        date: '2023-10-21',
        description: 'Maldives Honeymoon Package',
        details: { type: 'Honeymoon', destination: 'Maldives', budget: '15000 AED', inclusions: ['Flights', 'Hotel'] }
    },
    {
        id: 'APP-007',
        type: 'Tickets',
        status: 'Action Needed',
        user: { name: 'Gary Oak', email: 'gary@test.com', phone: '+971500007777' },
        date: '2023-10-20',
        description: 'Flight to London',
        details: { from: 'DXB', to: 'LHR', date: '2023-11-15', class: 'Economy' }
    },
    {
        id: 'APP-008',
        type: 'A2A Flight',
        status: 'Pending',
        user: { name: 'Ash Ketchum', email: 'ash@test.com', phone: '+971500008888' },
        date: '2023-10-19',
        description: 'Dubai - Muscat - Dubai',
        details: { route: 'DXB-MCT-DXB', depart: '2023-11-01', visaRequired: true }
    },
    {
        id: 'APP-009',
        type: 'Business Setup',
        status: 'Pending',
        user: { name: 'New Ventures FZ', email: 'start@new.com', phone: '+971500009999' },
        date: '2023-10-18',
        description: 'New License Inquiry',
        details: { interest: 'Free Zone License', activity: 'Consultancy' }
    }
];

export const getServiceIcon = (type: string) => {
    switch (type) {
        case 'Worldwide Visa': return Globe;
        case 'Family Visa': return Users;
        case 'Attestation': return FileCheck;
        case 'Bus Visa Change': return Bus;
        case 'Cargo Courier': return Package;
        case 'Holidays': return Palmtree;
        case 'Tickets': return FileText; // Using FileText as generic Ticket icon
        case 'A2A Flight': return Plane;
        case 'A2A': return Plane;
        default: return FileText;
    }
};
