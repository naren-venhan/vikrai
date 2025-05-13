import {
  HttpTypes,
  IWorkflowEngineService,
  WorkflowOrchestratorRunDTO,
} from "@vikrai/framework/types"
import { Modules } from "@vikrai/framework/utils"
import {
  AuthenticatedvikraiRequest,
  vikraiResponse,
} from "@vikrai/framework/http"
import { AdminCreateWorkflowsRunType } from "../../validators"

export const POST = async (
  req: AuthenticatedvikraiRequest<AdminCreateWorkflowsRunType>,
  res: vikraiResponse<HttpTypes.AdminWorkflowRunResponse>
) => {
  const workflowEngineService: IWorkflowEngineService = req.scope.resolve(
    Modules.WORKFLOW_ENGINE
  )

  const { workflow_id } = req.params

  const { transaction_id, input } = req.validatedBody

  const options = {
    transactionId: transaction_id,
    input,
    context: {
      requestId: req.requestId,
    },
  } as WorkflowOrchestratorRunDTO

  const { acknowledgement } = await workflowEngineService.run(
    workflow_id,
    options
  )

  return res.status(200).json({ acknowledgement })
}
