import { createFulfillmentWorkflow } from "@vikrai/core-flows"
import { HttpTypes } from "@vikrai/framework/types"
import {
  AuthenticatedvikraiRequest,
  vikraiResponse,
} from "@vikrai/framework/http"
import { refetchFulfillment } from "./helpers"
import { AdminCreateFulfillmentType } from "./validators"

export const POST = async (
  req: AuthenticatedvikraiRequest<AdminCreateFulfillmentType>,
  res: vikraiResponse<HttpTypes.AdminFulfillmentResponse>
) => {
  const { result: fullfillment } = await createFulfillmentWorkflow(
    req.scope
  ).run({
    input: {
      ...req.validatedBody,
      created_by: req.auth_context.actor_id,
    },
  })

  const fulfillment = await refetchFulfillment(
    fullfillment.id,
    req.scope,
    req.queryConfig.fields
  )

  res.status(200).json({ fulfillment })
}

