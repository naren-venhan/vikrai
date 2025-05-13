import { Module, Modules } from "@vikrai/framework/utils"
import { ApiKeyModuleService } from "@services"

export default Module(Modules.API_KEY, {
  service: ApiKeyModuleService,
})

