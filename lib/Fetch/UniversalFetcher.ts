"use server";
import data from '@/lib/localdb.json'
















//  Sitemaps. ------------------
export async function GetSitemapposts() {
   const rawData = data;
   const returnedPosts = rawData.map((item) => ({
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/${item.categorySlug}/${item.slug}`,
      lastModified: item.updatedAt,
      changeFrequency: 'monthly' as const,
   }));
   return returnedPosts;
}

export async function GetCategorySitemap() {
   const rawData = data;
   const seen = new Set<string>();
   const categories = rawData
      .filter((item) => {
         if (seen.has(item.categorySlug)) return false;
         seen.add(item.categorySlug);
         return true;
      })
      .map((item) => ({
         url: `${process.env.NEXT_PUBLIC_SITE_URL}/${item.categorySlug}`,
         lastModified: item.updatedAt,
         changeFrequency: 'weekly' as const,
      }));
   return categories;
}
//  ----------------Sitemaps. 



// Home Posts Archive✅----------
export async function HomePostsArchive(pageNumber:Number|string=1) {
  const ArchivePosts=await AllArchivePosts();
  const Final=await FinalArchiver(ArchivePosts,Number(pageNumber))
  return Final
}
// ----------Home Posts Archive✅


// Pageination with FinalArchiver.----------✅-----------
export async function FinalArchiver(postsData: Object | any, pageNumber = 1, limit = 8) {
   const totalPosts = postsData.length;
   const start = (pageNumber - 1) * limit;
   const end = start + limit;
   const totalPages = Math.ceil(totalPosts / limit);
   const currentData = postsData.slice(start, end);
   const finalData = {
      posts: currentData,
      totalPosts,
      totalPages,
      currentItems: currentData.length,
      currentPage: pageNumber
   }
   return finalData
}
// ------------------FinalArchiver✅. 


// Single Posts ✅------------
export async function GetSinglePost(postSlug: string) {
   const rawSinglePost = data.find(item => item.slug === postSlug)
   return rawSinglePost
}
// -------------SinglePost✅

// AllArchivePosts-----------------✅
export async function AllArchivePosts() {
   const rawData = data;
   const posts = rawData.map(item => ({
      id: item.id,
      categorySlug: item.categorySlug,
      categoryName: item.categoryName,
      postSlug: item.slug,
      authorSlug: item.authors[0].slug,
      avatarLink: item.authors[0].avatar,
      avatarAlt: item.authors[0].avatarAlt,
      authorRole: item.authors[0].role,
      authorName: item.authors[0].name,
      linkedin: item.authors[0].linkedin,
      description: item.authors[0].description,
      postArchiveImageLink: item.image,
      postArchiveAlt: item.postArchiveAlt,
      postTitle: item.title,
      postTags: item.tags,
      postDescription: item.description,
      readingTime: item.reading_time,
      updatedAt: item.updatedAt,
   }))
   return posts;
}
// --------------------AllArchivePosts

// Author details✅. ------------------
export async function GetAuthorDetails(autherSlug: string) {
   const allArchivePosts = await AllArchivePosts();
   const filterAuthorPost = allArchivePosts.find(item => item.authorSlug === autherSlug);
   if(!filterAuthorPost){
      return null
   }else return {
      authorSlug: filterAuthorPost?.authorSlug,
      avatarLink: filterAuthorPost?.avatarLink,
      avatarAlt: filterAuthorPost?.avatarAlt,
      authorRole: filterAuthorPost?.authorRole,
      authorName: filterAuthorPost?.authorName,
      linkedin: filterAuthorPost?.linkedin,
      description: filterAuthorPost?.description,
   }
}
// -------------------GetAuthorDetails.✅ 



// Author Posts.✅------------------
export async function GetAuthorPosts(autherSlug:string, pageNo:number|string) {
   const allArchivePosts = await AllArchivePosts();
   const filterAuthorPosts = allArchivePosts.filter(item => item.authorSlug === autherSlug);
   if(!filterAuthorPosts){
      return null
   }
   const Final=await FinalArchiver(filterAuthorPosts,Number(pageNo));
   return Final
}
// -----------------------Author Posts.✅

// Category Posts.✅------------------
export async function GetCategoryPosts(categorySlug: string,pageNumber:number|string=1) {
    const allArchivePosts = await AllArchivePosts();
    const filteredPosts=allArchivePosts.filter(item=>item.categorySlug===categorySlug);
    if(!filteredPosts){
      return null
    }
    const Final=FinalArchiver(filteredPosts,Number(pageNumber))
    return Final
};
// ------------------Category Posts.✅


// Categories. ✅------------------
export async function GetCategories() {
   const rawCategories = await AllArchivePosts()
   const categories = rawCategories.reduce((acc: any, current) => {
      const key: any = current.categorySlug;
      if (!acc[key]) {
         acc[key] = {
            slug: current.categorySlug,
            name: current.categoryName,
            description: current.description,
            posts: 0
         };
      }
      acc[key].posts++;
      return acc;
   }, {})
   return Object.values(categories)

};
// ------------------Categories. ✅


// Related Posts.✅------------------
export async function FetchRelatedPosts(RelatedPosts:[]=[]) {
   const ArchivePosts=await AllArchivePosts();
   const filteredPosts=RelatedPosts.map((item:any)=>{
      const currentFilteredItem=ArchivePosts.find(cur=>item.postSlug===cur.postSlug);
      return currentFilteredItem
   });
   return filteredPosts
}
// ------------------Related Posts.✅-

// Posts Serching.✅-----------------
export async function GetSearchPosts(searchParam:string|any, pageNo:number|string) {
   const stringParameter = await searchParam;
   const ArchivePosts=await AllArchivePosts();
   const filteredPosts=ArchivePosts.filter(item=>item.postTitle.includes(stringParameter)|| item.postDescription.includes(stringParameter));
   const finalData=FinalArchiver(filteredPosts,Number(pageNo))
   return finalData
}
// -----------------Posts Serching.✅