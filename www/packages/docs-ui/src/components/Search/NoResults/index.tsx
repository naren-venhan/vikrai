import { MagnifierAlert } from "@vikrai/icons"
import clsx from "clsx"
import React from "react"

export const SearchNoResult = () => {
  return (
    <div
      className={clsx(
        "flex h-full w-full flex-col items-center justify-center gap-docs_0.75"
      )}
    >
      <MagnifierAlert className="text-vikrai-fg-base" />
      <div
        className={clsx(
          "flex flex-col justify-center items-center gap-docs_0.25",
          "max-w-[360px]"
        )}
      >
        <span className="text-compact-small-plus text-vikrai-fg-subtle">
          No results found.
        </span>
        <span className="text-vikrai-fg-muted txt-small text-center">
          We couldn&apos;t find any matches for your search. Please try changing
          the filters or using different keywords.
        </span>
      </div>
    </div>
  )
}

