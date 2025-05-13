import { transferCartCustomerWorkflow } from "@vikrai/core-flows"
import { HttpTypes } from "@vikrai/framework/types"

import {
  AuthenticatedvikraiRequest,
  vikraiResponse,
} from "@vikrai/framework/http"
import { refetchCart } from "../../helpers"

export const POST = async (
  req: AuthenticatedvikraiRequest,
  res: vikraiResponse<HttpTypes.StoreCartResponse>
) => {
  const workflow = transferCartCustomerWorkflow(req.scope)

  await workflow.run({
    input: {
      id: req.params.id,
      customer_id: req.auth_context?.actor_id,
    },
  })

  const cart = await refetchCart(
    req.params.id,
    req.scope,
    req.queryConfig.fields
  )

  res.status(200).json({ cart })
}
