import { CoursesPage } from '@/components/courses/courses-page';
import { Metadata } from 'next';
import { createServerClient } from '@/lib/supabase/server';

export const metadata: Metadata = {
  title: 'Courses | Paramount Coaching',
  description: 'Browse our comprehensive courses for IMU-CET preparation.',
};

export const revalidate = 3600 // ISR: rebuild at most once per hour; or instantly via /api/revalidate

export default async function Page() {
  const supabase = await createServerClient();
  const { data: courses } = await supabase
    .from('courses')
    .select('*')
    .order('created_at', { ascending: false });

  return <CoursesPage initialCourses={courses || []} />;
}
