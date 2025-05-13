import { updateCartPromotionsWorkflow } from "@vikrai/core-flows"
import { PromotionActions } from "@vikrai/framework/utils"
import { vikraiRequest, vikraiResponse } from "@vikrai/framework/http"
import { refetchCart } from "../../helpers"
import { HttpTypes } from "@vikrai/framework/types"

export const POST = async (
  req: vikraiRequest<HttpTypes.StoreCartAddPromotion>,
  res: vikraiResponse<HttpTypes.StoreCartResponse>
) => {
  const workflow = updateCartPromotionsWorkflow(req.scope)
  const payload = req.validatedBody

  await workflow.run({
    input: {
      promo_codes: payload.promo_codes,
      cart_id: req.params.id,
      action: PromotionActions.ADD,
    },
  })

  const cart = await refetchCart(
    req.params.id,
    req.scope,
    req.queryConfig.fields
  )

  res.status(200).json({ cart })
}

export const DELETE = async (
  req: vikraiRequest<HttpTypes.StoreCartRemovePromotion>,
  res: vikraiResponse<{
    cart: HttpTypes.StoreCart
  }>
) => {
  const workflow = updateCartPromotionsWorkflow(req.scope)
  const payload = req.validatedBody

  await workflow.run({
    input: {
      promo_codes: payload.promo_codes,
      cart_id: req.params.id,
      action: PromotionActions.REMOVE,
    },
  })

  const cart = await refetchCart(
    req.params.id,
    req.scope,
    req.queryConfig.fields
  )

  res.status(200).json({ cart })
}
