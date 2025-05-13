import { batchProductsWorkflow } from "@vikrai/core-flows"
import {
  AuthenticatedvikraiRequest,
  vikraiResponse,
} from "@vikrai/framework/http"
import { refetchBatchProducts, remapProductResponse } from "../helpers"
import { HttpTypes } from "@vikrai/framework/types"

export const POST = async (
  req: AuthenticatedvikraiRequest<HttpTypes.AdminBatchProductRequest>,
  res: vikraiResponse<HttpTypes.AdminBatchProductResponse>
) => {
  const { result } = await batchProductsWorkflow(req.scope).run({
    input: req.validatedBody,
  })

  const batchResults = await refetchBatchProducts(
    result,
    req.scope,
    req.queryConfig.fields
  )

  res.status(200).json({
    created: batchResults.created.map(remapProductResponse),
    updated: batchResults.updated.map(remapProductResponse),
    deleted: batchResults.deleted,
  })
}

