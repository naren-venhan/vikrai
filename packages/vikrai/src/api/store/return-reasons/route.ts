import {
  ContainerRegistrationKeys,
  remoteQueryObjectFromString,
} from "@vikrai/framework/utils"
import { vikraiRequest, vikraiResponse } from "@vikrai/framework/http"
import { HttpTypes } from "@vikrai/framework/types"

export const GET = async (
  req: vikraiRequest,
  res: vikraiResponse<HttpTypes.StoreReturnReasonListResponse>
) => {
  const remoteQuery = req.scope.resolve(ContainerRegistrationKeys.REMOTE_QUERY)

  const queryObject = remoteQueryObjectFromString({
    entryPoint: "return_reason",
    variables: {
      filters: {
        ...req.filterableFields,
      },
      ...req.queryConfig.pagination,
    },
    fields: req.queryConfig.fields,
  })

  const { rows: return_reasons, metadata } = await remoteQuery(queryObject)

  res.json({
    return_reasons,
    count: metadata.count,
    offset: metadata.skip,
    limit: metadata.take,
  })
}

