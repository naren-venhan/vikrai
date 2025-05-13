import {
  deleteShippingProfileWorkflow,
  updateShippingProfilesWorkflow,
} from "@vikrai/core-flows"
import { HttpTypes, IFulfillmentModuleService } from "@vikrai/framework/types"
import { Modules } from "@vikrai/framework/utils"
import {
  AuthenticatedvikraiRequest,
  vikraiResponse,
} from "@vikrai/framework/http"
import { refetchShippingProfile } from "../helpers"
import {
  AdminGetShippingProfileParamsType,
  AdminUpdateShippingProfileType,
} from "../validators"

export const GET = async (
  req: AuthenticatedvikraiRequest<AdminGetShippingProfileParamsType>,
  res: vikraiResponse<HttpTypes.AdminShippingProfileResponse>
) => {
  const shippingProfile = await refetchShippingProfile(
    req.params.id,
    req.scope,
    req.queryConfig.fields
  )

  res.status(200).json({ shipping_profile: shippingProfile })
}

export const DELETE = async (
  req: AuthenticatedvikraiRequest,
  res: vikraiResponse<HttpTypes.AdminShippingProfileDeleteResponse>
) => {
  const { id } = req.params

  const fulfillmentModuleService = req.scope.resolve<IFulfillmentModuleService>(
    Modules.FULFILLMENT
  )

  // Test if exists
  await fulfillmentModuleService.retrieveShippingProfile(id)

  await deleteShippingProfileWorkflow(req.scope).run({
    input: { ids: [id] },
  })

  res.status(200).json({
    id,
    object: "shipping_profile",
    deleted: true,
  })
}

export const POST = async (
  req: AuthenticatedvikraiRequest<AdminUpdateShippingProfileType>,
  res: vikraiResponse<HttpTypes.AdminShippingProfileResponse>
) => {
  const { id } = req.params

  await updateShippingProfilesWorkflow(req.scope).run({
    input: { selector: { id }, update: req.body },
  })

  const shippingProfile = await refetchShippingProfile(
    req.params.id,
    req.scope,
    req.queryConfig.fields
  )

  res.status(200).json({
    shipping_profile: shippingProfile,
  })
}
