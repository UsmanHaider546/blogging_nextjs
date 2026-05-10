// This is the Home Page
import React from 'react';
import HomePosts from '@/components/HomePosts';
import Pagination from '@/components/Pagination';
import Hero from '@/components/Hero';
import PostSchema from '@/components/PostSchema';
import { HomePostsArchive } from '@/lib/Fetch/UniversalFetcher';

export default async function HomePage() {
  let posts;
  try {
    posts = await HomePostsArchive();
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    return <p className="text-center text-red-500">Failed to load posts. Please try again later.</p>;
  }
  
  const h1Tag= "Get better and quality market content";
  const paragraph = "Discover more updated and latest market content with trends to grow a business online.";
  
  const base = "page";
  const myURL = process.env.NEXT_PUBLIC_SITE_URL || 'https://fairexplain.com';
  const websiteSchema= {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "url": myURL,
    "name": "Fair Explain",
    "description": "Discover more updated and latest market content with trends to grow a business online.",
    "publisher": {
      "@type": "Organization",
      "name": "Fair Explain",
      "logo": `${myURL}/FairExplain.svg`
    },
  };
  

  return (
    <div className="w-full mt-4 flex flex-col items-start self-start bg-white">
    <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify(websiteSchema),
    }}
    />
    <PostSchema posts={posts.posts} />
    <Hero h1tag={h1Tag} paragraph={paragraph} />
    {/* Show the Posts with Map */}
    <HomePosts posts={posts.posts} />
    {/* Show the Pagination */}
    <Pagination base={base} page={posts.currentPage} pageCount={posts.totalPages} homeURL={myURL} />
    </div>
  );
}


export async function generateMetadata() {
  const canonicalURL = `/`;
  
  return {
    title: 'Home Page',
    description: 'Welcome to the home page of our website. Explore our latest posts and updates.',
    alternates: {
      canonical: canonicalURL,
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
      },
    },
    openGraph: {
      title: 'Home Page',
      description:
      'Welcome to the home page of our website. Explore our latest posts and updates.',
      url: canonicalURL,
      siteName: 'Fair Explain',
      locale: 'en_US',
      images: [
        {
          url: "/FairExplain.svg",
          width: 1200,
          height: 630,
          alt: 'fairexplain.com | Home Page Open Graph Image',
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Home Page',
      description: 'Welcome to the home page of our website. Explore our latest posts and updates.',
      images: ["/FairExplain.svg"],
    },
  };
}

