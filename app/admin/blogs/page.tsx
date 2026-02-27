import { createClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'
import { Button } from '@/components/ui/button'
import { Plus, Pencil, Trash } from 'lucide-react'
import Link from 'next/link'

export default async function AdminBlogsPage() {
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)

    const { data: blogs, error } = await supabase
        .from('blogs')
        .select('*')
        .order('created_at', { ascending: false })

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Manage Blogs</h1>
                <Button asChild className="bg-[#E8B84B] text-black hover:bg-[#F3D37A]">
                    <Link href="/admin/blogs/new">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Blog
                    </Link>
                </Button>
            </div>

            <div className="rounded-2xl border border-black/5 dark:border-white/10 bg-white dark:bg-white/5 overflow-hidden shadow-sm dark:shadow-none">
                <table className="w-full text-sm text-left">
                    <thead className="border-b border-black/5 dark:border-white/10 bg-gray-50 dark:bg-black/20 text-gray-500 uppercase">
                        <tr>
                            <th className="px-6 py-4 font-bold tracking-wider">Title</th>
                            <th className="px-6 py-4 font-bold tracking-wider">Slug</th>
                            <th className="px-6 py-4 font-bold tracking-wider">Status</th>
                            <th className="px-6 py-4 font-bold tracking-wider text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-black/5 dark:divide-white/10">
                        {!blogs || blogs.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="px-6 py-8 text-center text-gray-500">No blogs found. Create your first one above.</td>
                            </tr>
                        ) : (
                            blogs.map(blog => (
                                <tr key={blog.id} className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="font-bold text-gray-900 dark:text-white">{blog.title}</div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-500 font-mono text-xs">{blog.slug}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${blog.is_published
                                                ? 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20'
                                                : 'bg-yellow-500/10 text-yellow-600 border border-yellow-500/20'
                                            }`}>
                                            {blog.is_published ? 'Published' : 'Draft'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <Button variant="ghost" size="icon" asChild className="hover:text-[#E8B84B]">
                                            <Link href={`/admin/blogs/${blog.id}`}>
                                                <Pencil className="h-4 w-4" />
                                            </Link>
                                        </Button>
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
