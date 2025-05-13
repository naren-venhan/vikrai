import {
  AuthenticatedvikraiRequest,
  vikraiResponse,
} from "@vikrai/framework/http"
import {
  deleteCampaignsWorkflow,
  updateCampaignsWorkflow,
} from "@vikrai/core-flows"

import { refetchCampaign } from "../helpers"
import { AdminUpdateCampaignType } from "../validators"
import { vikraiError } from "@vikrai/framework/utils"
import { AdditionalData, HttpTypes } from "@vikrai/framework/types"

export const GET = async (
  req: AuthenticatedvikraiRequest,
  res: vikraiResponse<HttpTypes.AdminCampaignResponse>
) => {
  const campaign = await refetchCampaign(
    req.params.id,
    req.scope,
    req.queryConfig.fields
  )

  if (!campaign) {
    throw new vikraiError(
      vikraiError.Types.NOT_FOUND,
      `Campaign with id: ${req.params.id} was not found`
    )
  }

  res.status(200).json({ campaign })
}

export const POST = async (
  req: AuthenticatedvikraiRequest<AdminUpdateCampaignType & AdditionalData>,
  res: vikraiResponse<HttpTypes.AdminCampaignResponse>
) => {
  const existingCampaign = await refetchCampaign(req.params.id, req.scope, [
    "id",
  ])
  if (!existingCampaign) {
    throw new vikraiError(
      vikraiError.Types.NOT_FOUND,
      `Campaign with id "${req.params.id}" not found`
    )
  }

  const { additional_data, ...rest } = req.validatedBody
  const updateCampaigns = updateCampaignsWorkflow(req.scope)
  const campaignsData = [
    {
      id: req.params.id,
      ...rest,
    },
  ]

  await updateCampaigns.run({
    input: { campaignsData, additional_data },
  })

  const campaign = await refetchCampaign(
    req.params.id,
    req.scope,
    req.queryConfig.fields
  )
  res.status(200).json({ campaign })
}

export const DELETE = async (
  req: AuthenticatedvikraiRequest,
  res: vikraiResponse<HttpTypes.AdminCampaignDeleteResponse>
) => {
  const id = req.params.id
  const deleteCampaigns = deleteCampaignsWorkflow(req.scope)

  await deleteCampaigns.run({
    input: { ids: [id] },
  })

  res.status(200).json({
    id,
    object: "campaign",
    deleted: true,
  })
}
