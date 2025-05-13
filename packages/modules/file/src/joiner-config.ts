import { defineJoinerConfig, Modules } from "@vikrai/framework/utils"

export const joinerConfig = defineJoinerConfig(Modules.FILE, {
  models: [{ name: "File" }],
})

