import {
  AuthenticatedvikraiRequest,
  vikraiResponse,
} from "@vikrai/framework/http"
import {
  ContainerRegistrationKeys,
  remoteQueryObjectFromString,
} from "@vikrai/framework/utils"

import { createReservationsWorkflow } from "@vikrai/core-flows"
import { refetchReservation } from "./helpers"
import { HttpTypes } from "@vikrai/framework/types"

export const GET = async (
  req: AuthenticatedvikraiRequest<HttpTypes.AdminGetReservationsParams>,
  res: vikraiResponse<HttpTypes.AdminReservationListResponse>
) => {
  const remoteQuery = req.scope.resolve(ContainerRegistrationKeys.REMOTE_QUERY)

  const queryObject = remoteQueryObjectFromString({
    entryPoint: "reservation",
    variables: {
      filters: req.filterableFields,
      ...req.queryConfig.pagination,
    },
    fields: req.queryConfig.fields,
  })

  const { rows: reservations, metadata } = await remoteQuery(queryObject)

  res.json({
    reservations,
    count: metadata.count,
    offset: metadata.skip,
    limit: metadata.take,
  })
}

export const POST = async (
  req: AuthenticatedvikraiRequest<HttpTypes.AdminCreateReservation>,
  res: vikraiResponse<HttpTypes.AdminReservationResponse>
) => {
  const input = [req.validatedBody]

  const { result } = await createReservationsWorkflow(req.scope).run({
    input: { reservations: input },
  })

  const reservation = await refetchReservation(
    result[0].id,
    req.scope,
    req.queryConfig.fields
  )
  res.status(200).json({ reservation })
}

