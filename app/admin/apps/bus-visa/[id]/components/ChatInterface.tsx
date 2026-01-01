'use client';

import { useState } from 'react';
import { sendApplicationMessage } from '@/app/actions/application-management';
import { NeoCard } from '@/components/ui/NeoCard';
import { NeoButton } from '@/components/ui/NeoButton';
import { Send, Paperclip, FileText, User, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export function ChatInterface({ applicationId, initialMessages }: { applicationId: string, initialMessages: any[] }) {
    const [messages, setMessages] = useState(initialMessages);
    const [input, setInput] = useState('');
    const [sending, setSending] = useState(false);

    const handleSend = async () => {
        if (!input.trim()) return;
        setSending(true);

        const tempId = 'temp-' + Date.now();
        const optimisticMsg = {
            id: tempId,
            content: input,
            senderRole: 'ADMIN',
            senderId: 'ADMIN', // Placeholder
            type: 'TEXT',
            createdAt: new Date().toISOString()
        };

        setMessages([...messages, optimisticMsg]);
        setInput('');

        const res = await sendApplicationMessage(applicationId, input);
        if (!res.success) {
            toast.error('Failed to send message');
            setMessages(messages); // Revert
        } else {
            // Ideally re-fetch or use router.refresh(), but optimistic is fine for now
            toast.success('Message sent');
        }
        setSending(false);
    };

    return (
        <NeoCard className="flex flex-col h-[600px] bg-white border-gray-200">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                <div>
                    <h3 className="font-bold text-gray-700">Communication</h3>
                    <p className="text-xs text-gray-400">Send updates & documents to user</p>
                </div>
                {/* Mock File Upload Button for Admin */}
                <button className="p-2 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-600 transition-colors">
                    <Paperclip size={18} />
                </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
                {messages.length === 0 && (
                    <div className="text-center text-gray-300 py-10">
                        <p className="text-sm">No messages yet.</p>
                    </div>
                )}

                {messages.map((msg: any) => {
                    const isAdmin = msg.senderRole === 'ADMIN' || msg.senderRole === 'SYSTEM';
                    const isSystem = msg.senderRole === 'SYSTEM';

                    if (isSystem) {
                        return (
                            <div key={msg.id} className="flex justify-center my-2">
                                <span className="text-[10px] font-bold bg-gray-100 text-gray-500 px-3 py-1 rounded-full uppercase tracking-wider">
                                    {msg.content}
                                </span>
                            </div>
                        );
                    }

                    return (
                        <div key={msg.id} className={`flex ${isAdmin ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[80%] rounded-2xl p-4 ${isAdmin
                                ? 'bg-blue-600 text-white rounded-br-none'
                                : 'bg-white border border-gray-100 text-gray-700 rounded-bl-none shadow-sm'
                                }`}>
                                <p className="text-sm">{msg.content}</p>
                                {/* If file attachment logic existed, it would go here */}
                                <p className={`text-[10px] mt-2 text-right ${isAdmin ? 'text-blue-200' : 'text-gray-300'}`}>
                                    {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="p-4 bg-white border-t border-gray-100">
                <form
                    onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                    className="flex gap-2"
                >
                    <input
                        className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                        placeholder="Type a message..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        disabled={sending}
                    />
                    <NeoButton
                        type="submit"
                        className="w-12 h-12 rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20 flex items-center justify-center p-0"
                        disabled={sending || !input.trim()}
                    >
                        {sending ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} />}
                    </NeoButton>
                </form>
            </div>
        </NeoCard>
    );
}
