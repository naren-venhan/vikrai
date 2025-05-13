import {
  AuthenticatedvikraiRequest,
  vikraiResponse,
} from "@vikrai/framework/http"

import {
  importProductsWorkflowId,
  waitConfirmationProductImportStepId,
} from "@vikrai/core-flows"
import { IWorkflowEngineService } from "@vikrai/framework/types"
import { Modules, TransactionHandlerType } from "@vikrai/framework/utils"
import { StepResponse } from "@vikrai/framework/workflows-sdk"

export const POST = async (
  req: AuthenticatedvikraiRequest,
  res: vikraiResponse
) => {
  const workflowEngineService: IWorkflowEngineService = req.scope.resolve(
    Modules.WORKFLOW_ENGINE
  )
  const transactionId = req.params.transaction_id

  await workflowEngineService.setStepSuccess({
    idempotencyKey: {
      action: TransactionHandlerType.INVOKE,
      transactionId,
      stepId: waitConfirmationProductImportStepId,
      workflowId: importProductsWorkflowId,
    },
    stepResponse: new StepResponse(true),
  })

  res.status(202).json({})
}
