import {
  ContainerRegistrationKeys,
  vikraiError,
  remoteQueryObjectFromString,
} from "@vikrai/framework/utils"
import { vikraiRequest, vikraiResponse } from "@vikrai/framework/http"
import { HttpTypes } from "@vikrai/framework/types"

export const GET = async (
  req: vikraiRequest,
  res: vikraiResponse<HttpTypes.AdminCurrencyResponse>
) => {
  const remoteQuery = req.scope.resolve(ContainerRegistrationKeys.REMOTE_QUERY)

  const variables = { filters: { code: req.params.code } }

  const queryObject = remoteQueryObjectFromString({
    entryPoint: "currency",
    variables,
    fields: req.queryConfig.fields,
  })

  const [currency] = await remoteQuery(queryObject)
  if (!currency) {
    throw new vikraiError(
      vikraiError.Types.NOT_FOUND,
      `Currency with code: ${req.params.code} was not found`
    )
  }

  res.status(200).json({ currency })
}
