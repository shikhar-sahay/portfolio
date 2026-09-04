import type { Metadata, Viewport } from 'next';
import { Instrument_Sans, Instrument_Serif } from 'next/font/google';
import './globals.css';

const instrumentSans = Instrument_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Shikhar Sahay - Portfolio',
  description:
    'Portfolio of Shikhar Sahay - Computer Science student, cybersecurity enthusiast, builder of memorable things.',
  authors: [{ name: 'Shikhar Sahay' }],
  openGraph: {
    title: 'Shikhar Sahay - Portfolio',
    description:
      'Portfolio of Shikhar Sahay - Computer Science student, cybersecurity enthusiast, builder of memorable things.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shikhar Sahay - Portfolio',
    description:
      'Portfolio of Shikhar Sahay - Computer Science student, cybersecurity enthusiast, builder of memorable things.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f3efe6' },
    { media: '(prefers-color-scheme: dark)', color: '#161310' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

const themeScript = `(function(){try{var t=new URLSearchParams(location.search).get("theme")||localStorage.getItem("theme");var d=t?t==="dark":window.matchMedia("(prefers-color-scheme: dark)").matches;document.documentElement.classList.toggle("dark",d);var r=window.matchMedia("(prefers-reduced-motion: reduce)").matches;var s=sessionStorage.getItem("opened");if(r||s){document.documentElement.dataset.intro="skip";document.documentElement.style.setProperty("--intro-delay","0s")}else{document.documentElement.dataset.intro="play";document.documentElement.style.setProperty("--intro-delay","1.35s")}}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${instrumentSans.variable} ${instrumentSerif.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="grain min-h-screen antialiased">
        <div className="atmosphere" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
