import { ImageResponse, NextRequest, NextResponse } from "next/server";

const width = 1200
const height = 750

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const url = searchParams.get('url')

  if (!url) return NextResponse.error()

  const screenshot = `https://cdn.jsdelivr.net/gh/MrZhouZh/image-lit/blog/preview.png`

  // const imageUrl = new URL(screenshot)
  // imageUrl.searchParams.set('url', url)
  // imageUrl.searchParams.set('width', width.toString())
  // imageUrl.searchParams.set('height', height.toString())
  // imageUrl.searchParams.set('ttl', '86400')
  
  return new ImageResponse(
    (
      <img
        src={screenshot}
        alt={`Preview of ${url}`}
        width={width}
        height={height}
      />
    ),
    {
      width,
      height,
    }
  )
}
