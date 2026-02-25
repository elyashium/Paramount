'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'

export default function CourseForm({ params }: { params?: { id: string } }) {
    const router = useRouter()
    const supabase = createClient()
    const isEditing = params?.id && params.id !== 'new'

    const [loading, setLoading] = useState(isEditing)
    const [saving, setSaving] = useState(false)
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        discount_base_price: '',
        instructor: '',
        image_url: '',
        category: ''
    })

    useEffect(() => {
        async function fetchCourse() {
            if (!isEditing) return

            const { data, error } = await supabase
                .from('courses')
                .select('*')
                .eq('id', params.id)
                .single()

            if (error) {
                toast.error('Failed to load course details')
                router.push('/admin/courses')
                return
            }

            if (data) {
                setFormData({
                    title: data.title || '',
                    description: data.description || '',
                    price: data.price ? data.price.toString() : '',
                    discount_base_price: data.discount_base_price ? data.discount_base_price.toString() : '',
                    instructor: data.instructor || '',
                    image_url: data.image_url || '',
                    category: data.category || ''
                })
            }
            setLoading(false)
        }

        fetchCourse()
    }, [params?.id, isEditing, supabase, router])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSaving(true)

        try {
            const courseData = {
                title: formData.title,
                description: formData.description,
                price: parseFloat(formData.price) || 0,
                discount_base_price: formData.discount_base_price ? parseFloat(formData.discount_base_price) : null,
                instructor: formData.instructor,
                image_url: formData.image_url,
                category: formData.category
            }

            let error

            if (isEditing) {
                const { error: updateError } = await supabase
                    .from('courses')
                    .update(courseData)
                    .eq('id', params.id)
                error = updateError
            } else {
                const { error: insertError } = await supabase
                    .from('courses')
                    .insert([courseData])
                error = insertError
            }

            if (error) throw error

            toast.success(isEditing ? 'Course updated successfully' : 'Course created successfully')
            router.push('/admin/courses')
            router.refresh()
        } catch (error: any) {
            console.error(error)
            toast.error(error.message || 'Failed to save course')
        } finally {
            setSaving(false)
        }
    }

    const handleDelete = async () => {
        if (!confirm('Are you sure you want to delete this course?')) return

        const { error } = await supabase
            .from('courses')
            .delete()
            .eq('id', params.id)

        if (error) {
            toast.error('Failed to delete course')
        } else {
            toast.success('Course deleted')
            router.push('/admin/courses')
            router.refresh()
        }
    }

    if (loading) return <div>Loading course...</div>

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">
                    {isEditing ? 'Edit Course' : 'Create Course'}
                </h1>
                {isEditing && (
                    <Button variant="destructive" onClick={handleDelete}>
                        Delete
                    </Button>
                )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border bg-card p-6 shadow">
                <div className="space-y-2">
                    <Label htmlFor="title">Course Title</Label>
                    <Input id="title" name="title" value={formData.title} onChange={handleChange} required />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea id="description" name="description" value={formData.description} onChange={handleChange} required className="min-h-[120px]" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="price">Current Price (₹)</Label>
                        <Input id="price" name="price" type="number" step="0.01" value={formData.price} onChange={handleChange} required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="discount_base_price">Original Price (₹ - optional)</Label>
                        <Input id="discount_base_price" name="discount_base_price" type="number" step="0.01" value={formData.discount_base_price} onChange={handleChange} />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="instructor">Instructor Name</Label>
                        <Input id="instructor" name="instructor" value={formData.instructor} onChange={handleChange} required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Input id="category" name="category" value={formData.category} onChange={handleChange} />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="image_url">Thumbnail Image URL</Label>
                    <Input id="image_url" name="image_url" value={formData.image_url} onChange={handleChange} />
                </div>

                <div className="flex justify-end gap-4 pt-4">
                    <Button variant="outline" type="button" onClick={() => router.push('/admin/courses')}>
                        Cancel
                    </Button>
                    <Button type="submit" disabled={saving}>
                        {saving ? 'Saving...' : 'Save Course'}
                    </Button>
                </div>
            </form>
        </div>
    )
}
