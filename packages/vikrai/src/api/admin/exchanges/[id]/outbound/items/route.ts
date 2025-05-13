import { orderExchangeAddNewItemWorkflow } from "@vikrai/core-flows"
import {
  ContainerRegistrationKeys,
  remoteQueryObjectFromString,
} from "@vikrai/framework/utils"

import {
  AuthenticatedvikraiRequest,
  vikraiResponse,
} from "@vikrai/framework/http"
import { AdminPostExchangesAddItemsReqSchemaType } from "../../../validators"
import { HttpTypes } from "@vikrai/framework/types"

export const POST = async (
  req: AuthenticatedvikraiRequest<AdminPostExchangesAddItemsReqSchemaType>,
  res: vikraiResponse<HttpTypes.AdminExchangePreviewResponse>
) => {
  const { id } = req.params

  const remoteQuery = req.scope.resolve(ContainerRegistrationKeys.REMOTE_QUERY)

  const { result } = await orderExchangeAddNewItemWorkflow(req.scope).run({
    input: { ...req.validatedBody, exchange_id: id },
  })

  const queryObject = remoteQueryObjectFromString({
    entryPoint: "order_exchange",
    variables: {
      id,
      filters: {
        ...req.filterableFields,
      },
    },
    fields: req.queryConfig.fields,
  })

  const [orderExchange] = await remoteQuery(queryObject)

  res.json({
    order_preview: result as unknown as HttpTypes.AdminOrderPreview,
    exchange: orderExchange,
  })
}
