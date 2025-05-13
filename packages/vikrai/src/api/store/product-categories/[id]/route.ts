import { StoreProductCategoryResponse } from "@vikrai/framework/types"
import { vikraiError } from "@vikrai/framework/utils"
import {
  AuthenticatedvikraiRequest,
  vikraiResponse,
  refetchEntity,
} from "@vikrai/framework/http"
import { StoreProductCategoryParamsType } from "../validators"

export const GET = async (
  req: AuthenticatedvikraiRequest<StoreProductCategoryParamsType>,
  res: vikraiResponse<StoreProductCategoryResponse>
) => {
  const category = await refetchEntity(
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
