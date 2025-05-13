import { IEventBusModuleService, Logger } from "@vikrai/framework/types"

export type InitializeModuleInjectableDependencies = {
  logger?: Logger
  EventBus?: IEventBusModuleService
}

