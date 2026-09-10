import { ImageResponse } from 'next/og';

/**
 * Apple touch icon: iOS needs an opaque full-bleed tile, so the finalized
 * mark is an ink rounded tile with a large centered vermilion diamond and
 * a thin restrained vermilion perimeter. The browser favicon (`icon.svg`)
 * carries the same geometry as vector.
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
          borderRadius: 42,
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: 9,
            top: 9,
            right: 9,
            bottom: 9,
            borderRadius: 34,
            border: '7px solid #BC3F1A',
          }}
        />
        <div
          style={{ width: 88, height: 88, backgroundColor: '#BC3F1A', transform: 'rotate(45deg)' }}
        />
      </div>
    ),
    { ...size }
  );
}
