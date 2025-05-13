import {
  deleteSalesChannelsWorkflow,
  updateSalesChannelsWorkflow,
} from "@vikrai/core-flows"
import { vikraiError } from "@vikrai/framework/utils"
import {
  AuthenticatedvikraiRequest,
  vikraiResponse,
} from "@vikrai/framework/http"
import { refetchSalesChannel } from "../helpers"
import {
  AdminGetSalesChannelParamsType,
  AdminUpdateSalesChannelType,
} from "../validators"
import { HttpTypes } from "@vikrai/framework/types"

export const GET = async (
  req: AuthenticatedvikraiRequest<AdminGetSalesChannelParamsType>,
  res: vikraiResponse<HttpTypes.AdminSalesChannelResponse>
) => {
  const salesChannel = await refetchSalesChannel(
    req.params.id,
    req.scope,
    req.queryConfig.fields
  )

  if (!salesChannel) {
    throw new vikraiError(
      vikraiError.Types.NOT_FOUND,
      `Sales channel with id: ${req.params.id} not found`
    )
  }

  res.json({ sales_channel: salesChannel })
}

export const POST = async (
  req: AuthenticatedvikraiRequest<AdminUpdateSalesChannelType>,
  res: vikraiResponse<HttpTypes.AdminSalesChannelResponse>
) => {
  const existingSalesChannel = await refetchSalesChannel(
    req.params.id,
    req.scope,
    ["id"]
  )

  if (!existingSalesChannel) {
    throw new vikraiError(
      vikraiError.Types.NOT_FOUND,
      `Sales channel with id "${req.params.id}" not found`
    )
  }

  await updateSalesChannelsWorkflow(req.scope).run({
    input: {
      selector: { id: req.params.id },
      update: req.validatedBody,
    },
  })

  const salesChannel = await refetchSalesChannel(
    req.params.id,
    req.scope,
    req.queryConfig.fields
  )
  res.status(200).json({ sales_channel: salesChannel })
}

export const DELETE = async (
  req: AuthenticatedvikraiRequest,
  res: vikraiResponse<HttpTypes.AdminSalesChannelDeleteResponse>
) => {
  const id = req.params.id

  await deleteSalesChannelsWorkflow(req.scope).run({
    input: { ids: [id] },
  })

  res.status(200).json({
    id,
    object: "sales-channel",
    deleted: true,
  })
}
