// meta ok...
// share ok...
import React from 'react'
import PostForMap from '@/components/PostForMap';
import Pagination from '@/components/Pagination';
import { redirect } from "next/navigation";
import ShareButtons from '@/components/ShareButtons';
import { HomePostsArchive } from '@/lib/Fetch/UniversalFetcher';
import { Params } from 'next/dist/server/request/params';
/* eslint-disable */
export default async function page({params}:Params) {
  const resolvedParams:any= await params
  const tempString= resolvedParams.pageNumber;
  // if (tempString==="1") {return redirect('/')};
  const num = parseInt(tempString,10);
  const valid= await /^\d+$/.test(tempString) && !isNaN(num) && Number.isInteger(num);
  if (!valid) throw new Error(tempString+"Invalid page number");
  
  const posts= await (valid) ? (await HomePostsArchive(num)) : null;
  
  const pageCount= await posts?.totalPages || 1;
  
  if (num>pageCount) {throw new Error("Page numbers exceeds")};
  const base= "page";
  const homeURL= "/";
  {tempString=='1'? redirect('/'):null}
  const url= `${process.env.NEXT_PUBLIC_SITE_URL}/`;
  const metaDescription= "Read all posts to learn more about the topics.";
  return (
    <div className='flex flex-col w-full items-center justify-center'>
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 self-center place-content-stretch max-w-full content-center px-5 md:px-[40px] md:max-w-[780px] lg:max-w-[1100px]'>
    
    {posts?.posts.map((post:object|any) => {
      return(
        <PostForMap key={post.id} {...post} />
      )
    })}
    
    </div>
    <Pagination homeURL={homeURL} base={base} page={posts?.currentPage} pageCount={posts?.totalPages} />
     <ShareButtons text={metaDescription} url={url} />
    
    </div>
  )
}


export async function generateMetadata({ params }:Params) {
  const resolvedParams:any= await params
  const tempString= resolvedParams.pageNumber;
  const num = parseInt(tempString,10);
  const valid= await /^\d+$/.test(tempString) && !isNaN(num) && Number.isInteger(num);
  if (!valid) {return{}};
  if(tempString=='1'){return{}};
  const title=`|All Posts|Page-${num}`;
  const description=`{pageMeta.description} | Page ${num} of all posts`;
  const ogImage="pageMeta.ogImage";
  const posts= await (valid) ? (await HomePostsArchive(num)) : null;
  
  const pageCount= await posts?.totalPages ||1;
  
  if (num>pageCount || pageCount==0 || !posts) {return{}};
  const base= "page";
  const homeURL= "/";
  
  
  const decidedURL= num==1 ? `/${homeURL}` : `/${base}/${num}`;
  
  
  
  return {
    title: title,
    description: description,
    alternates: {
      canonical: decidedURL,
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
      description: description,
      siteName: 'Fair Explain',
      url: decidedURL,
      type: 'website',
      locale: 'en_US',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: 'Fair Explain All Posts Page',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title:title,
      description: description,
      images: ogImage,
    },
  };
}