"use client"

import React from "react"
import { BaseTabType, useScrollPositionBlocker } from "@/hooks"
import { useColorMode } from "@/providers"
import clsx from "clsx"

type CodeTabProps = BaseTabType & {
  children: React.ReactNode
  isSelected?: boolean
  blockStyle?: string
  changeSelectedTab?: (tab: BaseTabType) => void
  pushRef?: (tabButton: HTMLButtonElement | null) => void
}

export const CodeTab = ({
  label,
  value,
  isSelected = false,
  blockStyle = "loud",
  changeSelectedTab,
  pushRef,
}: CodeTabProps) => {
  const { colorMode } = useColorMode()
  const { blockElementScrollPositionUntilNextRender } =
    useScrollPositionBlocker()

  return (
    <li>
      <button
        className={clsx(
          "text-compact-x-small-plus font-base xs:border-0 pb-docs_0.5 relative",
          !isSelected && [
            blockStyle === "loud" && "text-vikrai-contrast-fg-secondary",
            blockStyle === "subtle" && [
              colorMode === "light" &&
                "text-vikrai-fg-subtle hover:bg-vikrai-bg-base",
              colorMode === "dark" &&
                "text-vikrai-contrast-fg-secondary hover:bg-vikrai-code-bg-base",
            ],
          ],
          isSelected && [
            blockStyle === "loud" && "text-vikrai-contrast-fg-primary",
            blockStyle === "subtle" && [
              colorMode === "light" &&
                "xs:border-vikrai-border-base text-vikrai-contrast-fg-primary",
              colorMode === "dark" &&
                "xs:border-vikrai-code-border text-vikrai-contrast-fg-primary",
            ],
          ]
        )}
        ref={(tabButton) => pushRef?.(tabButton)}
        onClick={(e) => {
          blockElementScrollPositionUntilNextRender(
            e.target as HTMLButtonElement
          )
          changeSelectedTab?.({ label, value })
        }}
        aria-selected={isSelected}
        role="tab"
      >
        {label}
      </button>
    </li>
  )
}

