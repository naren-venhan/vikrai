import {
  ContainerRegistrationKeys,
  remoteQueryObjectFromString,
} from "@vikrai/framework/utils"
import { vikraiRequest, vikraiResponse } from "@vikrai/framework/http"
import { StoreReturnReasonParamsType } from "../validators"
import { HttpTypes } from "@vikrai/framework/types"

export const GET = async (
  req: vikraiRequest<StoreReturnReasonParamsType>,
  res: vikraiResponse<HttpTypes.StoreReturnReasonResponse>
) => {
  const remoteQuery = req.scope.resolve(ContainerRegistrationKeys.REMOTE_QUERY)

  const variables = { id: req.params.id }

  const queryObject = remoteQueryObjectFromString({
    entryPoint: "return_reason",
    variables,
    fields: req.queryConfig.fields,
  })

  const [return_reason] = await remoteQuery(queryObject)

  res.json({ return_reason })
}
