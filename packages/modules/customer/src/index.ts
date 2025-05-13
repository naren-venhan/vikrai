import { CustomerModuleService } from "@services"
import { Module, Modules } from "@vikrai/framework/utils"

export default Module(Modules.CUSTOMER, {
  service: CustomerModuleService,
})

