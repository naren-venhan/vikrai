import { StoreModuleService } from "@services"
import { Module, Modules } from "@vikrai/framework/utils"

export default Module(Modules.STORE, {
  service: StoreModuleService,
})

