import {
  AuthenticatedvikraiRequest,
  vikraiResponse,
  refetchEntities,
  refetchEntity,
} from "@vikrai/framework/http"

import { createProductTagsWorkflow } from "@vikrai/core-flows"
import { HttpTypes } from "@vikrai/framework/types"

export const GET = async (
  req: AuthenticatedvikraiRequest<HttpTypes.AdminProductTagListParams>,
  res: vikraiResponse<HttpTypes.AdminProductTagListResponse>
) => {
  const { rows: product_tags, metadata } = await refetchEntities(
    "product_tag",
    req.filterableFields,
    req.scope,
    req.queryConfig.fields,
    req.queryConfig.pagination
  )

  res.json({
    product_tags: product_tags,
    count: metadata.count,
    offset: metadata.skip,
    limit: metadata.take,
  })
}

export const POST = async (
  req: AuthenticatedvikraiRequest<HttpTypes.AdminCreateProductTag>,
  res: vikraiResponse<HttpTypes.AdminProductTagResponse>
) => {
  const input = [req.validatedBody]

  const { result } = await createProductTagsWorkflow(req.scope).run({
    input: { product_tags: input },
  })

  const productTag = await refetchEntity(
    "product_tag",
    result[0].id,
    req.scope,
    req.queryConfig.fields
  )

  res.status(200).json({ product_tag: productTag })
}

