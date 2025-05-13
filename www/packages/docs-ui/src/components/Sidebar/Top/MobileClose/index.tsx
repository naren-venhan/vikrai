"use client"

import React from "react"
import { Button, useSidebar } from "../../../.."
import { XMarkMini } from "@vikrai/icons"

export const SidebarTopMobileClose = () => {
  const { setMobileSidebarOpen } = useSidebar()

  return (
    <div className="m-docs_0.75 lg:hidden">
      <Button
        variant="transparent-clear"
        onClick={() => setMobileSidebarOpen(false)}
        className="!p-0 hover:!bg-transparent"
      >
        <XMarkMini className="text-vikrai-fg-subtle" />
      </Button>
    </div>
  )
}

