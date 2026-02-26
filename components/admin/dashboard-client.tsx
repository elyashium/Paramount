'use client'

import { motion } from 'framer-motion'
import { BookOpen, FileText, Mail, Plus, ArrowRight, Bell, Settings, LayoutGrid } from 'lucide-react'
import Link from 'next/link'

const EASE = [0.22, 1, 0.36, 1] as const

interface DashboardStats {
    courses: number
    ebooks: number
    inquiries: number
}

interface DashboardClientProps {
    stats: DashboardStats
}

export function DashboardClient({ stats: initialStats }: DashboardClientProps) {
    const stats = [
        { label: 'Total Courses', value: initialStats.courses.toString(), icon: BookOpen, color: '#E8B84B' },
        { label: 'Ebooks', value: initialStats.ebooks.toString(), icon: FileText, color: '#60A5FA' },
        { label: 'Total Inquiries', value: initialStats.inquiries.toString(), icon: Mail, color: '#F87171' },
    ]

    const quickActions = [
        {
            title: 'Add New Course',
            description: 'Create a new course offering',
            href: '/admin/courses/new',
            icon: Plus,
            color: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20 hover:border-emerald-500/50 hover:bg-emerald-500/20'
        },
        {
            title: 'Upload Ebook',
            description: 'Add new study material',
            href: '/admin/ebooks/new',
            icon: FileText,
            color: 'bg-blue-500/10 text-blue-500 border-blue-500/20 hover:border-blue-500/50 hover:bg-blue-500/20'
        },
        {
            title: 'View Messages',
            description: 'Respond to incoming inquiries',
            href: '/admin/messages',
            icon: Mail,
            color: 'bg-rose-500/10 text-rose-500 border-rose-500/20 hover:border-rose-500/50 hover:bg-rose-500/20'
        },
    ]

    return (
        <div className="space-y-8">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: EASE }}
                >
                    <h1 className="text-3xl font-black tracking-tight text-gray-900 dark:text-white mb-1">
                        Welcome back, Admin
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                        Here's what's happening with your academy today.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
                    className="flex items-center gap-3"
                >
                    <button className="p-2.5 rounded-xl bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10 transition-colors relative text-gray-400 hover:text-gray-900 dark:hover:text-white shadow-sm dark:shadow-none">
                        <Bell className="w-5 h-5" />
                        <span className="absolute top-2 right-2.5 w-2 h-2 rounded-full bg-red-500 border-2 border-white dark:border-[#0a0a0a]"></span>
                    </button>
                    <button className="p-2.5 rounded-xl bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-gray-400 hover:text-gray-900 dark:hover:text-white shadow-sm dark:shadow-none">
                        <Settings className="w-5 h-5" />
                    </button>
                    <Link href="/admin/courses/new" className="px-4 py-2.5 rounded-xl text-sm font-bold bg-[#E8B84B] text-black hover:bg-[#F3D37A] transition-colors flex items-center gap-2">
                        <Plus className="w-4 h-4" />
                        Quick Create
                    </Link>
                </motion.div>
            </header>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {stats.map((stat, i) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: i * 0.1, ease: EASE }}
                        className="bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-2xl p-5 relative overflow-hidden group hover:border-black/10 dark:hover:border-white/20 transition-all shadow-sm dark:shadow-none"
                    >
                        <div className="flex items-center justify-between mb-4 relative z-10">
                            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">{stat.label}</h3>
                            <div className="p-2 rounded-lg bg-black/5 dark:bg-black/40 border border-black/5 dark:border-white/5">
                                <stat.icon className="w-4 h-4" style={{ color: stat.color }} />
                            </div>
                        </div>
                        <div className="text-3xl font-black text-gray-900 dark:text-white relative z-10">{stat.value}</div>

                        {/* Subtle background glow */}
                        <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity pointer-events-none" style={{ backgroundColor: stat.color }} />
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Main Dashboard Area - Left 2 Columns */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Access Shortcuts */}
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <LayoutGrid className="w-4 h-4 text-[#E8B84B]" />
                            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Quick Shortcuts</h2>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {quickActions.map((action, i) => (
                                <Link
                                    key={action.title}
                                    href={action.href}
                                    className="block"
                                >
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.98 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.4, delay: 0.2 + (i * 0.1), ease: EASE }}
                                        className={`h-full border rounded-2xl p-4 transition-all cursor-pointer flex flex-col items-start bg-white dark:bg-transparent ${action.color}`}
                                    >
                                        <div className="mb-3 p-2 rounded-xl bg-black/5 dark:bg-black/20 mix-blend-overlay">
                                            <action.icon className="w-5 h-5 opacity-90" />
                                        </div>
                                        <h3 className="text-sm font-bold mb-1 opacity-90">{action.title}</h3>
                                        <p className="text-[11px] opacity-70 leading-snug">
                                            {action.description}
                                        </p>
                                    </motion.div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Information Module */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4, ease: EASE }}
                        className="bg-white dark:bg-[#E8B84B]/5 border border-black/5 dark:border-[#E8B84B]/20 rounded-3xl p-6 md:p-8 shadow-sm dark:shadow-none"
                    >
                        <h2 className="text-xl font-bold text-[#E8B84B] mb-2">Getting Started Guide</h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 max-w-lg">
                            Ensure all your course materials are up to date. The new profile section requires all active users to have complete profiles for best experience.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Link href="/admin/courses" className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-black/40 border border-black/5 dark:border-white/5 hover:border-black/10 dark:hover:border-white/10 transition-colors group">
                                <div className="w-8 h-8 rounded-full bg-[#E8B84B]/10 dark:bg-[#E8B84B]/20 flex items-center justify-center">
                                    <BookOpen className="w-4 h-4 text-[#E8B84B]" />
                                </div>
                                <div className="flex-1">
                                    <div className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-[#E8B84B] transition-colors">Review Courses</div>
                                    <div className="text-[10px] text-gray-500">Check active listings</div>
                                </div>
                                <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-[#E8B84B] transition-colors" />
                            </Link>

                            <Link href="/admin/messages" className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-black/40 border border-black/5 dark:border-white/5 hover:border-black/10 dark:hover:border-white/10 transition-colors group">
                                <div className="w-8 h-8 rounded-full bg-[#E8B84B]/10 dark:bg-[#E8B84B]/20 flex items-center justify-center">
                                    <Mail className="w-4 h-4 text-[#E8B84B]" />
                                </div>
                                <div className="flex-1">
                                    <div className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-[#E8B84B] transition-colors">Check Inbox</div>
                                    <div className="text-[10px] text-gray-500">Respond to new leads</div>
                                </div>
                                <ArrowRight className="w-4 h-4 text-gray-400 dark:text-gray-600 group-hover:text-[#E8B84B] transition-colors" />
                            </Link>
                        </div>
                    </motion.div>
                </div>

                {/* Right Column - Notifications & Activity */}
                <div className="lg:col-span-1 border border-black/5 dark:border-white/10 bg-white dark:bg-white/5 rounded-3xl overflow-hidden flex flex-col h-[500px] shadow-sm dark:shadow-none">
                    <div className="p-5 border-b border-black/5 dark:border-white/10 flex items-center justify-between bg-gray-50 dark:bg-black/20">
                        <div className="flex items-center gap-2">
                            <Bell className="w-4 h-4 text-gray-900 dark:text-white" />
                            <h2 className="text-sm font-bold text-gray-900 dark:text-white">Latest Alerts</h2>
                        </div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 dark:border-emerald-500/30">System Normal</span>
                    </div>

                    <div className="flex-1 overflow-y-auto p-2 scrollbar-none">
                        <div className="space-y-1">
                            <div className="p-3 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer border border-transparent">
                                <div className="flex items-start justify-between mb-1">
                                    <h4 className="text-xs font-bold text-gray-900 dark:text-white">Dashboard Live</h4>
                                    <span className="text-[10px] text-gray-500">Just now</span>
                                </div>
                                <p className="text-[11px] text-gray-500 dark:text-gray-400 line-clamp-2">Admin analytics widgets connected to Supabase successfully.</p>
                            </div>
                            <div className="p-3 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer border border-transparent">
                                <div className="flex items-start justify-between mb-1">
                                    <h4 className="text-xs font-bold text-gray-900 dark:text-white">Platform Update</h4>
                                    <span className="text-[10px] text-gray-500">1h ago</span>
                                </div>
                                <p className="text-[11px] text-gray-500 dark:text-gray-400 line-clamp-2">The profile section redesign has been successfully deployed to production.</p>
                            </div>

                            <div className="p-3 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer border border-transparent">
                                <div className="flex items-start justify-between mb-1">
                                    <h4 className="text-xs font-bold text-gray-900 dark:text-white">Database Migration</h4>
                                    <span className="text-[10px] text-gray-500">3h ago</span>
                                </div>
                                <p className="text-[11px] text-gray-500 dark:text-gray-400 line-clamp-2">Tables have been successfully migrated from user_roles to profiles to support new metadata.</p>
                            </div>
                        </div>
                    </div>

                    <div className="p-4 border-t border-black/5 dark:border-white/10 text-center bg-gray-50 dark:bg-black/20 mt-auto">
                        <button className="text-[11px] font-bold text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                            View All Activity History
                        </button>
                    </div>
                </div>

            </div>
        </div>
    )
}
