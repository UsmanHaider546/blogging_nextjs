<div align="center">
  <h1>Next.js Blogging Platform</h1>
  
  <a href="https://youtu.be/LcVgiDSmtQ0">
    <img src="https://img.youtube.com/vi/LcVgiDSmtQ0/maxresdefault.jpg" alt="Next.js Blogging Platform Intro Video" width="100%">
  </a>
  <br />
  <p><i>A robust, SEO-optimized static blogging platform built leveraging the Next.js App Router.</i></p>
</div>

<br />

## 📸 Platform Interface Gallery

A visual overview of the platform's clean, minimalist, and responsive user interface.

### Home & Navigation Navigation
<p align="center">
  <img src="Site_Screenshots/Home_Page.webp" width="49%" alt="Home Page Dashboard">
  <img src="Site_Screenshots/Menu_Bar.webp" width="49%" alt="Responsive Menu Bar">
</p>

### Content Discovery
<p align="center">
  <img src="Site_Screenshots/Search_Page.webp" width="49%" alt="Dynamic Search Page">
  <img src="Site_Screenshots/Category_Page.webp" width="49%" alt="Category Archiving View">
</p>

### Reading Experience
<p align="center">
  <img src="Site_Screenshots/Single_Post_Page_1.png" width="49%" alt="Single Post Top Section">
  <img src="Site_Screenshots/Single_Post_Page_2.webp" width="49%" alt="Single Post Content Section">
</p>

### Authors & Information
<p align="center">
  <img src="Site_Screenshots/Author_Page.webp" width="49%" alt="Author Profile Page">
  <img src="Site_Screenshots/About_Us_Page.webp" width="49%" alt="About Us Information">
</p>

<hr />

## 🏗️ Technical Architecture

The application relies on Next.js static generation capabilities to serve content without requiring an external Content Management System (CMS) or database connection. All routing, layout structuring, and metadata generations are handled dynamically at build-time.

### Technology Stack

* **Core:** Next.js (App Router), React, TypeScript
* **Styling:** Tailwind CSS, Shadcn UI
* **UI Components:** Embla Carousel (Sliders), Lucide React (Icons), Base UI
* **Utilities:** `html-react-parser` (Content Rendering), `timeago.js` (Timestamp Formatting), `react-share` (Social Integration)

### Directory Structure

```text
.
├── app/                  # Application routing, layouts, and page views
│   ├── [categorySlug]/   # Dynamic routes for categories and posts
│   ├── authors/          # Author profiles
│   ├── search/           # Client-side search interface
│   └── api/              # Internal API endpoints
├── components/           # Reusable UI components and schemas
├── lib/                  # Utilities and local database (`localdb.json`)
├── public/               # Static assets (images, icons, fonts)
└── Site_Screenshots/     # Repository UI previews and demonstrations
```

## ⚙️ Configuration & Environment

Environment variables are defined to manage domain bindings and revalidation times. Refer to the `.env.example` file for the expected key-value pairs required in your deployment environment.

* `BASE_URL` / `NEXT_PUBLIC_BASE_URL`: Defines the absolute URL for canonical links and schema generation.
* `REVALIDATE_TIME`: Controls the Incremental Static Regeneration (ISR) caching intervals.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
