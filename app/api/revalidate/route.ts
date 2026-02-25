import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'

// Called by the admin panel after saving a course or ebook to bust the cache
// POST /api/revalidate  with body: { path: '/courses', secret: <REVALIDATION_SECRET> }
export async function POST(request: Request) {
    const { path, secret } = await request.json()

    // Security: only allow if the caller knows the secret token
    if (secret !== process.env.REVALIDATION_SECRET) {
        return NextResponse.json({ error: 'Invalid secret' }, { status: 401 })
    }

    // Optional: also verify the caller is an authenticated admin
    try {
        const cookieStore = await cookies()
        const supabase = createClient(cookieStore)
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }
        const { data: role } = await supabase
            .from('user_roles')
            .select('role')
            .eq('id', user.id)
            .single()

        if (role?.role !== 'admin') {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
        }
    } catch {
        return NextResponse.json({ error: 'Auth check failed' }, { status: 500 })
    }

    if (!path) {
        return NextResponse.json({ error: 'Path is required' }, { status: 400 })
    }

    revalidatePath(path)
    return NextResponse.json({ revalidated: true, path, now: Date.now() })
}
