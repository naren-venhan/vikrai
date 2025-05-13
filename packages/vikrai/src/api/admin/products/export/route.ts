import {
  AuthenticatedvikraiRequest,
  vikraiResponse,
} from "@vikrai/framework/http"
import { HttpTypes } from "@vikrai/framework/types"
import { remapKeysForProduct } from "../helpers"
import { exportProductsWorkflow } from "@vikrai/core-flows"

export const POST = async (
  req: AuthenticatedvikraiRequest,
  res: vikraiResponse<HttpTypes.AdminExportProductResponse>
) => {
  const selectFields = remapKeysForProduct(req.queryConfig.fields ?? [])
  const input = { select: selectFields, filter: req.filterableFields }

  const { transaction } = await exportProductsWorkflow(req.scope).run({
    input,
  })

  res.status(202).json({ transaction_id: transaction.transactionId })
}

