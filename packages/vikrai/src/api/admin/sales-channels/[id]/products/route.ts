import {
  AuthenticatedvikraiRequest,
  vikraiResponse,
} from "@vikrai/framework/http"

import { linkProductsToSalesChannelWorkflow } from "@vikrai/core-flows"
import { HttpTypes, LinkMethodRequest } from "@vikrai/framework/types"
import { refetchSalesChannel } from "../../helpers"

export const POST = async (
  req: AuthenticatedvikraiRequest<LinkMethodRequest>,
  res: vikraiResponse<HttpTypes.AdminSalesChannelResponse>
) => {
  const { id } = req.params
  const { add, remove } = req.validatedBody

  const workflow = linkProductsToSalesChannelWorkflow(req.scope)
  await workflow.run({
    input: {
      id,
      add,
      remove,
    },
  })

  const salesChannel = await refetchSalesChannel(
    req.params.id,
    req.scope,
    req.queryConfig.fields
  )
  res.status(200).json({ sales_channel: salesChannel })
}
