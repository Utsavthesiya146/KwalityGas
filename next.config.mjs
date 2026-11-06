/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  async redirects() {
    return [
      { source: '/index.html', destination: '/', permanent: true },
      { source: '/index.php', destination: '/', permanent: true },
      { source: '/index-2.html', destination: '/', permanent: true },
      { source: '/about.html', destination: '/about', permanent: true },
      { source: '/about-us.html', destination: '/about', permanent: true },
      { source: '/products.html', destination: '/products', permanent: true },
      { source: '/cylinders.html', destination: '/cylinders', permanent: true },
      { source: '/domestic.html', destination: '/domestic', permanent: true },
      { source: '/commercial.html', destination: '/commercial', permanent: true },
      { source: '/industrial.html', destination: '/industrial', permanent: true },
      { source: '/service.html', destination: '/services', permanent: true },
      { source: '/service', destination: '/services', permanent: true },
      { source: '/service-details.html', destination: '/services', permanent: true },
      { source: '/single-service-v2.html', destination: '/services', permanent: true },
      { source: '/price-list.php', destination: '/price-list', permanent: true },
      { source: '/price-list.html', destination: '/price-list', permanent: true },
      { source: '/safty-features.html', destination: '/safety-features', permanent: true },
      { source: '/safety-features.html', destination: '/safety-features', permanent: true },
      { source: '/testimonials.html', destination: '/testimonials', permanent: true },
      { source: '/group-company.html', destination: '/group-company', permanent: true },
      { source: '/gallery.html', destination: '/gallery', permanent: true },
      { source: '/contact.html', destination: '/contact', permanent: true },
      { source: '/contact1.html', destination: '/contact/commercial', permanent: true },
      { source: '/contact2.html', destination: '/contact/industrial', permanent: true },
      { source: '/privacy-policy.html', destination: '/privacy-policy', permanent: true },
      { source: '/project.html', destination: '/gallery', permanent: true },
      { source: '/project-details.html', destination: '/gallery', permanent: true },
      { source: '/employees.html', destination: '/about', permanent: true },
      { source: '/faq.html', destination: '/safety-features', permanent: true },
      { source: '/blog.html', destination: '/', permanent: true },
      { source: '/blog-details.html', destination: '/', permanent: true },
    ];
  },
};

export default nextConfig;

