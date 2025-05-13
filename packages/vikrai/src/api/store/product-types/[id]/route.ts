import { StoreProductTypeResponse } from "@vikrai/framework/types"
import {
  ContainerRegistrationKeys,
  vikraiError,
} from "@vikrai/framework/utils"
import {
  AuthenticatedvikraiRequest,
  vikraiResponse,
} from "@vikrai/framework/http"

import { StoreProductTypeParamsType } from "../validators"

export const GET = async (
  req: AuthenticatedvikraiRequest<StoreProductTypeParamsType>,
  res: vikraiResponse<StoreProductTypeResponse>
) => {
  const query = req.scope.resolve(ContainerRegistrationKeys.QUERY)

  const { data } = await query.graph({
    entity: "product_type",
    filters: {
      id: req.params.id,
    },
    fields: req.queryConfig.fields,
  })

  if (!data.length) {
    throw new vikraiError(
      vikraiError.Types.NOT_FOUND,
      `Product type with id: ${req.params.id} was not found`
    )
  }
  res.json({ product_type: data[0] })
}
