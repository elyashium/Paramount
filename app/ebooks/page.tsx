import { EbooksPage } from '@/components/ebooks/ebooks-page'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'E-Books & Materials | Paramount Coaching',
    description: 'Access our comprehensive digital library including syllabus, previous year question papers, and e-books.',
}

export default function Page() {
    return <EbooksPage />
}
