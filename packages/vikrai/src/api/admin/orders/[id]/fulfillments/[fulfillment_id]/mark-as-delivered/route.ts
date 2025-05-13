import { markOrderFulfillmentAsDeliveredWorkflow } from "@vikrai/core-flows"
import { HttpTypes } from "@vikrai/framework/types"
import {
  AuthenticatedvikraiRequest,
  vikraiResponse,
  refetchEntity,
} from "@vikrai/framework/http"

export const POST = async (
  req: AuthenticatedvikraiRequest,
  res: vikraiResponse<HttpTypes.AdminOrderResponse>
) => {
  const { id: orderId, fulfillment_id: fulfillmentId } = req.params

  await markOrderFulfillmentAsDeliveredWorkflow(req.scope).run({
    input: { orderId, fulfillmentId },
  })

  const order = await refetchEntity(
    "order",
    orderId,
    req.scope,
    req.queryConfig.fields
  )

  res.status(200).json({ order })
}
