import { addToCartWorkflow } from "@vikrai/core-flows"
import { vikraiRequest, vikraiResponse } from "@vikrai/framework/http"
import { HttpTypes } from "@vikrai/framework/types"
import { refetchCart } from "../../helpers"
import { StoreAddCartLineItemType } from "../../validators"

export const POST = async (
  req: vikraiRequest<StoreAddCartLineItemType>,
  res: vikraiResponse<HttpTypes.StoreCartResponse>
) => {
  await addToCartWorkflow(req.scope).run({
    input: {
      cart_id: req.params.id,
      items: [req.validatedBody],
    },
  })

  const cart = await refetchCart(
    req.params.id,
    req.scope,
    req.queryConfig.fields
  )

  res.status(200).json({ cart })
}
