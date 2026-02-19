export interface Course {
    id: string
    title: string
    category: string
    rating: number
    students: number
    duration: string
    price: string
    image: string
    description: string
    features: string[]
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
        id: 'imu-cet-comprehensive',
        title: 'IMU-CET Comprehensive',
        category: 'Entrance Exam',
        rating: 4.9,
        students: 12500,
        duration: '6 Months',
        price: '₹25,000',
        image: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?q=80&w=2938&auto=format&fit=crop',
        description: 'Complete preparation for IMU-CET covering Physics, Mathematics, Chemistry, English, and General Aptitude.',
        features: ['Live Interactive Classes', 'Mock Tests Series', 'Doubt Solving Sessions', 'Personal Mentorship'],
        curriculum: [
            { title: 'Physics - Mechanics & Optics', duration: '4 Weeks', lessons: 24 },
            { title: 'Mathematics - Calculus & Vectors', duration: '6 Weeks', lessons: 36 },
            { title: 'Chemistry - Physical & Organic', duration: '4 Weeks', lessons: 20 },
            { title: 'General Aptitude & English', duration: '3 Weeks', lessons: 15 },
            { title: 'Mock Test Analysis', duration: 'Ongoing', lessons: 12 },
        ],
    },
    {
        id: 'dns-sponsorship',
        title: 'DNS Sponsorship',
        category: 'Sponsorship',
        rating: 4.8,
        students: 8200,
        duration: '3 Months',
        price: '₹18,000',
        image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=2940&auto=format&fit=crop',
        description: 'Targeted preparation for company sponsorship exams (Maersk, Anglo-Eastern, Synergy) and interviews.',
        features: ['Interview Preparation', 'Psychometric Tests', 'Company Specific Mocks', 'Sponsorship Guarantee'],
        curriculum: [
            { title: 'Aptitude & Reasoning', duration: '3 Weeks', lessons: 18 },
            { title: 'Interview Skills & Personality Dev', duration: '2 Weeks', lessons: 10 },
            { title: 'Technical Knowledge (PCM)', duration: '4 Weeks', lessons: 24 },
            { title: 'Company Specific Pattern Mocks', duration: '3 Weeks', lessons: 15 },
        ],
    },
    {
        id: 'marine-engineering',
        title: 'Marine Engineering Prep',
        category: 'Engineering',
        rating: 4.7,
        students: 5400,
        duration: '4 Months',
        price: '₹22,000',
        image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=2940&auto=format&fit=crop',
        description: 'Specialized coaching for Marine Engineering entrance exams ensuring strong fundamentals in core subjects.',
        features: ['Technical Concepts', 'Thermodynamics', 'Fluid Mechanics', 'Engine Room Simulators'],
        curriculum: [
            { title: 'Thermodynamics & Heat Transfer', duration: '4 Weeks', lessons: 20 },
            { title: 'Fluid Mechanics & Machinery', duration: '4 Weeks', lessons: 20 },
            { title: 'Electrical Machines & Drives', duration: '3 Weeks', lessons: 15 },
            { title: 'Marine Power Plants', duration: '3 Weeks', lessons: 15 },
        ],
    },
    {
        id: 'gp-rating-advanced',
        title: 'GP Rating Advanced',
        category: 'Rating',
        rating: 4.6,
        students: 4100,
        duration: '2 Months',
        price: '₹12,000',
        image: 'https://images.unsplash.com/photo-1494412574643-35d32468817e?q=80&w=2953&auto=format&fit=crop',
        description: 'A fast-track course for General Purpose Rating entrance exams with focus on physical efficiency and aptitude.',
        features: ['Physical Training Guide', 'Basic English', 'General Science', 'Safety & Emergency Procedures'],
    },
    {
        id: 'eto-orientation',
        title: 'ETO Orientation',
        category: 'Electrical',
        rating: 4.8,
        students: 2300,
        duration: '3 Months',
        price: '₹20,000',
        image: 'https://plus.unsplash.com/premium_photo-1663047716627-e0b6c636faca?q=80&w=2874&auto=format&fit=crop',
        description: 'Electro-Technical Officer entrance preparation covering electrical, electronics, and control engineering.',
        features: ['Circuit Theory', 'Electronics', 'Automation Basics', 'High Voltage Safety'],
    },
    {
        id: 'navigation-masterclass',
        title: 'Navigation Masterclass',
        category: 'Advanced',
        rating: 4.9,
        students: 1500,
        duration: '6 Weeks',
        price: '₹15,000',
        image: 'https://images.unsplash.com/photo-1518176258769-f227c798150e?q=80&w=2832&auto=format&fit=crop',
        description: 'Deep dive into Chart Work and Celestial Navigation for aspiring officers and advanced students.',
        features: ['Chart Work', 'Celestial Navigation', 'Voyage Planning', 'ECDIS Operations'],
    },
]
