import { createRefundReasonsWorkflow } from "@vikrai/core-flows"
import {
  AuthenticatedvikraiRequest,
  vikraiResponse,
  refetchEntities,
  refetchEntity,
} from "@vikrai/framework/http"
import {
  AdminCreateRefundReason,
  HttpTypes,
  PaginatedResponse,
  RefundReasonResponse,
  RefundReasonsResponse,
} from "@vikrai/framework/types"

export const GET = async (
  req: AuthenticatedvikraiRequest<HttpTypes.RefundReasonFilters>,
  res: vikraiResponse<PaginatedResponse<RefundReasonsResponse>>
) => {
  const { rows: refund_reasons, metadata } = await refetchEntities(
    "refund_reasons",
    req.filterableFields,
    req.scope,
    req.queryConfig.fields,
    req.queryConfig.pagination
  )

  res.json({
    refund_reasons,
    count: metadata.count,
    offset: metadata.skip,
    limit: metadata.take,
  })
}

export const POST = async (
  req: AuthenticatedvikraiRequest<AdminCreateRefundReason>,
  res: vikraiResponse<RefundReasonResponse>
) => {
  const {
    result: [refundReason],
  } = await createRefundReasonsWorkflow(req.scope).run({
    input: { data: [req.validatedBody] },
  })

  const refund_reason = await refetchEntity(
    "refund_reason",
    refundReason.id,
    req.scope,
    req.queryConfig.fields
  )

  res.status(200).json({ refund_reason })
}

