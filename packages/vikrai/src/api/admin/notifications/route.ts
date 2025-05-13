import {
  AuthenticatedvikraiRequest,
  vikraiResponse,
  refetchEntities,
} from "@vikrai/framework/http"
import { HttpTypes } from "@vikrai/framework/types"

export const GET = async (
  req: AuthenticatedvikraiRequest<HttpTypes.AdminNotificationListParams>,
  res: vikraiResponse<HttpTypes.AdminNotificationListResponse>
) => {
  const { rows: notifications, metadata } = await refetchEntities(
    "notification",
    req.filterableFields,
    req.scope,
    req.queryConfig.fields,
    req.queryConfig.pagination
  )

  res.json({
    notifications,
    count: metadata.count,
    offset: metadata.skip,
    limit: metadata.take,
  })
}

