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

    console.log("[AdminLayout] Session user ID:", session?.user?.id);

    if (!session) {
        redirect('/auth/login')
    }

    const { data: profile, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', session.user.id)
        .single()

    console.log("[AdminLayout] Profile fetch result:", { role: profile?.role, error });

    if (profile?.role !== 'admin') {
        console.warn("[AdminLayout] Unauthorized access attempt by rank:", profile?.role);
        redirect('/')
    }

    return (
        <div className="flex h-screen overflow-hidden bg-[#0a0a0a] text-white">
            {/* Sidebar - Not Fixed */}
            <aside className="w-64 border-r border-white/10 bg-black/40 backdrop-blur-2xl px-4 py-8 flex flex-col hidden md:flex h-full">
                <div className="px-4 mb-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8B84B]/10 border border-[#E8B84B]/20 text-[10px] uppercase tracking-widest font-bold text-[#E8B84B]">
                        Admin Console
                    </div>
                </div>

                <nav className="flex-1 space-y-1.5 px-2 overflow-y-auto scrollbar-none">
                    {[
                        { href: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
                        { href: '/admin/courses', icon: BookOpen, label: 'Manage Courses' },
                        { href: '/admin/ebooks', icon: FileText, label: 'Study Materials' },
                        { href: '/admin/messages', icon: Mail, label: 'Inquiries' },
                    ].map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all group hover:bg-white/5"
                        >
                            <item.icon className="w-4 h-4 text-gray-400 group-hover:text-[#E8B84B] transition-colors" />
                            <span className="text-gray-400 group-hover:text-white transition-colors">{item.label}</span>
                        </Link>
                    ))}
                </nav>

                <div className="mt-8 px-2 pt-4 border-t border-white/5 shrink-0">
                    <div className="p-3 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#E8B84B]/20 flex items-center justify-center border border-[#E8B84B]/30">
                            <span className="text-[#E8B84B] text-xs font-bold">A</span>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-xs font-bold truncate">Administrator</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 relative w-full h-full overflow-y-auto scrollbar-none">
                {/* Background ambient glow */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#E8B84B]/5 rounded-full blur-[120px] pointer-events-none" />

                <div className="relative z-10 p-4 md:p-8 max-w-7xl mx-auto h-full pb-20">
                    {children}
                </div>
            </main>
        </div>
    )
}
