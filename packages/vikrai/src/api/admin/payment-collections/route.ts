import { createOrderPaymentCollectionWorkflow } from "@vikrai/core-flows"
import { HttpTypes } from "@vikrai/framework/types"
import {
  AuthenticatedvikraiRequest,
  vikraiResponse,
  refetchEntity,
} from "@vikrai/framework/http"
import { AdminCreatePaymentCollectionType } from "./validators"

export const POST = async (
  req: AuthenticatedvikraiRequest<AdminCreatePaymentCollectionType>,
  res: vikraiResponse<HttpTypes.AdminPaymentCollectionResponse>
) => {
  const { result } = await createOrderPaymentCollectionWorkflow(req.scope).run({
    input: req.body,
  })

  const paymentCollection = await refetchEntity(
    "payment_collection",
    result[0].id,
    req.scope,
    req.queryConfig.fields
  )

  res.status(200).json({ payment_collection: paymentCollection })
}

