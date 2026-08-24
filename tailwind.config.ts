import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        paper: 'var(--paper)',
        surface: 'var(--surface)',
        ink: 'var(--ink)',
        muted: 'var(--muted)',
        accent: 'var(--accent)',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
      },
      fontSize: {
        display: [
          'clamp(4.25rem, 16vw, 14rem)',
          {
            lineHeight: '0.88',
            letterSpacing: '-0.03em',
            fontWeight: '600',
          },
        ],
        lede: [
          'clamp(1.5rem, 3.4vw, 2.75rem)',
          {
            lineHeight: '1.22',
            letterSpacing: '-0.02em',
          },
        ],
        micro: [
          '0.6875rem',
          {
            lineHeight: '1.2',
            letterSpacing: '0.16em',
          },
        ],
      },
      transitionTimingFunction: {
        expo: 'cubic-bezier(0.19, 1, 0.22, 1)',
      },
    },
  },
  plugins: [],
};
export default config;
