'use server'
import PostForMap from './PostForMap';
import MapCategories from './MapCategories';
/* eslint-disable */

export default async function HomePosts({ posts, params }:any) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 max-w-full px-5 md:px-[40px] md:max-w-[780px] lg:max-w-[1100px] font-inter self-center">
    <h2 className="text-2xl font-bold mb-4 px-2 py-1 bg-white outline-[1.5px] outline-dashed outline-[#f26419] text-[#f25f5c] rounded-sm">Latest Posts</h2>
    <div className="col-span-full w-full">
    <MapCategories params={params} />
    </div>
    {posts.map((post:any) => <PostForMap key={post.id} {...post} />)}
    </div>
    
  );
}
