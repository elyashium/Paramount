'use client'

import { useState } from 'react'
import { Mail, User, Search as SearchIcon, Filter, X } from 'lucide-react'

// Define the shape of our message data
type Message = {
    id: string
    name: string
    email: string
    phone: string | null
    subject: string | null
    message: string
    created_at: string
}

export function MessagesClient({ initialMessages }: { initialMessages: Message[] }) {
    const [messages] = useState(initialMessages)
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)

    const filteredMessages = messages.filter(msg => {
        const term = searchTerm.toLowerCase()
        return (
            msg.name.toLowerCase().includes(term) ||
            msg.email.toLowerCase().includes(term) ||
            (msg.subject && msg.subject.toLowerCase().includes(term))
        )
    })

    return (
        <div className="space-y-8 relative">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-white tracking-tight">Inquiries</h1>
                    <p className="text-gray-500 text-sm mt-1">Review and manage student applications and contact submissions.</p>
                </div>

                <div className="flex items-center gap-3">
                    <div className="relative">
                        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search messages..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-9 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm focus:ring-1 focus:ring-[#E8B84B] focus:outline-none w-64 text-white"
                        />
                    </div>
                </div>
            </header>

            <div className="bg-white/5 border border-white/10 rounded-[2rem] overflow-hidden backdrop-blur-md">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-white/10 text-xs font-bold text-gray-400 uppercase tracking-widest bg-white/[0.02]">
                                <th className="px-8 py-5">Sender</th>
                                <th className="px-6 py-5">Topic / Program</th>
                                <th className="px-6 py-5">Date Received</th>
                                <th className="px-8 py-5 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {filteredMessages.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="px-8 py-20 text-center">
                                        <div className="flex flex-col items-center justify-center opacity-40">
                                            <Mail className="w-12 h-12 mb-4" />
                                            <p className="text-sm font-medium">No messages found</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                filteredMessages.map(msg => (
                                    <tr
                                        key={msg.id}
                                        className="group hover:bg-white/[0.03] transition-colors cursor-pointer"
                                        onClick={() => setSelectedMessage(msg)}
                                    >
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-[#E8B84B]/30 transition-colors">
                                                    <User className="w-4 h-4 text-gray-400" />
                                                </div>
                                                <div>
                                                    <div className="text-sm font-bold text-white group-hover:text-[#E8B84B] transition-colors">{msg.name}</div>
                                                    <div className="text-[11px] text-gray-500 mt-0.5">{msg.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-6">
                                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold text-gray-400">
                                                <div className="w-1.5 h-1.5 rounded-full bg-[#E8B84B]" />
                                                {msg.subject || 'General Inquiry'}
                                            </div>
                                        </td>
                                        <td className="px-6 py-6 font-mono text-[11px] text-gray-500 uppercase tracking-wider">
                                            {new Date(msg.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <button className="text-xs font-bold text-[#E8B84B] hover:text-white transition-colors underline underline-offset-4 pointer-events-none">
                                                View details
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal for full message details */}
            {selectedMessage && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                    <div className="bg-[#0a0a0a] border border-white/10 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
                        <div className="flex items-center justify-between p-6 border-b border-white/10 bg-white/5">
                            <h2 className="text-lg font-bold text-white">Inquiry Details</h2>
                            <button
                                onClick={() => setSelectedMessage(null)}
                                className="p-2 rounded-full hover:bg-white/10 transition-colors text-gray-400 hover:text-white"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="p-6 md:p-8 overflow-y-auto space-y-6 scrollbar-none">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">Sender</h3>
                                    <p className="text-sm font-medium text-white">{selectedMessage.name}</p>
                                </div>
                                <div>
                                    <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">Date</h3>
                                    <p className="text-sm font-medium text-white">{new Date(selectedMessage.created_at).toLocaleString()}</p>
                                </div>
                                <div>
                                    <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">Email Contact</h3>
                                    <p className="text-sm font-medium text-white">{selectedMessage.email}</p>
                                </div>
                                <div>
                                    <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">Phone Number</h3>
                                    <p className="text-sm font-medium text-white">{selectedMessage.phone || 'Not provided'}</p>
                                </div>
                            </div>

                            <div className="pt-6 border-t border-white/10">
                                <h3 className="text-[10px] font-bold text-[#E8B84B] uppercase tracking-widest mb-1.5">Topic / Program</h3>
                                <p className="text-sm font-bold text-white mb-6 bg-[#E8B84B]/10 inline-block px-3 py-1 rounded-lg border border-[#E8B84B]/20">
                                    {selectedMessage.subject || 'General Inquiry'}
                                </p>

                                <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Message Body</h3>
                                <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                                    <p className="text-sm text-gray-300 leading-relaxed whitespace-pre-wrap">
                                        {selectedMessage.message}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 border-t border-white/10 bg-white/[0.02] flex justify-end gap-3">
                            <a
                                href={`mailto:${selectedMessage.email}`}
                                className="px-4 py-2 rounded-xl text-sm font-bold bg-[#E8B84B] text-black hover:bg-[#F3D37A] transition-colors"
                            >
                                Reply via Email
                            </a>
                            <button
                                onClick={() => setSelectedMessage(null)}
                                className="px-4 py-2 rounded-xl text-sm font-bold bg-white/10 text-white hover:bg-white/20 transition-colors"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
