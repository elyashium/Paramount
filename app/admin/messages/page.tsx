import { createClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'
import { Mail, Calendar, User, Phone, Search as SearchIcon, Filter } from 'lucide-react'

export default async function AdminMessagesPage() {
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)

    const { data: messages, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false })

    return (
        <div className="space-y-8">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-white tracking-tight">Inquiries</h1>
                    <p className="text-gray-500 text-sm mt-1">Review and manage student applications and contact submissions.</p>
                </div>

                <div className="flex items-center gap-3">
                    <div className="relative">
                        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <input
                            placeholder="Search messages..."
                            className="pl-9 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs focus:ring-1 focus:ring-[#E8B84B] focus:outline-none w-64"
                        />
                    </div>
                    <button className="p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                        <Filter className="w-4 h-4 text-gray-400" />
                    </button>
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
                            {!messages || messages.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="px-8 py-20 text-center">
                                        <div className="flex flex-col items-center justify-center opacity-40">
                                            <Mail className="w-12 h-12 mb-4" />
                                            <p className="text-sm font-medium">No messages in inbox</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                messages.map(msg => (
                                    <tr key={msg.id} className="group hover:bg-white/[0.03] transition-colors">
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
                                            <button className="text-xs font-bold text-[#E8B84B] hover:text-white transition-colors underline underline-offset-4">
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
        </div>
    )
}
