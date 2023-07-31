'use client'

import Image from "next/image"
import Link, { LinkProps } from "next/link"
import React from "react"
import { ExternalLinkIcon } from "~/assets"

type RichLinkProps = LinkProps &
  React.ComponentPropsWithoutRef<'a'> & {
    children: React.ReactNode
  } & {
    favicon?: boolean
  }

export const RichLink = React.forwardRef<HTMLAnchorElement, RichLinkProps>(
  ({ children, href, favicon = true, className, ...props }, ref) => {
  const hrefHost = new URL(href).host
  const faviconUrl = React.useMemo(
    () => (href.startsWith('http') ? `/api/favicon?url=${hrefHost}` : null),
    [href, hrefHost]
  )

  if (!href.startsWith('http')) {
    return (
      <Link href={href} className={className} ref={ref} {...props}>
        {children}
      </Link>
    )
  }

  return (
    <Link
      ref={ref}
      href={href}
      className="inline-flex place-items-baseline items-baseline gap-0.5 pr-0.5 text-[0.95em] leading-none"
      rel="noopener noreferrer"
      target="_blank"
      {...props}
    >
      {favicon && faviconUrl && (
        <span
          className="mr-px inline-flex translate-y-0.5"
        >
          <Image
            src={faviconUrl}
            alt=""
            aria-hidden
            className="inline h-4 w-4 rounded"
            width={16}
            height={16}
            unoptimized
            priority={false}
          />
        </span>
      )}
      
      {children}
      {faviconUrl && (
        <ExternalLinkIcon
          width='0.95em'
          height='0.95em'
          className="inline-block translate-y-0.5"
          aria-hidden
        />
      )}
    </Link>
  )
})

RichLink.displayName = 'RichLink'
