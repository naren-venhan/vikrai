import { HttpTypes } from "@vikrai/framework/types"
import {
  AuthenticatedvikraiRequest,
  vikraiResponse,
  refetchEntities,
  refetchEntity,
} from "@vikrai/framework/http"
import { createPricePreferencesWorkflow } from "@vikrai/core-flows"

export const GET = async (
  req: AuthenticatedvikraiRequest<HttpTypes.AdminPricePreferenceListParams>,
  res: vikraiResponse<HttpTypes.AdminPricePreferenceListResponse>
) => {
  const { rows: price_preferences, metadata } = await refetchEntities(
    "price_preference",
    req.filterableFields,
    req.scope,
    req.queryConfig.fields,
    req.queryConfig.pagination
  )
  res.json({
    price_preferences: price_preferences,
    count: metadata.count,
    offset: metadata.skip,
    limit: metadata.take,
  })
}

export const POST = async (
  req: AuthenticatedvikraiRequest<HttpTypes.AdminCreatePricePreference>,
  res: vikraiResponse<HttpTypes.AdminPricePreferenceResponse>
) => {
  const workflow = createPricePreferencesWorkflow(req.scope)
  const { result } = await workflow.run({
    input: [req.validatedBody],
  })

  const price_preference = await refetchEntity(
    "price_preference",
    result[0].id,
    req.scope,
    req.queryConfig.fields
  )

  res.status(200).json({ price_preference })
}

