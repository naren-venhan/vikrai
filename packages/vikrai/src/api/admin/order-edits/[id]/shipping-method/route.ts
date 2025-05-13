import { createOrderEditShippingMethodWorkflow } from "@vikrai/core-flows"
import { HttpTypes } from "@vikrai/framework/types"
import {
  AuthenticatedvikraiRequest,
  vikraiResponse,
} from "@vikrai/framework/http"
import { AdminPostOrderEditsShippingReqSchemaType } from "../../validators"

export const POST = async (
  req: AuthenticatedvikraiRequest<AdminPostOrderEditsShippingReqSchemaType>,
  res: vikraiResponse<HttpTypes.AdminOrderEditPreviewResponse>
) => {
  const { id } = req.params

  const { result } = await createOrderEditShippingMethodWorkflow(req.scope).run(
    {
      input: { ...req.validatedBody, order_id: id },
    }
  )

  res.json({
    order_preview: result as unknown as HttpTypes.AdminOrderPreview,
  })
}
