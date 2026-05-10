import React from 'react';
import MenuLinks from './MenuLinks';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  const allLinks = MenuLinks();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#fff8f0] dark:bg-gray-800 px-6 py-8 w-full font-roboto">
      <div className="w-full max-w-screen-7xl mx-auto md:flex md:justify-between">
        {/* Logo Section */}
        <div className="flex items-center space-x-4">
          <Image
            src="/FairExplain.svg"
            alt="Fairexplain Logo"
            width={40}
            height={40}
            loading="eager"
            priority
          />
          <span className="text-2xl font-semibold text-gray-900 dark:text-white">Fair Explain</span>
        </div>

        {/* Links Section */}
        <nav>
          <ul className="flex flex-wrap justify-center space-x-4 text-lg text-gray-600 dark:text-gray-300">
            {allLinks.map(({ href, label, icon }) => (
              <li key={`${href}-${label}`}>
                <Link
                  href={href}
                  className="flex items-center gap-2 px-2 py-1 text-sm font-medium transition-colors duration-300 text-gray-600 hover:text-[#3a86ff]"
                >
                  <span className="w-4 h-4 inline-flex items-center justify-center">{icon}</span>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      {/* Move the divider outside of the flex */}
      <hr className="my-6 border-gray-300 dark:border-gray-700" />
      <div className="text-center text-sm text-gray-500 dark:text-gray-400">
        <span>
          © {currentYear} <Link href="/" className="font-semibold text-[#3a86ff] hover:underline">Fairexplain™</Link>. All Rights Reserved.Feel free to <Link className="font-semibold text-[#3a86ff] hover:underline" href='/contact-us'>Contact Us</Link>
        </span>
      </div>
    </footer>
  );
}
