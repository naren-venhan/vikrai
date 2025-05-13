import {
  deleteRegionsWorkflow,
  updateRegionsWorkflow,
} from "@vikrai/core-flows"
import { vikraiError } from "@vikrai/framework/utils"
import {
  AuthenticatedvikraiRequest,
  vikraiResponse,
} from "@vikrai/framework/http"
import { refetchRegion } from "../helpers"
import { AdminGetRegionParamsType, AdminUpdateRegionType } from "../validators"
import { HttpTypes } from "@vikrai/framework/types"

export const GET = async (
  req: AuthenticatedvikraiRequest<AdminGetRegionParamsType>,
  res: vikraiResponse<HttpTypes.AdminRegionResponse>
) => {
  const region = await refetchRegion(
    req.params.id,
    req.scope,
    req.queryConfig.fields
  )

  if (!region) {
    throw new vikraiError(
      vikraiError.Types.NOT_FOUND,
      `Region with id: ${req.params.id} not found`
    )
  }

  res.status(200).json({ region })
}

export const POST = async (
  req: AuthenticatedvikraiRequest<AdminUpdateRegionType>,
  res: vikraiResponse<HttpTypes.AdminRegionResponse>
) => {
  const existingRegion = await refetchRegion(req.params.id, req.scope, ["id"])
  if (!existingRegion) {
    throw new vikraiError(
      vikraiError.Types.NOT_FOUND,
      `Region with id "${req.params.id}" not found`
    )
  }

  const { result } = await updateRegionsWorkflow(req.scope).run({
    input: {
      selector: { id: req.params.id },
      update: req.validatedBody,
    },
  })

  const region = await refetchRegion(
    result[0].id,
    req.scope,
    req.queryConfig.fields
  )

  res.status(200).json({ region })
}

export const DELETE = async (
  req: AuthenticatedvikraiRequest,
  res: vikraiResponse<HttpTypes.AdminRegionDeleteResponse>
) => {
  const id = req.params.id

  await deleteRegionsWorkflow(req.scope).run({
    input: { ids: [id] },
  })

  res.status(200).json({
    id,
    object: "region",
    deleted: true,
  })
}
