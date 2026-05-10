import React from 'react';
import QueryPagination from '@/components/QueryPagination';
import SearchForm from '@/components/SearchComponent';
import PostForMap from '@/components/PostForMap';
import Link from 'next/link';
import { House, MoveRight, ShieldAlert } from 'lucide-react';
import ShareButtons from '@/components/ShareButtons';
import { GetSearchPosts } from '@/lib/Fetch/UniversalFetcher';

/* eslint-disable */

export default async function SearchPage({ searchParams }:string|any) {
  const resolvedParams = await searchParams || {};
  const mySearch = resolvedParams.search || "";
  let pageNo = parseInt(resolvedParams.page, 10) || 1;

  if (isNaN(pageNo) || pageNo < 1) {
    pageNo = 1;
  }

  let posts;
  try {
    posts = await GetSearchPosts(mySearch, pageNo);
  } catch (error) {
    return (
      <p className="text-center text-red-500">
        Failed to load search results. Please try again later.
      </p>
    );
  }

  const base = `search?search=${encodeURIComponent(mySearch)}&page=`;
  const homeURL = `search?search=${encodeURIComponent(mySearch)}`;
  const originalSearch = decodeURIComponent(mySearch);
  
  const url = `${process.env.NEXT_PUBLIC_SITE_URL}/search`;

  // Breadcrumb and Schema for Search Page
  const breadcrumbItems = [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": `${process.env.NEXT_PUBLIC_SITE_URL}/`
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": `Search: ${originalSearch}`,
      "item": url
    },
  ];

  // If page number > 1, add "Page X" to breadcrumb
  if (pageNo > 1) {
    breadcrumbItems.push({
      "@type": "ListItem",
      "position": 3,
      "name": `Page ${pageNo}`,
      "item": `${url}?search=${encodeURIComponent(mySearch)}&page=${pageNo}`
    });
  }

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "url": url,
    "name": `Search Results for ${originalSearch}`,
    "description": "Search results page for your query on Fair Explain.",
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbItems
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-start">
      {/* Inject Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema),
        }}
      />

      {/* Breadcrumbs */}
      <div className="flex justify-start self-start items-center gap-2 m-2">
        <Link href={'/'}><House className="w-[15px] h-[15px] md:w-[18px] md:h-[18px]" /></Link>
        <MoveRight />
        <h1 className="font-bold bg-[#fff8f0] rounded-sm text-[12px] px-2 outline-[0.1px] outline-[#86bbd8]/20">
          Search Results
        </h1>
      </div>

      {/* Search Form & Results Info */}
      <div className="flex flex-col items-center w-full">
        <div className="max-w-[800px] w-full flex flex-col items-center px-5">
          <SearchForm />
          <h2 className="m-2 font-bold bg-blue-50 rounded-md px-2 py-1 max-w-[500px] self-start">
            {posts.totalPosts === 0 && <ShieldAlert className="inline mt-[-8px]" />}
            Your Search: <span className="font-bold mx-2 text-[20px] text-blue-400">{originalSearch}</span>
          </h2>
        </div>
      </div>

      {/* Search Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 self-center place-content-stretch max-w-full content-center px-5 md:px-[40px] md:max-w-[780px] lg:max-w-[1100px]">
        {posts.totalPosts === 0 ? (
          <div className="py-8 px-4 mx-auto max-w-full lg:py-16 lg:px-6 place-self-center col-span-full">
            <div className="mx-auto max-w-screen-sm text-center flex flex-col items-center justify-center">
              <ShieldAlert className="w-[100px] h-[100px]" />
              <h1 className="mb-4 text-4xl tracking-tight font-extrabold lg:text-5xl text-primary-600">
                Not Found
              </h1>
              <p className="mb-4 text-lg font-light text-gray-500">
                Sorry, we can't find any post. You'll find lots of posts to explore on the
                <Link className="text-blue-500 flex items-center justify-center gap-[2px] mt-1 font-bold" href={'/'}>
                  <House /> home page
                </Link>.
              </p>
              <Link href="/" className="inline-flex text-white bg-primary-600 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 my-4">
                Back to Homepage
              </Link>
            </div>
          </div>
        ) : (
          posts?.posts?.map((post:object|any) => <PostForMap key={post.id} {...post} />)
        )}
      </div>

      {/* Pagination */}
      <QueryPagination homeURL={homeURL} base={base} page={posts?.currentPage} pageCount={posts?.totalPages} />
      <ShareButtons text={"Search results page for your query on Fair Explain."} url={url} />
    </div>
  );
}


export async function generateMetadata() {
  const canonicalURL= `/search`;
  return {
    title: 'Search Page',
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
      title: "pageMeta.title",
      description:"pageMeta.description",
      url: canonicalURL,
      siteName: 'Fair Explain',
      locale: 'en_US',
      images: [
        {
          url: "pageMeta.ogImage",
          width: 1200,
          height: 630,
          alt: 'search page',
        },
      ],
      type: 'website',
    },
      twitter: {
      card: 'summary_large_image',
      title: 'Home Page',
      description:'Welcome to the home page of our website. Explore our latest posts and updates.',
      images: ["pageMeta.ogImage"],
    },
    
  }
}