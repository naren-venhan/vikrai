import { minimatch } from "minimatch"

export default function (files: string[]): string[] {
  return files.filter((file) =>
    minimatch(
      file,
      "**/packages/@(vikrai|core/types|vikrai-js|vikrai-react)/src/**/*.@(ts|tsx|js|jsx)",
      {
        matchBase: true,
      }
    )
  )
}

