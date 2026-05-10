import React from "react";
import Link from "next/link";
import formatTimeAgo from "./timeAgo";
import { Clock, SquareMenu } from "lucide-react";
import Image from "next/image";

/* eslint-disable */
export default async function SinglePost(props:any) {
  const categorySlug = props.categorySlug;
  const categoryName = props.categoryName;
  const postSlug = props.postSlug;
  const authorSlug = props.authorSlug;
  const authorAvatar = props.avatarLink;
  const AuthorAlternative = props.avatarAlt;
  const postArchiveImage = props.postArchiveImageLink;
  const alternativeText = props.postArchiveAlt;
  const postTitle = props.postTitle;
  const postDescription = props.postDescription;
  const postTags = props.postTags;
  const readingTime = props.readingTime;
  const authorName = props.authorName;
  const updatedAt = props.updatedAt;
  const timeAgo = formatTimeAgo(updatedAt);
  const designedTags = postTags && Array.isArray(postTags) ? postTags.map((tag, index) => (
    <div
    key={index}
    className="bg-[#fff8f0] px-1 rounded-sm text-[#14213d] text-[11px] font-semibold"
    >
    #{tag.trim()}
    </div>
  )) : [];
  
  return (
    <article className="self-start rounded-md p-0.5 flex flex-col justify-between h-full max-w-[327px] font-inter" aria-labelledby="post-title">
    {/* Image Container with fixed aspect ratio */}
    <div className="w-full relative aspect-[3/2] rounded-t-md overflow-hidden">
    <Link href={`/${categorySlug}/${postSlug}`} title={postTitle} aria-label={`Go to the post: ${postTitle}`}>
    <Image
    src={postArchiveImage}
    alt={alternativeText}
    width={323}
    height={215}
    className="object-cover rounded-t-md"
    loading="lazy"
    />
    </Link>
    
    {/* Post Category */}
    <Link
    href={`/${categorySlug}`}
    className="bg-[#fff8f0] text-[#14213d] px-1 py-[1px] rounded-sm text-sm font-bold absolute top-[1px] left-[1px] flex items-center gap-1 border border-white outline-1 outline-[#ff6b6b]/50"
    aria-label={`Go to ${categoryName} category`}
    >
    <SquareMenu className="w-4 h-4" />
    {categoryName}
    </Link>
    
    {/* Post Updated Time */}
    <span className="bg-[#fff8f0] text-[#14213d] px-1 py-[1px] rounded-sm text-xs font-semibold absolute top-[1px] right-[1px]" aria-label={`Post updated: ${timeAgo}`} title={`Updated ${timeAgo}`}>
    {timeAgo}
    </span>
    
    {/* Author */}
    <Link href={`/authors/${authorSlug}`} className="absolute bottom-[1px] left-[1px] z-30" aria-label={`Go to ${authorName}'s profile`}>
    <div className="relative w-8 h-8">
    <span className="absolute inset-0 rounded-full outline outline-dashed outline-[#fb5607] animate-[spin_11s_linear_infinite] z-10" />
    <Image
    src={`${process.env.NEXT_PUBLIC_SITE_URL}/${authorAvatar}`}
    className="rounded-full object-cover w-full h-full bg-white"
    alt={AuthorAlternative}
    width={32}
    height={32}
    loading="lazy"
    />
    </div>
    </Link>
    
    {/* Tags */}
    <div className="flex flex-row items-end justify-center gap-1 absolute bottom-[1px] right-[1px] text-[#404045] text-xs max-w-xs overflow-x-auto" aria-label="Post tags">
    {designedTags}
    </div>
    </div>
    
    {/* Post Title */}
    <h3 className="text-[18px] text-[#2D2851] my-1 line-clamp-2 hover:text-[#d03c2f] leading-tight font-extrabold tracking-wide font-roboto" id="post-title">
    <Link href={`/${categorySlug}/${postSlug}`} aria-label={`Go to the post: ${postTitle}`}>
    {postTitle}
    </Link>
    </h3>
    
    {/* Post Description */}
    <p className="text-[#2f4858] mb-4 line-clamp-4 text-[15px] tracking-wide" aria-label={`Post description: ${postDescription}`}>
    {postDescription}
    </p>
    
    {/* Read More Button */}
    <Link href={`/${categorySlug}/${postSlug}`} aria-label={`Read full article (${readingTime} minutes)`} className="w-full">
    <button className="flex items-center justify-between bg-[#ff6b6b]/90 text-white px-2 py-2 rounded-sm w-full outline-1 outline-dashed hover:outline-double outline-[#14213d] tracking-wide" aria-label={`Read full article: ${postTitle}`}>
    <div className="flex items-center gap-1">
    <Clock className="w-5" />
    <span className="text-[14px] font-semibold">{readingTime} Minutes Read</span>
    </div>
    <div className="text-[18px] font-bold">Read Me</div>
    </button>
    </Link>
    </article>
    
  );
}
