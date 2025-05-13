import {
  deletePriceListsWorkflow,
  updatePriceListsWorkflow,
} from "@vikrai/core-flows"
import {
  AuthenticatedvikraiRequest,
  vikraiResponse,
} from "@vikrai/framework/http"
import { fetchPriceList } from "../helpers"
import { AdminUpdatePriceListType } from "../validators"
import { HttpTypes } from "@vikrai/framework/types"

export const GET = async (
  req: AuthenticatedvikraiRequest,
  res: vikraiResponse<HttpTypes.AdminPriceListResponse>
) => {
  const price_list = await fetchPriceList(
    req.params.id,
    req.scope,
    req.queryConfig.fields
  )

  res.status(200).json({ price_list })
}

export const POST = async (
  req: AuthenticatedvikraiRequest<AdminUpdatePriceListType>,
  res: vikraiResponse<HttpTypes.AdminPriceListResponse>
) => {
  const id = req.params.id
  const workflow = updatePriceListsWorkflow(req.scope)

  await workflow.run({
    input: { price_lists_data: [{ ...req.validatedBody, id }] },
  })

  const price_list = await fetchPriceList(id, req.scope, req.queryConfig.fields)

  res.status(200).json({ price_list })
}

export const DELETE = async (
  req: AuthenticatedvikraiRequest,
  res: vikraiResponse<HttpTypes.AdminPriceListDeleteResponse>
) => {
  const id = req.params.id
  const workflow = deletePriceListsWorkflow(req.scope)

  await workflow.run({
    input: { ids: [id] },
  })

  res.status(200).json({
    id,
    object: "price_list",
    deleted: true,
  })
}
