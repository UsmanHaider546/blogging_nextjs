function PostSchemaForMap({post}: any) {
  const sitelink = process.env.NEXT_PUBLIC_SITE_URL || "https://fairexplain.com";
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.postTitle,
    "author": {
      "@type": "Person",
      "name": post.authorName
    },
    "datePublished": post.publishedAt,
    "dateModified": post.updatedAt,
    "description": post.postDescription,
    "image": `${sitelink}/${post.postArchiveImageLink}`,
    "url": `${sitelink}/${post.categorySlug}/${post.postSlug}`,
    "mainEntityOfPage": `${sitelink}/${post.categorySlug}/${post.postSlug}`
  };
}

export default function PostSchema({posts}: any) {
  const blogPostSchemas = posts.map((p: any) => PostSchemaForMap({post: p}));
  return (
    <>
      {blogPostSchemas.map((schema: any, index: number) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
