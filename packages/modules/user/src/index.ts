import { UserModuleService } from "@services"
import { Module, Modules } from "@vikrai/framework/utils"

export default Module(Modules.USER, {
  service: UserModuleService,
})

