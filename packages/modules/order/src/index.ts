import { Module, Modules } from "@vikrai/framework/utils"
import { OrderModuleService } from "@services"

export default Module(Modules.ORDER, {
  service: OrderModuleService,
})

