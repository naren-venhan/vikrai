import { FileModuleService } from "@services"
import loadProviders from "./loaders/providers"
import { Module, Modules } from "@vikrai/framework/utils"

export default Module(Modules.FILE, {
  service: FileModuleService,
  loaders: [loadProviders],
})

