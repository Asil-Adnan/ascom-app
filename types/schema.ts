export type Role = 'USER' | 'ADMIN';

export type ServiceType =
    | 'BUS_VISA'
    | 'WORLDWIDE_VISA'
    | 'FAMILY_VISA'
    | 'ATTESTATION'
    | 'JOBS'
    | 'BUSINESS'
    | 'CARGO'
    | 'HOLIDAYS'
    | 'TICKETS'
    | 'A2A'
    | 'UMRAH'
    | 'FREELANCE';

export type AppStatus =
    | 'DRAFT'
    | 'SUBMITTED'
    | 'IN_PROGRESS'
    | 'ACTION_REQUIRED'
    | 'COMPLETED'
    | 'REJECTED';

export type MessageType = 'TEXT' | 'TEMPLATE' | 'SYSTEM';

export interface User {
    id: string;
    name: string;
    email: string;
    phone: string;
    role: Role;
    createdAt: string;
}

export interface Message {
    id: string;
    threadId: string;
    senderRole: Role;
    senderId: string;
    type: MessageType;
    content: string;
    createdAt: string;
}

export interface ApplicationDocument {
    id: string;
    type: string;
    name: string;
    url: string; // For mock, this might be a data URL or placeholder
    uploadedBy: Role;
    uploadedAt: string;
}

export interface Application {
    id: string;
    userId: string;
    type: ServiceType;
    status: AppStatus;
    step: number; // 1: Details, 2: Documents, 3: Review, 4: Submitted (Status tracks post-submission)
    data: Record<string, any>; // Flexible JSON for service-specific fields
    documents: ApplicationDocument[];
    createdAt: string;
    updatedAt: string;
}
