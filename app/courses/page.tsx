import { CoursesPage } from '@/components/courses/courses-page';
import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';

export const metadata: Metadata = {
  title: 'Courses | Paramount Merchant Navy Institute',
  description: 'Browse our comprehensive courses for IMU-CET preparation.',
};

export const revalidate = 3600 // ISR: rebuild at most once per hour; or instantly via /api/revalidate

export default async function Page() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const { data: courses } = await supabase
    .from('courses')
    .select('*')
    .order('created_at', { ascending: false });

  return <CoursesPage initialCourses={courses || []} />;
}
