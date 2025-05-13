import clsx from "clsx"
import React from "react"
import { Kbd } from "../../.."

export const SearchFooter = () => {
  return (
    <div
      className={clsx(
        "py-docs_0.75 hidden md:flex items-center justify-end px-docs_1",
        "border-vikrai-border-base border-t",
        "bg-vikrai-bg-field"
      )}
    >
      <div className="flex items-center gap-docs_0.75">
        <div className="flex items-center gap-docs_0.5">
          <span
            className={clsx("text-vikrai-fg-subtle", "text-compact-x-small")}
          >
            Navigation
          </span>
          <span className="gap-[5px] flex">
            <Kbd
              className={clsx(
                "!bg-vikrai-bg-field-component !border-vikrai-border-strong",
                "!text-vikrai-fg-subtle h-[18px] w-[18px] p-0"
              )}
            >
              ↑
            </Kbd>
            <Kbd
              className={clsx(
                "!bg-vikrai-bg-field-component !border-vikrai-border-strong",
                "!text-vikrai-fg-subtle h-[18px] w-[18px] p-0"
              )}
            >
              ↓
            </Kbd>
          </span>
        </div>
        <div className={clsx("h-docs_0.75 w-px bg-vikrai-border-strong")}></div>
        <div className="flex items-center gap-docs_0.5">
          <span
            className={clsx("text-vikrai-fg-subtle", "text-compact-x-small")}
          >
            Open Result
          </span>
          <Kbd
            className={clsx(
              "!bg-vikrai-bg-field-component !border-vikrai-border-strong",
              "!text-vikrai-fg-subtle h-[18px] w-[18px] p-0"
            )}
          >
            ↵
          </Kbd>
        </div>
      </div>
    </div>
  )
}

