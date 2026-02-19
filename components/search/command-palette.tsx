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
import { BookOpen, FileText, TestTube, Search } from 'lucide-react'

export function CommandPalette() {
  const router = useRouter()
  const { commandPaletteOpen, setCommandPaletteOpen } = useUIStore()

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
        <CommandEmpty>No results found.</CommandEmpty>

        <CommandGroup heading="Quick Access">
          <CommandItem onSelect={() => runCommand(() => router.push('/courses'))}>
            <BookOpen className="mr-2 h-4 w-4" />
            <span>Browse All Courses</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push('/free-courses'))}>
            <BookOpen className="mr-2 h-4 w-4" />
            <span>Free Courses</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push('/test-series'))}>
            <TestTube className="mr-2 h-4 w-4" />
            <span>Test Series</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push('/free-test'))}>
            <TestTube className="mr-2 h-4 w-4" />
            <span>Free Test</span>
          </CommandItem>
        </CommandGroup>

        <CommandGroup heading="Study Materials">
          <CommandItem onSelect={() => runCommand(() => router.push('/previous-papers'))}>
            <FileText className="mr-2 h-4 w-4" />
            <span>Previous Papers</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push('/current-affairs'))}>
            <FileText className="mr-2 h-4 w-4" />
            <span>Current Affairs</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push('/syllabus'))}>
            <FileText className="mr-2 h-4 w-4" />
            <span>Syllabus</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push('/ebooks'))}>
            <BookOpen className="mr-2 h-4 w-4" />
            <span>Ebooks</span>
          </CommandItem>
        </CommandGroup>

        <CommandGroup heading="Practice">
          <CommandItem onSelect={() => runCommand(() => router.push('/quiz'))}>
            <TestTube className="mr-2 h-4 w-4" />
            <span>Quiz</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
