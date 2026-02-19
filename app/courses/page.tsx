import { CoursesPage } from '@/components/courses/courses-page';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Courses | Paramount Coaching',
  description: 'Browse our comprehensive courses for IMU-CET preparation.',
};

export default function Page() {
  return <CoursesPage />;
}
