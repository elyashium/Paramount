import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = "https://www.paramountmerchantnavy.com"

    return [
        {
            url: `${baseUrl}`,
            lastModified: new Date(),
        },
        {
            url: `${baseUrl}/courses`,
            lastModified: new Date(),
        },
        {
            url: `${baseUrl}/ebooks`,
            lastModified: new Date(),
        },
        {
            url: `${baseUrl}/blogs`,
            lastModified: new Date(),
        },
        {
            url: `${baseUrl}/about`,
            lastModified: new Date(),
        },
        {
            url: `${baseUrl}/contact`,
            lastModified: new Date(),
        },
        {
            url: `${baseUrl}/auth/login`,
            lastModified: new Date(),
        },
        {
            url: `${baseUrl}/auth/signup`,
            lastModified: new Date(),
        }
    ];
}
