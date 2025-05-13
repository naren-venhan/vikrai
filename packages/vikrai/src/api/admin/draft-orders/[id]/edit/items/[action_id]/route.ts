import {
  removeDraftOrderActionItemWorkflow,
  updateDraftOrderActionItemWorkflow,
} from "@vikrai/core-flows"
import { AuthenticatedvikraiRequest, vikraiResponse } from "@vikrai/framework"
import { HttpTypes } from "@vikrai/types"
import { AdminUpdateDraftOrderItemType } from "../../../../validators"

export const POST = async (
  req: AuthenticatedvikraiRequest<AdminUpdateDraftOrderItemType>,
  res: vikraiResponse
) => {
  const { id, action_id } = req.params

  const { result } = await updateDraftOrderActionItemWorkflow(req.scope).run({
    input: {
      data: req.validatedBody,
      order_id: id,
      action_id,
    },
  })

  res.json({
    draft_order_preview: result as unknown as HttpTypes.AdminOrderPreview,
  })
}

export const DELETE = async (
  req: AuthenticatedvikraiRequest,
  res: vikraiResponse
) => {
  const { id, action_id } = req.params

  const { result } = await removeDraftOrderActionItemWorkflow(req.scope).run({
    input: {
      order_id: id,
      action_id,
    },
  })

  res.json({
    draft_order_preview: result as unknown as HttpTypes.AdminOrderPreview,
  })
}
