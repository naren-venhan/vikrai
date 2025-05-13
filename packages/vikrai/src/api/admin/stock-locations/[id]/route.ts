import {
  AuthenticatedvikraiRequest,
  vikraiResponse,
} from "@vikrai/framework/http"

import {
  deleteStockLocationsWorkflow,
  updateStockLocationsWorkflow,
} from "@vikrai/core-flows"
import { vikraiError } from "@vikrai/framework/utils"
import { refetchStockLocation } from "../helpers"
import {
  AdminGetStockLocationParamsType,
  AdminUpdateStockLocationType,
} from "../validators"
import { HttpTypes } from "@vikrai/framework/types"

export const POST = async (
  req: AuthenticatedvikraiRequest<AdminUpdateStockLocationType>,
  res: vikraiResponse<HttpTypes.AdminStockLocationResponse>
) => {
  const { id } = req.params
  await updateStockLocationsWorkflow(req.scope).run({
    input: {
      selector: { id: req.params.id },
      update: req.validatedBody,
    },
  })

  const stockLocation = await refetchStockLocation(
    id,
    req.scope,
    req.queryConfig.fields
  )

  res.status(200).json({
    stock_location: stockLocation,
  })
}

export const GET = async (
  req: AuthenticatedvikraiRequest<AdminGetStockLocationParamsType>,
  res: vikraiResponse<HttpTypes.AdminStockLocationResponse>
) => {
  const { id } = req.params

  const stockLocation = await refetchStockLocation(
    id,
    req.scope,
    req.queryConfig.fields
  )

  if (!stockLocation) {
    throw new vikraiError(
      vikraiError.Types.NOT_FOUND,
      `Stock location with id: ${id} was not found`
    )
  }

  res.status(200).json({ stock_location: stockLocation })
}

export const DELETE = async (
  req: AuthenticatedvikraiRequest,
  res: vikraiResponse<HttpTypes.AdminStockLocationDeleteResponse>
) => {
  const { id } = req.params

  await deleteStockLocationsWorkflow(req.scope).run({
    input: { ids: [id] },
  })

  res.status(200).json({
    id,
    object: "stock_location",
    deleted: true,
  })
}
