'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { LoadingSpinner } from '@/components/ui/loading'
import { toast } from 'sonner'

interface BlogFormProps {
    initialData?: any
}

export function BlogForm({ initialData }: BlogFormProps) {
    const router = useRouter()
    const supabase = createClient()
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        title: initialData?.title || '',
        slug: initialData?.slug || '',
        content: initialData?.content || '',
        excerpt: initialData?.excerpt || '',
        thumbnail_url: initialData?.thumbnail_url || '',
        is_published: initialData?.is_published ?? false,
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const { data: { session } } = await supabase.auth.getSession()
            if (!session) throw new Error('Not authenticated')

            const payload = {
                ...formData,
                author_id: session.user.id,
                updated_at: new Date().toISOString(),
            }

            let error;
            if (initialData?.id) {
                const { error: updateError } = await supabase
                    .from('blogs')
                    .update(payload)
                    .eq('id', initialData.id)
                error = updateError
            } else {
                const { error: insertError } = await supabase
                    .from('blogs')
                    .insert([payload])
                error = insertError
            }

            if (error) throw error

            toast.success(initialData?.id ? 'Blog updated' : 'Blog created')
            router.push('/admin/blogs')
            router.refresh()
        } catch (error: any) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    const deleteBlog = async () => {
        if (!initialData?.id || !confirm('Are you sure you want to delete this blog?')) return
        setLoading(true)

        try {
            const { error } = await supabase
                .from('blogs')
                .delete()
                .eq('id', initialData.id)

            if (error) throw error

            toast.success('Blog deleted')
            router.push('/admin/blogs')
            router.refresh()
        } catch (error: any) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    const generateSlug = () => {
        const slug = formData.title
            .toLowerCase()
            .replace(/[^\w ]+/g, '')
            .replace(/ +/g, '-')
        setFormData({ ...formData, slug })
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        onBlur={!formData.slug ? generateSlug : undefined}
                        required
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="slug">Slug</Label>
                    <Input
                        id="slug"
                        value={formData.slug}
                        onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                        required
                    />
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="excerpt">Excerpt / Summary</Label>
                <Textarea
                    id="excerpt"
                    value={formData.excerpt}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    rows={3}
                    placeholder="Short summary for the blog list card..."
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="thumbnail_url">Thumbnail URL</Label>
                <Input
                    id="thumbnail_url"
                    value={formData.thumbnail_url}
                    onChange={(e) => setFormData({ ...formData, thumbnail_url: e.target.value })}
                    placeholder="https://example.com/image.jpg"
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="content">Content (HTML supported)</Label>
                <Textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    rows={15}
                    placeholder="Detailed blog post content..."
                    required
                />
            </div>

            <div className="flex items-center space-x-2">
                <Switch
                    id="is_published"
                    checked={formData.is_published}
                    onCheckedChange={(checked) => setFormData({ ...formData, is_published: checked })}
                />
                <Label htmlFor="is_published">Publish this blog post</Label>
            </div>

            <div className="flex items-center gap-4">
                <Button type="submit" disabled={loading} className="bg-[#E8B84B] text-black hover:bg-[#F3D37A]">
                    {loading ? <LoadingSpinner /> : null}
                    {initialData?.id ? 'Update Blog' : 'Create Blog'}
                </Button>
                {initialData?.id && (
                    <Button type="button" variant="destructive" onClick={deleteBlog} disabled={loading}>
                        Delete
                    </Button>
                )}
            </div>
        </form>
    )
}
