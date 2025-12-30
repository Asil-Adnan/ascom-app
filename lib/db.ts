import { User, Application, Message, ServiceType, AppStatus, Role } from '@/types/schema';

const DB_KEY = 'allsupport_db_v1';
const SESSION_KEY = 'allsupport_session_v1';

interface DBState {
    users: User[];
    applications: Application[];
    messages: Message[];
}

const INITIAL_DB: DBState = {
    users: [
        { id: 'u1', name: 'Demo User', email: 'user@demo.com', phone: '0501234567', role: 'USER', createdAt: new Date().toISOString() },
        { id: 'a1', name: 'Admin One', email: 'admin@demo.com', phone: '0509999999', role: 'ADMIN', createdAt: new Date().toISOString() }
    ],
    applications: [],
    messages: []
};

class MockDatabase {
    private state: DBState;

    constructor() {
        this.state = this.load();
    }

    private load(): DBState {
        if (typeof window === 'undefined') return INITIAL_DB;
        try {
            console.log('[MockDatabase] Loading from localStorage...');
            const stored = localStorage.getItem(DB_KEY);
            if (stored) {
                console.log('[MockDatabase] Found stored data');
                return JSON.parse(stored);
            }
        } catch (error) {
            console.error('[MockDatabase] Failed to load from localStorage:', error);
            // Fallback to initial DB if storage fails
        }
        console.log('[MockDatabase] Using INITIAL_DB');
        return INITIAL_DB;
    }

    private save() {
        if (typeof window === 'undefined') return;
        try {
            console.log('[MockDatabase] Saving to localStorage...');
            localStorage.setItem(DB_KEY, JSON.stringify(this.state));
        } catch (e) {
            console.error('[MockDatabase] Save failed:', e);
        }
    }

    private async delay(ms = 400) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // --- Auth ---
    async login(email: string): Promise<User | null> {
        await this.delay();
        console.log('[MockDatabase] Login called for:', email);
        const user = this.state.users.find(u => u.email === email);
        if (user) {
            try {
                console.log('[MockDatabase] Setting session for:', user.id);
                localStorage.setItem(SESSION_KEY, JSON.stringify(user));
            } catch (e) {
                console.error('[MockDatabase] Set session failed:', e);
            }
            return user;
        }
        return null;
    }

    async logout() {
        localStorage.removeItem(SESSION_KEY);
    }

    getCurrentUser(): User | null {
        if (typeof window === 'undefined') return null;
        try {
            const stored = localStorage.getItem(SESSION_KEY);
            return stored ? JSON.parse(stored) : null;
        } catch (e) {
            console.error('[MockDatabase] Failed to get session:', e);
            return null;
        }
    }

    async register(name: string, email: string, phone: string): Promise<User> {
        await this.delay();
        const newUser: User = {
            id: `u${Date.now()}`,
            name,
            email,
            phone,
            role: 'USER',
            createdAt: new Date().toISOString()
        };
        this.state.users.push(newUser);
        this.save();
        localStorage.setItem(SESSION_KEY, JSON.stringify(newUser));
        return newUser;
    }

    // --- Applications ---
    async getApplications(userId: string): Promise<Application[]> {
        await this.delay();
        return this.state.applications
            .filter(app => app.userId === userId)
            .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
    }

    async getAllApplications(): Promise<Application[]> { // Admin
        await this.delay();
        return this.state.applications
            .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
    }

    async getApplication(id: string): Promise<Application | undefined> {
        await this.delay();
        return this.state.applications.find(app => app.id === id);
    }

    async createApplication(userId: string, type: ServiceType): Promise<Application> {
        await this.delay();
        const newApp: Application = {
            id: `${type.substring(0, 3)}-${Date.now().toString().slice(-4)}`,
            userId,
            type,
            status: 'DRAFT',
            step: 1,
            data: {},
            documents: [],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        this.state.applications.push(newApp);
        this.save();
        return newApp;
    }

    async updateApplication(id: string, updates: Partial<Application>): Promise<Application> {
        await this.delay();
        const index = this.state.applications.findIndex(a => a.id === id);
        if (index === -1) throw new Error('App not found');

        this.state.applications[index] = {
            ...this.state.applications[index],
            ...updates,
            updatedAt: new Date().toISOString()
        };
        this.save();
        return this.state.applications[index];
    }

    // --- Messages ---
    async getMessages(appId: string): Promise<Message[]> {
        await this.delay();
        return this.state.messages
            .filter(m => m.threadId === appId)
            .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    }

    async sendMessage(senderId: string, role: Role, appId: string, content: string): Promise<Message> {
        await this.delay();
        const msg: Message = {
            id: `msg-${Date.now()}`,
            threadId: appId,
            senderId,
            senderRole: role,
            type: 'TEXT',
            content,
            createdAt: new Date().toISOString()
        };
        this.state.messages.push(msg);
        this.save();
        return msg;
    }
}

export const db = new MockDatabase();
