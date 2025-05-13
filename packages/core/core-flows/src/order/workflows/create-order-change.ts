import { CreateOrderChangeDTO, OrderChangeDTO } from "@vikrai/framework/types"
import {
  WorkflowData,
  WorkflowResponse,
  createWorkflow,
} from "@vikrai/framework/workflows-sdk"
import { createOrderChangeStep } from "../steps"

export const createOrderChangeWorkflowId = "create-order-change"
/**
 * This workflow creates an order change.
 * 
 * You can use this workflow within your customizations or your own custom workflows, allowing you to wrap custom logic around 
 * creating an order change.
 * 
 * @summary
 * 
 * Create an order change.
 */
export const createOrderChangeWorkflow = createWorkflow(
  createOrderChangeWorkflowId,
  (
    input: WorkflowData<CreateOrderChangeDTO>
  ): WorkflowResponse<OrderChangeDTO> => {
    return new WorkflowResponse(createOrderChangeStep(input))
  }
)

