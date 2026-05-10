import React from 'react';
import PostForMap from '@/components/PostForMap';
import QueryPagination from '@/components/QueryPagination';
import MapCategories from '@/components/MapCategories';
import Link from 'next/link';
import { MoveRight, House, Diamond } from 'lucide-react';
import { notFound, redirect } from "next/navigation";
import ShareButtons from '@/components/ShareButtons';
import PostSchema from '@/components/PostSchema';
import { GetCategoryPosts } from '@/lib/Fetch/UniversalFetcher';

/* eslint-disable */

export default async function CategoryPage({ params, searchParams }:any) {
  const resolvedParams = await params;
  const resolvedSearch = await searchParams;
  // Redirect to category page if page number is 1
  if (resolvedSearch.page == '1') {
    redirect(`/${resolvedParams.categorySlug}`);
  }
  
  let pageNo = 1;
  
  // Validate the page number and ensure it's valid
  if (resolvedSearch.page) {
    const num:number|any = parseInt(resolvedSearch.page, 10);
    if (/^\d+$/.test(resolvedSearch.page) && !isNaN(num) && Number.isInteger(num) && num > 0) {
      pageNo = num;
    } else {
      notFound();
    }
  }
  
  // Fetch category posts based on category slug and page number
  const categorySlug = resolvedParams.categorySlug;
  const category = await GetCategoryPosts(categorySlug,pageNo);
  if(!category||!category.posts){
    notFound();
  }
  const posts = await category.posts;
  
  // Handle empty posts or invalid pagination
  if (posts.length === 0) {
    notFound();
  }
  
  const currentCategory = posts[0].categoryName;
  const categoryDescription = posts[0].categoryDescription;
  const metaDescription = posts[0].metaDescription;
  
  const homeURL = `${categorySlug}`;
  const base = `${categorySlug}?page=`;
  const decidedURL = `${process.env.NEXT_PUBLIC_SITE_URL}/${categorySlug}`;
  const myURL = process.env.NEXT_PUBLIC_SITE_URL || 'https://fairexplain.com';
  
  const urlSchema= `${decidedURL}${pageNo > 1 ? `?page=${pageNo}` : ''}`;
  const categorySchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "url": urlSchema,
    "name": currentCategory,
    "description":  `${metaDescription} - Page ${pageNo}`,
    "image": `${process.env.NEXT_PUBLIC_SITE_URL}/${posts[0].categoryOgImage}`,
    "publisher": {
      "@type": "Organization",
      "name": "Fair Explain",
      "logo": `${myURL}/FairExplain.svg`
    },
    "mainEntityOfPage": {
      "@type": "Blog",
      "url": urlSchema,
      "headline": `${currentCategory} - Page ${pageNo}`,
      "description": `${categoryDescription} - Page ${pageNo}`,
      "publisher": {
        "@type": "Organization",
        "name": "Fair Explain"
      }
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": myURL },
        { "@type": "ListItem", "position": 2, "name": currentCategory, "item": decidedURL }
      ]
    }
  };
  
  if (pageNo > 1) {
    categorySchema.breadcrumb.itemListElement.push({
      "@type": "ListItem",
      "position": 3,  // This should be the next position after the category
      "name": `${currentCategory} -Page ${pageNo}`,
      "item": `${decidedURL}?page=${pageNo}`  // Construct the paginated URL dynamically
    });
  }
  
  return (
    <div className='self-start w-full flex flex-col justify-start items-start'>
    {/* Schema for category page */}
    <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify(categorySchema),
    }}
    />
    
    {/* Post Schema for each post in the category */}
    <PostSchema posts={posts} />
    
    {/* Breadcrumb Navigation */}
    <nav aria-label="Breadcrumb" className="flex justify-start items-center gap-2 m-2">
    <Link href="/" aria-label="Go to Home">
    <House className="w-[15px] h-[15px] md:w-[18px] md:h-[18px]" />
    </Link>
    <MoveRight aria-hidden="true" />
    
    <Link
    className="font-bold bg-[#fff8f0]/30 rounded-sm text-[12px] px-2 outline-[0.1px] outline-[#86bbd8]/20"
    aria-label={`Go to main category${pageNo > 1 ? ` with page no. ${pageNo}` : ''}`}
    href={pageNo > 1 ? `/${categorySlug}` : '#'}
    >
    {currentCategory}
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
    
    {/* Category Menu */}
    <div className='w-full self-start flex flex-col items-start justify-start pl-4 pr-1'>
    <MapCategories params={resolvedParams} />
    
    {/* Category Name */}
    <h1 className="text-[22px] font-bold mt-4 mb-2 px-2 py-0.5 bg-[#f26419] text-white rounded-sm pr-[25px] font-roboto">
    {currentCategory}
    </h1>
    
    {/* Category Description */}
    <p className='text-[20px] ml-1 px-2 py-[2px] mr-1 md:max-w-[800px] rounded-md my-2 self-start leading-tight text-[#392f5a] outline-[2px] outline-[#fee3e3]/50 hover:outline-[#ff8811]/75 outline-dashed outline-offset-[2px]'>
    {categoryDescription}
    </p>
    </div>
    
    {/* Posts Grid */}
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 self-center place-content-stretch max-w-full content-center px-5 md:px-[40px] md:max-w-[780px] lg:max-w-[1100px]'>
    <h2 className="text-[19px] font-bold mt-4 mb-2 px-2 py-1 bg-white outline-[1.5px] outline-dashed outline-[#f26419] text-[#f25f5c] rounded-sm pr-[25px] font-roboto">
    {currentCategory} Latest Posts
    </h2>
    
    <div className='w-full self-start flex flex-col items-start justify-start col-span-full'>
    <p className='text-[15px] font-bold mt-2 text-[#392f5a] px-2 py-[2px] rounded-sm max-w-[280px] self-start outline-dashed outline-[1px] outline-[#ff8811]'>
    <span className='font-semibold mr-[5px] text-[#404045]'>
    <Diamond className='fill-[#ff8811] inline mr-1' />
    Category:
    </span>
    {currentCategory}
    <span className='text-[12px] text-[#404045] ml-2 '>
    Have {category.totalPosts} total Posts
    </span>
    </p>
    </div>
    
    {/* Mapping through posts */}
    {posts.map((post:Object|any) => (
      <PostForMap key={post.id} {...post} />
    ))}
    </div>
    
    {/* Category Pagination */}
    <QueryPagination homeURL={homeURL} base={base} page={pageNo} pageCount={category.totalPages} />
    
    {/* Share Buttons */}
    <ShareButtons text={metaDescription} url={decidedURL} />
    </div>
  );
}

