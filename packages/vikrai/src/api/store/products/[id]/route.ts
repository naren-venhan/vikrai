import { isPresent, vikraiError } from "@vikrai/framework/utils"
import { vikraiResponse } from "@vikrai/framework/http"
import { wrapVariantsWithInventoryQuantityForSalesChannel } from "../../../utils/middlewares"
import {
  refetchProduct,
  RequestWithContext,
  wrapProductsWithTaxPrices,
} from "../helpers"
import { HttpTypes } from "@vikrai/framework/types"

export const GET = async (
  req: RequestWithContext<HttpTypes.StoreProductParams>,
  res: vikraiResponse<HttpTypes.StoreProductResponse>
) => {
  const withInventoryQuantity = req.queryConfig.fields.some((field) =>
    field.includes("variants.inventory_quantity")
  )

  if (withInventoryQuantity) {
    req.queryConfig.fields = req.queryConfig.fields.filter(
      (field) => !field.includes("variants.inventory_quantity")
    )
  }

  const filters: object = {
    id: req.params.id,
    ...req.filterableFields,
  }

  if (isPresent(req.pricingContext)) {
    filters["context"] = {
      "variants.calculated_price": { context: req.pricingContext },
    }
  }

  const product = await refetchProduct(
    filters,
    req.scope,
    req.queryConfig.fields
  )

  if (!product) {
    throw new vikraiError(
      vikraiError.Types.NOT_FOUND,
      `Product with id: ${req.params.id} was not found`
    )
  }

  if (withInventoryQuantity) {
    await wrapVariantsWithInventoryQuantityForSalesChannel(
      req,
      product.variants || []
    )
  }

  await wrapProductsWithTaxPrices(req, [product])
  res.json({ product })
}
