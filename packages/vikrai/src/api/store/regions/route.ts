import {
  ContainerRegistrationKeys,
  remoteQueryObjectFromString,
} from "@vikrai/framework/utils"
import { HttpTypes } from "@vikrai/framework/types"
import { vikraiRequest, vikraiResponse } from "@vikrai/framework/http"

export const GET = async (
  req: vikraiRequest<HttpTypes.StoreRegionFilters>,
  res: vikraiResponse<HttpTypes.StoreRegionListResponse>
) => {
  const remoteQuery = req.scope.resolve(ContainerRegistrationKeys.REMOTE_QUERY)

  const queryObject = remoteQueryObjectFromString({
    entryPoint: "region",
    variables: {
      filters: req.filterableFields,
      ...req.queryConfig.pagination,
    },
    fields: req.queryConfig.fields,
  })

  const { rows: regions, metadata } = await remoteQuery(queryObject)

  res.json({
    regions,
    count: metadata.count,
    offset: metadata.skip,
    limit: metadata.take,
  })
}

