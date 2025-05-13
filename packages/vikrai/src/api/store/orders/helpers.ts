import { vikraiContainer } from "@vikrai/framework/types"
import { refetchEntity } from "@vikrai/framework/http"

export const refetchOrder = async (
  idOrFilter: string | object,
  scope: vikraiContainer,
  fields: string[]
) => {
  return await refetchEntity("order", idOrFilter, scope, fields)
}

