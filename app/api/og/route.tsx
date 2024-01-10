import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const logo = searchParams.get('logo');
    const title = searchParams.get('title');
    const description = searchParams.get('description');

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            backgroundColor: '#232225',
            color: 'white',
            padding: '80px',
          }}
        >
          {/* biome-ignore lint/a11y/useAltText: */}
          {logo && <img src={logo} height="60px" style={{ marginTop: 48 }} />}
          <div style={{ fontSize: '42px', fontWeight: 'bold', marginTop: 48, marginBottom: -12 }}>{title}</div>
          {description && <div style={{ opacity: 0.8, fontSize: '32px', marginTop: 24 }}>{description}</div>}
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
