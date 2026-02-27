import { createClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'
import { BlogForm } from '@/components/admin/blog-form'
import { Button } from '@/components/ui/button'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export default async function EditBlogPage({ params }: { params: { id: string } }) {
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)

    const { data: blog } = await supabase
        .from('blogs')
        .select('*')
        .eq('id', params.id)
        .single()

    if (!blog) notFound()

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" asChild>
                    <Link href="/admin/blogs">
                        <ChevronLeft className="h-4 w-4" />
                    </Link>
                </Button>
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Edit Blog</h1>
            </div>

            <div className="bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-3xl p-8 shadow-sm dark:shadow-none">
                <BlogForm initialData={blog} />
            </div>
        </div>
    )
}
