import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ 
  title = 'Delicious Bites - Premium Restaurant & Food Delivery',
  description = 'Experience the finest cuisine at Delicious Bites. Order online for delivery or pickup. Fresh ingredients, authentic flavors, and exceptional service.',
  keywords = 'restaurant, food delivery, online ordering, fresh ingredients, pizza, burgers, sushi, desserts',
  image = '/images/og-image.jpg',
  url = 'https://deliciousbites.com',
  type = 'website'
}) => {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: 'Delicious Bites',
    image: [
      'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/357756/pexels-photo-357756.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    '@id': 'https://deliciousbites.com',
    url: 'https://deliciousbites.com',
    telephone: '+1-555-123-4567',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '123 Food Street',
      addressLocality: 'City',
      addressRegion: 'State',
      postalCode: '12345',
      addressCountry: 'US'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 40.7128,
      longitude: -74.0060
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday'
        ],
        opens: '11:00',
        closes: '22:00'
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '10:00',
        closes: '23:00'
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Sunday',
        opens: '10:00',
        closes: '21:00'
      }
    ],
    menu: 'https://deliciousbites.com/menu',
    acceptsReservations: 'True',
    priceRange: '$$',
    servesCuisine: ['Italian', 'American', 'Japanese', 'Mexican', 'Indian'],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '127'
    }
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Delicious Bites" />
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      {/* Open Graph Tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="Delicious Bites" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:site" content="@deliciousbites" />
      <meta name="twitter:creator" content="@deliciousbites" />

      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#EA580C" />
      <meta name="msapplication-TileColor" content="#EA580C" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="Delicious Bites" />

      {/* Canonical URL */}
      <link rel="canonical" href={url} />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(schemaData)}
      </script>

      {/* Favicon */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
    </Helmet>
  );
};

export default SEO;