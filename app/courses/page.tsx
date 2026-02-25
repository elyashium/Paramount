import { CoursesPage } from '@/components/courses/courses-page';
import { Metadata } from 'next';
import { createServerClient } from '@/lib/supabase/server';

export const metadata: Metadata = {
  title: 'Courses | Paramount Coaching',
  description: 'Browse our comprehensive courses for IMU-CET preparation.',
};

export const revalidate = 0; // Disable static rendering for dynamic DB

export default async function Page() {
  const supabase = await createServerClient();
  const { data: courses } = await supabase
    .from('courses')
    .select('*')
    .order('created_at', { ascending: false });

  return <CoursesPage initialCourses={courses || []} />;
}
