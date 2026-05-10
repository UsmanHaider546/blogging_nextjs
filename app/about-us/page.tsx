import ShareButtons from '@/components/ShareButtons';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { CircleUser, Diamond, House, Mail, MoveRight, User } from 'lucide-react';

/* eslint-disable */

export default async function About() {
  const url = `${process.env.NEXT_PUBLIC_SITE_URL}/about-us`;
  const metaDescription = 'Welcome to the About page of our website. Explore our latest posts and updates.';
  
  // Breadcrumb and Schema for the About Us page
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
      "name": "About Us",
      "item": url
    }
  ];
  
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "url": url,
    "name": "About Us",
    "description": metaDescription,
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbItems
    }
  };
  
  return (
    <div className="flex mt-4 self-center flex-col items-center justify-between bg-white w-full md:px-9 px-3 mb-5 flex-wrap leading-[25px] md:leading-[29px]">
    
    {/* Inject Schema */}
    <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify(schema),
    }}
    />
    
    {/* Breadcrumbs */}
    <nav className="flex items-center gap-2 w-full my-2" aria-label="Breadcrumb navigation">
    <Link href="/" aria-label="Go to the Main Home Page">
    <House className="w-[15px] h-[15px] md:w-[18px] md:h-[18px]" />
    </Link>
    <MoveRight aria-hidden="true" />
    <p className="font-bold bg-[#fff8f0]/30 rounded-sm text-[12px] py-[0px] px-2 outline-[0.1px] outline-[#86bbd8]/20" aria-current="page">
    About Us
    </p>
    </nav>
    
    {/* About Us Section */}
    <div className='w-full mx-0.5 px-1 md:px-2 py-1 md:py-2 border-dashed border-[#F26419] border-[1.5px] md:border-2 rounded-b-md flex flex-col justify-evenly select-none flex-wrap'>
    <h1 className='text-2xl font-roboto font-bold'>About-us</h1>
    
    <div className='self-center justify-center md:justify-end flex items-center md:self-end mt-5'>
    <Image
    src={`${process.env.NEXT_PUBLIC_SITE_URL}/static/Assets/about-us-1.svg`}
    alt='about-us page author'
    className="object-scale-down max-h-[200px] max-w-[300px] md:max-w-[450px] md:max-h-full"
    width={500}
    height={367}
    loading="lazy"
    />
    </div>
    
    <div className="mt-6 relative flex items-start flex-col gap-1 z-30">
    <span className="absolute bottom-0 left-0 flex items-start flex-col gap-1 z-10 rounded-full object-center h-[40px] w-[40px] outline-[1.5px] outline-offset-0 outline-[#fb5607] outline-dashed animate-[spin_11s_linear_infinite]"></span>
    <Image
    src={`${process.env.NEXT_PUBLIC_SITE_URL}/static/Assets/Author.svg`}
    alt='about-us page author'
    className="rounded-full object-center h-[40px]"
    width={40}
    height={40}
    loading="lazy"
    />
    </div>
    <h4 className='font-bold text-2xl'>By Usman Haider</h4>
    </div>
    
    {/* About Content */}
    <div className='w-full mt-4 text-[18px]'>
    <p>Thank you for taking the time to visit my website. It is important to keep yourself updated with market trends and insights.</p>
    
    <h2 className="text-3xl font-bold font-roboto  text-gray-800 mt-6 mb-3">Why I Created This Blog</h2>
    <p>
    It was a while ago when I was searching the internet looking for market research with complete information. As for me, I struggled to find content that I could trust and that used actual and updated insights that could be integrated into business plans to produce excellent results.
    </p>
    
    <p>
    Market content still helps people with actual product realities to launch their businesses. This website has been created to help those who want to learn more about the trends in different marketplaces and the challenges they face.
    </p>
    
    <div className="bg-[#fff8f0] border-l-4 border-[#f26419] p-4 my-6">
    <p className="font-medium">The market data is updated on a regular basis, so you will always have the latest information about market trends.</p>
    </div>
    
    <h2 className="text-2xl font-roboto font-semibold text-gray-800 mt-6 mb-3">My Approach</h2>
    <p>
    To get the desired data for you, I am using different tools and actual marketplaces to get it in a way that helps you out and needs a low budget with the benefits of using data.
    </p>
    
    <h2 className="text-2xl font-roboto font-semibold text-gray-800 mt-6 mb-3">What You'll Get</h2>
    <ul className="list-disc pl-5 space-y-2">
    <li>Not just data but also strategy to compete against specific competition</li>
    <li>Budget insights needed to work on your business</li>
    <li>Guidance to start making profits on the right path</li>
    </ul>
    
    <h2 className="text-2xl font-roboto font-semibold text-gray-800 mt-6 mb-3">Quality over quantity.</h2>
    <p>
    While some claim to have this vision to create rich content that feels authentic and original, they do not actually implement this vision. Make it interesting by using visuals and statistics to keep the audience interested.
    </p>
    <p>
    My goal is to provide you with high-quality information so you won't be bored when you're reading and with minimal text so you get the main idea and conclusion quickly. As I am a very straightforward person, I promise that you will never get content from me that has no conclusion and no results at all. The content I have added to my website will continue to be updated confidently.
    </p>
    <p className='text-center text-[#f26419] text-[20px] font-roboto mt-3'>
    If you want to Contact then you can easily click on  <Link className='text-[#3a86ff]' href={`/contact-us`}>Contact Us Link</Link>, you can ask any question regarding my website.
    </p>
    <p className='text-center text-[#f26419] text-[20px] font-roboto mt-3'>
    Here is my <Link className='text-[#3a86ff]' href={`${process.env.NEXT_PUBLIC_SITE_URL}/sitemap.xml`}>website's Sitemap</Link> to view the available pages and URLs to explore my website
    </p>
    
    </div>
    
    <ShareButtons text={metaDescription} url={url} />
    </div>
  );
}
export async function generateMetadata() {
  const canonicalURL= `/about-us`;
  return {
    title: 'About Page',
    description: 'Welcome to the about page of our website. Explore our latest posts and updates.',
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
      description:'Welcome to the about page of our website. Explore our latest posts and updates.',
      images: ["pageMeta.ogImage"],
    },
    
  }
}