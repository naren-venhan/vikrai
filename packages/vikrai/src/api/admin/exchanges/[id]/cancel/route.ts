import { cancelOrderExchangeWorkflow } from "@vikrai/core-flows"
import { HttpTypes } from "@vikrai/framework/types"
import {
  AuthenticatedvikraiRequest,
  vikraiResponse,
} from "@vikrai/framework/http"
import { AdminPostCancelExchangeReqSchemaType } from "../../validators"

export const POST = async (
  req: AuthenticatedvikraiRequest<AdminPostCancelExchangeReqSchemaType>,
  res: vikraiResponse<HttpTypes.AdminExchangeResponse>
) => {
  const { id } = req.params

  const workflow = cancelOrderExchangeWorkflow(req.scope)
  const { result } = await workflow.run({
    input: {
      ...req.validatedBody,
      exchange_id: id,
      canceled_by: req.auth_context.actor_id,
    },
  })

  res.status(200).json({ exchange: result as HttpTypes.AdminExchange })
}
