import {
  deleteProductCategoriesWorkflow,
  updateProductCategoriesWorkflow,
} from "@vikrai/core-flows"
import {
  AdminProductCategoryResponse,
  HttpTypes,
} from "@vikrai/framework/types"
import {
  AuthenticatedvikraiRequest,
  vikraiResponse,
  refetchEntities,
} from "@vikrai/framework/http"
import {
  AdminProductCategoryParamsType,
  AdminUpdateProductCategoryType,
} from "../validators"
import { vikraiError } from "@vikrai/framework/utils"

export const GET = async (
  req: AuthenticatedvikraiRequest<AdminProductCategoryParamsType>,
  res: vikraiResponse<AdminProductCategoryResponse>
) => {
  const [category] = await refetchEntities(
    "product_category",
    { id: req.params.id, ...req.filterableFields },
    req.scope,
    req.queryConfig.fields
  )

  if (!category) {
    throw new vikraiError(
      vikraiError.Types.NOT_FOUND,
      `Product category with id: ${req.params.id} was not found`
    )
  }

  res.json({ product_category: category })
}

export const POST = async (
  req: AuthenticatedvikraiRequest<AdminUpdateProductCategoryType>,
  res: vikraiResponse<AdminProductCategoryResponse>
) => {
  const { id } = req.params

  await updateProductCategoriesWorkflow(req.scope).run({
    input: { selector: { id }, update: req.validatedBody },
  })

  const [category] = await refetchEntities(
    "product_category",
    { id, ...req.filterableFields },
    req.scope,
    req.queryConfig.fields
  )

  res.status(200).json({ product_category: category })
}

export const DELETE = async (
  req: AuthenticatedvikraiRequest,
  res: vikraiResponse<HttpTypes.AdminProductCategoryDeleteResponse>
) => {
  const id = req.params.id

  await deleteProductCategoriesWorkflow(req.scope).run({
    input: [id],
  })

  res.status(200).json({
    id,
    object: "product_category",
    deleted: true,
  })
}
