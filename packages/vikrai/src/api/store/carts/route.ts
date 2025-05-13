import { createCartWorkflow } from "@vikrai/core-flows"
import {
  AdditionalData,
  CreateCartWorkflowInputDTO,
  HttpTypes,
} from "@vikrai/framework/types"
import {
  AuthenticatedvikraiRequest,
  vikraiResponse,
} from "@vikrai/framework/http"
import { refetchCart } from "./helpers"

export const POST = async (
  req: AuthenticatedvikraiRequest<HttpTypes.StoreCreateCart & AdditionalData>,
  res: vikraiResponse<HttpTypes.StoreCartResponse>
) => {
  const workflowInput = {
    ...req.validatedBody,
    customer_id: req.auth_context?.actor_id,
  }

  const { result } = await createCartWorkflow(req.scope).run({
    input: workflowInput as CreateCartWorkflowInputDTO,
  })

  const cart = await refetchCart(result.id, req.scope, req.queryConfig.fields)

  res.status(200).json({ cart })
}

