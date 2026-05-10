# Fair Explain - Blogging Platform

Fair Explain is a modern, fast, and SEO-optimized blogging platform built with Next.js. It features a clean design, local JSON database for performance, and comprehensive schema markup for better search engine visibility.

## Features

- **Next.js App Router**: Built with the latest Next.js features.
- **SEO Optimized**: Includes dynamic metadata, JSON-LD schema, and sitemap generation.
- **Local Database**: Uses a local JSON file (`lib/localdb.json`) for content, making it easy to manage and extremely fast.
- **Responsive Design**: Works perfectly on mobile, tablet, and desktop.
- **Tailwind CSS**: Modern styling with a customized theme.
- **Clean UI**: Minimalist and focused on readability.

## Getting Started

### Prerequisites

- Node.js (Latest LTS recommended)
- npm, pnpm, or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/blogging-nextjs.git
   cd blogging-nextjs
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Copy `.env.example` to `.env` and adjust the values if necessary.
   ```bash
   cp .env.example .env
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Content Management

Posts and categories are managed in `lib/localdb.json`. Simply update this file to add or modify content.

## Deployment

The easiest way to deploy is using [Vercel](https://vercel.com).

1. Push your code to GitHub.
2. Import the repository in Vercel.
3. Configure your environment variables.
4. Deploy!

## License

This project is licensed under the MIT License.
