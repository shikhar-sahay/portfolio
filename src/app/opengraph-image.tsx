import { ImageResponse } from 'next/og';

/**
 * Social preview image (1200x630): an editorial card in the site palette,
 * not a screenshot and not a generic dev-card template. Paper field, ink
 * display type, serif-italic tagline, vermilion diamond accent. Type is
 * set in fetched Google fonts (Archivo + Source Serif 4) so the render
 * matches the site voice; every string is real site copy.
 */
export const runtime = 'edge';
export const alt = 'Shikhar Sahay portfolio: I build things worth remembering.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

async function loadFont(family: string, file: string): Promise<ArrayBuffer> {
  const font = await fetch(`https://cdn.jsdelivr.net/fontsource/fonts/${file}`).then(res => {
    if (!res.ok) throw new Error(`font fetch failed for ${family}`);
    return res.arrayBuffer();
  });
  return font;
}

export default async function OpengraphImage() {
  const [display, serif] = await Promise.all([
    loadFont('Archivo', 'archivo@latest/latin-800-normal.ttf'),
    loadFont('Source Serif 4', 'source-serif-4@latest/latin-600-italic.ttf'),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          backgroundColor: '#F3EFE6',
          padding: '72px 88px',
          position: 'relative',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 28 }}>
          <div style={{ width: 56, height: 2, backgroundColor: '#BC3F1A', marginRight: 20 }} />
          <div
            style={{
              fontFamily: 'Archivo',
              fontSize: 26,
              letterSpacing: 6,
              color: '#7C7568',
            }}
          >
            SHIKHAR SAHAY
          </div>
        </div>
        <div
          style={{
            fontFamily: 'Archivo',
            fontWeight: 800,
            fontSize: 148,
            lineHeight: 0.95,
            letterSpacing: -4,
            color: '#1D1915',
          }}
        >
          SHIKHAR
        </div>
        <div
          style={{
            fontFamily: 'Archivo',
            fontWeight: 800,
            fontSize: 148,
            lineHeight: 0.95,
            letterSpacing: -4,
            color: '#1D1915',
          }}
        >
          SAHAY
        </div>
        <div
          style={{
            fontFamily: 'Source Serif 4',
            fontStyle: 'italic',
            fontSize: 44,
            color: '#1D1915',
            marginTop: 26,
          }}
        >
          I build things worth remembering.
        </div>
        <div
          style={{
            fontFamily: 'Archivo',
            fontSize: 24,
            letterSpacing: 5,
            color: '#7C7568',
            marginTop: 22,
          }}
        >
          SOFTWARE · SECURITY · THE WEB
        </div>
        <div
          style={{
            position: 'absolute',
            right: 96,
            top: 96,
            width: 40,
            height: 40,
            backgroundColor: '#BC3F1A',
            transform: 'rotate(45deg)',
          }}
        />
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Archivo', data: display, weight: 800, style: 'normal' },
        { name: 'Source Serif 4', data: serif, weight: 600, style: 'italic' },
      ],
    }
  );
}
