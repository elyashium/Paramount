import { TestSeriesPage } from '@/components/test-series/test-series-page'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Test Series | Paramount Coaching',
  description: 'Practice with our comprehensive test series and mock tests for IMU-CET.',
}

export default function Page() {
  return <TestSeriesPage />
}
