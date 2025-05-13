import {
  StoreProductCategoryListParams,
  StoreProductCategoryListResponse,
} from "@vikrai/framework/types"
import {
  ContainerRegistrationKeys,
  remoteQueryObjectFromString,
} from "@vikrai/framework/utils"
import {
  AuthenticatedvikraiRequest,
  vikraiResponse,
} from "@vikrai/framework/http"

export const GET = async (
  req: AuthenticatedvikraiRequest<StoreProductCategoryListParams>,
  res: vikraiResponse<StoreProductCategoryListResponse>
) => {
  const remoteQuery = req.scope.resolve(ContainerRegistrationKeys.REMOTE_QUERY)

  const queryObject = remoteQueryObjectFromString({
    entryPoint: "product_category",
    variables: {
      filters: req.filterableFields,
      ...req.queryConfig.pagination,
    },
    fields: req.queryConfig.fields,
  })

  const { rows: product_categories, metadata } = await remoteQuery(queryObject)

  res.json({
    product_categories,
    count: metadata.count,
    offset: metadata.skip,
    limit: metadata.take,
  })
}

