import {
  addDraftOrderPromotionWorkflow,
  removeDraftOrderPromotionsWorkflow,
} from "@vikrai/core-flows"
import { AuthenticatedvikraiRequest, vikraiResponse } from "@vikrai/framework"
import { HttpTypes } from "@vikrai/types"
import {
  AdminAddDraftOrderPromotionsType,
  AdminRemoveDraftOrderPromotionsType,
} from "../../../validators"

export const POST = async (
  req: AuthenticatedvikraiRequest<AdminAddDraftOrderPromotionsType>,
  res: vikraiResponse<HttpTypes.AdminDraftOrderPreviewResponse>
) => {
  const { id } = req.params

  const { result } = await addDraftOrderPromotionWorkflow(req.scope).run({
    input: {
      ...req.validatedBody,
      order_id: id,
    },
  })

  res.json({
    draft_order_preview: result as unknown as HttpTypes.AdminOrderPreview,
  })
}

export const DELETE = async (
  req: AuthenticatedvikraiRequest<AdminRemoveDraftOrderPromotionsType>,
  res: vikraiResponse<HttpTypes.AdminDraftOrderPreviewResponse>
) => {
  const { id } = req.params


  const { result } = await removeDraftOrderPromotionsWorkflow(req.scope).run({
    input: {
      ...req.validatedBody,
      order_id: id,
    },
  })

  res.json({
    draft_order_preview: result as unknown as HttpTypes.AdminOrderPreview,
  })
}
