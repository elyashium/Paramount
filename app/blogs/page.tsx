import { BlogList } from '@/components/blogs/blog-list'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Blogs – Paramount Merchant Navy Institute',
    description: 'Stay updated with the latest news, prep tips, and maritime insights from Paramount Merchant Navy Institute.',
}

export default function BlogsPage() {
    return <BlogList />
}
