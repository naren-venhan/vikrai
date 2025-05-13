"use client"

import React, { useEffect, useState } from "react"
import { CopyButton } from "../../../.."
import clsx from "clsx"
import { CheckMini, SquareTwoStack } from "@vikrai/icons"

export type CodeBlockCopyActionProps = {
  source: string
  inHeader: boolean
}

export const CodeBlockCopyAction = ({
  source,
  inHeader,
}: CodeBlockCopyActionProps) => {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (copied) {
      setTimeout(() => {
        setCopied(false)
      }, 1000)
    }
  }, [copied])

  const iconClassName = [
    "text-vikrai-contrast-fg-secondary",
    "group-hover:text-vikrai-contrast-fg-primary",
    "group-focus:text-vikrai-contrast-fg-primary",
  ]

  return (
    <CopyButton
      text={source}
      tooltipClassName="font-base"
      className={clsx("group")}
      buttonClassName={clsx(!inHeader && "p-[6px]", inHeader && "p-[4.5px]")}
      tooltipInnerClassName={clsx(
        inHeader && "flex",
        "h-fit rounded-docs_sm",
        "group-hover:bg-vikrai-contrast-bg-base-hover group-focus:bg-vikrai-contrast-bg-base-hover"
      )}
      onCopy={() => setCopied(true)}
    >
      {!copied && <SquareTwoStack className={clsx(iconClassName)} />}
      {copied && <CheckMini className={clsx(iconClassName)} />}
    </CopyButton>
  )
}

