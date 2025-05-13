import { batchLinksWorkflow } from "@vikrai/core-flows"
import {
  AuthenticatedvikraiRequest,
  vikraiResponse,
} from "@vikrai/framework/http"
import { buildBatchVariantInventoryData } from "../../../../helpers"
import { AdminBatchVariantInventoryItemsType } from "../../../../validators"
import { HttpTypes } from "@vikrai/framework/types"

export const POST = async (
  req: AuthenticatedvikraiRequest<AdminBatchVariantInventoryItemsType>,
  res: vikraiResponse<HttpTypes.AdminProductVariantInventoryBatchResponse>
) => {
  const { create = [], update = [], delete: toDelete = [] } = req.validatedBody

  const { result } = await batchLinksWorkflow(req.scope).run({
    input: {
      create: buildBatchVariantInventoryData(create),
      update: buildBatchVariantInventoryData(update),
      delete: buildBatchVariantInventoryData(toDelete),
    },
  })

  res.status(200).json({
    created: result.created,
    updated: result.updated,
    deleted: result.deleted,
  } as unknown as HttpTypes.AdminProductVariantInventoryBatchResponse)
}
