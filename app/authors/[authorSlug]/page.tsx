import PostForMap from '@/components/PostForMap';
import PostSchema from '@/components/PostSchema';
import QueryPagination from '@/components/QueryPagination';
import ShareButtons from '@/components/ShareButtons';
import { GetAuthorDetails, GetAuthorPosts } from '@/lib/Fetch/UniversalFetcher';
import { CircleUser, Diamond, House, Mail, MoveRight, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import React from 'react';

export default async function AuthorPage({ params, searchParams }:any) {
  const resolvedParams = await params;
  const resolvedSearch = await searchParams;
  let pageNo = 1;

  // Check if the page number is valid
  if (resolvedSearch.page) {
    const num:number|any = Number(resolvedSearch.page);
    if (/^\d+$/.test(num) && !isNaN(num) && Number.isInteger(num) && num > 0) {
      pageNo = num;
    } else {
      notFound();
    }
  }

  const authorSlug = resolvedParams.authorSlug;
  const authorPosts = await GetAuthorPosts(authorSlug, pageNo);
  const base = `authors/${authorSlug}?page=`;
  const authorDetails = await GetAuthorDetails(authorSlug);

  if (!authorDetails) {
    notFound();
  }
  const homeURL = `authors/${authorSlug}`;
  {resolvedSearch.page == '1' ? redirect(`/authors/${authorSlug}`) : null}
  const metaDescription = authorDetails.description;
  const url = `${process.env.NEXT_PUBLIC_SITE_URL}/${homeURL}`;
  const homePageURL = `${process.env.NEXT_PUBLIC_SITE_URL}`;
  const authorUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/authors/${authorDetails.authorSlug}`;
  const authorName = authorDetails.authorName;
  const ogImage = authorDetails.avatarLink;

  // Breadcrumb schema
  const breadcrumbItems = [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": homePageURL,
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": authorDetails.authorName,
      "item": authorUrl,
    },
  ];

  if (pageNo > 1) {
    breadcrumbItems.push({
      "@type": "ListItem",
      "position": 3,
      "name": `Page ${pageNo}`,
      "item": `${authorUrl}?page=${pageNo}`,
    });
  }

  const authorSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "url": authorUrl,
    "name": `${authorDetails.authorName} - Page ${pageNo}`,
    "description": `${metaDescription} - Page ${pageNo}`,
    "image": ogImage,
    "publisher": {
      "@type": "Organization",
      "name": "Fair Explain",
      "logo": `${process.env.NEXT_PUBLIC_SITE_URL}/FairExplain.svg`,
    },
    "mainEntityOfPage": {
      "@type": "Blog",
      "url": authorUrl,
      "headline": `${authorDetails.authorName} - Page ${pageNo}`,
      "description": `${authorDetails.description} - Page ${pageNo}`,
      "publisher": {
        "@type": "Organization",
        "name": "Fair Explain",
      },
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbItems,
    },
    "author": {
      "@type": "Person",
      "name": authorDetails.authorName,
      "url": authorUrl,
      "image": ogImage,
      "description": authorDetails.description,
    },
  };

  return (
    <div className="w-full max-w-screen-xl mx-auto flex flex-col justify-start items-start px-4 gap-2">
      {/* Author Schema */}
      <PostSchema posts={authorPosts?.posts} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(authorSchema),
        }}
      />

      {/* Author Breadcrumbs */}
      <nav className="flex items-center gap-2 w-full my-2" aria-label="Breadcrumb navigation">
        <Link href="/" aria-label="Go to the Main Home Page">
          <House className="w-[15px] h-[15px] md:w-[18px] md:h-[18px]" />
        </Link>
        <MoveRight aria-hidden="true" />
        <Link
          className="font-bold bg-[#fff8f0]/30 rounded-sm text-[12px] px-2 outline-[0.1px] outline-[#86bbd8]/20"
          aria-label={`Go to author: ${authorDetails.authorName}`}
          href={authorUrl}
        >
          {authorDetails.authorName}
        </Link>
        {pageNo > 1 && (
          <>
            <MoveRight aria-hidden="true" />
            <p className="font-bold bg-[#fff8f0]/30 rounded-sm text-[12px] px-2 outline-[0.1px] outline-[#86bbd8]/20">
              Page {pageNo}
            </p>
          </>
        )}
      </nav>

      {/* Author Avatar | Name | Role */}
      <div className="flex items-end gap-1 w-full">
        <Image
          src={`${process.env.NEXT_PUBLIC_SITE_URL}/${authorDetails.avatarLink}`}
          className="rounded-full object-center h-[40px] w-[40px]"
          alt={authorDetails.avatarAlt}
          width={40}
          height={40}
          loading="lazy"
          priority={false}
        />
        <h1 className="font-bold text-[16px] md:text-[20px] text-nowrap">{authorDetails.authorName}</h1>
      </div>

      {/* Author Description */}
      <div className="mt-4 text-[18px] font-semibold text-[#404045] px-3 py-2 w-full max-w-3xl rounded-md leading-tight outline-dashed outline-[2px] outline-[#fee3e3] relative text-wrap self-start hover:outline-[#ff8811]/75">
        <h3 className="absolute bg-[#fee3e3] px-2 py-[1px] top-[-12px] left-[8px] rounded-sm text-[12px] text-black">
          About the Author
        </h3>
        <p>{authorDetails.description}</p>
      </div>

      {/* Author Properties */}
      <div className="flex items-center justify-start gap-[8px]">
        <div className="mt-2 px-1 py-[1px] rounded-sm hover:text-[#2f4858] font-semibold flex items-center gap-[2px] text-[15px] outline-dashed hover:bg-white outline-[1px] outline-[#f26419]/50 bg-[#d03c2f]/80 text-white">
          <User className="w-[18px]" /> {authorDetails.authorRole}
        </div>
        <Link
          className="mt-2 px-1 py-[1px] rounded-sm text-[#2f4858] font-semibold flex items-center gap-1 text-[15px] outline-dashed outline-[1px] outline-[#f26419]/50 hover:bg-[#d03c2f]/80 hover:text-white"
          href="/contact-us"
          aria-label={`Contact ${authorDetails.authorName}`}
        >
          <Mail className="w-[18px]" /> Contact
        </Link>
        {authorDetails.linkedin ? <Link
          className="mt-2 px-1 py-[1px] rounded-sm text-[#2f4858] font-semibold flex items-center gap-1 text-[15px] outline-dashed outline-[1px] outline-[#f26419]/50 hover:bg-[#d03c2f]/80 hover:text-white"
          href={authorDetails.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Go to the author linkedin page ${authorDetails.linkedin}`}
        >
          <User className="w-[18px]" /> LinkedIn
        </Link> : null}
        
      </div>

      {/* Author's Posts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 self-center place-content-stretch max-w-full content-center px-5 md:px-[40px] md:max-w-[780px] lg:max-w-[1100px]">
        <div className="w-full self-start flex flex-col items-start justify-start col-span-full pl-0.5">
          <h2 className="text-[19px] font-bold mt-4 px-2 py-0.5 bg-white outline-[1.5px] outline-dashed outline-[#f26419] text-[#f25f5c] rounded-sm pr-[25px] font-roboto">
            {authorDetails.authorName}'s Latest Posts
          </h2>
          <p className="px-1 pt-[1px] font-semibold w-auto mt-2 flex items-center gap-[2px] rounded-sm text-[14px] text-[#404045] outline-dashed outline-[1px] outline-[#f26419] outline-offset-[1px]">
            <Diamond className="fill-[#ff8811]" />
            {authorDetails.authorName} has a total of {authorPosts?.totalPosts} posts.
          </p>
        </div>
        {authorPosts?.posts.map((post:object|any) => (
          <PostForMap key={post.id} {...post} />
        ))}
      </div>

      {/* Pagination */}
      <div className="w-full flex justify-center mt-4">
        <QueryPagination
          homeURL={homeURL}
          base={base}
          page={authorPosts?.currentPage}
          pageCount={authorPosts?.totalPages}
        />
      </div>

      {/* Share Buttons */}
      <ShareButtons text={metaDescription} url={url} />
    </div>
  );
} 
export async function generateMetadata({ params, searchParams }: any) {
  const resolvedParams = await params;
  const resolvedSearch = await searchParams;
  let pageNo = 1;
  
  if (resolvedSearch.page) {
    const num: number | any = Number(resolvedSearch.page);
    if (/^\d+$/.test(resolvedSearch.page) && !isNaN(num) && Number.isInteger(num) && num > 0) {
      pageNo = num;
    }
  }
  
  const authorSlug = resolvedParams.authorSlug;
  const authorDetails = await GetAuthorDetails(authorSlug);
  if (!authorDetails) {
    notFound();
  }

  const authorName = authorDetails.authorName;
  const metaDescription = authorDetails.description;
  const myURL = process.env.NEXT_PUBLIC_SITE_URL || 'https://fairexplain.com';
  
  const title = pageNo === 1 ? `${authorName} - Author at Fair Explain` : `${authorName} - Page ${pageNo} | Fair Explain`;
  const decidedUrl = pageNo === 1 ? `/authors/${authorSlug}` : `/authors/${authorSlug}?page=${pageNo}`;
  const canonicalURL = `${myURL}${decidedUrl}`;
  const ogImage = authorDetails.avatarLink ? `${myURL}${authorDetails.avatarLink}` : `${myURL}/FairExplain.svg`;

  return {
    title: title,
    description: metaDescription,
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
      title: title,
      description: metaDescription,
      siteName: 'Fair Explain',
      url: canonicalURL,
      type: 'profile',
      locale: 'en_US',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: authorName,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: metaDescription,
      images: [ogImage],
    },
  };
}