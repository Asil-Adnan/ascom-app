'use client';

import { useEffect, useState } from 'react';
import { NeumorphicCard } from '@/components/ui/NeumorphicCard';
import { useAuth } from '@/lib/auth-context';
// We need a server action to get all users/data. I'll add it to auth.ts actions or similar.
// For now, let's mock the UI to show the structure requested "DB control system".

export default function SuperAdminPage() {
    const { user } = useAuth();
    // Assuming user is SUPER_ADMIN

    return (
        <div className="min-h-screen bg-[#EFEBEB] p-8 font-mono">
            <header className="mb-8 flex justify-between items-center bg-slate-800 text-green-400 p-4 rounded-xl shadow-lg border border-slate-700">
                <h1 className="text-xl font-bold">{'>'} DB_CONTROL_SYSTEM // SUPER_ADMIN</h1>
                <div className="text-sm">Logged in as: {(user as any)?.username || 'ROOT'}</div>
            </header>

            <div className="grid grid-cols-12 gap-8">
                {/* Sidebar */}
                <div className="col-span-3 space-y-4">
                    <ControlPanelItem label="USERS_TABLE" count={142} active />
                    <ControlPanelItem label="ADMINS_TABLE" count={5} />
                    <ControlPanelItem label="APPLICATIONS_LOG" count={892} />
                    <ControlPanelItem label="SYSTEM_LOGS" />
                </div>

                {/* Main Data View */}
                <div className="col-span-9">
                    <div className="bg-slate-900 text-slate-300 p-6 rounded-xl shadow-2xl border border-slate-700 h-[70vh] overflow-hidden flex flex-col">
                        <div className="flex justify-between items-center mb-4 border-b border-slate-700 pb-2">
                            <h2 className="text-lg font-bold text-white">Viewing: USERS_TABLE</h2>
                            <button className="bg-green-600 hover:bg-green-500 text-white px-4 py-1 rounded text-xs font-bold font-mono">
                                + INSERT_NEW_ROW
                            </button>
                        </div>

                        <div className="overflow-auto flex-1 font-mono text-xs">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-slate-800 text-slate-400">
                                    <tr>
                                        <th className="p-3 border-r border-slate-700">ID</th>
                                        <th className="p-3 border-r border-slate-700">NAME</th>
                                        <th className="p-3 border-r border-slate-700">CONTACT</th>
                                        <th className="p-3 border-r border-slate-700">ROLE</th>
                                        <th className="p-3 border-r border-slate-700">STATUS</th>
                                        <th className="p-3">ACTIONS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[1, 2, 3, 4, 5].map(i => (
                                        <tr key={i} className="border-b border-slate-800 hover:bg-slate-800/50">
                                            <td className="p-3 border-r border-slate-800 text-slate-500">usr_{1000 + i}</td>
                                            <td className="p-3 border-r border-slate-800 text-blue-400">User_{i}</td>
                                            <td className="p-3 border-r border-slate-800">user{i}@mail.com</td>
                                            <td className="p-3 border-r border-slate-800 text-yellow-500">USER</td>
                                            <td className="p-3 border-r border-slate-800 text-green-500">ACTIVE</td>
                                            <td className="p-3 text-red-400 cursor-pointer hover:underline">[DELETE] [EDIT]</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="mt-4 pt-2 border-t border-slate-700 text-slate-500 text-xs flex justify-between">
                            <span>Rows: 5 displayed</span>
                            <span>Query Time: 12ms</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ControlPanelItem({ label, count, active }: { label: string, count?: number, active?: boolean }) {
    return (
        <div className={`p-4 rounded-lg cursor-pointer transition-all border ${active
            ? 'bg-slate-800 border-green-500 text-green-400 shadow-[0_0_15px_rgba(34,197,94,0.2)]'
            : 'bg-slate-900 border-slate-700 text-slate-500 hover:border-slate-500 hover:text-slate-300'
            }`}>
            <div className="flex justify-between items-center">
                <span className="font-bold tracking-wider">{label}</span>
                {count !== undefined && <span className="bg-slate-800 px-2 rounded text-xs">{count}</span>}
            </div>
        </div>
    );
}
