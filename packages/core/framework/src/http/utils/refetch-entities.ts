import { vikraiContainer } from "@vikrai/types"
import {
  ContainerRegistrationKeys,
  isString,
  remoteQueryObjectFromString,
} from "@vikrai/utils"
import { vikraiRequest } from "../types"

export const refetchEntities = async (
  entryPoint: string,
  idOrFilter: string | object,
  scope: vikraiContainer,
  fields: string[],
  pagination?: vikraiRequest["queryConfig"]["pagination"]
) => {
  const remoteQuery = scope.resolve(ContainerRegistrationKeys.REMOTE_QUERY)
  const filters = isString(idOrFilter) ? { id: idOrFilter } : idOrFilter
  let context: object = {}

  if ("context" in filters) {
    if (filters.context) {
      context = filters.context!
    }

    delete filters.context
  }

  const variables = { filters, ...context, ...pagination }

  const queryObject = remoteQueryObjectFromString({
    entryPoint,
    variables,
    fields,
  })

  return await remoteQuery(queryObject)
}

export const refetchEntity = async (
  entryPoint: string,
  idOrFilter: string | object,
  scope: vikraiContainer,
  fields: string[]
) => {
  const [entity] = await refetchEntities(entryPoint, idOrFilter, scope, fields)

  return entity
}

