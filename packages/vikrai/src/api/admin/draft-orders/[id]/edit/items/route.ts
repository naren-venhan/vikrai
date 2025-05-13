import { addDraftOrderItemsWorkflow } from "@vikrai/core-flows"
import { AuthenticatedvikraiRequest, vikraiResponse } from "@vikrai/framework"
import { HttpTypes } from "@vikrai/types"
import { AdminAddDraftOrderItemsType } from "../../../validators"

export const POST = async (
  req: AuthenticatedvikraiRequest<AdminAddDraftOrderItemsType>,
  res: vikraiResponse
) => {
  const { id } = req.params

  const { result } = await addDraftOrderItemsWorkflow(req.scope).run({
    input: {
      ...req.validatedBody,
      order_id: id,
    },
  })

  res.json({
    draft_order_preview: result as unknown as HttpTypes.AdminOrderPreview,
  })
}
