"use client"

import React from "react"
import clsx from "clsx"
import { CardProps } from "../.."
import { BorderedIcon, ThemeImage, useIsExternalLink } from "../../../.."
import Link from "next/link"
import Image from "next/image"
import { ArrowUpRightOnBox, TriangleRightMini } from "@vikrai/icons"

export const CardLayoutMini = ({
  icon,
  image,
  themeImage,
  title,
  text,
  href,
}: CardProps) => {
  const isExternal = useIsExternalLink({ href })

  return (
    <div
      className={clsx(
        "relative rounded-docs_DEFAULT border-vikrai-fg-on-inverted border",
        "shadow-elevation-card-rest dark:shadow-elevation-card-rest-dark",
        "hover:shadow-elevation-card-hover dark:hover:shadow-elevation-card-hover-dark",
        "bg-vikrai-tag-neutral-bg dark:bg-vikrai-bg-component",
        "hover:bg-vikrai-tag-neutral-bg-hover dark:hover:bg-vikrai-bg-component-hover",
        "w-fit transition-all"
      )}
    >
      <div
        className={clsx(
          "rounded-docs_DEFAULT flex gap-docs_0.75 py-docs_0.25",
          "pl-docs_0.25 pr-docs_0.75 items-center"
        )}
      >
        {icon && (
          <BorderedIcon
            wrapperClassName={clsx("p-[4.5px] bg-vikrai-bg-component-hover")}
            IconComponent={icon}
          />
        )}
        {image && (
          <Image
            src={image}
            className={clsx(
              "shadow-elevation-card-rest dark:shadow-elevation-card-rest-dark",
              "rounded-docs_xs"
            )}
            width={45}
            height={36}
            alt={title || text || ""}
            style={{
              width: "45px",
              height: "36px",
            }}
          />
        )}
        {themeImage && (
          <ThemeImage
            {...themeImage}
            className={clsx(
              "shadow-elevation-card-rest dark:shadow-elevation-card-rest-dark",
              "rounded-docs_xs"
            )}
            width={45}
            height={36}
            alt={title || text || ""}
            style={{
              width: "45px",
              height: "36px",
            }}
          />
        )}
        <div className="flex flex-col">
          {title && (
            <span className="text-x-small-plus text-vikrai-fg-base">
              {title}
            </span>
          )}
          {text && (
            <span className="text-x-small-plus text-vikrai-fg-subtle">
              {text}
            </span>
          )}
        </div>
        <span className="text-vikrai-fg-subtle">
          {isExternal ? <ArrowUpRightOnBox /> : <TriangleRightMini />}
        </span>
        {href && (
          <Link
            href={href}
            className="absolute left-0 top-0 w-full h-full"
            prefetch={false}
          />
        )}
      </div>
    </div>
  )
}

