import {
  AuthenticatedvikraiRequest,
  vikraiResponse,
  refetchEntities,
} from "@vikrai/framework/http"
import { HttpTypes } from "@vikrai/framework/types"
import { wrapVariantsWithTotalInventoryQuantity } from "../../utils/middlewares"
import { remapKeysForVariant, remapVariantResponse } from "../products/helpers"

export const GET = async (
  req: AuthenticatedvikraiRequest<HttpTypes.AdminProductVariantParams>,
  res: vikraiResponse<HttpTypes.AdminProductVariantListResponse>
) => {
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
    { ...req.filterableFields },
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

