import { GetSitemapposts, GetCategorySitemap } from '@/lib/Fetch/UniversalFetcher';

export const revalidate = 5;
export const dynamic = 'force-dynamic';

export default async function sitemap() {
    const url = process.env.NEXT_PUBLIC_SITE_URL;

    const [postsSitemap, categoriesSitemap] = await Promise.all([
        GetSitemapposts(),
        GetCategorySitemap(),
    ]);

    return [
        {
            url: `${url}/`,
            lastModified: new Date(),
            changeFrequency: 'daily' as const,
        },
        {
            url: `${url}/about-us`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
        },
        {
            url: `${url}/privacy-policy`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
        },
        {
            url: `${url}/contact-us`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
        },
        ...categoriesSitemap,
        ...postsSitemap,
    ];
}
