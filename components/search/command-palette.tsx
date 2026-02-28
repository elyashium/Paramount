'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { useUIStore } from '@/lib/store/ui-store'
import { BookOpen, FileText, Search } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

interface SearchItem {
  id: string
  title: string
  slug?: string
  type: 'course' | 'blog' | 'ebook'
}

export function CommandPalette() {
  const router = useRouter()
  const { commandPaletteOpen, setCommandPaletteOpen } = useUIStore()
  const [courses, setCourses] = useState<SearchItem[]>([])
  const [blogs, setBlogs] = useState<SearchItem[]>([])
  const [ebooks, setEbooks] = useState<SearchItem[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (commandPaletteOpen) {
      const fetchData = async () => {
        setLoading(true)
        const supabase = createClient()

        const [coursesRes, blogsRes, ebooksRes] = await Promise.all([
          supabase.from('courses').select('id, title').limit(10),
          supabase.from('blogs').select('id, title, slug').eq('is_published', true).limit(10),
          supabase.from('ebooks').select('id, title').limit(10)
        ])

        if (coursesRes.data) setCourses(coursesRes.data.map(d => ({ ...d, type: 'course' })))
        if (blogsRes.data) setBlogs(blogsRes.data.map(d => ({ ...d, type: 'blog' } as SearchItem)))
        if (ebooksRes.data) setEbooks(ebooksRes.data.map(d => ({ ...d, type: 'ebook' })))
        setLoading(false)
      }

      fetchData()
    }
  }, [commandPaletteOpen])

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setCommandPaletteOpen(!commandPaletteOpen)
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [commandPaletteOpen, setCommandPaletteOpen])

  const runCommand = (command: () => void) => {
    setCommandPaletteOpen(false)
    command()
  }

  return (
    <CommandDialog open={commandPaletteOpen} onOpenChange={setCommandPaletteOpen}>
      <CommandInput placeholder="Search courses, tests, materials..." />
      <CommandList>
        <CommandEmpty>{loading ? 'Searching...' : 'No results found.'}</CommandEmpty>

        {courses.length > 0 && (
          <CommandGroup heading="Courses">
            {courses.map((course) => (
              <CommandItem
                key={course.id}
                onSelect={() => runCommand(() => router.push(`/courses/${course.id}`))}
              >
                <BookOpen className="mr-2 h-4 w-4" />
                <span>{course.title}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        )}

        {blogs.length > 0 && (
          <CommandGroup heading="Blogs">
            {blogs.map((blog) => (
              <CommandItem
                key={blog.id}
                onSelect={() => runCommand(() => router.push(`/blogs/${blog.slug}`))}
              >
                <FileText className="mr-2 h-4 w-4" />
                <span>{blog.title}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        )}

        {ebooks.length > 0 && (
          <CommandGroup heading="Ebooks">
            {ebooks.map((ebook) => (
              <CommandItem
                key={ebook.id}
                onSelect={() => runCommand(() => router.push('/ebooks'))}
              >
                <BookOpen className="mr-2 h-4 w-4" />
                <span>{ebook.title}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        )}

        <CommandGroup heading="Quick Access">
          <CommandItem onSelect={() => runCommand(() => router.push('/courses'))}>
            <BookOpen className="mr-2 h-4 w-4" />
            <span>Browse All Courses</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push('/blogs'))}>
            <FileText className="mr-2 h-4 w-4" />
            <span>Blogs</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
