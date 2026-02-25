import CourseForm from '../components/course-form'

export default function EditCoursePage({ params }: { params: { id: string } }) {
    return (
        <div className="container py-8 max-w-4xl mx-auto">
            <CourseForm params={params} />
        </div>
    )
}
