import { ImageResponse } from 'next/og';

/**
 * Apple touch icon: iOS needs an opaque full-bleed tile, so the diamond
 * sits on the warm charcoal ink field (the one platform exception to the
 * container-free favicon). The browser favicon stays `icon.svg`: diamond
 * only, no container.
 */
export const runtime = 'edge';
export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#1D1915',
        }}
      >
        <div
          style={{ width: 84, height: 84, backgroundColor: '#BC3F1A', transform: 'rotate(45deg)' }}
        />
      </div>
    ),
    { ...size }
  );
}
