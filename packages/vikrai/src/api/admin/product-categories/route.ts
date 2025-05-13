import { createProductCategoriesWorkflow } from "@vikrai/core-flows"
import { HttpTypes } from "@vikrai/framework/types"
import {
  AuthenticatedvikraiRequest,
  vikraiResponse,
  refetchEntities,
} from "@vikrai/framework/http"

export const GET = async (
  req: AuthenticatedvikraiRequest<HttpTypes.AdminProductCategoryListParams>,
  res: vikraiResponse<HttpTypes.AdminProductCategoryListResponse>
) => {
  const { rows: product_categories, metadata } = await refetchEntities(
    "product_category",
    req.filterableFields,
    req.scope,
    req.queryConfig.fields,
    req.queryConfig.pagination
  )

  res.json({
    product_categories,
    count: metadata.count,
    offset: metadata.skip,
    limit: metadata.take,
  })
}

export const POST = async (
  req: AuthenticatedvikraiRequest<HttpTypes.AdminCreateProductCategory>,
  res: vikraiResponse<HttpTypes.AdminProductCategoryResponse>
) => {
  const { result } = await createProductCategoriesWorkflow(req.scope).run({
    input: { product_categories: [req.validatedBody] },
  })

  const [category] = await refetchEntities(
    "product_category",
    { id: result[0].id, ...req.filterableFields },
    req.scope,
    req.queryConfig.fields
  )

  res.status(200).json({ product_category: category })
}

