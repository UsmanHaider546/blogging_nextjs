/* eslint-disable */
import React from 'react';
import Link from 'next/link';
import { Params } from 'next/dist/server/request/params';
import { GetCategories } from '@/lib/Fetch/UniversalFetcher';

export default async function MapCategories({ params }:Params|any) {
  const categories = await GetCategories();
  const categorySlug = params?.categorySlug || null;

  if (!categories || categories.length === 0) return null; // Handle empty category list

  return (
<nav aria-label="Category Navigation" className="flex max-w-[1000px] gap-2 self-start justify-start items-center col-span-full">
  {categories.map((detail:any) => {
    const isActive = detail.slug === categorySlug;
    
    return (
      <Link
        key={detail.slug}
        href={`/${detail.slug}`}
        className="flex items-center gap-0 flex-row"
        aria-label={`View all posts about ${detail.name} (${detail.posts} posts)`}
      >
        <div 
          className={`pl-2 pr-[18px] font-bold rounded-sm text-[20px]  
            ${isActive ? 'bg-[#d03c2f] text-white' : 'bg-[#fff8f0] text-[#d03c2f] outline-dashed outline-[0.1px] outline-[#fb5607] hover:text-white hover:bg-[#3a86ff] hover:outline-hidden '}`}
          aria-current={isActive ? "page" : undefined}  // Indicates the active category for screen readers
        >
          {detail.name}
        </div>
        <div 
          className="bg-white rounded-full px-[6px] py-[2px] font-bold ml-[-13px] mt-[-20px] text-[11px] text-black"
          aria-label={`Number of posts in ${detail.name}: ${detail.posts}`}
        >
          {detail.posts}
        </div>
      </Link>
    );
  })}
</nav>
  );
}











