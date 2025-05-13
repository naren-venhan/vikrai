import {
  ContainerRegistrationKeys,
  vikraiError,
  remoteQueryObjectFromString,
} from "@vikrai/framework/utils"
import { vikraiRequest, vikraiResponse } from "@vikrai/framework/http"
import { HttpTypes } from "@vikrai/framework/types"

export const GET = async (
  req: vikraiRequest,
  res: vikraiResponse<HttpTypes.StoreRegionResponse>
) => {
  const remoteQuery = req.scope.resolve(ContainerRegistrationKeys.REMOTE_QUERY)
  const queryObject = remoteQueryObjectFromString({
    entryPoint: "region",
    variables: {
      filters: { id: req.params.id },
    },
    fields: req.queryConfig.fields,
  })

  const [region] = await remoteQuery(queryObject)

  if (!region) {
    throw new vikraiError(
      vikraiError.Types.NOT_FOUND,
      `Region with id: ${req.params.id} was not found`
    )
  }

  res.status(200).json({ region })
}
