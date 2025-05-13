import { PlusMini } from "@vikrai/icons"
import { Copy, IconButton, Text } from "@vikrai/ui"

export default function CopyAsChild() {
  return (
    <div className="flex items-center gap-x-2">
      <Text>Copy command</Text>
      <Copy content="yarn add @vikrai/ui" asChild>
        <IconButton>
          <PlusMini />
        </IconButton>
      </Copy>
    </div>
  )
}

