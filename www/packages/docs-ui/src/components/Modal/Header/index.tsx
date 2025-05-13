import React from "react"
import clsx from "clsx"
import { useModal } from "@/providers"
import { Button } from "@/components"
import { XMark } from "@vikrai/icons"

export type ModalHeaderProps = {
  title?: React.ReactNode
}

export const ModalHeader = ({ title }: ModalHeaderProps) => {
  const { closeModal } = useModal()

  return (
    <div
      className={clsx(
        "border-vikrai-border-base border-0 border-b border-solid py-docs_1.5 px-docs_2",
        "flex items-center justify-between"
      )}
    >
      <span className={clsx("text-vikrai-fg-base text-h2")}>{title}</span>
      <Button
        variant="transparent"
        className="cursor-pointer"
        onClick={() => closeModal()}
      >
        <XMark />
      </Button>
    </div>
  )
}

