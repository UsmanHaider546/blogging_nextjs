'use client'; 
/* eslint-disable */

import React, { useEffect } from 'react';
import Link from 'next/link';
import { ShieldAlert } from 'lucide-react';

export default function Error({ 
  error, 
  reset, 
}) {

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          {/* Error icon */}
          <div className="mx-auto h-20 w-20 flex items-center justify-center rounded-full bg-red-100">
            <ShieldAlert className='w-[45px] h-[45px] text-red-600' />
          </div>
          
          <h1 className="mt-6 text-3xl font-extrabold text-gray-900">
            Something went wrong
          </h1>
          
          <p className="mt-2 text-base text-gray-600">
            We apologize for the inconvenience. Our team has been notified of this issue.
          </p>
        </div>
        
        <div className="flex flex-col space-y-4">
          <button
            onClick={() => reset()}
            className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150"
          >
            Try again
          </button>
          
          <Link 
            href="/"
            className="w-full py-3 px-4 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150"
          >
            Return to homepage
          </Link>
        </div>
        
        {/* Optional: Show error details in development */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-6 p-4 bg-gray-100 rounded-md text-left">
            <p className="text-sm font-medium text-gray-900">Error details:</p>
            <p className="mt-1 text-sm text-gray-700 font-mono break-all">
              {error?.message || 'Unknown error occurred'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}