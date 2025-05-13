import {
  deleteRefundReasonsWorkflow,
  updateRefundReasonsWorkflow,
} from "@vikrai/core-flows"
import { HttpTypes, RefundReasonResponse } from "@vikrai/framework/types"
import {
  AuthenticatedvikraiRequest,
  vikraiResponse,
  refetchEntity,
} from "@vikrai/framework/http"
import { AdminUpdatePaymentRefundReasonType } from "../validators"

export const GET = async (
  req: AuthenticatedvikraiRequest,
  res: vikraiResponse<RefundReasonResponse>
) => {
  const refund_reason = await refetchEntity(
    "refund_reason",
    req.params.id,
    req.scope,
    req.queryConfig.fields
  )

  res.json({ refund_reason })
}

export const POST = async (
  req: AuthenticatedvikraiRequest<AdminUpdatePaymentRefundReasonType>,
  res: vikraiResponse<RefundReasonResponse>
) => {
  const { id } = req.params

  await updateRefundReasonsWorkflow(req.scope).run({
    input: [
      {
        ...req.validatedBody,
        id,
      },
    ],
  })

  const refund_reason = await refetchEntity(
    "refund_reason",
    req.params.id,
    req.scope,
    req.queryConfig.fields
  )

  res.json({ refund_reason })
}

export const DELETE = async (
  req: AuthenticatedvikraiRequest,
  res: vikraiResponse<HttpTypes.AdminRefundReasonDeleteResponse>
) => {
  const { id } = req.params
  const input = { ids: [id] }

  await deleteRefundReasonsWorkflow(req.scope).run({ input })

  res.json({
    id,
    object: "refund_reason",
    deleted: true,
  })
}
