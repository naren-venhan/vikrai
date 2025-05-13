import {
  removeDraftOrderShippingMethodWorkflow,
  updateDraftOrderShippingMethodWorkflow,
} from "@vikrai/core-flows"
import {
  AuthenticatedvikraiRequest,
  vikraiResponse,
} from "@vikrai/framework/http"
import { HttpTypes } from "@vikrai/types"
import { AdminUpdateDraftOrderShippingMethodType } from "../../../../../validators"

export const POST = async (
  req: AuthenticatedvikraiRequest<AdminUpdateDraftOrderShippingMethodType>,
  res: vikraiResponse
) => {
  const { id, method_id } = req.params

  const { result } = await updateDraftOrderShippingMethodWorkflow(
    req.scope
  ).run({
    input: {
      data: { shipping_method_id: method_id, ...req.validatedBody },
      order_id: id,
    },
  })

  res.json({
    draft_order_preview: result as unknown as HttpTypes.AdminDraftOrderPreview,
  })
}

export const DELETE = async (
  req: AuthenticatedvikraiRequest,
  res: vikraiResponse
) => {
  const { id, method_id } = req.params

  const { result } = await removeDraftOrderShippingMethodWorkflow(
    req.scope
  ).run({
    input: {
      order_id: id,
      shipping_method_id: method_id,
    },
  })

  res.json({
    draft_order_preview: result as unknown as HttpTypes.AdminDraftOrderPreview,
  })
}
