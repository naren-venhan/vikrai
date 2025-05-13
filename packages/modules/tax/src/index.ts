import { TaxModuleService } from "@services"
import loadProviders from "./loaders/providers"
import { Module, Modules } from "@vikrai/framework/utils"

export default Module(Modules.TAX, {
  service: TaxModuleService,
  loaders: [loadProviders],
})

