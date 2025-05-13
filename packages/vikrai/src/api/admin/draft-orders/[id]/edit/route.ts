import {
  beginDraftOrderEditWorkflow,
  cancelDraftOrderEditWorkflow,
} from "@vikrai/core-flows"
import { AuthenticatedvikraiRequest, vikraiResponse } from "@vikrai/framework"
import { HttpTypes } from "@vikrai/types"

export const POST = async (
  req: AuthenticatedvikraiRequest,
  res: vikraiResponse
) => {
  const { id } = req.params

  const { result } = await beginDraftOrderEditWorkflow(req.scope).run({
    input: {
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
  const { id } = req.params

  await cancelDraftOrderEditWorkflow(req.scope).run({
    input: {
      order_id: id,
    },
  })

  res.status(200).json({
    id,
    object: "draft-order-edit",
    deleted: true,
  })
}
