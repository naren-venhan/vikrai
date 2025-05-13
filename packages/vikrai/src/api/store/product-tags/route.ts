import { HttpTypes } from "@vikrai/framework/types"
import { ContainerRegistrationKeys } from "@vikrai/framework/utils"
import {
  AuthenticatedvikraiRequest,
  vikraiResponse,
} from "@vikrai/framework/http"

export const GET = async (
  req: AuthenticatedvikraiRequest<HttpTypes.StoreProductTagListParams>,
  res: vikraiResponse<HttpTypes.StoreProductTagListResponse>
) => {
  const query = req.scope.resolve(ContainerRegistrationKeys.QUERY)

  const { data: product_tags, metadata } = await query.graph({
    entity: "product_tag",
    filters: req.filterableFields,
    pagination: req.queryConfig.pagination,
    fields: req.queryConfig.fields,
  })

  res.json({
    product_tags,
    count: metadata?.count ?? 0,
    offset: metadata?.skip ?? 0,
    limit: metadata?.take ?? 0,
  })
}

