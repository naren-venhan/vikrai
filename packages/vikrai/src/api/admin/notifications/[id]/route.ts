import {
  AuthenticatedvikraiRequest,
  vikraiResponse,
  refetchEntity,
} from "@vikrai/framework/http"
import { AdminGetNotificationParamsType } from "../validators"
import { HttpTypes } from "@vikrai/framework/types"

export const GET = async (
  req: AuthenticatedvikraiRequest<AdminGetNotificationParamsType>,
  res: vikraiResponse<HttpTypes.AdminNotificationResponse>
) => {
  const notification = await refetchEntity(
    "notification",
    req.params.id,
    req.scope,
    req.queryConfig.fields
  )
  res.status(200).json({ notification })
}
