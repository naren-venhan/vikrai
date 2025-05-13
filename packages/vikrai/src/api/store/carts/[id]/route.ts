import { updateCartWorkflow } from "@vikrai/core-flows"
import {
  AdditionalData,
  HttpTypes,
  UpdateCartDataDTO,
} from "@vikrai/framework/types"

import { vikraiRequest, vikraiResponse } from "@vikrai/framework/http"
import { refetchCart } from "../helpers"

export const GET = async (
  req: vikraiRequest,
  res: vikraiResponse<HttpTypes.StoreCartResponse>
) => {
  const cart = await refetchCart(
    req.params.id,
    req.scope,
    req.queryConfig.fields
  )

  res.json({ cart })
}

export const POST = async (
  req: vikraiRequest<UpdateCartDataDTO & AdditionalData>,
  res: vikraiResponse<{
    cart: HttpTypes.StoreCart
  }>
) => {
  const workflow = updateCartWorkflow(req.scope)

  await workflow.run({
    input: {
      ...req.validatedBody,
      id: req.params.id,
    },
  })

  const cart = await refetchCart(
    req.params.id,
    req.scope,
    req.queryConfig.fields
  )

  res.status(200).json({ cart })
}
