import { createPaymentSessionsWorkflow } from "@vikrai/core-flows"
import {
  AuthenticatedvikraiRequest,
  vikraiResponse,
} from "@vikrai/framework/http"
import { refetchPaymentCollection } from "../../helpers"
import { HttpTypes } from "@vikrai/framework/types"

export const POST = async (
  req: AuthenticatedvikraiRequest<HttpTypes.StoreInitializePaymentSession>,
  res: vikraiResponse<HttpTypes.StorePaymentCollectionResponse>
) => {
  const collectionId = req.params.id
  const { provider_id, data } = req.body

  const workflowInput = {
    payment_collection_id: collectionId,
    provider_id: provider_id,
    customer_id: req.auth_context?.actor_id,
    data,
  }

  await createPaymentSessionsWorkflow(req.scope).run({
    input: workflowInput,
  })

  const paymentCollection = await refetchPaymentCollection(
    collectionId,
    req.scope,
    req.queryConfig.fields
  )

  res.status(200).json({
    payment_collection: paymentCollection as HttpTypes.StorePaymentCollection,
  })
}
