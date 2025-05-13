import { Module, Modules } from "@vikrai/framework/utils"
import { SalesChannelModuleService } from "@services"

export default Module(Modules.SALES_CHANNEL, {
  service: SalesChannelModuleService,
})

