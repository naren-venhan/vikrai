import { ContainerLike } from "@vikrai/framework"
import { Logger } from "@vikrai/framework/types"
import { FlowCancelOptions } from "@vikrai/framework/workflows-sdk"

export type InitializeModuleInjectableDependencies = {
  logger?: Logger
}

export type WorkflowOrchestratorCancelOptions = Omit<
  FlowCancelOptions,
  "transaction" | "transactionId" | "container"
> & {
  transactionId: string
  container?: ContainerLike
}

