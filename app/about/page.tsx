import type { Metadata } from 'next'
import { AboutPage } from '@/components/about/about-page'

export const metadata: Metadata = {
    title: 'About Us – Paramount Merchant Navy Institute',
    description:
        "Meet the expert IMU-CET faculty at Paramount Merchant Navy Institute. 7 dedicated educators, 50,000+ students coached, 95% success rate. India's #1 IMU-CET coaching institute.",
    keywords: [
        'IMU-CET coaching',
        'Paramount Merchant Navy Institute',
        'IMU-CET faculty',
        'merchant navy institute',
        'DNS coaching',
        'marine engineering coaching',
        'IMU-CET preparation',
        'about Paramount',
    ],
    openGraph: {
        title: 'About Us – Paramount Merchant Navy Institute',
        description:
            "Meet the expert IMU-CET faculty team. 50,000+ students, 95% success rate. India's premier maritime coaching institute.",
        url: 'https://paramountmn.com/about',
        siteName: 'Paramount Merchant Navy Institute',
        images: [
            {
                url: '/team.png',
                width: 1920,
                height: 860,
                alt: 'Paramount Merchant Navy Institute IMU-CET Faculty Team',
            },
        ],
        locale: 'en_IN',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'About Us – Paramount Merchant Navy Institute',
        description:
            "Meet the expert IMU-CET faculty. 50,000+ students coached, 95% success rate. India's #1 maritime coaching.",
        images: ['/team.png'],
    },
    alternates: {
        canonical: 'https://paramountmn.com/about',
    },
    robots: {
        index: true,
        follow: true,
        googleBot: { index: true, follow: true },
    },
}

export default function About() {
    return <AboutPage />
}
