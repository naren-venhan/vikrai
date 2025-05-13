import {
  ExternalModuleDeclaration,
  InternalModuleDeclaration,
  ModuleJoinerConfig,
} from "@vikrai/framework/types"
import {
  ContainerRegistrationKeys,
  createPgConnection,
  promiseAll,
} from "@vikrai/framework/utils"

export interface InitModulesOptions {
  injectedDependencies?: Record<string, unknown>
  databaseConfig: {
    clientUrl: string
    schema?: string
  }
  modulesConfig: {
    [key: string]:
      | string
      | boolean
      | Partial<InternalModuleDeclaration | ExternalModuleDeclaration>
  }
  joinerConfig?: ModuleJoinerConfig[]
  preventConnectionDestroyWarning?: boolean
}

export async function initModules({
  injectedDependencies,
  databaseConfig,
  modulesConfig,
  joinerConfig,
  preventConnectionDestroyWarning = false,
}: InitModulesOptions) {
  const moduleSdkImports = require("@vikrai/framework/modules-sdk")

  injectedDependencies ??= {}

  let sharedPgConnection =
    injectedDependencies?.[ContainerRegistrationKeys.PG_CONNECTION]

  let shouldDestroyConnectionAutomatically = !sharedPgConnection
  if (!sharedPgConnection) {
    sharedPgConnection = createPgConnection({
      clientUrl: databaseConfig.clientUrl,
      schema: databaseConfig.schema,
    })

    injectedDependencies[ContainerRegistrationKeys.PG_CONNECTION] =
      sharedPgConnection
  }

  const vikraiApp = await moduleSdkImports.vikraiApp({
    modulesConfig,
    servicesConfig: joinerConfig,
    injectedDependencies,
  })

  await vikraiApp.onApplicationStart()

  async function shutdown() {
    if (shouldDestroyConnectionAutomatically) {
      await vikraiApp.onApplicationPrepareShutdown()

      await promiseAll([
        (sharedPgConnection as any).context?.destroy(),
        (sharedPgConnection as any).destroy(),
        vikraiApp.onApplicationShutdown(),
      ])
    } else {
      if (!preventConnectionDestroyWarning) {
        console.info(
          `You are using a custom shared connection. The connection won't be destroyed automatically.`
        )
      }
    }
    moduleSdkImports.vikraiModule.clearInstances()
  }

  return {
    vikraiApp,
    shutdown,
  }
}

