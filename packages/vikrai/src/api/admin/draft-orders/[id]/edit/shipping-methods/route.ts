import { addDraftOrderShippingMethodsWorkflow } from "@vikrai/core-flows"
import { AuthenticatedvikraiRequest, vikraiResponse } from "@vikrai/framework"
import { HttpTypes } from "@vikrai/types"
import { AdminAddDraftOrderShippingMethodType } from "../../../validators"

export const POST = async (
  req: AuthenticatedvikraiRequest<AdminAddDraftOrderShippingMethodType>,
  res: vikraiResponse
) => {
  const { id } = req.params

  const { result } = await addDraftOrderShippingMethodsWorkflow(req.scope).run({
    input: {
      order_id: id,
      ...req.validatedBody,
    },
  })

  res.json({
    draft_order_preview: result as unknown as HttpTypes.AdminOrderPreview,
  })
}
