import {
  removeDraftOrderActionShippingMethodWorkflow,
  updateDraftOrderActionShippingMethodWorkflow,
} from "@vikrai/core-flows"
import { AuthenticatedvikraiRequest, vikraiResponse } from "@vikrai/framework"
import { HttpTypes } from "@vikrai/types"
import { AdminUpdateDraftOrderActionShippingMethodType } from "../../../../validators"

export const POST = async (
  req: AuthenticatedvikraiRequest<AdminUpdateDraftOrderActionShippingMethodType>,
  res: vikraiResponse
) => {
  const { id, action_id } = req.params

  const { result } = await updateDraftOrderActionShippingMethodWorkflow(
    req.scope
  ).run({
    input: {
      data: { ...req.validatedBody },
      order_id: id,
      action_id,
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
  const { id, action_id } = req.params

  const { result } = await removeDraftOrderActionShippingMethodWorkflow(
    req.scope
  ).run({
    input: {
      order_id: id,
      action_id,
    },
  })

  res.json({
    draft_order_preview: result as unknown as HttpTypes.AdminDraftOrderPreview,
  })
}
