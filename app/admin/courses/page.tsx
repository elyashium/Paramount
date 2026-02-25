import { createClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'
import { Button } from '@/components/ui/button'
import { Plus, Pencil, Trash } from 'lucide-react'
import Link from 'next/link'

export default async function AdminCoursesPage() {
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)

    const { data: courses, error } = await supabase
        .from('courses')
        .select('*')
        .order('created_at', { ascending: false })

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Manage Courses</h1>
                <Button asChild>
                    <Link href="/admin/courses/new">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Course
                    </Link>
                </Button>
            </div>

            <div className="rounded-md border bg-card">
                <table className="w-full text-sm text-left">
                    <thead className="border-b bg-muted/50 text-muted-foreground uppercase">
                        <tr>
                            <th className="px-4 py-3 font-medium">Title</th>
                            <th className="px-4 py-3 font-medium">Price</th>
                            <th className="px-4 py-3 font-medium">Discount Base Price</th>
                            <th className="px-4 py-3 font-medium">Instructor</th>
                            <th className="px-4 py-3 font-medium text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {!courses || courses.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="p-4 text-center">No courses found. Add one above.</td>
                            </tr>
                        ) : (
                            courses.map(course => (
                                <tr key={course.id} className="border-b last:border-0 hover:bg-muted/50">
                                    <td className="px-4 py-3 font-medium">{course.title}</td>
                                    <td className="px-4 py-3">₹{course.price}</td>
                                    <td className="px-4 py-3">{course.discount_base_price ? `₹${course.discount_base_price}` : '-'}</td>
                                    <td className="px-4 py-3">{course.instructor}</td>
                                    <td className="px-4 py-3 text-right">
                                        <Button variant="ghost" size="icon" asChild>
                                            <Link href={`/admin/courses/${course.id}`}>
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
