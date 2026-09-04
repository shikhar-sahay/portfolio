import { brandGlyphs, type BrandGlyphKey } from '@/content/techLogos';

/** Normalizes a display name to a glyph key (Next.js to Nextjs, C++ to Cplusplus). */
export function glyphKeyFor(name: string): string {
  return name.replace(/\+\+/g, 'plusplus').replace(/[^A-Za-z0-9]/g, '');
}

export function hasGlyph(name: string): boolean {
  return glyphKeyFor(name) in brandGlyphs;
}

/**
 * A brand mark rendered monochrome via currentColor, so the real logo
 * keeps the site's editorial voice instead of importing brand colors.
 * Server-safe (no hooks): emblem rows stay server-rendered.
 */
export function TechLogo({ name, className }: { name: string; className?: string }) {
  const key = glyphKeyFor(name);
  if (!(key in brandGlyphs)) return null;
  const glyph = brandGlyphs[key as BrandGlyphKey];
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" className={className}>
      <path d={glyph.path} />
    </svg>
  );
}
