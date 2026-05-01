import React from 'react';
import { Helmet } from 'react-helmet-async';
import logoAsset from '../assets/company_logo/half_logo.webp';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  page?: string;
}

const SEO: React.FC<SEOProps> = ({
  title = "Integer.IO Solutions | Web Development, AI Automation & Digital Solutions in Madurai, Tamil Nadu",
  description = "Integer.IO Solutions is a leading IT company based in Madurai, Tamil Nadu. We specialize in web development, AI automation, SaaS products, billing software, digital marketing, branding, and student project services. Trusted by 30+ clients across India.",
  keywords = "Integer.IO, Integer IO Solutions, integerio.com, web development Madurai, AI automation Tamil Nadu, SaaS development India, custom software, billing software, digital marketing Madurai, branding, student projects, final year projects, React development, AI chatbot, portfolio website, SEO services, cloud deployment, IT company Madurai, IT company Thirunagar, best web developer Madurai",
  image = logoAsset,
  url = "https://integerio.com",
  page = ""
}) => {
  const fullUrl = page ? `${url}/${page}` : url;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Kawin M.S. - Integer.IO Solutions" />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />

      {/* Geo Meta Tags */}
      <meta name="geo.region" content="IN-TN" />
      <meta name="geo.placename" content="Madurai" />
      <meta name="geo.position" content="9.9252;78.1198" />
      <meta name="ICBM" content="9.9252, 78.1198" />

      {/* Open Graph / Facebook */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Integer.IO Solutions" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Technical */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#10b981" />
      <link rel="canonical" href={fullUrl} />

      {/* Organization Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Integer.IO Solutions",
          "alternateName": ["Integer IO", "Integer.IO Solutions", "IntegerIO"],
          "description": "Professional web development, AI automation, SaaS products, digital marketing, and student project services based in Madurai, Tamil Nadu, India.",
          "url": url,
          "logo": image,
          "image": image,
          "founder": {
            "@type": "Person",
            "name": "Kawin M.S.",
            "jobTitle": "CEO / Founder"
          },
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Thirunagar",
            "addressLocality": "Madurai",
            "addressRegion": "Tamil Nadu",
            "postalCode": "625006",
            "addressCountry": "IN"
          },
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+91-8015355914",
            "contactType": "customer service",
            "email": "integer.io.ai@gmail.com",
            "availableLanguage": ["English", "Tamil"],
            "areaServed": "IN"
          },
          "sameAs": [
            "https://wa.me/918015355914",
            "https://www.linkedin.com/in/kawin-m-s-570961285/"
          ],
          "areaServed": {
            "@type": "Country",
            "name": "India"
          },
          "numberOfEmployees": "3",
          "foundingDate": "2024",
          "knowsAbout": [
            "Web Application Development",
            "AI Product & Automation",
            "Custom Software & SaaS",
            "Digital Marketing & Branding",
            "Education & Student Services",
            "Cloud Deployment & Technical Support"
          ],
          "offers": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Web Application Development",
                "description": "Secure, scalable web solutions including static websites, dynamic web apps, admin dashboards, and API integrations"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "AI Product & Automation Services",
                "description": "Intelligent AI solutions including chatbots, voice assistants, NLP, computer vision, and process automation"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Custom Software & SaaS Development",
                "description": "Custom software and SaaS platforms including billing software, analytics dashboards, and business automation tools"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Digital Marketing & Branding",
                "description": "SEO optimization, social media marketing, video editing, logo design, and creative poster design"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Education & Student Services",
                "description": "Final year projects, student portfolios, ATS-friendly resumes, project documentation, and career guidance"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Cloud Deployment & Technical Support",
                "description": "Cloud deployment, server configuration, website hosting, domain & SSL setup, and ongoing maintenance"
              }
            }
          ],
          "priceRange": "$$"
        })}
      </script>

      {/* LocalBusiness Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "Integer.IO Solutions",
          "image": image,
          "description": "IT company in Madurai specializing in web development, AI automation, SaaS products, billing software, digital marketing, and student project services.",
          "@id": url,
          "url": url,
          "telephone": "+91-8015355914",
          "email": "integer.io.ai@gmail.com",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Thirunagar",
            "addressLocality": "Madurai",
            "addressRegion": "Tamil Nadu",
            "postalCode": "625006",
            "addressCountry": "IN"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 9.9252,
            "longitude": 78.1198
          },
          "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            "opens": "09:00",
            "closes": "18:00"
          },
          "priceRange": "$$",
          "serviceType": [
            "Web Application Development",
            "AI Automation & Chatbot Development",
            "Custom Software & SaaS Development",
            "Digital Marketing & Branding",
            "Final Year Student Projects",
            "Cloud Deployment & Technical Support"
          ]
        })}
      </script>

      {/* BreadcrumbList for Navigation */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": url },
            { "@type": "ListItem", "position": 2, "name": "Services", "item": `${url}/services` },
            { "@type": "ListItem", "position": 3, "name": "Products", "item": `${url}/products` },
            { "@type": "ListItem", "position": 4, "name": "Projects", "item": `${url}/projects` },
            { "@type": "ListItem", "position": 5, "name": "About", "item": `${url}/about` },
            { "@type": "ListItem", "position": 6, "name": "Contact", "item": `${url}/contact` },
            { "@type": "ListItem", "position": 7, "name": "Careers", "item": `${url}/careers` }
          ]
        })}
      </script>
    </Helmet>
  );
};

export default SEO;
