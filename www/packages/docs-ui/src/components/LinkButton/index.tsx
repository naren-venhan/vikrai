import React from "react"

import type { LinkProps as NextLinkProps } from "next/link"
import Link from "next/link"
import clsx from "clsx"

type LinkButtonProps = NextLinkProps & {
  variant?: "base" | "interactive" | "subtle" | "muted"
  className?: string
} & React.AllHTMLAttributes<HTMLAnchorElement>

export const LinkButton = ({
  variant = "base",
  className,
  ...linkProps
}: LinkButtonProps) => {
  return (
    <Link
      {...linkProps}
      className={clsx(
        className,
        "inline-flex justify-center items-center",
        "gap-docs_0.25 rounded-docs_xs",
        "text-compact-small-plus disabled:text-vikrai-fg-disabled",
        "focus:shadow-borders-focus no-underline",
        variant === "base" && [
          "text-vikrai-fg-base hover:text-vikrai-fg-subtle",
          "focus:text-vikrai-fg-base",
        ],
        variant === "interactive" && [
          "text-vikrai-fg-interactive hover:text-vikrai-interactive-hover",
          "focus:text-vikrai-fg-interactive",
        ],
        variant === "subtle" && [
          "text-vikrai-fg-subtle hover:text-vikrai-fg-base",
          "focus:text-vikrai-fg-subtle",
        ],
        variant === "muted" && [
          "text-vikrai-fg-muted hover:text-vikrai-fg-subtle",
          "focus:text-vikrai-fg-muted",
        ]
      )}
    />
  )
}

