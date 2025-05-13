import { useMemo } from "react"

type UseIsExternalLinkProps = {
  href?: string
}

export const useIsExternalLink = ({ href }: UseIsExternalLinkProps) => {
  const isExternal = useMemo(() => {
    return (
      href &&
      !href.startsWith("/") &&
      !href.startsWith("https://docs.vikrai.com") &&
      !href.startsWith("http://localhost:") &&
      !href.startsWith("#")
    )
  }, [href])

  return isExternal
}