// all metadata for this page

export async function generateMetadata({ params,searchParams }:any) {
  let pageNo= 1
  const resolvedParams =await params;
  const categorySlug =resolvedParams.categorySlug;
  const resolvedSearch =await searchParams;
  const category = await GetCategoryPosts(categorySlug);
  if(!category){
    notFound()
  }
  const categoryName = category?.posts[0].categoryName || '';
  const description= category?.posts[0].categoryDescription;
  const title= category?.posts[0].categoryName;
  
  if(resolvedSearch.page){
    const num:any = parseInt(resolvedSearch.page,10);
    if(/^\d+$/.test(resolvedSearch.page) && !isNaN(num) && Number.isInteger(num) && num>0){
      pageNo=num;
    } else{
      return{};
    }
  }
  
  let decidedURL= (pageNo===1? `/${categorySlug}` : `/${categorySlug}?page=${pageNo}`); 
  
  const canonicalURL = `${process.env.NEXT_PUBLIC_SITE_URL}${decidedURL}`;
  
  let CategoryTitleDecided= (pageNo=== 1 ? `${categoryName} | ${title}` : `${categoryName}| ${title} -Page ${pageNo}`);
  
  let CategoryDescriptionDecided= (pageNo=== 1 ? `${description}` : `${description} | Page: ${pageNo}`);
  
  return {
    title: CategoryTitleDecided,
    description: CategoryDescriptionDecided,
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
      title: CategoryTitleDecided,
      description: CategoryDescriptionDecided,
      siteName: 'Fair Explain',
      url: canonicalURL,
      type: 'website',
      locale: 'en_US',
      images: [
        {
          url: category?.posts[0].categoryOgImage,
          width: 1200,
          height: 630,
          alt: 'Fair Explain Category Page',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: CategoryTitleDecided,
      description: CategoryDescriptionDecided,
      images: [category?.posts[0].categoryOgImage],
    },
  };
}
