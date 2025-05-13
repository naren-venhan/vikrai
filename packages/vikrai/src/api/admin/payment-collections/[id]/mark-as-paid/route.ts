import { markPaymentCollectionAsPaid } from "@vikrai/core-flows"
import { HttpTypes } from "@vikrai/framework/types"
import {
  AuthenticatedvikraiRequest,
  vikraiResponse,
  refetchEntity,
} from "@vikrai/framework/http"
import { AdminMarkPaymentCollectionPaidType } from "../../validators"

export const POST = async (
  req: AuthenticatedvikraiRequest<AdminMarkPaymentCollectionPaidType>,
  res: vikraiResponse<HttpTypes.AdminPaymentCollectionResponse>
) => {
  const { id } = req.params

  await markPaymentCollectionAsPaid(req.scope).run({
    input: {
      ...req.body,
      payment_collection_id: id,
      captured_by: req.auth_context.actor_id,
    },
  })

  const paymentCollection = await refetchEntity(
    "payment_collection",
    id,
    req.scope,
    req.queryConfig.fields
  )

  res.status(200).json({ payment_collection: paymentCollection })
}
