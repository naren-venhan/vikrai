import clsx from "clsx"

export type TagsOperationParametersNestedProps =
  React.HTMLAttributes<HTMLDivElement>

const TagsOperationParametersNested = ({
  children,
  ...props
}: TagsOperationParametersNestedProps) => {
  return (
    <div
      {...props}
      className={clsx(
        props.className,
        "bg-vikrai-bg-subtle px-1 pt-1",
        "border-vikrai-border-base my-1 rounded-sm border"
      )}
    >
      {children}
    </div>
  )
}

export default TagsOperationParametersNested

