import {
  AuthenticatedvikraiRequest,
  vikraiResponse,
} from "@vikrai/framework/http"

import { linkSalesChannelsToStockLocationWorkflow } from "@vikrai/core-flows"
import { HttpTypes, LinkMethodRequest } from "@vikrai/framework/types"
import { refetchStockLocation } from "../../helpers"

export const POST = async (
  req: AuthenticatedvikraiRequest<LinkMethodRequest>,
  res: vikraiResponse<HttpTypes.AdminStockLocationResponse>
) => {
  const { id } = req.params
  const { add, remove } = req.validatedBody

  const workflow = linkSalesChannelsToStockLocationWorkflow(req.scope)
  await workflow.run({
    input: {
      id,
      add,
      remove,
    },
  })

  const stockLocation = await refetchStockLocation(
    req.params.id,
    req.scope,
    req.queryConfig.fields
  )
  res.status(200).json({ stock_location: stockLocation })
}
