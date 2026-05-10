import React from 'react';
import Link from 'next/link';
import { SquareArrowRight } from 'lucide-react';
/* eslint-disable */

export default async function Pagination({ base, page, pageCount, homeURL }:any) {
  let currentPage = await page;

  return (
    <div className='flex items-center justify-between gap-1 px-2 py-1 w-full max-w-[700px] mb-3 rounded-sm mx-[20px] self-center mt-10 outline-[1px] outline-[#3a86ff] md:outline'>
      
      {/* Previous Page */}
      {currentPage > 1 ? (
        <Link className='flex items-center justify-center' 
          href={currentPage === 2 ? `/${homeURL}` : `/${base}${currentPage - 1}`} 
          aria-label={`Go to page ${currentPage - 1}`}>
          <SquareArrowRight className="transform rotate-180 w-[30px] h-[35px] text-[#fb5607]" />
        </Link>
      ) : (
        <div className='flex items-center justify-center' aria-disabled="true">
          <SquareArrowRight className="transform rotate-180 w-[30px] h-[35px] text-[#fb5607]/30" />
        </div>
      )}

      {/* Page Indicator */}
      <div className='flex items-center justify-center gap-1 bg-[#fff8f0] py-[1px] px-1 font-semibold text-[#14213d] rounded-md text-[18px] outline-dashed outline-[1.4px] outline-[#fb5607]'>
        Page {currentPage} of {pageCount}
      </div>

      {/* Next Page */}
      {currentPage < pageCount ? (
        <Link className='flex items-center justify-center' 
          href={`/${base}/${currentPage + 1}`} 
          aria-label={`Go to page ${currentPage + 1}`}>
          <SquareArrowRight className='w-[30px] h-[35px] text-[#fb5607]' />
        </Link>
      ) : (
        <div className='flex items-center justify-center' aria-disabled="true">
          <SquareArrowRight className='w-[30px] h-[35px] text-[#fb5607]/30' />
        </div>
      )}
      
    </div>
  );
}




