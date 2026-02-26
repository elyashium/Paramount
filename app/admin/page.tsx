import { createClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'
import { DashboardClient } from '@/components/admin/dashboard-client'

export default async function AdminDashboard() {
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)

    // Fetch actual dynamic counts concurrently
    const [coursesRes, ebooksRes, messagesRes] = await Promise.all([
        supabase.from('courses').select('id', { count: 'exact', head: true }),
        supabase.from('ebooks').select('id', { count: 'exact', head: true }),
        supabase.from('contact_messages').select('id', { count: 'exact', head: true }),
    ])

    const stats = {
        courses: coursesRes.count || 0,
        ebooks: ebooksRes.count || 0,
        inquiries: messagesRes.count || 0,
    }

    return <DashboardClient stats={stats} />
}
