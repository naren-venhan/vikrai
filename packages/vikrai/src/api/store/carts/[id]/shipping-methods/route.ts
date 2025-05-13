import { addShippingMethodToCartWorkflow } from "@vikrai/core-flows"
import { vikraiRequest, vikraiResponse } from "@vikrai/framework/http"
import { HttpTypes } from "@vikrai/framework/types"
import { refetchCart } from "../../helpers"
import { StoreAddCartShippingMethodsType } from "../../validators"

export const POST = async (
  req: vikraiRequest<StoreAddCartShippingMethodsType>,
  res: vikraiResponse<HttpTypes.StoreCartResponse>
) => {
  const payload = req.validatedBody

  await addShippingMethodToCartWorkflow(req.scope).run({
    input: {
      options: [{ id: payload.option_id, data: payload.data }],
      cart_id: req.params.id,
    },
  })

  const cart = await refetchCart(
    req.params.id,
    req.scope,
    req.queryConfig.fields
  )

  res.status(200).json({ cart })
}
