import { refundPaymentWorkflow } from "@vikrai/core-flows"
import {
  AuthenticatedvikraiRequest,
  vikraiResponse,
} from "@vikrai/framework/http"
import { refetchPayment } from "../../helpers"
import { AdminCreatePaymentRefundType } from "../../validators"
import { HttpTypes } from "@vikrai/framework/types"

export const POST = async (
  req: AuthenticatedvikraiRequest<AdminCreatePaymentRefundType>,
  res: vikraiResponse<HttpTypes.AdminPaymentResponse>
) => {
  const { id } = req.params
  await refundPaymentWorkflow(req.scope).run({
    input: {
      payment_id: id,
      created_by: req.auth_context.actor_id,
      ...req.validatedBody,
    },
  })

  const payment = await refetchPayment(id, req.scope, req.queryConfig.fields)

  res.status(200).json({ payment })
}
