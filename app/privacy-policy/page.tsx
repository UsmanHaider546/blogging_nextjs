import ShareButtons from '@/components/ShareButtons';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { CircleUser, Diamond, House, Mail, MoveRight, User } from 'lucide-react';

export default async function PrivacyPolicy() {
  const url = `${process.env.NEXT_PUBLIC_SITE_URL}/privacy-policy`;
  const metaDescription = 'Welcome to the privacy page of our website. Explore our latest posts and updates.';

  // Breadcrumb and Schema for the Privacy Policy page
  const breadcrumbItems = [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": `${process.env.NEXT_PUBLIC_SITE_URL}/`
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Privacy Policy",
      "item": url
    }
  ];

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "url": url,
    "name": "Privacy Policy",
    "description": metaDescription,
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbItems
    }
  };

  return (
    <div className="flex mt-4 self-center flex-col items-center justify-between bg-white w-full md:px-9 px-3 mb-5 flex-wrap ">
      
      {/* Inject Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema),
        }}
      />

      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 w-full my-2" aria-label="Breadcrumb navigation">
        <Link href="/" aria-label="Go to the Main Home Page">
          <House className="w-[15px] h-[15px] md:w-[18px] md:h-[18px]" />
        </Link>
        <MoveRight aria-hidden="true" />
        <p className="font-bold bg-[#fff8f0]/30 rounded-sm text-[12px] px-2 outline-[0.1px] outline-[#86bbd8]/20" aria-current="page">
          Privacy Policy
        </p>
      </nav>

      {/* Privacy Policy Section */}
      <div className="w-full mx-0.5 px-1 md:px-2 py-1 md:py-2 border-dashed border-[#F26419] border-[1.5px] md:border-2 rounded-b-md flex flex-col justify-evenly select-none flex-wrap">
        <h1 className="text-3xl font-bold ">Privacy Policy</h1>

        <div className="self-center justify-center md:justify-end flex items-center md:self-end mt-5">
          <Image
            src={`${process.env.NEXT_PUBLIC_SITE_URL}/static/Assets/privacy-policy.svg`}
            alt="privacy policy illustration"
            className="object-scale-down max-h-[200px] max-w-[300px] md:max-w-[450px] md:max-h-full"
            width={500}
            height={367}
            loading="lazy"
          />
        </div>

        <div className="mt-6 relative flex items-start flex-col gap-1 z-30">
          <span className="absolute bottom-0 left-0 flex items-start flex-col gap-1 z-10 rounded-full object-center h-[40px] w-[40px] outline-[1.5px] outline-offset-0 outline-[#fb5607] outline-dashed animate-[spin_11s_linear_infinite]"></span>
          <Image
            src={`${process.env.NEXT_PUBLIC_SITE_URL}/static/Assets/Author.svg`}
            alt="about-us page author"
            className="rounded-full object-center h-[40px]"
            width={40}
            height={40}
            loading="lazy"
          />
        </div>
        <h4 className="font-bold text-[22px]">By Usman Haider</h4>
      </div>

      {/* Privacy Policy Content */}
      <div className="bg-white text-gray-800 p-6 space-y-8 rounded-xl shadow-md text-[18px] md:text-[20px]">
        <h1 className="text-3xl font-bold text-gray-900">Data Privacy Policy</h1>
        
        <p>We collect different types of information to improve our website experience and provide more relevant content.</p>

        <div className="bg-[#fff8f0] p-4 rounded-lg border border-dashed border-[#f26419]">
          <h2 className="font-roboto font-bold text-[20px] md:text-[22px] text-gray-800 mb-2">Personal Information</h2>
          <p className="text-gray-700">
            If we collect personal information, such as an email address for a newsletter or your name, region, or interests, you have the right to refuse it.
          </p>
        </div>

        <div className="bg-[#fff8f0] p-4 rounded-lg border border-dashed border-[#f26419]">
          <h2 className="font-roboto font-bold text-[20px] md:text-[22px] text-gray-800 mb-2">Non-Personal Information</h2>
          <p className="text-gray-700">
            We gather device and region information, usage data like read time and bounce rate, and other non-identifiable details to enhance our services.
          </p>
        </div>

        <div className="bg-[#fff8f0] p-4 rounded-lg border border-dashed border-[#f26419]">
          <h2 className="font-roboto font-bold text-[20px] md:text-[22px] text-gray-800 mb-2">Use of Third-Party Tools</h2>
          <p className="text-gray-700">
            Third-party tools, such as analytics and social tools, help ensure compliance and improve the user experience by focusing content delivery.
          </p>
        </div>

        <div className="bg-[#fff8f0] p-4 rounded-lg border border-dashed border-[#f26419]">
          <h2 className="font-roboto font-bold text-[20px] md:text-[22px] text-gray-800 mb-2">Why We Collect Data</h2>
          <p className="text-gray-700">
            Data is collected for legal purposes like improving experience, content creation, advertising, communication, and interaction.
          </p>
        </div>

        <div className="bg-[#fff8f0] p-4 rounded-lg border border-dashed border-[#f26419]">
          <h2 className="font-roboto font-bold text-[20px] md:text-[22px] text-gray-800 mb-2">Security & Transparency</h2>
          <p className="text-gray-700">
            We protect your data using modern technologies and secure storage. You can manage your preferences anytime as we stay transparent about how data is used.
          </p>
        </div>

        <div className="bg-[#fff8f0] p-4 rounded-lg border border-dashed border-[#f26419]">
          <h2 className="font-roboto font-bold text-[20px] md:text-[22px] text-gray-800 mb-2">Feedback & Support</h2>
          <p className="text-gray-700">
            If you experience issues, have suggestions, or need support, feel free to email us. We value your feedback and aim to ensure a seamless experience.
          </p>
        </div>

        <p className="text-gray-700">
          Please check back regularly to stay informed about our data handling practices. This page is updated whenever we change or add policies.
        </p>

        <p className="text-gray-800">Thank you.</p>

        <p className='text-center text-[#f26419] text-2xl font-roboto font-bold'>
          Here is my <Link className='text-[#3a86ff]' href={`${process.env.NEXT_PUBLIC_SITE_URL}/sitemap.xml`}>website's Sitemap</Link> to view the available pages and URLs to explore my website
        </p>
      </div>

      <ShareButtons text={metaDescription} url={url} />
    </div>
  );
}

export async function generateMetadata() {
  const canonicalURL= `/privacy-policy`;
  return {
    title: 'Privacy Policy Page',
    description: 'Welcome to the pricay page of our website. Explore our latest posts and updates.',
    alternates: {
      canonical: canonicalURL,
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
      },
    },
    openGraph: {
      title: "pageMeta.title",
      description:"pageMeta.description",
      url: canonicalURL,
      siteName: 'Fair Explain',
      locale: 'en_US',
      images: [
        {
          url: "pageMeta.ogImage",
          width: 1200,
          height: 630,
          alt: 'search page',
        },
      ],
      type: 'website',
    },
      twitter: {
      card: 'summary_large_image',
      title: 'Home Page',
      description:'Welcome to the privacy page of our website. Explore our latest posts and updates.',
      images: ['pageMeta.ogImage'],
    },
    
  }
}