import {
  ContainerRegistrationKeys,
  remoteQueryObjectFromString,
} from "@vikrai/framework/utils"
import { vikraiRequest, vikraiResponse } from "@vikrai/framework/http"
import { HttpTypes } from "@vikrai/framework/types"

export const GET = async (
  req: vikraiRequest<HttpTypes.StoreGetCurrencyListParams>,
  res: vikraiResponse<HttpTypes.StoreCurrencyListResponse>
) => {
  const remoteQuery = req.scope.resolve(ContainerRegistrationKeys.REMOTE_QUERY)

  const queryObject = remoteQueryObjectFromString({
    entryPoint: "currency",
    variables: {
      filters: req.filterableFields,
      ...req.queryConfig.pagination,
    },
    fields: req.queryConfig.fields,
  })

  const { rows: currencies, metadata } = await remoteQuery(queryObject)

  res.json({
    currencies,
    count: metadata.count,
    offset: metadata.skip,
    limit: metadata.take,
  })
}

