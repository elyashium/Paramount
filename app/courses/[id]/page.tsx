import { CourseDetail } from '@/components/courses/course-detail';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { createServerClient } from '@/lib/supabase/server';

interface Props {
    params: Promise<{
        id: string;
    }>;
}

export const revalidate = 0; // Disable static rendering for dynamic DB

// Generate metadata dynamically
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const resolvedParams = await params;
    const supabase = await createServerClient()
    const { data: course } = await supabase
        .from('courses')
        .select('title, description')
        .eq('id', resolvedParams.id)
        .single();

    if (!course) {
        return {
            title: 'Course Not Found',
        };
    }

    return {
        title: `${course.title} | Paramount Coaching`,
        description: course.description,
    };
}

export default async function Page({ params }: Props) {
    const resolvedParams = await params;

    let isUuid = false;
    // VERY basic validation, a proper uuid validation regex would be better if ids stay uuids
    if (resolvedParams.id.length === 36 && resolvedParams.id.split('-').length === 5) {
        isUuid = true;
    }

    if (!isUuid) {
        // Mock data fallback if an old static ID is used (for backwards compatibility if needed)
        notFound();
    }

    const supabase = await createServerClient()
    const { data: course } = await supabase
        .from('courses')
        .select('*')
        .eq('id', resolvedParams.id)
        .single();

    if (!course) {
        notFound();
    }

    return <CourseDetail course={course} />;
}
