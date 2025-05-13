"use client"

import React from "react"
import clsx from "clsx"
import { CopyButton } from "@/components"

export type InlineCodeProps = React.ComponentProps<"code"> & {
  variant?: "default" | "grey-bg"
}

export const InlineCode = ({
  variant = "default",
  ...props
}: InlineCodeProps) => {
  return (
    <CopyButton
      text={props.children as string}
      buttonClassName={clsx(
        "bg-transparent border-0 p-0 inline text-vikrai-fg-subtle group",
        "font-monospace"
      )}
    >
      <code
        {...props}
        className={clsx(
          "text-vikrai-tag-neutral-text border",
          "font-monospace text-code-label rounded-docs_sm py-0 px-[5px]",
          variant === "default" && [
            "bg-vikrai-tag-neutral-bg group-hover:bg-vikrai-tag-neutral-bg-hover",
            "group-active:bg-vikrai-bg-subtle-pressed group-focus:bg-vikrai-bg-subtle-pressed",
            "border-vikrai-tag-neutral-border",
          ],
          variant === "grey-bg" && [
            "bg-vikrai-bg-switch-off group-hover:bg-vikrai-bg-switch-off-hover",
            "group-active:bg-vikrai-bg-switch-off-hover group-focus:bg-vikrai-switch-off-hover",
            "border-vikrai-border-strong",
          ],
          props.className
        )}
      />
    </CopyButton>
  )
}

