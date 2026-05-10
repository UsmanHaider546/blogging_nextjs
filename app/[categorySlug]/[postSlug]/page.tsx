import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import PostForMap from '@/components/PostForMap';
import SinglePost from '@/components/SinglePost';
import { SquareMenu,Hash, House, MoveRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import formatTimeAgo from '@/components/timeAgo';
import { notFound } from "next/navigation";
import ShareButtons from "@/components/ShareButtons";
import  { FetchRelatedPosts,GetSinglePost } from "@/lib/Fetch/UniversalFetcher";

export const revalidate = 9600;

type PostPageParams = Promise<{ categorySlug: string; postSlug: string }>;

function normalizeToc(
  raw: unknown
): Array<{ id: string | number; HighlightId: string; HighlightText: string }> {
  if (Array.isArray(raw)) {
    return raw as Array<{ id: string | number; HighlightId: string; HighlightText: string }>;
  }
  if (typeof raw === 'string') {
    try {
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }
  return [];
}

async function loadPostForPage(params: PostPageParams) {
  const resolvedParams = await params;
  const categorySlug = resolvedParams?.categorySlug;
  const slug = resolvedParams?.postSlug;
  const postData = await GetSinglePost(slug);

  if (!postData || (Array.isArray(postData) && postData.length === 0)) {
    notFound();
  }

  if (postData.categorySlug !== categorySlug) {
    notFound();
  }

  return postData;
}



// This is the Single post page. when user clicks on a post, this page will be rendered.
export default async function PostPage({ params }: { params: PostPageParams }) {
  const post = await loadPostForPage(params);
  const author = post.authors?.[0] || {};
  const timeAgo = formatTimeAgo(post.updatedAt);
  const toc = normalizeToc((post as { TOC?: unknown }).TOC);
  const postTags: string[] = Array.isArray(post.tags) ? post.tags : [];
  const faqs: Array<{ question: string; answer: string }> = Array.isArray(post.faqs)
    ? post.faqs
    : [];

  const designedTags = postTags.map((tag, index) => (
    <div key={index} className="px-[5px]  text-[13px] font-semibold  "># {tag.trim()}</div>
  ));

  const url = `${process.env.NEXT_PUBLIC_SITE_URL}/${post.categorySlug}/${post.slug}`;
  const description = post.description || "Read this post to learn more about the topic.";
  const myURL = process.env.NEXT_PUBLIC_SITE_URL || 'https://fairexplain.com';
  const categoryUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/${post.categorySlug}`;
  const RelatedPosts:any = post.RelatedPosts;
  const allRelatedPosts:object|any = RelatedPosts?.length
    ? await FetchRelatedPosts(RelatedPosts)
    : { data: [] };
  const postSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "url": url,
    "name": post.title,
    "description": description,
    "publisher": {
      "@type": "Organization",
      "name": "Fair Explain",
      "logo": `${myURL}/FairExplain.svg`
    },
    "mainEntityOfPage": {
      "@type": "Article",
      "url": url,
      "headline": post.title,
      "description": post.description,
      "author": {
        "@type": "Person",
        "name": author.name
      },
      "datePublished": post.createdAt,
      "dateModified": post.updatedAt,
      "image": `${process.env.NEXT_PUBLIC_SITE_URL}${post.image}`,
      "publisher": {
        "@type": "Organization",
        "name": "Fair Explain"
      }
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": myURL
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": post.categoryName,
          "item": categoryUrl
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": post.title,
          "item": url
        }
      ]
    }
  };
  
  return (
    
    // {/* upper Section of Image */}
    <div className='md:p-4 flex flex-col items-start justify-center self-center scroll-smooth max-w-full mx-1'>
    <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify(postSchema),
    }}
    />
    
    {/* BreadCrumbs */}
    <nav className="flex items-center gap-1 m-1 md:mx-2 md:mb-4" aria-label="Breadcrumb navigation">
    {/* Home Link */}
    <Link href="/" aria-label="Home">
    <House className="w-[15px] h-[15px] md:w-[18px] md:h-[18px]" />
    </Link>
    {/* Right Arrow (MoveRight) */}
    <MoveRight className="w-[15px] md:w-[20px]" />
    
    {/* Category Link */}
    <Link
    href={`/${post.categorySlug}`}
    className="font-bold text-[10px] md:text-[12px] px-1 md:px-2"
    aria-label={`Category: ${post.categoryName}`}
    >
    {post.categoryName}
    </Link>
    
    {/* Right Arrow (MoveRight) */}
    <MoveRight className="w-[12px] md:w-[15px]" />
    
    {/* Current Post Title */}
    <p
    className="font-bold bg-[#fff8f0]/30 rounded-sm text-[10px] px-2 outline-[0.1px] outline-[#86bbd8]/20"
    aria-current="page"
    >
    {post.title}
    </p>
    </nav>
    
    {/* Section of Tags, Title and Category */}
    <Link 
    href={`/${post.categorySlug}`} 
    className="bg-[#fff8f0] text-black px-1.5 py-[0px] rounded-sm font-bold gap-[2px] text-[13px] flex items-center outline-dashed outline-[1px] outline-[#ff8811] hover:bg-[#d03c2f] hover:text-white mb-[-3px] leading-none font-roboto tracking-wide"
    aria-label={`Category: ${post.categoryName}`}
    >
    <SquareMenu className="w-3.5 font-bold" />
    {post.categoryName}
    </Link>
    
    <h1 className="text-[25px] md:text-[28px] py-0 pl-0.5 hover:text-[#d03c2f] text-[#2D2851] font-roboto tracking-wide font-bold">{post.title}</h1>
    
    <div className="flex items-start justify-start gap-0.5 flex-wrap">{designedTags}</div>
    
    <div className="flex justify-start items-end mt-2 ml-1 font-semibold gap-2 flex-wrap text-[12px]">
    <div className="px-2 py-1 bg-[#fff8f0] rounded-sm outline-dashed outline-[#ff8811] outline-[1px] hover:bg-[#d03c2f] hover:text-white hover:outline-hidden min-w-[100px] inline-flex justify-center items-center transition-all duration-200">
    {timeAgo}
    </div>
    <div className="px-2 py-1 bg-[#fff8f0] rounded-sm outline-dashed outline-[#ff8811] outline-[1px] hover:bg-[#d03c2f] hover:text-white hover:outline-hidden min-w-[100px] inline-flex justify-center items-center transition-all duration-200">
    {post.reading_time} Minutes Read
    </div>
    </div>
    
    {/* Author Avatar and Name */}
    <Link href={`/authors/${author.slug}`} className="flex items-center justify-start gap-[2px] font-bold w-full">
    <Image 
    src={author.avatar} 
    className="rounded-full object-center h-[32px] w-[32px]"
    alt={author.avatarAlt || author.name || post.title} 
    width={32} 
    height={32}
    loading="lazy"
    />
    <div className="font-bold text-[15px] md:text-[18px] text-[#1a535c] self-end text-nowrap font-roboto">{author.name}</div>
    </Link>
    
    {/* Single Image */}
    <div className="self-center mx-auto aspect-[1200/630] mt-1 rounded-md overflow-hidden  border-2 hover:border-4 hover:cursor-pointer border-[#fb5607]/50 ">
    <Image
    src={post.singleImage}
    alt={post.postArchiveAlt || post.title}
    width={1200}
    height={630}
    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
    className="self-center mx-auto h-full object-cover"
    priority
    />
    </div>
    
    {/* The Carousel and highlight text */}
    <Carousel className="self-center w-full max-w-[500px] md:max-w-[800px] lg:max-w-[1000px]">
    <CarouselContent className="flex items-stretch justify-start mt-1 mb-1 mx-4 gap-1.5 font-roboto font-bold tracking-wide">
    {toc.map((single:any) => {
      const raw = single.slug;
      const fragment =
        typeof raw === 'string' && raw.length > 0
          ? raw.startsWith('#')
            ? raw
            : `#${raw}`
          : '#';
      return (
      <CarouselItem key={single.id} className="max-w-[130px] max-h-[100px] bg-[#fff8f0] hover:bg-[#fb5607] hover:text-white flex items-center justify-center px-1 outline-dashed outline-[1px] outline-[#fb5607] pt-1 pb-4 rounded-sm text-[13px] md:text-[15px] font-bold text-left leading-6 cursor-pointer select-none break-words overflow-hidden hyphens-auto relative scroll-smooth">
      <Link className="flex items-start justify-center w-full h-full break-words" href={fragment}>
      {single.highlightText}
      <Hash className="absolute right-0 bottom-0 w-[18px] text-black" />
      </Link>
      </CarouselItem>
      );
    })}
    </CarouselContent>
    </Carousel>
    <p className="font-roboto font-medium text-sm self-center px-2 mx-3 mt-1 py-1 bg-[#fff8f0] rounded-sm inline outline-1 outline-dashed outline-[#ff6b6b] mb-2">Updated {timeAgo} — Valid for 30 days — We will refresh it again</p>
    
    {/* The single post Body Section */}
    <SinglePost post={post} />
    
    {/* The FAQs Section */}
    {faqs.length > 0 && (  <div className="max-w-[1200px] flex flex-col justify-center mt-2 gap-4">
      <h3 id="FAQs" className="bg-[#fff8f0] py-[1px] px-1 rounded-sm text-[18px] md:text-2xl font-bold max-w-[500px] self-start outline-double outline-[2px] outline-[#fb5607]/50">
      Frequently Asked Questions
      </h3>
      {faqs.map((single) => (
        <div key={single.question} className="gap-2 outline-dashed outline-[#fee3e3] outline-[2px] rounded-md">
        <h4 className="font-bold flex gap-[1px] text-[14px] md:text-[19px] rounded-sm px-2">
        <span className="min-w-5 min-h-5 self-center bg-[#fee3e3] rounded-sm rotate-45 mr-2 outline-[1px] outline-[#ff6b6b] font-bold" />
        {single.question}?
        </h4>
        <p className="font flex gap-[1px] mt-1 pl-8 text-[14px] md:text-[17px]">{single.answer}</p>
        </div>
      ))}
      </div>)}
      
      <ShareButtons text={description} url={url} />
      {/*  */}
      {post.RelatedPosts && post.RelatedPosts.length > 0 && (<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 max-w-full px-5 md:px-[40px] md:max-w-[780px] lg:max-w-[1100px] font-inter self-center">
        <h4 className="text-2xl font-bold mb-4 px-2 py-1 bg-white outline-[1.5px] outline-dashed outline-[#f26419] text-[#f25f5c] rounded-sm justify-self-start col-span-full w-full">You may also Like</h4>
        {allRelatedPosts?.map((set:any) => (
          <PostForMap key={set.id} {...set} />
        ))}
          </div>)}

      {/*  */}
      </div>
  );
}

export async function generateMetadata({ params }: { params: PostPageParams }) {
  const post = await loadPostForPage(params);
  const title = post.title;
  const description = post.description;
  const canonicalURL = `/${post.categorySlug}/${post.slug}`;
  
  const base = process.env.NEXT_PUBLIC_SITE_URL || '';
  const image = post.image.startsWith('http') ? post.image : `${base}${post.image}`;
  const alt = post.postArchiveAlt || post.title;

  return {
    title: title,
    description: description,
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
      description: description,
      siteName: 'Fair Explain',
      url: canonicalURL,
      type: 'article',
      locale: 'en_US',
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: alt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: description,
      images: [image],
    },
  };
}
  
  