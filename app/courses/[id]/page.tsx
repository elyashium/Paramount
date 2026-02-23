import { CourseDetail } from '@/components/courses/course-detail';
import { COURSES } from '@/lib/data/courses';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

interface Props {
    params: Promise<{
        id: string;
    }>;
}

// Generate metadata dynamically
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const resolvedParams = await params;
    const course = COURSES.find((c) => c.id === resolvedParams.id);

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

// Generate static params for all courses to pre-render them
export async function generateStaticParams() {
    return COURSES.map((course) => ({
        id: course.id,
    }));
}

export default async function Page({ params }: Props) {
    const resolvedParams = await params;
    const course = COURSES.find((c) => c.id === resolvedParams.id);

    if (!course) {
        notFound();
    }

    return <CourseDetail course={course} />;
}
