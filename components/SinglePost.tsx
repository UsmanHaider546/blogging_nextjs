import ParseHTML from './ParseHtml';


/* eslint-disable */

export default async function SinglePost(props:any) {
  let post = await props.post;

  return (
    <>
      <div className="border-b-2 border-gray-200 mx-1 p-1 md:p-4  max-w-full md:mx-3 ">
        {/* Render the post body HTML */}
        <style>
          {post.css}
        </style>
        
        <section 
          lang="en" 
          aria-live="polite" 
          aria-labelledby="post-content"
        >
          <div>
            <ParseHTML htmlContent={post.content} />
          </div>
        </section>
      </div>
    </>
  );
}

