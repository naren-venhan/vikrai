import { vikraiContainer } from "@vikrai/framework/types"
import {
  ContainerRegistrationKeys,
  remoteQueryObjectFromString,
} from "@vikrai/framework/utils"

export const refetchApiKey = async (
  apiKeyId: string,
  scope: vikraiContainer,
  fields: string[]
) => {
  const remoteQuery = scope.resolve(ContainerRegistrationKeys.REMOTE_QUERY)
  const queryObject = remoteQueryObjectFromString({
    entryPoint: "api_key",
    variables: {
      filters: { id: apiKeyId },
    },
    fields: fields,
  })

  const apiKeys = await remoteQuery(queryObject)
  return apiKeys[0]
}

