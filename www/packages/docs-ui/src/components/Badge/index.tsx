import React from "react"
import clsx from "clsx"
import { ShadedBgIcon } from "../.."

export type BadgeVariant =
  | "purple"
  | "orange"
  | "green"
  | "blue"
  | "red"
  | "neutral"
  | "code"

export type BadgeType = "default" | "shaded"

export type BadgeProps = {
  className?: string
  childrenWrapperClassName?: string
  variant: BadgeVariant
  badgeType?: BadgeType
} & React.HTMLAttributes<HTMLSpanElement>

export const Badge = ({
  className,
  variant,
  badgeType = "default",
  children,
  childrenWrapperClassName,
}: BadgeProps) => {
  return (
    <span
      className={clsx(
        "text-compact-x-small-plus text-center",
        badgeType === "default" &&
          "px-docs_0.25 py-0 rounded-docs_sm border border-solid",
        variant === "purple" &&
          "bg-vikrai-tag-purple-bg text-vikrai-tag-purple-text border-vikrai-tag-purple-border",
        variant === "orange" &&
          "bg-vikrai-tag-orange-bg text-vikrai-tag-orange-text border-vikrai-tag-orange-border",
        variant === "green" &&
          "bg-vikrai-tag-green-bg text-vikrai-tag-green-text border-vikrai-tag-green-border",
        variant === "blue" &&
          "bg-vikrai-tag-blue-bg text-vikrai-tag-blue-text border-vikrai-tag-blue-border",
        variant === "red" &&
          "bg-vikrai-tag-red-bg text-vikrai-tag-red-text border-vikrai-tag-red-border",
        variant === "neutral" &&
          "bg-vikrai-tag-neutral-bg text-vikrai-tag-neutral-text border-vikrai-tag-neutral-border",
        variant === "code" &&
          "bg-vikrai-contrast-bg-subtle text-vikrai-contrast-fg-secondary border-vikrai-contrast-border-bot",
        badgeType === "shaded" && "px-[3px] !bg-transparent relative",
        // needed for tailwind utilities
        "badge",
        className
      )}
    >
      {badgeType === "shaded" && (
        <ShadedBgIcon
          variant={variant}
          className={clsx("absolute top-0 left-0 w-full h-full")}
        />
      )}
      <span
        className={clsx(
          badgeType === "shaded" && "relative z-[1]",
          childrenWrapperClassName
        )}
      >
        {children}
      </span>
    </span>
  )
}

