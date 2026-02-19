'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { TestTube, Award, Clock, TrendingUp } from 'lucide-react'

export default function FreeTestPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 mb-4">
            <TestTube className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Free Practice Test</h1>
          <p className="text-xl text-muted-foreground">
            Test your knowledge with our complimentary assessment
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">General Knowledge Test</CardTitle>
              <CardDescription>
                Comprehensive assessment covering various topics
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50">
                  <Clock className="w-8 h-8 text-blue-600" />
                  <div>
                    <div className="font-semibold">30 Minutes</div>
                    <div className="text-sm text-muted-foreground">Duration</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50">
                  <Award className="w-8 h-8 text-purple-600" />
                  <div>
                    <div className="font-semibold">50 Questions</div>
                    <div className="text-sm text-muted-foreground">Total Questions</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50">
                  <TrendingUp className="w-8 h-8 text-green-600" />
                  <div>
                    <div className="font-semibold">100 Marks</div>
                    <div className="text-sm text-muted-foreground">Total Marks</div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold">Instructions:</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>This test contains 50 multiple choice questions</li>
                  <li>Each question carries 2 marks</li>
                  <li>There is no negative marking</li>
                  <li>You have 30 minutes to complete the test</li>
                  <li>Click Submit to see your results</li>
                </ul>
              </div>

              <Button size="lg" className="w-full">
                <TestTube className="mr-2 h-5 w-5" />
                Start Free Test
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
