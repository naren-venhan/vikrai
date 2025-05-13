import {
  AuthenticatedvikraiRequest,
  vikraiResponse,
  refetchEntity,
} from "@vikrai/framework/http"
import { vikraiError } from "@vikrai/framework/utils"
import { AdminClaimResponse } from "@vikrai/framework/types"

export const GET = async (
  req: AuthenticatedvikraiRequest,
  res: vikraiResponse<AdminClaimResponse>
) => {
  const claim = await refetchEntity(
    "order_claim",
    req.params.id,
    req.scope,
    req.queryConfig.fields
  )

  if (!claim) {
    throw new vikraiError(
      vikraiError.Types.NOT_FOUND,
      `Claim with id: ${req.params.id} was not found`
    )
  }

  res.status(200).json({ claim })
}
