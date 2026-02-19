'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { createClient } from '@/lib/supabase/client'
import { useAuth } from '@/lib/auth/context'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import { ShoppingBag, BookOpen, Calendar } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface Purchase {
  id: string
  course_id: string
  amount_paid: number
  purchased_at: string
  courses: {
    title: string
    description: string
    thumbnail_url: string
  }
}

export default function PurchasesPage() {
  const [purchases, setPurchases] = useState<Purchase[]>([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()
  const { toast } = useToast()
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push('/auth/login')
      return
    }
    fetchPurchases()
  }, [user])

  const fetchPurchases = async () => {
    if (!user) return

    try {
      const { data, error } = await supabase
        .from('user_purchases')
        .select(`
          *,
          courses (
            title,
            description,
            thumbnail_url
          )
        `)
        .eq('user_id', user.id)
        .order('purchased_at', { ascending: false })

      if (error) throw error
      setPurchases(data || [])
    } catch (error: any) {
      toast({
        title: 'Error',
        description: 'Failed to load purchases',
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
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">My Purchases</h1>
            <p className="text-muted-foreground">
              Access all your purchased courses and materials
            </p>
          </div>

          {purchases.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {purchases.map((purchase, index) => (
                <motion.div
                  key={purchase.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full flex flex-col hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-xl">{purchase.courses.title}</CardTitle>
                        <Badge>Purchased</Badge>
                      </div>
                      <CardDescription className="line-clamp-2">
                        {purchase.courses.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 space-y-3">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4 mr-2" />
                        {new Date(purchase.purchased_at).toLocaleDateString()}
                      </div>
                      <div className="text-sm font-semibold text-primary">
                        ${purchase.amount_paid}
                      </div>
                    </CardContent>
                    <div className="p-6 pt-0">
                      <Button className="w-full">
                        <BookOpen className="mr-2 h-4 w-4" />
                        Access Course
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <Card className="text-center py-12">
              <CardContent className="pt-6">
                <ShoppingBag className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No purchases yet</h3>
                <p className="text-muted-foreground mb-6">
                  Start learning by purchasing your first course
                </p>
                <Button onClick={() => router.push('/courses')}>
                  Browse Courses
                </Button>
              </CardContent>
            </Card>
          )}
        </motion.div>
      </div>
    </div>
  )
}
