'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { createClient } from '@/lib/supabase/client'
import { Test } from '@/lib/supabase/types'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { AdminGuard, useIsAdmin } from '@/lib/auth/admin-guard'
import { useToast } from '@/hooks/use-toast'
import { TestTube, Clock, Award, Plus } from 'lucide-react'

export default function TestSeriesPage() {
  const [tests, setTests] = useState<Test[]>([])
  const [loading, setLoading] = useState(true)
  const isAdmin = useIsAdmin()
  const { toast } = useToast()
  const supabase = createClient()

  useEffect(() => {
    fetchTests()
  }, [])

  const fetchTests = async () => {
    try {
      const { data, error } = await supabase
        .from('tests')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setTests(data || [])
    } catch (error: any) {
      toast({
        title: 'Error',
        description: 'Failed to load tests',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold mb-2">Test Series</h1>
              <p className="text-muted-foreground">
                Practice with our comprehensive test series
              </p>
            </div>

            <AdminGuard>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Test
              </Button>
            </AdminGuard>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tests.map((test, index) => (
              <motion.div
                key={test.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full flex flex-col hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-xl">{test.title}</CardTitle>
                      {test.is_free && (
                        <Badge variant="secondary">Free</Badge>
                      )}
                    </div>
                    <CardDescription className="line-clamp-2">
                      {test.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 space-y-3">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="w-4 h-4 mr-2" />
                      {test.duration} minutes
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Award className="w-4 h-4 mr-2" />
                      {test.total_marks} marks
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">
                      <TestTube className="mr-2 h-4 w-4" />
                      Start Test
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>

          {tests.length === 0 && (
            <div className="text-center py-12">
              <TestTube className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No tests available</h3>
              <p className="text-muted-foreground">
                {isAdmin ? 'Create your first test to get started' : 'Check back soon for new tests'}
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
