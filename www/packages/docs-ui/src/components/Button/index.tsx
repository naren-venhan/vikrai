import clsx from "clsx"
import React from "react"

export type ButtonVariants =
  | "primary"
  | "secondary"
  | "transparent"
  | "transparent-clear"

export type ButtonType = "default" | "icon"

export type ButtonProps = {
  isSelected?: boolean
  disabled?: boolean
  variant?: ButtonVariants
  className?: string
  buttonType?: ButtonType
  buttonRef?: React.LegacyRef<HTMLButtonElement>
} & React.HTMLAttributes<HTMLButtonElement>

export const Button = ({
  className,
  children,
  variant = "primary",
  buttonType = "default",
  buttonRef,
  ...props
}: ButtonProps) => {
  const variantClasses = {
    primary: [
      "px-docs_0.5 py-docs_0.25 rounded-docs_sm cursor-pointer",
      "bg-vikrai-button-inverted",
      "hover:bg-vikrai-button-inverted-hover hover:no-underline",
      "active:bg-vikrai-button-inverted-pressed",
      "focus:bg-vikrai-button-inverted",
      "shadow-button-inverted focus:shadow-button-inverted-focused transition-shadow",
      "dark:shadow-button-inverted-dark dark:focus:shadow-button-inverted-focused-dark",
      "disabled:bg-vikrai-bg-disabled disabled:shadow-button-neutral dark:disabled:shadow-button-neutral-dark",
      "disabled:cursor-not-allowed",
      "text-compact-small-plus text-vikrai-contrast-fg-primary",
      "[&_a]:text-vikrai-contrast-fg-primary",
      "disabled:text-vikrai-fg-disabled",
      "[&_a]:disabled:text-vikrai-fg-disabled",
      "select-none",
    ],
    secondary: [
      "px-docs_0.5 py-docs_0.25 rounded-docs_sm cursor-pointer",
      "bg-vikrai-button-neutral",
      "hover:bg-vikrai-button-neutral-hover hover:no-underline",
      "active:bg-vikrai-button-neutral-pressed",
      "focus:bg-vikrai-button-neutral",
      "disabled:bg-vikrai-bg-disabled disabled:shadow-button-neutral dark:disabled:shadow-button-neutral-dark",
      "disabled:cursor-not-allowed disabled:text-vikrai-fg-disabled",
      "text-compact-small-plus text-vikrai-fg-base",
      "[&_a]:text-vikrai-fg-base",
      "shadow-button-neutral focus:shadow-button-neutral-focused active:shadow-button-neutral transition-shadow",
      "dark:shadow-button-neutral dark:focus:shadow-button-neutral-focused dark:active:shadow-button-neutral",
      "select-none",
    ],
    transparent: [
      "px-docs_0.5 py-docs_0.25 rounded-docs_sm cursor-pointer",
      "bg-transparent shadow-none border-0 outline-none",
      "text-compact-small-plus text-vikrai-fg-base",
      "hover:bg-vikrai-button-transparent-hover",
      "active:bg-vikrai-button-transparent-pressed",
      "focus:bg-vikrai-bg-base focus:shadow-button-neutral-focused dark:focus:shadow-button-neutral-focused-dark",
      "disabled:bg-transparent disabled:shadow-button-neutral dark:disabled:shadow-button-neutral-dark",
      "disabled:cursor-not-allowed disabled:text-vikrai-fg-disabled",
    ],
    transparentClear: [
      "px-docs_0.5 py-docs_0.25 rounded-docs_sm cursor-pointer",
      "bg-transparent shadow-none border-0 outline-none",
      "text-compact-small-plus text-vikrai-fg-muted",
      "hover:bg-vikrai-button-transparent-hover",
      "active:bg-vikrai-button-transparent-pressed",
      "focus:bg-vikrai-bg-base focus:shadow-button-neutral-focused dark:focus:shadow-button-neutral-focused-dark",
      "disabled:bg-transparent disabled:shadow-button-neutral dark:disabled:shadow-button-neutral-dark",
      "disabled:cursor-not-allowed disabled:text-vikrai-fg-disabled",
    ],
  }

  return (
    <button
      className={clsx(
        "inline-flex flex-row justify-center items-center gap-[6px] font-base",
        variant === "primary" && variantClasses.primary,
        variant === "secondary" && variantClasses.secondary,
        variant === "transparent" && variantClasses.transparent,
        variant === "transparent-clear" && variantClasses.transparentClear,
        buttonType === "icon" && "!px-docs_0.25",
        className
      )}
      ref={buttonRef}
      {...props}
    >
      {children}
    </button>
  )
}

