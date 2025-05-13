import { listShippingOptionsForCartWorkflow } from "@vikrai/core-flows"
import { vikraiRequest, vikraiResponse } from "@vikrai/framework/http"
import { HttpTypes } from "@vikrai/framework/types"

export const GET = async (
  req: vikraiRequest<{}, HttpTypes.StoreGetShippingOptionList>,
  res: vikraiResponse<HttpTypes.StoreShippingOptionListResponse>
) => {
  const { cart_id, is_return } = req.filterableFields

  const workflow = listShippingOptionsForCartWorkflow(req.scope)
  const { result: shipping_options } = await workflow.run({
    input: { cart_id, is_return: !!is_return },
  })

  res.json({ shipping_options })
}

