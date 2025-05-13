import { updateTaxLinesWorkflow } from "@vikrai/core-flows"
import { vikraiRequest, vikraiResponse } from "@vikrai/framework/http"
import { HttpTypes } from "@vikrai/framework/types"
import { refetchCart } from "../../helpers"

export const POST = async (
  req: vikraiRequest,
  res: vikraiResponse<HttpTypes.StoreCartResponse>
) => {
  await updateTaxLinesWorkflow(req.scope).run({
    input: {
      cart_id: req.params.id,
      force_tax_calculation: true,
    },
  })

  const cart = await refetchCart(
    req.params.id,
    req.scope,
    req.queryConfig.fields
  )

  res.status(200).json({ cart })
}
