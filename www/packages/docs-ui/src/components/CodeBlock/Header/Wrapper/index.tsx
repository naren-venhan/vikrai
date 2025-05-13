import clsx from "clsx"
import React, { useMemo } from "react"
import { useColorMode } from "../../../../providers"
import { CodeBlockStyle } from "../../../.."

type CodeBlockHeaderWrapperProps = {
  blockStyle?: CodeBlockStyle
  children: React.ReactNode
}

export const CodeBlockHeaderWrapper = React.forwardRef<
  HTMLDivElement,
  CodeBlockHeaderWrapperProps
>(function CodeBlockHeaderWrapper({ children, blockStyle = "loud" }, ref) {
  const { colorMode } = useColorMode()

  const bgColor = useMemo(
    () =>
      clsx(
        blockStyle === "loud" && "bg-vikrai-contrast-bg-base",
        blockStyle === "subtle" && [
          colorMode === "light" && "bg-vikrai-bg-component",
          colorMode === "dark" && "bg-vikrai-code-bg-header",
        ]
      ),
    [blockStyle, colorMode]
  )

  return (
    <div
      className={clsx(
        "py-docs_0.5 px-docs_1 mb-0",
        "rounded-t-docs_lg relative flex justify-between items-center",
        blockStyle === "subtle" && [
          "border border-solid border-b-0",
          colorMode === "light" && "border-vikrai-border-base",
          colorMode === "dark" && "border-vikrai-code-border",
        ],
        bgColor
      )}
      ref={ref}
    >
      {children}
    </div>
  )
})

