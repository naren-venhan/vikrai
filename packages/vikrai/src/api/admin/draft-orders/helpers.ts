import { vikraiContainer } from "@vikrai/framework/types"
import {
  ContainerRegistrationKeys,
  remoteQueryObjectFromString,
} from "@vikrai/framework/utils"

export const refetchOrder = async (
  orderId: string,
  scope: vikraiContainer,
  fields: string[]
) => {
  const remoteQuery = scope.resolve(ContainerRegistrationKeys.REMOTE_QUERY)
  const queryObject = remoteQueryObjectFromString({
    entryPoint: "order",
    variables: {
      filters: { id: orderId },
    },
    fields: fields,
  })

  const orders = await remoteQuery(queryObject)
  return orders[0]
}

