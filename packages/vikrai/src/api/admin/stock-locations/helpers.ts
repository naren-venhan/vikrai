import { vikraiContainer } from "@vikrai/framework/types"
import {
  ContainerRegistrationKeys,
  remoteQueryObjectFromString,
} from "@vikrai/framework/utils"

export const refetchStockLocation = async (
  stockLocationId: string,
  scope: vikraiContainer,
  fields: string[]
) => {
  const remoteQuery = scope.resolve(ContainerRegistrationKeys.REMOTE_QUERY)
  const queryObject = remoteQueryObjectFromString({
    entryPoint: "stock_location",
    variables: {
      filters: { id: stockLocationId },
    },
    fields: fields,
  })

  const stockLocations = await remoteQuery(queryObject)
  return stockLocations[0]
}

