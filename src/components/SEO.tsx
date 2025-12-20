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
  title = "Integer.IO Services - Web Development, AI Automation, SaaS & Cloud Solutions in Tamil Nadu, India",
  description = "Leading technology solutions provider in Tamil Nadu, India. We specialize in web application development, AI product & automation services, custom software & SaaS development, digital marketing & branding, education & student services, and cloud deployment & technical support. Serving businesses, startups, and students with innovative digital solutions.",
  keywords = "web application development Tamil Nadu, AI automation services India, SaaS development, custom software development, digital marketing branding, student services India, cloud deployment, technical support, final year projects, portfolio websites, AI chatbots, voice assistants, billing software, React development, Integer.IO Services",
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
            "Web Application Development",
            "AI Product & Automation",
            "Custom Software & SaaS",
            "Digital Marketing & Branding",
            "Education & Student Services",
            "Cloud Deployment & Technical Support"
          ]
        })}
      </script>
    </Helmet>
  );
};

export default SEO;
