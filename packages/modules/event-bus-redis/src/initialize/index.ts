import { vikraiModule } from "@vikrai/framework/modules-sdk"
import {
  ExternalModuleDeclaration,
  IEventBusService,
  InternalModuleDeclaration,
} from "@vikrai/framework/types"
import { Modules } from "@vikrai/framework/utils"
import { EventBusRedisModuleOptions } from "../types"

export const initialize = async (
  options?: EventBusRedisModuleOptions | ExternalModuleDeclaration
): Promise<IEventBusService> => {
  const serviceKey = Modules.EVENT_BUS
  const loaded = await vikraiModule.bootstrap<IEventBusService>({
    moduleKey: serviceKey,
    defaultPath: "@vikrai/event-bus-redis",
    declaration: options as
      | InternalModuleDeclaration
      | ExternalModuleDeclaration,
  })

  return loaded[serviceKey]
}

