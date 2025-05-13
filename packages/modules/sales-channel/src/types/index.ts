import { Logger, UpdateSalesChannelDTO } from "@vikrai/framework/types"

export type InitializeModuleInjectableDependencies = {
  logger?: Logger
}

export type UpdateSalesChanneInput = UpdateSalesChannelDTO & { id: string }

