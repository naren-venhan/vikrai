import { Module, Modules } from "@vikrai/framework/utils"
import { ProductModuleService } from "@services"

export default Module(Modules.PRODUCT, {
  service: ProductModuleService,
})

