import {
  deleteProductsWorkflow,
  updateProductsWorkflow,
} from "@vikrai/core-flows"
import {
  AuthenticatedvikraiRequest,
  vikraiResponse,
} from "@vikrai/framework/http"
import { remapKeysForProduct, remapProductResponse } from "../helpers"
import { vikraiError } from "@vikrai/framework/utils"
import { AdditionalData, HttpTypes } from "@vikrai/framework/types"
import { refetchEntity } from "@vikrai/framework/http"

export const GET = async (
  req: AuthenticatedvikraiRequest,
  res: vikraiResponse<HttpTypes.AdminProductResponse>
) => {
  const selectFields = remapKeysForProduct(req.queryConfig.fields ?? [])
  const product = await refetchEntity(
    "product",
    req.params.id,
    req.scope,
    selectFields
  )

  if (!product) {
    throw new vikraiError(vikraiError.Types.NOT_FOUND, "Product not found")
  }

  res.status(200).json({ product: remapProductResponse(product) })
}

export const POST = async (
  req: AuthenticatedvikraiRequest<
    HttpTypes.AdminUpdateProduct & AdditionalData
  >,
  res: vikraiResponse<HttpTypes.AdminProductResponse>
) => {
  const { additional_data, ...update } = req.validatedBody

  const existingProduct = await refetchEntity(
    "product",
    req.params.id,
    req.scope,
    ["id"]
  )
  /**
   * Check if the product exists with the id or not before calling the workflow.
   */
  if (!existingProduct) {
    throw new vikraiError(
      vikraiError.Types.NOT_FOUND,
      `Product with id "${req.params.id}" not found`
    )
  }

  const { result } = await updateProductsWorkflow(req.scope).run({
    input: {
      selector: { id: req.params.id },
      update,
      additional_data,
    },
  })

  const product = await refetchEntity(
    "product",
    result[0].id,
    req.scope,
    remapKeysForProduct(req.queryConfig.fields ?? [])
  )

  res.status(200).json({ product: remapProductResponse(product) })
}

export const DELETE = async (
  req: AuthenticatedvikraiRequest,
  res: vikraiResponse<HttpTypes.AdminProductDeleteResponse>
) => {
  const id = req.params.id

  await deleteProductsWorkflow(req.scope).run({
    input: { ids: [id] },
  })

  res.status(200).json({
    id,
    object: "product",
    deleted: true,
  })
}
