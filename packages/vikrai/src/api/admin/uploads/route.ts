import { uploadFilesWorkflow } from "@vikrai/core-flows"
import {
  AuthenticatedvikraiRequest,
  vikraiResponse,
} from "@vikrai/framework/http"
import { vikraiError } from "@vikrai/framework/utils"
import { HttpTypes } from "@vikrai/framework/types"

export const POST = async (
  req: AuthenticatedvikraiRequest<HttpTypes.AdminUploadFile>,
  res: vikraiResponse<HttpTypes.AdminFileListResponse>
) => {
  const input = req.files as Express.Multer.File[]

  if (!input?.length) {
    throw new vikraiError(
      vikraiError.Types.INVALID_DATA,
      "No files were uploaded"
    )
  }

  const { result } = await uploadFilesWorkflow(req.scope).run({
    input: {
      files: input?.map((f) => ({
        filename: f.originalname,
        mimeType: f.mimetype,
        content: f.buffer.toString("binary"),
        access: "public",
      })),
    },
  })

  res.status(200).json({ files: result })
}

