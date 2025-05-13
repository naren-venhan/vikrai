import {
  deleteProductTagsWorkflow,
  updateProductTagsWorkflow,
} from "@vikrai/core-flows"
import {
  AuthenticatedvikraiRequest,
  vikraiResponse,
  refetchEntity,
} from "@vikrai/framework/http"

import {
  AdminGetProductTagParamsType,
  AdminUpdateProductTagType,
} from "../validators"
import { HttpTypes } from "@vikrai/framework/types"
import { vikraiError } from "@vikrai/framework/utils"

export const GET = async (
  req: AuthenticatedvikraiRequest<AdminGetProductTagParamsType>,
  res: vikraiResponse<HttpTypes.AdminProductTagResponse>
) => {
  const productTag = await refetchEntity(
    "product_tag",
    req.params.id,
    req.scope,
    req.queryConfig.fields
  )

  res.status(200).json({ product_tag: productTag })
}

export const POST = async (
  req: AuthenticatedvikraiRequest<AdminUpdateProductTagType>,
  res: vikraiResponse<HttpTypes.AdminProductTagResponse>
) => {
  const existingProductTag = await refetchEntity(
    "product_tag",
    req.params.id,
    req.scope,
    ["id"]
  )

  if (!existingProductTag) {
    throw new vikraiError(
      vikraiError.Types.NOT_FOUND,
      `Product tag with id "${req.params.id}" not found`
    )
  }

  const { result } = await updateProductTagsWorkflow(req.scope).run({
    input: {
      selector: { id: req.params.id },
      update: req.validatedBody,
    },
  })

  const productTag = await refetchEntity(
    "product_tag",
    result[0].id,
    req.scope,
    req.queryConfig.fields
  )

  res.status(200).json({ product_tag: productTag })
}

export const DELETE = async (
  req: AuthenticatedvikraiRequest,
  res: vikraiResponse<HttpTypes.AdminProductTagDeleteResponse>
) => {
  const id = req.params.id

  await deleteProductTagsWorkflow(req.scope).run({
    input: { ids: [id] },
  })

  res.status(200).json({
    id,
    object: "product_tag",
    deleted: true,
  })
}
