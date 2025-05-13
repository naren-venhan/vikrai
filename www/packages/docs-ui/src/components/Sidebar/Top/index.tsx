"use client"

import React from "react"
import { SidebarChild } from "../Child"
import { SidebarTopMobileClose } from "./MobileClose"
import { DottedSeparator, useSidebar } from "../../.."
import clsx from "clsx"

export const SidebarTop = React.forwardRef<HTMLDivElement>(
  function SidebarTop(props, ref) {
    const { sidebarHistory } = useSidebar()

    return (
      <div
        className={clsx(
          "pt-docs_0.25 sticky top-0 z-[5]",
          "bg-vikrai-bg-base lg:bg-vikrai-bg-subtle"
        )}
        ref={ref}
      >
        <SidebarTopMobileClose />
        <div>
          {sidebarHistory.length > 1 && (
            <>
              <SidebarChild />
              <DottedSeparator wrapperClassName="!my-0" />
            </>
          )}
        </div>
      </div>
    )
  }
)

