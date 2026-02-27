export interface Course {
    id: string
    title: string
    category: string
    rating: number
    students: number
    duration: string
    price: string
    image_url: string
    description: string
    features: string[]
    enroll_link?: string
    curriculum?: {
        title: string
        duration: string
        lessons: number
    }[]
    instructors?: {
        name: string
        role: string
        image: string
    }[]
}

export const COURSES: Course[] = [
    {
        id: 'imu-cet-sponsorship-combo',
        title: 'IMU-CET 2026 + Sponsorship Combo',
        category: 'Entrance Exam',
        rating: 4.9,
        students: 15400,
        duration: '6 Months',
        price: '₹5,930',
        image_url: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=3539&auto=format&fit=crop',
        description: 'Crack Your Dream Career at Sea! Comprehensive preparation for IMU-CET including full sponsorship coaching.',
        features: [
            '3 Hours Daily classes',
            'Live + VOD',
            'PDF NOTES + DPP',
            'E-Book',
            'Interview Practice session',
            'Company specific preparation',
            'Sponsorship complete solution',
            'Test'
        ],
    },
    {
        id: 'sponsorship-elite',
        title: 'SPONSORSHIP',
        category: 'Sponsorship',
        rating: 4.8,
        students: 9200,
        duration: '3 Months',
        price: '₹3,388',
        image_url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2600&auto=format&fit=crop',
        description: 'Learn to Earn Big with Brands! Complete sponsorship preparation covering mock interviews, psychometric tests, and personality development.',
        features: [
            '2 Hours Daily classes',
            'Live + VOD',
            'PDF NOTES + DPP',
            'E-Book',
            'Interview Practice session',
            'Company specific preparation',
            'Sponsorship complete solution',
            'Test',
            'Two Way Communication (Zoom)',
            'Spoken English',
            'Mock Interviews Session',
            'Personality Development & Communication Skill'
        ],
    },
    {
        id: 'english-spoken',
        title: 'English Spoken',
        category: 'Communication',
        rating: 4.7,
        students: 5300,
        duration: '2 Months',
        price: '₹1,694',
        image_url: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=2873&auto=format&fit=crop',
        description: 'Learn English & Speak Fluently! A comprehensive spoken English course specifically tailored for maritime aspirants.',
        features: [
            'Live Interactive Classes',
            'Vocabulary Building',
            'Pronunciation Practice',
            'Group Discussions',
            'Confidence Building'
        ],
    },
    {
        id: 'free-imu-cet-mock',
        title: 'Free IMU-CET Mock Test',
        category: 'Free',
        rating: 4.9,
        students: 22500,
        duration: '1 Day',
        price: 'Free',
        image_url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2940&auto=format&fit=crop',
        description: 'Take a free full-length IMU-CET mock test to evaluate your current preparation level. Instant results and detailed analysis provided.',
        features: [
            'Full Length Mock Test',
            'Detailed Performance Analysis',
            'All India Ranking',
            'Solution PDF'
        ],
    },
]
