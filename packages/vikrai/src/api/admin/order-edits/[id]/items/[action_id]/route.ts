import {
  removeItemOrderEditActionWorkflow,
  updateOrderEditAddItemWorkflow,
} from "@vikrai/core-flows"
import { HttpTypes } from "@vikrai/framework/types"
import {
  AuthenticatedvikraiRequest,
  vikraiResponse,
} from "@vikrai/framework/http"
import { AdminPostOrderEditsItemsActionReqSchemaType } from "../../../validators"

export const POST = async (
  req: AuthenticatedvikraiRequest<AdminPostOrderEditsItemsActionReqSchemaType>,
  res: vikraiResponse<HttpTypes.AdminOrderEditPreviewResponse>
) => {
  const { id, action_id } = req.params

  const { result } = await updateOrderEditAddItemWorkflow(req.scope).run({
    input: {
      data: { ...req.validatedBody },
      order_id: id,
      action_id,
    },
  })

  res.json({
    order_preview: result as unknown as HttpTypes.AdminOrderPreview,
  })
}

export const DELETE = async (
  req: AuthenticatedvikraiRequest,
  res: vikraiResponse<HttpTypes.AdminOrderEditPreviewResponse>
) => {
  const { id, action_id } = req.params

  const { result: orderPreview } = await removeItemOrderEditActionWorkflow(
    req.scope
  ).run({
    input: {
      order_id: id,
      action_id,
    },
  })

  res.json({
    order_preview: orderPreview as unknown as HttpTypes.AdminOrderPreview,
  })
}
