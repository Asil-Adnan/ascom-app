'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth-context';
import { NeumorphicCard } from '@/components/ui/NeumorphicCard';
import { getUserThreads, getThreadMessages, sendMessage } from '@/lib/actions/unified';
import { Send, Paperclip, FileCheck } from 'lucide-react';
import { toast } from 'sonner';

export default function MessagesPage() {
    const { user } = useAuth();
    const [threads, setThreads] = useState<any[]>([]);
    const [activeThreadId, setActiveThreadId] = useState<string | null>(null);
    const [messages, setMessages] = useState<any[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    // Load Threads
    useEffect(() => {
        if (!user) return;
        loadThreads();
    }, [user]);

    // Load Messages when thread selected
    useEffect(() => {
        if (activeThreadId) {
            loadMessages(activeThreadId);
        }
    }, [activeThreadId]);

    const loadThreads = async () => {
        try {
            const data = await getUserThreads(user!.id);
            setThreads(data);
            if (data.length > 0 && !activeThreadId) {
                setActiveThreadId(data[0].id);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const loadMessages = async (threadId: string) => {
        const msgs = await getThreadMessages(threadId);
        setMessages(msgs);
    };

    const handleSend = async () => {
        if (!newMessage.trim() && !activeThreadId) return;

        try {
            // Optimistic update? Better to wait for simplicity first
            await sendMessage(
                user!.id,
                'USER',
                newMessage,
                [], // TODO: Handle file upload UI
                activeThreadId || undefined
            );

            setNewMessage('');
            if (activeThreadId) await loadMessages(activeThreadId);
            else await loadThreads(); // New thread created context

        } catch (error) {
            toast.error('Failed to send message');
        }
    };

    if (isLoading) return <div className="p-8 text-center text-slate-500">Loading messages...</div>;

    return (
        <div className="w-full max-w-6xl mx-auto h-[80vh] flex gap-6 pt-6">

            {/* Thread List - Left Panel */}
            <NeumorphicCard className="w-1/3 min-w-[280px] flex flex-col overflow-hidden">
                <div className="p-4 border-b border-slate-200/50">
                    <h2 className="font-bold text-slate-700">Conversations</h2>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                    <button
                        onClick={() => setActiveThreadId(null)}
                        className="w-full text-left p-3 rounded-xl bg-red-50 text-red-600 font-medium text-sm hover:bg-red-100 transition-colors"
                    >
                        + Start New Chat
                    </button>

                    {threads.map(thread => (
                        <button
                            key={thread.id}
                            onClick={() => setActiveThreadId(thread.id)}
                            className={`w-full text-left p-4 rounded-2xl transition-all ${activeThreadId === thread.id
                                    ? 'bg-white shadow-sm ring-1 ring-red-100'
                                    : 'hover:bg-white/50'
                                }`}
                        >
                            <div className="flex justify-between items-start mb-1">
                                <span className="font-semibold text-slate-700 text-sm">
                                    {thread.type === 'GENERAL_CHAT' ? 'Support Chat' : thread.type}
                                </span>
                                <span className="text-[10px] text-slate-400">
                                    {new Date(thread.updatedAt).toLocaleDateString()}
                                </span>
                            </div>
                            <p className="text-xs text-slate-500 truncate">
                                {thread.lastMessage?.content || 'No messages'}
                            </p>
                        </button>
                    ))}
                </div>
            </NeumorphicCard>

            {/* Chat Area - Right Panel */}
            <NeumorphicCard className="flex-1 flex flex-col overflow-hidden relative" inset>

                {/* Messages List */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {messages.map((msg) => {
                        const isMe = msg.role === 'USER';
                        return (
                            <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[70%] p-4 rounded-2xl text-sm ${isMe
                                        ? 'bg-red-500 text-white rounded-br-sm shadow-md'
                                        : 'bg-white text-slate-700 rounded-bl-sm shadow-sm'
                                    }`}>
                                    <p>{msg.content}</p>
                                    {msg.attachments && msg.attachments.length > 0 && (
                                        <div className="mt-2 space-y-1">
                                            {msg.attachments.map((file: any, i: number) => (
                                                <div key={i} className="flex items-center gap-2 bg-black/10 p-2 rounded-lg">
                                                    <FileCheck size={16} />
                                                    <span className="truncate max-w-[150px]">{file.name}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                    <div className={`text-[10px] mt-1 ${isMe ? 'text-white/70' : 'text-slate-400'}`}>
                                        {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                    {!activeThreadId && (
                        <div className="h-full flex flex-col items-center justify-center text-slate-400">
                            <Send size={48} className="mb-4 opacity-20" />
                            <p>Start a new conversation</p>
                        </div>
                    )}
                </div>

                {/* Input Area */}
                <div className="p-4 bg-white/50 backdrop-blur-md border-t border-slate-200/50 flex gap-3 items-center">
                    <button className="p-2 hover:bg-slate-200/50 rounded-full text-slate-500 transition-colors">
                        <Paperclip size={20} />
                    </button>
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type your message..."
                        className="flex-1 bg-transparent border-none outline-none text-slate-700 placeholder:text-slate-400"
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    />
                    <button
                        onClick={handleSend}
                        className="p-3 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-lg transition-all hover:scale-105 active:scale-95"
                    >
                        <Send size={18} />
                    </button>
                </div>

            </NeumorphicCard>
        </div>
    );
}
