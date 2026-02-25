import EbookForm from '../components/ebook-form'

export default function EditEbookPage({ params }: { params: { id: string } }) {
    return (
        <div className="container py-8 max-w-4xl mx-auto">
            <EbookForm params={params} />
        </div>
    )
}
