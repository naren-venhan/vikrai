import { createProductVariantsWorkflow } from "@vikrai/core-flows"
import { AdditionalData, HttpTypes } from "@vikrai/framework/types"
import {
  AuthenticatedvikraiRequest,
  vikraiResponse,
} from "@vikrai/framework/http"
import { wrapVariantsWithTotalInventoryQuantity } from "../../../../utils/middlewares"
import { refetchEntities, refetchEntity } from "@vikrai/framework/http"
import {
  remapKeysForProduct,
  remapKeysForVariant,
  remapProductResponse,
  remapVariantResponse,
} from "../../helpers"

export const GET = async (
  req: AuthenticatedvikraiRequest<HttpTypes.AdminProductVariantParams>,
  res: vikraiResponse<HttpTypes.AdminProductVariantListResponse>
) => {
  const productId = req.params.id

  const withInventoryQuantity = req.queryConfig.fields.some((field) =>
    field.includes("inventory_quantity")
  )

  if (withInventoryQuantity) {
    req.queryConfig.fields = req.queryConfig.fields.filter(
      (field) => !field.includes("inventory_quantity")
    )
  }

  const { rows: variants, metadata } = await refetchEntities(
    "variant",
    { ...req.filterableFields, product_id: productId },
    req.scope,
    remapKeysForVariant(req.queryConfig.fields ?? []),
    req.queryConfig.pagination
  )

  if (withInventoryQuantity) {
    await wrapVariantsWithTotalInventoryQuantity(req, variants || [])
  }

  res.json({
    variants: variants.map(remapVariantResponse),
    count: metadata.count,
    offset: metadata.skip,
    limit: metadata.take,
  })
}

export const POST = async (
  req: AuthenticatedvikraiRequest<
    HttpTypes.AdminCreateProductVariant & AdditionalData
  >,
  res: vikraiResponse<HttpTypes.AdminProductResponse>
) => {
  const productId = req.params.id
  const { additional_data, ...rest } = req.validatedBody

  const input = [
    {
      ...rest,
      product_id: productId,
    },
  ]

  await createProductVariantsWorkflow(req.scope).run({
    input: { product_variants: input, additional_data },
  })

  const product = await refetchEntity(
    "product",
    productId,
    req.scope,
    remapKeysForProduct(req.queryConfig.fields ?? [])
  )

  res.status(200).json({ product: remapProductResponse(product) })
}
