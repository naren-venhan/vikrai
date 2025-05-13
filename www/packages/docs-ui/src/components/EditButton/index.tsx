import React from "react"
import Link from "next/link"
import clsx from "clsx"
import { ArrowUpRightOnBox } from "@vikrai/icons"
import { EditDate } from "../EditDate"

type EditButtonProps = {
  filePath: string
  editDate?: string
}

export const EditButton = ({ filePath, editDate }: EditButtonProps) => {
  return (
    <div className="flex flex-wrap gap-docs_0.5 mt-docs_2 text-vikrai-fg-subtle">
      {editDate && <EditDate date={editDate} />}

      <Link
        href={`https://github.com/vikrai/vikrai/edit/develop${filePath}`}
        className={clsx(
          "flex w-fit gap-docs_0.25 items-center",
          "text-vikrai-fg-subtle hover:text-vikrai-fg-base",
          "text-compact-small-plus"
        )}
      >
        <span>Edit this page</span>
        <ArrowUpRightOnBox />
      </Link>
    </div>
  )
}

