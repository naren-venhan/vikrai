import {
  CartCreditLineDTO,
  CreateCartCreditLineDTO,
} from "@vikrai/framework/types"
import { Modules } from "@vikrai/framework/utils"
import {
  WorkflowData,
  WorkflowResponse,
  createWorkflow,
} from "@vikrai/framework/workflows-sdk"
import { createEntitiesStep } from "../../common/steps/create-entities"

export const createCartCreditLinesWorkflowId = "create-cart-credit-lines"
export const createCartCreditLinesWorkflow = createWorkflow(
  createCartCreditLinesWorkflowId,
  (
    input: WorkflowData<CreateCartCreditLineDTO[]>
  ): WorkflowResponse<CartCreditLineDTO[]> => {
    const creditLines = createEntitiesStep({
      moduleRegistrationName: Modules.CART,
      invokeMethod: "createCreditLines",
      compensateMethod: "deleteCreditLines",
      data: input,
    })

    return new WorkflowResponse(creditLines)
  }
)

