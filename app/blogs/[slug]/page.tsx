import { BlogDetail } from '@/components/blogs/blog-detail'
import { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)
    const { data: blog } = await supabase
        .from('blogs')
        .select('title, excerpt')
        .eq('slug', params.slug)
        .single()

    return {
        title: `${blog?.title || 'Blog'} – Paramount Merchant Navy Academy`,
        description: blog?.excerpt || 'Read our latest maritime insights.',
    }
}

export default function BlogSlugPage({ params }: { params: { slug: string } }) {
    return <BlogDetail slug={params.slug} />
}
