import Link from "next/link";

export default function NotFound() {
  return (
    <section className="bg-white align-middle self-center flex items-center justify-center min-h-screen h-[60%]">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="mb-4 text-[#fb5607] text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 ">404</h1>
          <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl ">Something's missing.</p>
          <p className="mb-4 text-lg font-light text-gray-500 ">
            Sorry, we can't find that page. You'll find lots to explore on the home page.
          </p>
          {/* "Back to Homepage" Button */}
          <Link
            href="/"
            className="inline-flex text-white bg-[#fb5607] hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg font-roboto px-5 py-2.5 text-center  my-4"
          >
            Back to Homepage
          </Link>
        </div>
      </div>
    </section>
  );
}
