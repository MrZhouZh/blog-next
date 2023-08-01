import * as cheerio from 'cheerio'
import { ImageResponse, type NextRequest, NextResponse } from "next/server";

const faviconMapper: { [key: string]: string } = {
  '(?:github.com)': 'https://cdn.jsdelivr.net/gh/MrZhouZh/image-lit/blog/github.png',
  '((?:t.co)|(?:twitter.com))': 'https://cdn.jsdelivr.net/gh/MrZhouZh/image-lit/blog/twitter.png',
  'coolshell.cn': 'https://cdn.jsdelivr.net/gh/MrZhouZh/image-lit/blog/coolshell.png',
  'vercel.com': 'https://cdn.jsdelivr.net/gh/MrZhouZh/image-lit/blog/vercel.png',
  'nextjs.org': 'https://cdn.jsdelivr.net/gh/MrZhouZh/image-lit/blog/nextjs.png',
}

function getPredefinedIconForUrl(url: string): string | undefined {
  for (const regexStr in faviconMapper) {
    const regex = new RegExp(
      `^(?:https?:\/\/)?(?:[^@/\\n]+@)?(?:www.)?` + regexStr
    )
    if (regex.test(url)) {
      return faviconMapper[regexStr]!
    }
  }

  return undefined
}

const width = 32
const height = width
function renderFavicon(url: string) {
  return new ImageResponse(
    (
      <img src={url} alt={`${url} icon`} width={width} height={height} />
    ),
    {
      width,
      height,
    }
  )
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const url = searchParams.get('url')

  if (!url) return NextResponse.error()

  let iconUrl = 'https://nextjs.org/favicon.ico'

  try {
    const predefinedIcon = getPredefinedIconForUrl(url)
    if (predefinedIcon) return renderFavicon(predefinedIcon)

    const res = await fetch(new URL(`https://${url}`).href, {
      headers: {
        'Content-Type': 'text/html',
      },
      cache: 'force-cache',
    })

    if (res.ok) {
      const html = await res.text()
      const $ = cheerio.load(html)
      const appleTouchIcon = $('link[rel="apple-touch-icon"]').attr('href')
      const favicon = $('link[rel="icon"]').attr('href')
      const shortcutFavicon = $('link[rel="shortcut icon"]').attr('href')
      const finalFavicon = appleTouchIcon ?? favicon ?? shortcutFavicon
      if (finalFavicon) {
        iconUrl = new URL(finalFavicon, new URL(`https://${url}`).href).href
      }
    }

    return renderFavicon(iconUrl)
  } catch (err) {
    console.error(err)
  }

  return renderFavicon(iconUrl)
}
