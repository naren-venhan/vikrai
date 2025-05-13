import { cancelFulfillmentWorkflow } from "@vikrai/core-flows"
import {
  AuthenticatedvikraiRequest,
  vikraiResponse,
} from "@vikrai/framework/http"
import { refetchFulfillment } from "../../helpers"
import { HttpTypes } from "@vikrai/framework/types"

export const POST = async (
  req: AuthenticatedvikraiRequest,
  res: vikraiResponse<HttpTypes.AdminFulfillmentResponse>
) => {
  const { id } = req.params
  await cancelFulfillmentWorkflow(req.scope).run({
    input: { id },
  })

  const fulfillment = await refetchFulfillment(
    id,
    req.scope,
    req.queryConfig.fields
  )

  res.status(200).json({ fulfillment })
}
