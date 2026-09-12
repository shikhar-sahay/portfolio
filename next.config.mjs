/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const csp = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "form-action 'self'",
  "img-src 'self' data: blob: https://i.scdn.co",
  "font-src 'self'",
  `script-src 'self' 'sha256-iPKleRy1sLBnlLElx33eiHr+QB6cniBji2JRKw6bFV8='${isProd ? '' : " 'unsafe-eval'"}`,
  "style-src 'self' 'unsafe-inline'",
  `connect-src 'self'${isProd ? '' : ' ws: http: https:'}`,
  "media-src 'none'",
  "worker-src 'self' blob:",
  "manifest-src 'self'",
  'upgrade-insecure-requests',
].join('; ');

const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [{ protocol: 'https', hostname: 'i.scdn.co' }],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Content-Security-Policy', value: csp },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Permissions-Policy',
            value:
              'accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=()',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
