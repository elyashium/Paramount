import { createClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'
import { MessagesClient } from '@/components/admin/messages-client'

export const dynamic = 'force-dynamic'

export default async function AdminMessagesPage() {
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)

    const { data: messages, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false })

    if (error) {
        console.error('Error fetching messages:', error)
        return (
            <div className="flex items-center justify-center h-[50vh] flex-col gap-4">
                <div className="text-red-500 font-bold">Failed to load messages</div>
                <div className="text-sm text-gray-500">{error.message}</div>
            </div>
        )
    }

    return <MessagesClient initialMessages={messages || []} />
}
