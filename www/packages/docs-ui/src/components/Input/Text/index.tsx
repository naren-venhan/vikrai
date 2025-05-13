import React from "react"
import clsx from "clsx"

export type InputTextProps = {
  className?: string
  addGroupStyling?: boolean
  passedRef?: React.Ref<HTMLInputElement>
} & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>

export const InputText = ({
  addGroupStyling = false,
  className,
  passedRef,
  ...props
}: InputTextProps) => {
  return (
    <input
      {...props}
      className={clsx(
        "bg-vikrai-bg-field-component shadow-border-base dark:shadow-border-base-dark",
        "rounded-docs_sm px-docs_0.5",
        "hover:bg-vikrai-bg-field-component-hover",
        addGroupStyling && "group-hover:bg-vikrai-bg-field-component-hover",
        "focus:border-vikrai-border-interactive",
        "active:border-vikrai-border-interactive",
        "disabled:bg-vikrai-bg-disabled",
        "disabled:border-vikrai-border-base",
        "placeholder:text-vikrai-fg-muted",
        "disabled:placeholder:text-vikrai-fg-disabled",
        "text-compact-small font-base",
        className
      )}
      ref={passedRef}
    />
  )
}

