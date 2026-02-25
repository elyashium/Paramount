import { EbooksPage } from '@/components/ebooks/ebooks-page'
import { Metadata } from 'next'
import { createServerClient } from '@/lib/supabase/server'

export const metadata: Metadata = {
    title: 'E-Books & Materials | Paramount Coaching',
    description: 'Access our comprehensive digital library including syllabus, previous year question papers, and e-books.',
}

export const revalidate = 3600 // ISR: rebuild at most once per hour; or instantly via /api/revalidate

export default async function Page() {
    const supabase = await createServerClient()
    const { data: ebooks } = await supabase
        .from('ebooks')
        .select('*')
        .order('created_at', { ascending: false });

    return <EbooksPage initialEbooks={ebooks || []} />
}
