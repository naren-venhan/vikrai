import { deleteFulfillmentSetsWorkflow } from "@vikrai/core-flows"
import { HttpTypes } from "@vikrai/framework/types"

import {
  AuthenticatedvikraiRequest,
  vikraiResponse,
} from "@vikrai/framework/http"

export const DELETE = async (
  req: AuthenticatedvikraiRequest,
  res: vikraiResponse<HttpTypes.AdminFulfillmentSetDeleteResponse>
) => {
  const { id } = req.params

  await deleteFulfillmentSetsWorkflow(req.scope).run({
    input: { ids: [id] },
  })

  res.status(200).json({
    id,
    object: "fulfillment_set",
    deleted: true,
  })
}
