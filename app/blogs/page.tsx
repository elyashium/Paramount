import { BlogList } from '@/components/blogs/blog-list'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Blogs – Paramount Merchant Navy Academy',
    description: 'Stay updated with the latest news, prep tips, and maritime insights from Paramount Merchant Navy Academy.',
}

export default function BlogsPage() {
    return <BlogList />
}
