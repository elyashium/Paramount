import { createClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'

export default async function AdminMessagesPage() {
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)

    const { data: messages, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false })

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Contact Submissions</h1>
            </div>

            <div className="rounded-md border bg-card">
                <table className="w-full text-sm text-left">
                    <thead className="border-b bg-muted/50 text-muted-foreground uppercase">
                        <tr>
                            <th className="px-4 py-3 font-medium">Date</th>
                            <th className="px-4 py-3 font-medium">Name</th>
                            <th className="px-4 py-3 font-medium">Email</th>
                            <th className="px-4 py-3 font-medium">Message</th>
                        </tr>
                    </thead>
                    <tbody>
                        {!messages || messages.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="p-4 text-center">No messages found.</td>
                            </tr>
                        ) : (
                            messages.map(msg => (
                                <tr key={msg.id} className="border-b last:border-0 hover:bg-muted/50">
                                    <td className="px-4 py-3 whitespace-nowrap">
                                        {new Date(msg.created_at).toLocaleDateString()}
                                    </td>
                                    <td className="px-4 py-3 font-medium">{msg.name}</td>
                                    <td className="px-4 py-3">{msg.email}</td>
                                    <td className="px-4 py-3 max-w-md truncate" title={msg.message}>
                                        {msg.message}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
