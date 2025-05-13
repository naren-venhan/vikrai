import { vikraiModule } from "@vikrai/framework/modules-sdk"
import { IEventBusService } from "@vikrai/framework/types"
import { Modules } from "@vikrai/framework/utils"

export const initialize = async (): Promise<IEventBusService> => {
  const serviceKey = Modules.EVENT_BUS
  const loaded = await vikraiModule.bootstrap<IEventBusService>({
    moduleKey: serviceKey,
    defaultPath: "@vikrai/event-bus-local",
  })

  return loaded[serviceKey]
}

