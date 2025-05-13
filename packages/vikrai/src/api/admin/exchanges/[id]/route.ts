import { AdminExchangeResponse } from "@vikrai/framework/types"
import { vikraiError } from "@vikrai/framework/utils"
import {
  AuthenticatedvikraiRequest,
  vikraiResponse,
  refetchEntity,
} from "@vikrai/framework/http"

export const GET = async (
  req: AuthenticatedvikraiRequest,
  res: vikraiResponse<AdminExchangeResponse>
) => {
  const exchange = await refetchEntity(
    "order_exchange",
    req.params.id,
    req.scope,
    req.queryConfig.fields
  )

  if (!exchange) {
    throw new vikraiError(
      vikraiError.Types.NOT_FOUND,
      `Exchange with id: ${req.params.id} was not found`
    )
  }

  res.status(200).json({ exchange })
}
