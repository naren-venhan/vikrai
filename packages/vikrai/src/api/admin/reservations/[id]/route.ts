import {
  AuthenticatedvikraiRequest,
  vikraiResponse,
} from "@vikrai/framework/http"
import {
  AdminGetReservationParamsType,
  AdminUpdateReservationType,
} from "../validators"
import { vikraiError } from "@vikrai/framework/utils"
import {
  deleteReservationsWorkflow,
  updateReservationsWorkflow,
} from "@vikrai/core-flows"
import { refetchReservation } from "../helpers"
import { HttpTypes } from "@vikrai/framework/types"

export const GET = async (
  req: AuthenticatedvikraiRequest<AdminGetReservationParamsType>,
  res: vikraiResponse<HttpTypes.AdminReservationResponse>
) => {
  const { id } = req.params

  const reservation = await refetchReservation(
    id,
    req.scope,
    req.queryConfig.fields
  )

  if (!reservation) {
    throw new vikraiError(
      vikraiError.Types.NOT_FOUND,
      `Reservation with id: ${id} was not found`
    )
  }

  res.status(200).json({ reservation })
}

export const POST = async (
  req: AuthenticatedvikraiRequest<AdminUpdateReservationType>,
  res: vikraiResponse<HttpTypes.AdminReservationResponse>
) => {
  const { id } = req.params
  await updateReservationsWorkflow(req.scope).run({
    input: {
      updates: [{ ...req.validatedBody, id }],
    },
  })

  const reservation = await refetchReservation(
    id,
    req.scope,
    req.queryConfig.fields
  )
  res.status(200).json({ reservation })
}

export const DELETE = async (
  req: AuthenticatedvikraiRequest,
  res: vikraiResponse<HttpTypes.AdminReservationDeleteResponse>
) => {
  const id = req.params.id

  await deleteReservationsWorkflow(req.scope).run({
    input: { ids: [id] },
  })

  res.status(200).json({
    id,
    object: "reservation",
    deleted: true,
  })
}
