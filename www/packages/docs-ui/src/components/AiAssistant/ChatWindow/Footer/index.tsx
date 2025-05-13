import React from "react"
import clsx from "clsx"
import { Kbd } from "../../../Kbd"

export const AiAssistantChatWindowFooter = () => {
  return (
    <div
      className={clsx(
        "bg-vikrai-bg-component border-t border-vikrai-border-base",
        "flex items-center justify-end gap-docs_0.75 text-compact-x-small",
        "py-docs_0.75 px-docs_1"
      )}
    >
      <span className="text-vikrai-fg-muted">Chat is cleared on refresh</span>
      <span className="h-docs_0.75 w-px bg-vikrai-border-base"></span>
      <div className="flex items-center gap-docs_0.5">
        <span className="text-vikrai-fg-subtle">Line break</span>
        <div className="flex items-center gap-[5px]">
          <Kbd className="bg-vikrai-bg-field-component border-vikrai-border-strong w-[18px] h-[18px] inline-block p-0">
            ⇧
          </Kbd>
          <Kbd className="bg-vikrai-bg-field-component border-vikrai-border-strong w-[18px] h-[18px] inline-block p-0">
            ↵
          </Kbd>
        </div>
      </div>
    </div>
  )
}

