import { createServerClient } from '@/lib/supabase/server'
import { Button } from '@/components/ui/button'
import { Plus, Pencil, Trash } from 'lucide-react'
import Link from 'next/link'

export default async function AdminEbooksPage() {
    const supabase = await createServerClient()

    const { data: ebooks, error } = await supabase
        .from('ebooks')
        .select('*')
        .order('created_at', { ascending: false })

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Manage Ebooks</h1>
                <Button asChild>
                    <Link href="/admin/ebooks/new">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Ebook
                    </Link>
                </Button>
            </div>

            <div className="rounded-md border bg-card">
                <table className="w-full text-sm text-left">
                    <thead className="border-b bg-muted/50 text-muted-foreground uppercase">
                        <tr>
                            <th className="px-4 py-3 font-medium">Title</th>
                            <th className="px-4 py-3 font-medium">Price</th>
                            <th className="px-4 py-3 font-medium">Author</th>
                            <th className="px-4 py-3 font-medium text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {!ebooks || ebooks.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="p-4 text-center">No ebooks found. Add one above.</td>
                            </tr>
                        ) : (
                            ebooks.map(ebook => (
                                <tr key={ebook.id} className="border-b last:border-0 hover:bg-muted/50">
                                    <td className="px-4 py-3 font-medium">{ebook.title}</td>
                                    <td className="px-4 py-3">₹{ebook.price}</td>
                                    <td className="px-4 py-3">{ebook.author || '-'}</td>
                                    <td className="px-4 py-3 text-right">
                                        <Button variant="ghost" size="icon" asChild>
                                            <Link href={`/admin/ebooks/${ebook.id}`}>
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
