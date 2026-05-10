'use client';
/* eslint-disable */

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';

const SearchForm = (props:any) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setIsDisabled(searchQuery.trim().length < 3);
  }, [searchQuery]);

  const handleSubmit = (e:any) => {
    e.preventDefault();
    if (searchQuery.trim().length < 3) return;
    const encodedQuery = encodeURIComponent(searchQuery.trim());
    router.push(`/search?search=${encodedQuery}`);
    setSearchQuery('');
    props.onClose ? props.onClose() : null;
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center w-full relative">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search Post Here..."
        className="px-4 py-1 border-[#f26419] border-[1px] rounded-md w-full focus:outline-none focus:ring-2 focus:ring-[#f26419] font-bold text-[18px] text-[#f26419] caret-[#f26419] placeholder-opacity-50 placeholder-[#50514f]"
        aria-label="Search query"
        aria-describedby="search-helper"
      />
      <span id="search-helper" className="sr-only">
        Enter at least 3 characters to search
      </span>
      <button
        type="submit"
        disabled={isDisabled}
        title="Search"
        className={`rounded-r-md font-medium ${
          isDisabled 
            ? 'text-white bg-[#3a86ff]' 
            : 'text-[#fff8f0] bg-[#f26419]'
        } absolute right-1 hover:bg-[#f26419] px-[4px] py-[2px] rounded-sm hover:text-[#fff8f0]`}
      >
        <Search aria-hidden="true" />
      </button>
    </form>
  );
};

export default SearchForm;


