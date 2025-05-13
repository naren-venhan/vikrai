import {
  deletePricePreferencesWorkflow,
  updatePricePreferencesWorkflow,
} from "@vikrai/core-flows"

import { HttpTypes } from "@vikrai/framework/types"
import {
  AuthenticatedvikraiRequest,
  vikraiResponse,
  refetchEntity,
} from "@vikrai/framework/http"

export const GET = async (
  req: AuthenticatedvikraiRequest,
  res: vikraiResponse<HttpTypes.AdminPricePreferenceResponse>
) => {
  const price_preference = await refetchEntity(
    "price_preference",
    req.params.id,
    req.scope,
    req.queryConfig.fields
  )

  res.status(200).json({ price_preference })
}

export const POST = async (
  req: AuthenticatedvikraiRequest<HttpTypes.AdminUpdatePricePreference>,
  res: vikraiResponse<HttpTypes.AdminPricePreferenceResponse>
) => {
  const id = req.params.id
  const workflow = updatePricePreferencesWorkflow(req.scope)

  await workflow.run({
    input: { selector: { id: [id] }, update: req.body },
  })

  const price_preference = await refetchEntity(
    "price_preference",
    id,
    req.scope,
    req.queryConfig.fields
  )

  res.status(200).json({ price_preference })
}

export const DELETE = async (
  req: AuthenticatedvikraiRequest,
  res: vikraiResponse<HttpTypes.AdminPricePreferenceDeleteResponse>
) => {
  const id = req.params.id
  const workflow = deletePricePreferencesWorkflow(req.scope)

  await workflow.run({
    input: [id],
  })

  res.status(200).json({
    id,
    object: "price_preference",
    deleted: true,
  })
}
