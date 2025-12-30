'use client';

import { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/lib/auth-context';
import { db } from '@/lib/db';
import { Application, Message } from '@/types/schema';
import { NeoCard } from '@/components/ui/NeoCard';
import { NeoButton } from '@/components/ui/NeoButton';
import { NeoIcon } from '@/components/ui/NeoIcon';
import { MessageSquare, Send, Search, FileText, User as UserIcon, MoreVertical } from 'lucide-react';
// Removed date-fns import

export default function MessagesPage() {
    const { user } = useAuth();
    const [applications, setApplications] = useState<Application[]>([]);
    const [selectedAppId, setSelectedAppId] = useState<string | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Initial Load: Get threads (applications)
    useEffect(() => {
        if (user) {
            db.getApplications(user.id).then(apps => {
                setApplications(apps);
                if (apps.length > 0) {
                    setSelectedAppId(apps[0].id);
                }
                setLoading(false);
            });
        }
    }, [user]);

    // Load messages when thread is selected
    useEffect(() => {
        if (selectedAppId) {
            db.getMessages(selectedAppId).then(msgs => setMessages(msgs));
        }
    }, [selectedAppId]);

    // Auto-scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim() || !selectedAppId || !user) return;

        const sentMsg = await db.sendMessage(user.id, user.role, selectedAppId, newMessage);
        setMessages([...messages, sentMsg]);
        setNewMessage('');
    };

    const selectedApp = applications.find(a => a.id === selectedAppId);

    if (loading) return <div className="flex h-full items-center justify-center text-gray-400">Loading messages...</div>;

    return (
        <div className="flex h-[calc(100vh-120px)] gap-8 animate-in fade-in duration-500">

            {/* LEFT SIDEBAR: THREAD LIST */}
            <div className="w-1/3 flex flex-col space-y-6">
                <NeoCard className="flex-1 flex flex-col overflow-hidden p-0">
                    <div className="p-6 border-b border-gray-100 bg-white/50 backdrop-blur-md">
                        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-3">
                            <MessageSquare className="text-red-500" size={24} />
                            Messages
                        </h2>
                        <div className="mt-4 relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="text"
                                placeholder="Search conversations..."
                                className="w-full bg-gray-100 rounded-xl pl-10 pr-4 py-3 text-sm font-medium text-gray-700 outline-none focus:ring-2 focus:ring-red-100 transition-all"
                            />
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 space-y-2">
                        {applications.length === 0 ? (
                            <div className="text-center p-8 text-gray-400">No active applications found. Start a service to chat.</div>
                        ) : (
                            applications.map(app => (
                                <div
                                    key={app.id}
                                    onClick={() => setSelectedAppId(app.id)}
                                    className={`p-4 rounded-xl cursor-pointer transition-all border border-transparent
                                        ${selectedAppId === app.id ? 'bg-red-50 border-red-100 shadow-inner' : 'hover:bg-gray-50'}
                                    `}
                                >
                                    <div className="flex justify-between items-start mb-1">
                                        <h4 className={`font-bold text-sm ${selectedAppId === app.id ? 'text-red-700' : 'text-gray-700'}`}>
                                            {app.type.replace('-', ' ').toUpperCase()} ({app.id})
                                        </h4>
                                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{app.status}</span>
                                    </div>
                                    <p className="text-xs text-gray-500 truncate">
                                        Click to view updates and chat with support.
                                    </p>
                                </div>
                            ))
                        )}
                    </div>
                </NeoCard>
            </div>

            {/* RIGHT SIDE: CHAT WINDOW */}
            <div className="flex-1 flex flex-col">
                <NeoCard className="flex-1 flex flex-col overflow-hidden p-0 relative">
                    {selectedApp ? (
                        <>
                            {/* Chat Header */}
                            <div className="p-6 border-b border-gray-100 bg-white/80 backdrop-blur-md flex justify-between items-center z-10 shadow-sm">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                                        <FileText size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-800">Application #{selectedApp.id}</h3>
                                        <p className="text-sm text-green-600 font-bold flex items-center gap-1">
                                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                            Support Agent Active
                                        </p>
                                    </div>
                                </div>
                                <button className="p-2 hover:bg-gray-100 rounded-full text-gray-400 transition-colors">
                                    <MoreVertical size={20} />
                                </button>
                            </div>

                            {/* Chat Messages */}
                            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50/50">
                                {messages.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center h-full text-gray-400 text-sm">
                                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-gray-300">
                                            <MessageSquare size={32} />
                                        </div>
                                        <p>No messages yet. Start the conversation!</p>
                                        <p className="text-xs mt-2">Ask about your application status, documents, or next steps.</p>
                                    </div>
                                ) : (
                                    messages.map((msg) => {
                                        const isMe = msg.senderId === user?.id;
                                        return (
                                            <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                                                <div className={`max-w-[70%] rounded-2xl p-4 shadow-sm relative ${isMe ? 'bg-red-500 text-white rounded-br-none' : 'bg-white text-gray-700 border border-gray-100 rounded-bl-none'}`}>
                                                    <p className="text-sm leading-relaxed">{msg.content}</p>
                                                    <span className={`text-[10px] mt-2 block opacity-70 ${isMe ? 'text-red-100 text-right' : 'text-gray-400'}`}>
                                                        {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                    </span>
                                                </div>
                                            </div>
                                        );
                                    })
                                )}
                                <div ref={messagesEndRef} />
                            </div>

                            {/* Input Area */}
                            <div className="p-6 bg-white border-t border-gray-100">
                                <form onSubmit={handleSendMessage} className="flex gap-4">
                                    <input
                                        className="flex-1 h-14 bg-gray-100 rounded-xl px-6 text-gray-700 outline-none focus:ring-2 focus:ring-red-100 focus:bg-white transition-all neo-inset font-medium placeholder:text-gray-400"
                                        placeholder="Type your message here..."
                                        value={newMessage}
                                        onChange={(e) => setNewMessage(e.target.value)}
                                    />
                                    <NeoButton type="submit" className={`w-14 h-14 rounded-xl flex items-center justify-center ${!newMessage.trim() ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={!newMessage.trim()}>
                                        <Send size={20} className="ml-1" />
                                    </NeoButton>
                                </form>
                            </div>
                        </>
                    ) : (
                        <div className="flex items-center justify-center h-full text-gray-400 font-bold">
                            Select an application to view messages
                        </div>
                    )}
                </NeoCard>
            </div>
        </div>
    );
}
