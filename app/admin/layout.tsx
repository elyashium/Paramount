import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { LayoutDashboard, BookOpen, FileText, Mail } from 'lucide-react'

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)

    const { data: { session } } = await supabase.auth.getSession()

    if (!session) {
        redirect('/auth/login')
    }

    const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', session.user.id)
        .single()

    if (profile?.role !== 'admin') {
        redirect('/')
    }

    return (
        <div className="flex min-h-screen pt-20">
            {/* Sidebar */}
            <aside className="w-64 border-r bg-card hidden md:block px-4 py-8">
                <div className="mb-8">
                    <h2 className="text-xl font-bold px-2">Admin Panel</h2>
                </div>
                <nav className="space-y-2">
                    <Button variant="ghost" className="w-full justify-start" asChild>
                        <Link href="/admin">
                            <LayoutDashboard className="mr-2 h-4 w-4" />
                            Overview
                        </Link>
                    </Button>
                    <Button variant="ghost" className="w-full justify-start" asChild>
                        <Link href="/admin/courses">
                            <BookOpen className="mr-2 h-4 w-4" />
                            Courses
                        </Link>
                    </Button>
                    <Button variant="ghost" className="w-full justify-start" asChild>
                        <Link href="/admin/ebooks">
                            <FileText className="mr-2 h-4 w-4" />
                            Ebooks
                        </Link>
                    </Button>
                    <Button variant="ghost" className="w-full justify-start" asChild>
                        <Link href="/admin/messages">
                            <Mail className="mr-2 h-4 w-4" />
                            Messages
                        </Link>
                    </Button>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8">
                {children}
            </main>
        </div>
    )
}
