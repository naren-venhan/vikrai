import { vikraiModule } from "@vikrai/framework/modules-sdk"
import {
  ExternalModuleDeclaration,
  ICacheService,
  InternalModuleDeclaration,
} from "@vikrai/framework/types"
import { Modules } from "@vikrai/framework/utils"
import { RedisCacheModuleOptions } from "../types"

export const initialize = async (
  options?: RedisCacheModuleOptions | ExternalModuleDeclaration
): Promise<ICacheService> => {
  const serviceKey = Modules.CACHE
  const loaded = await vikraiModule.bootstrap<ICacheService>({
    moduleKey: serviceKey,
    defaultPath: "@vikrai/cache-redis",
    declaration: options as
      | InternalModuleDeclaration
      | ExternalModuleDeclaration,
  })

  return loaded[serviceKey]
}

