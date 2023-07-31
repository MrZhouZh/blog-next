import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { PeekabooLink } from "~/components/links/PeekabooLink"
import { RichLink } from "~/components/links/RichLink"

export const metadata: Metadata = {
  title: 'Zeke\'s Blog',
}

export default function Home() {
  return (
    <div>
      <h3>Hello World!</h3>
      <p>
        <PeekabooLink href="https://nextjs.org">
          Next.js
        </PeekabooLink>
      </p>
      <Link href='/dashboard'>Dashboard</Link> | 
      <Link href='/blog/1'>Blog</Link> | 
      <Link href='/shop/1'>Shop</Link>
    </div>
  )
}
