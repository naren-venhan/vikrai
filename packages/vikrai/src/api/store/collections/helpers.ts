import { vikraiContainer } from "@vikrai/framework/types"
import {
  ContainerRegistrationKeys,
  remoteQueryObjectFromString,
} from "@vikrai/framework/utils"

export const refetchCollection = async (
  collectionId: string,
  scope: vikraiContainer,
  fields: string[]
) => {
  const remoteQuery = scope.resolve(ContainerRegistrationKeys.REMOTE_QUERY)
  const queryObject = remoteQueryObjectFromString({
    entryPoint: "product_collection",
    variables: {
      filters: { id: collectionId },
    },
    fields: fields,
  })

  const collections = await remoteQuery(queryObject)
  return collections[0]
}

