'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { FileUploadField } from '@/components/admin/file-upload-field'

export default function EbookForm({ params }: { params?: { id: string } }) {
    const router = useRouter()
    const supabase = createClient()
    const isEditing = params?.id && params.id !== 'new'

    const [loading, setLoading] = useState(isEditing)
    const [saving, setSaving] = useState(false)
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        pdf_url: '',
        cover_url: '',
        category: '',
        author: '',
        pages: ''
    })

    useEffect(() => {
        async function fetchEbook() {
            if (!isEditing) return

            const { data, error } = await supabase
                .from('ebooks')
                .select('*')
                .eq('id', params.id)
                .single()

            if (error) {
                toast.error('Failed to load ebook details')
                router.push('/admin/ebooks')
                return
            }

            if (data) {
                setFormData({
                    title: data.title || '',
                    description: data.description || '',
                    price: data.price ? data.price.toString() : '',
                    pdf_url: data.pdf_url || '',
                    cover_url: data.cover_url || '',
                    category: data.category || '',
                    author: data.author || '',
                    pages: data.pages ? data.pages.toString() : ''
                })
            }
            setLoading(false)
        }

        fetchEbook()
    }, [params?.id, isEditing, supabase, router])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSaving(true)

        try {
            const ebookData = {
                title: formData.title,
                description: formData.description,
                price: parseFloat(formData.price) || 0,
                pdf_url: formData.pdf_url,
                cover_url: formData.cover_url,
                category: formData.category,
                author: formData.author,
                pages: formData.pages ? parseInt(formData.pages, 10) : null
            }

            let error

            if (isEditing) {
                const { error: updateError } = await supabase
                    .from('ebooks')
                    .update(ebookData)
                    .eq('id', params.id)
                error = updateError
            } else {
                const { error: insertError } = await supabase
                    .from('ebooks')
                    .insert([ebookData])
                error = insertError
            }

            if (error) throw error

            // Trigger on-demand page revalidation so the public site updates instantly
            await fetch('/api/revalidate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    path: '/ebooks',
                    secret: process.env.NEXT_PUBLIC_REVALIDATION_SECRET || 'dev-secret'
                })
            })

            toast.success(isEditing ? 'Ebook updated successfully' : 'Ebook created successfully')
            router.push('/admin/ebooks')
            router.refresh()
        } catch (error: any) {
            console.error(error)
            toast.error(error.message || 'Failed to save ebook')
        } finally {
            setSaving(false)
        }
    }

    const handleDelete = async () => {
        if (!confirm('Are you sure you want to delete this ebook?')) return

        const { error } = await supabase
            .from('ebooks')
            .delete()
            .eq('id', params.id)

        if (error) {
            toast.error('Failed to delete ebook')
        } else {
            toast.success('Ebook deleted')
            router.push('/admin/ebooks')
            router.refresh()
        }
    }

    if (loading) return <div>Loading ebook...</div>

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">
                    {isEditing ? 'Edit Ebook' : 'Create Ebook'}
                </h1>
                {isEditing && (
                    <Button variant="destructive" onClick={handleDelete}>
                        Delete
                    </Button>
                )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border bg-card p-6 shadow">
                <div className="space-y-2">
                    <Label htmlFor="title">Ebook Title</Label>
                    <Input id="title" name="title" value={formData.title} onChange={handleChange} required />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea id="description" name="description" value={formData.description} onChange={handleChange} required className="min-h-[120px]" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="price">Price (₹)</Label>
                        <Input id="price" name="price" type="number" step="0.01" value={formData.price} onChange={handleChange} required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="pages">Number of Pages</Label>
                        <Input id="pages" name="pages" type="number" value={formData.pages} onChange={handleChange} />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="author">Author Name</Label>
                        <Input id="author" name="author" value={formData.author} onChange={handleChange} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Input id="category" name="category" value={formData.category} onChange={handleChange} />
                    </div>
                </div>

                <FileUploadField
                    label="Cover Image"
                    accept="image/*"
                    bucket="ebooks"
                    folder="covers"
                    currentUrl={formData.cover_url}
                    onUpload={(url) => setFormData(prev => ({ ...prev, cover_url: url }))}
                    type="image"
                />

                <FileUploadField
                    label="PDF File"
                    accept="application/pdf"
                    bucket="ebooks"
                    folder="pdfs"
                    currentUrl={formData.pdf_url}
                    onUpload={(url) => setFormData(prev => ({ ...prev, pdf_url: url }))}
                    type="pdf"
                />

                <div className="flex justify-end gap-4 pt-4">
                    <Button variant="outline" type="button" onClick={() => router.push('/admin/ebooks')}>
                        Cancel
                    </Button>
                    <Button type="submit" disabled={saving}>
                        {saving ? 'Saving...' : 'Save Ebook'}
                    </Button>
                </div>
            </form>
        </div>
    )
}
