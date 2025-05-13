import { LocalWorkflow } from "@vikrai/orchestration"
import { LoadedModule, vikraiContainer } from "@vikrai/types"
import { ExportedWorkflow } from "./helper"

class vikraiWorkflow {
  static workflows: Record<
    string,
    (
      container?: LoadedModule[] | vikraiContainer
    ) => Omit<
      LocalWorkflow,
      "run" | "registerStepSuccess" | "registerStepFailure" | "cancel"
    > &
      ExportedWorkflow
  > = {}

  static registerWorkflow(workflowId, exportedWorkflow) {
    if (workflowId in vikraiWorkflow.workflows) {
      return
    }

    vikraiWorkflow.workflows[workflowId] = exportedWorkflow
  }

  static getWorkflow(workflowId): ExportedWorkflow {
    return vikraiWorkflow.workflows[workflowId] as unknown as ExportedWorkflow
  }
}

global.vikraiWorkflow ??= vikraiWorkflow
const GlobalvikraiWorkflow = global.vikraiWorkflow

export { GlobalvikraiWorkflow as vikraiWorkflow }

