import Image from 'next/image';
import React from 'react';

/* eslint-disable */

export default function Hero({h1tag,paragraph}:any) {
  return (
    <section className="py-2 bg-white self-center select-none px-2 md:px-4 border-dashed border-2 border-[#ff8811] rounded-md mb-3 md:mb-5 mx-2 md:mx-5 max-w-[800px]" aria-labelledby="hero-heading" aria-describedby="hero-description">
    <div className="mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
    <div className="md:w-1/2 order-2 md:order-1">
    <h1 id="hero-heading" className="text-2xl md:text-3xl font-extrabold mt-3 md:mt-0 mb-2 leading-[1.3] text-center font-roboto text-[#f25f5c]">{h1tag}</h1>
    <p id="hero-description" className="text-[18px] mb-3 text-gray-600 text-center font-semibold font-roboto leading-snug">{paragraph}</p>
    </div>
    <div className="relative md:w-1/2 max-w-[98%] aspect-[4/3] flex justify-center items-center order-1 md:order-2">
    <Image src={`${process.env.NEXT_PUBLIC_SITE_URL}/static/Assets/hero-image.svg`} alt="Illustration of Fairexplain blog website hero image" width={400} height={300} priority className="rounded-md max-w-full w-[400px] h-[300px] object-contain" />
    </div>
    </div>
    </section>
  );
}
