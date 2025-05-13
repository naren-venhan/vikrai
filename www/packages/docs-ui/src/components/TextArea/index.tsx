import React from "react"
import clsx from "clsx"

export type TextAreaProps = {
  className?: string
} & React.DetailedHTMLProps<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
>

export const TextArea = (props: TextAreaProps) => {
  return (
    <textarea
      {...props}
      className={clsx(
        "bg-vikrai-bg-field shadow-border-base dark:shadow-border-base-dark",
        "border-vikrai-border-base rounded-docs_sm border border-solid",
        "pt-docs_0.4 px-docs_0.75 text-medium font-base pb-[9px]",
        "hover:bg-vikrai-bg-field-hover",
        "focus:border-vikrai-border-interactive",
        "active:border-vikrai-border-interactive",
        "disabled:bg-vikrai-bg-disabled",
        "disabled:border-vikrai-border-base",
        "placeholder:text-vikrai-fg-muted",
        "disabled:placeholder:text-vikrai-fg-disabled",
        props.className
      )}
    />
  )
}

