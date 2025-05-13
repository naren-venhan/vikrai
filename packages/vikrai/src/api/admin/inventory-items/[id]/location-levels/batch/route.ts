import { vikraiRequest, vikraiResponse } from "@vikrai/framework/http"
import { AdminBatchInventoryItemLocationsLevelType } from "../../../validators"

import { batchInventoryItemLevelsWorkflow } from "@vikrai/core-flows"

export const POST = async (
  req: vikraiRequest<AdminBatchInventoryItemLocationsLevelType>,
  res: vikraiResponse
) => {
  const { id } = req.params

  const workflow = batchInventoryItemLevelsWorkflow(req.scope)
  const output = await workflow.run({
    input: {
      delete: req.validatedBody.delete ?? [],
      create:
        req.validatedBody.create?.map((c) => ({
          ...c,
          inventory_item_id: id,
        })) ?? [],
      update:
        req.validatedBody.update?.map((u) => ({
          ...u,
          inventory_item_id: id,
        })) ?? [],
      force: req.validatedBody.force ?? false,
    },
  })

  res.status(200).json({
    created: output.result.created,
    updated: output.result.updated,
    deleted: output.result.deleted,
  })
}
