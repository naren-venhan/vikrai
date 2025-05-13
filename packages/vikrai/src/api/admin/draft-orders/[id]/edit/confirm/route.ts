import { confirmDraftOrderEditWorkflow } from "@vikrai/core-flows"
import {
  AuthenticatedvikraiRequest,
  vikraiResponse,
} from "@vikrai/framework/http"
import { HttpTypes } from "@vikrai/types"

export const POST = async (
  req: AuthenticatedvikraiRequest,
  res: vikraiResponse
) => {
  const { id } = req.params

  const { result } = await confirmDraftOrderEditWorkflow(req.scope).run({
    input: {
      order_id: id,
      confirmed_by: req.auth_context.actor_id,
    },
  })

  res.json({
    draft_order_preview: result as unknown as HttpTypes.AdminOrderPreview,
  })
}
