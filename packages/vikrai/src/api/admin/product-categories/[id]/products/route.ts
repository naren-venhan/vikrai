import { batchLinkProductsToCategoryWorkflow } from "@vikrai/core-flows"
import {
  AdminProductCategoryResponse,
  LinkMethodRequest,
} from "@vikrai/framework/types"
import {
  AuthenticatedvikraiRequest,
  vikraiResponse,
  refetchEntity,
} from "@vikrai/framework/http"

export const POST = async (
  req: AuthenticatedvikraiRequest<LinkMethodRequest>,
  res: vikraiResponse<AdminProductCategoryResponse>
) => {
  const { id } = req.params

  await batchLinkProductsToCategoryWorkflow(req.scope).run({
    input: { id, ...req.validatedBody },
  })

  const category = await refetchEntity(
    "product_category",
    id,
    req.scope,
    req.queryConfig.fields
  )

  res.status(200).json({ product_category: category })
}
