import {
  AuthenticatedvikraiRequest,
  vikraiResponse,
} from "@vikrai/framework/http"
import { HttpTypes } from "@vikrai/framework/types"
import { vikraiError } from "@vikrai/framework/utils"
import { importProductsWorkflow } from "@vikrai/core-flows"

export const POST = async (
  req: AuthenticatedvikraiRequest<HttpTypes.AdminImportProductRequest>,
  res: vikraiResponse<HttpTypes.AdminImportProductResponse>
) => {
  const input = req.file as Express.Multer.File

  if (!input) {
    throw new vikraiError(
      vikraiError.Types.INVALID_DATA,
      "No file was uploaded for importing"
    )
  }

  const { result, transaction } = await importProductsWorkflow(req.scope).run({
    input: {
      filename: input.originalname,
      fileContent: input.buffer.toString("utf-8"),
    },
  })

  res
    .status(202)
    .json({ transaction_id: transaction.transactionId, summary: result })
}

