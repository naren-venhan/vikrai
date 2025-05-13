import { beginOrderEditOrderWorkflow } from "@vikrai/core-flows"
import { HttpTypes } from "@vikrai/framework/types"
import {
  AuthenticatedvikraiRequest,
  vikraiResponse,
} from "@vikrai/framework/http"
import { AdminPostOrderEditsReqSchemaType } from "./validators"

export const POST = async (
  req: AuthenticatedvikraiRequest<AdminPostOrderEditsReqSchemaType>,
  res: vikraiResponse<HttpTypes.AdminOrderEditResponse>
) => {
  const input = req.validatedBody as AdminPostOrderEditsReqSchemaType

  const workflow = beginOrderEditOrderWorkflow(req.scope)
  const { result } = await workflow.run({
    input,
  })

  res.json({
    order_change: result as unknown as HttpTypes.AdminOrderChange,
  })
}

