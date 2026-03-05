import { EbooksPage } from '@/components/ebooks/ebooks-page'
import { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'

export const metadata: Metadata = {
    title: 'E-Books & Materials | Paramount Merchant Navy Institute',
    description: 'Access our comprehensive digital library including syllabus, previous year question papers, and e-books.',
}

export const revalidate = 3600 // ISR: rebuild at most once per hour; or instantly via /api/revalidate

export default async function Page() {
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)
    const { data: ebooks } = await supabase
        .from('ebooks')
        .select('*')
        .order('created_at', { ascending: false });

    return <EbooksPage initialEbooks={ebooks || []} />
}
