import {
  ContainerRegistrationKeys,
  remoteQueryObjectFromString,
} from "@vikrai/framework/utils"
import {
  AuthenticatedvikraiRequest,
  vikraiResponse,
} from "@vikrai/framework/http"
import { HttpTypes } from "@vikrai/framework/types"

export const GET = async (
  req: AuthenticatedvikraiRequest<HttpTypes.AdminPaymentFilters>,
  res: vikraiResponse<HttpTypes.AdminPaymentsResponse>
) => {
  const remoteQuery = req.scope.resolve(ContainerRegistrationKeys.REMOTE_QUERY)
  const queryObject = remoteQueryObjectFromString({
    entryPoint: "payment",
    variables: {
      filters: req.filterableFields,
      ...req.queryConfig.pagination,
    },
    fields: req.queryConfig.fields,
  })

  const { rows: payments, metadata } = await remoteQuery(queryObject)

  res.json({
    payments,
    count: metadata.count,
    offset: metadata.skip,
    limit: metadata.take,
  })
}

