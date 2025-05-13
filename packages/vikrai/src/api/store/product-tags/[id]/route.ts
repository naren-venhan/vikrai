import { StoreProductTagResponse } from "@vikrai/framework/types"
import {
  ContainerRegistrationKeys,
  vikraiError,
} from "@vikrai/framework/utils"
import {
  AuthenticatedvikraiRequest,
  vikraiResponse,
} from "@vikrai/framework/http"

import { StoreProductTagParamsType } from "../validators"

export const GET = async (
  req: AuthenticatedvikraiRequest<StoreProductTagParamsType>,
  res: vikraiResponse<StoreProductTagResponse>
) => {
  const query = req.scope.resolve(ContainerRegistrationKeys.QUERY)

  const { data } = await query.graph({
    entity: "product_tag",
    filters: {
      id: req.params.id,
    },
    fields: req.queryConfig.fields,
  })

  if (!data.length) {
    throw new vikraiError(
      vikraiError.Types.NOT_FOUND,
      `Product tag with id: ${req.params.id} was not found`
    )
  }
  res.json({ product_tag: data[0] })
}
