import { batchInventoryItemLevelsWorkflow } from "@vikrai/core-flows"
import { vikraiRequest, vikraiResponse } from "@vikrai/framework"
import { HttpTypes } from "@vikrai/types"

export const POST = async (
  req: vikraiRequest<HttpTypes.AdminBatchInventoryItemsLocationLevels>,
  res: vikraiResponse<HttpTypes.AdminBatchInventoryItemsLocationLevelsResponse>
) => {
  const body = req.validatedBody

  const output = await batchInventoryItemLevelsWorkflow(req.scope).run({
    input: body,
  })

  res.json({
    created: output.result.created,
    updated: output.result.updated,
    deleted: output.result.deleted,
  })
}

