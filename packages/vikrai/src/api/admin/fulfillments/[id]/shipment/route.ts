import { createShipmentWorkflow } from "@vikrai/core-flows"
import { HttpTypes } from "@vikrai/framework/types"
import {
  AuthenticatedvikraiRequest,
  vikraiResponse,
} from "@vikrai/framework/http"
import { refetchFulfillment } from "../../helpers"
import { AdminCreateShipmentType } from "../../validators"

export const POST = async (
  req: AuthenticatedvikraiRequest<AdminCreateShipmentType>,
  res: vikraiResponse<HttpTypes.AdminFulfillmentResponse>
) => {
  const { id } = req.params

  await createShipmentWorkflow(req.scope).run({
    input: {
      ...req.validatedBody,
      id,
      marked_shipped_by: req.auth_context.actor_id,
    },
  })

  const fulfillment = await refetchFulfillment(
    id,
    req.scope,
    req.queryConfig.fields
  )

  res.status(200).json({ fulfillment })
}
