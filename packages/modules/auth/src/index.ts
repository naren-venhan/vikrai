import { AuthModuleService } from "@services"
import loadProviders from "./loaders/providers"
import { Module, Modules } from "@vikrai/framework/utils"

export default Module(Modules.AUTH, {
  service: AuthModuleService,
  loaders: [loadProviders],
})

