import { updateDraftOrderItemWorkflow } from "@vikrai/core-flows"
import { AuthenticatedvikraiRequest, vikraiResponse } from "@vikrai/framework"
import { HttpTypes } from "@vikrai/types"
import { AdminUpdateDraftOrderItemType } from "../../../../../validators"

export const POST = async (
  req: AuthenticatedvikraiRequest<AdminUpdateDraftOrderItemType>,
  res: vikraiResponse
) => {
  const { id, item_id } = req.params

  const { result } = await updateDraftOrderItemWorkflow(req.scope).run({
    input: {
      ...req.validatedBody,
      order_id: id,
      items: [
        {
          ...req.validatedBody,
          id: item_id,
        },
      ],
    },
  })

  res.json({
    draft_order_preview: result as unknown as HttpTypes.AdminOrderPreview,
  })
}
