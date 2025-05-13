import { batchLinkProductsToCollectionWorkflow } from "@vikrai/core-flows"
import { HttpTypes, LinkMethodRequest } from "@vikrai/framework/types"
import {
  AuthenticatedvikraiRequest,
  vikraiResponse,
} from "@vikrai/framework/http"
import { refetchCollection } from "../../helpers"

export const POST = async (
  req: AuthenticatedvikraiRequest<LinkMethodRequest>,
  res: vikraiResponse<HttpTypes.AdminCollectionResponse>
) => {
  const id = req.params.id
  const { add = [], remove = [] } = req.validatedBody

  const workflow = batchLinkProductsToCollectionWorkflow(req.scope)
  await workflow.run({
    input: {
      id,
      add,
      remove,
    },
  })

  const collection = await refetchCollection(
    req.params.id,
    req.scope,
    req.queryConfig.fields
  )

  res.status(200).json({
    collection,
  })
}
