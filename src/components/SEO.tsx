import React from 'react';
import { Helmet } from 'react-helmet-async';
import logoAsset from '../assets/company_logo/half_logo.webp';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
}

const SEO: React.FC<SEOProps> = ({
  title = "Integer.IO Services - Professional Web Development, AI/ML Solutions & Digital Marketing in Tamil Nadu, India",
  description = "Leading technology solutions provider in Tamil Nadu, India. We specialize in custom web development, artificial intelligence and machine learning projects, professional logo design, digital marketing, data analytics, and business automation. Serving businesses, educational institutions, and students with affordable, innovative, and scalable digital solutions. Expert team with proven track record in delivering high-quality projects across multiple industries including healthcare, e-commerce, education, and consulting.",
  keywords = "web development Tamil Nadu, AI ML projects India, machine learning solutions, professional logo design, digital marketing services, business automation, data analytics, custom software development, student projects, academic projects, React development, Python AI projects, e-commerce websites, business websites, healthcare technology, educational technology, consulting services Tamil Nadu, affordable web solutions India, Integer.IO Services",
  image = logoAsset,
  url = "https://integer-io.vercel.app"
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="MS Kawin" />
      <meta name="robots" content="index, follow" />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Integer.IO Services" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Additional SEO */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#10b981" />
      <link rel="canonical" href={url} />

      {/* Structured Data for Organizations */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Integer.IO Services",
          "alternateName": "Integer IO",
          "description": "Professional technology solutions provider specializing in web development, AI/ML projects, digital marketing, and business automation services in Tamil Nadu, India",
          "url": url,
          "logo": image,
          "image": image,
          "founder": {
            "@type": "Person",
            "name": "MS Kawin",
            "jobTitle": "Founder & CEO"
          },
          "address": {
            "@type": "PostalAddress",
            "addressRegion": "Tamil Nadu",
            "addressCountry": "IN",
            "addressLocality": "India"
          },
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+91-8015355914",
            "contactType": "customer service",
            "email": "mskawin2004@gmail.com",
            "availableLanguage": ["English", "Tamil"],
            "areaServed": "IN"
          },
          "sameAs": [
            "https://wa.me/918015355914"
          ],
          "areaServed": {
            "@type": "Country",
            "name": "India"
          },
          "serviceArea": {
            "@type": "State",
            "name": "Tamil Nadu"
          },
          "knowsAbout": [
            "Web Development",
            "Logo & Poster Design",
            "AI & ML Projects",
            "Data Analytics",
            "Business Automation",
            "Digital Marketing"
          ],
          "offers": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Web Development",
                "description": "Custom website development using modern technologies including React, Node.js, and responsive design"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Logo & Poster Design",
                "description": "Professional logo design, branding, and creative poster design for businesses"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "AI & ML Projects",
                "description": "Artificial intelligence and machine learning projects including predictive analytics, computer vision, and NLP"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Data Analytics",
                "description": "Comprehensive data analysis, visualization, and business intelligence solutions"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Business Automation",
                "description": "Streamline business operations with intelligent automation and workflow optimization"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Digital Marketing",
                "description": "Comprehensive digital marketing including SEO, social media marketing, and content strategy"
              }
            }
          ]
        })}
      </script>

      {/* Additional Structured Data for Services */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          "name": "Integer.IO Services",
          "image": image,
          "description": "Technology solutions and digital services provider in Tamil Nadu",
          "address": {
            "@type": "PostalAddress",
            "addressRegion": "Tamil Nadu",
            "addressCountry": "IN"
          },
          "telephone": "+91-8015355914",
          "email": "mskawin2004@gmail.com",
          "priceRange": "$$",
          "serviceType": [
            "Web Development",
            "Logo & Poster Design",
            "AI & ML Projects",
            "Data Analytics",
            "Business Automation",
            "Digital Marketing"
          ]
        })}
      </script>
    </Helmet>
  );
};

export default SEO;
