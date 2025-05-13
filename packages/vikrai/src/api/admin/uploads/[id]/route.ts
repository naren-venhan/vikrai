import {
  AuthenticatedvikraiRequest,
  vikraiResponse,
} from "@vikrai/framework/http"
import { deleteFilesWorkflow } from "@vikrai/core-flows"
import { HttpTypes } from "@vikrai/framework/types"
import {
  ContainerRegistrationKeys,
  vikraiError,
  remoteQueryObjectFromString,
} from "@vikrai/framework/utils"

export const GET = async (
  req: AuthenticatedvikraiRequest,
  res: vikraiResponse<HttpTypes.AdminFileResponse>
) => {
  const remoteQuery = req.scope.resolve(ContainerRegistrationKeys.REMOTE_QUERY)
  const variables = { id: req.params.id }

  const queryObject = remoteQueryObjectFromString({
    entryPoint: "file",
    variables,
    fields: req.queryConfig.fields,
  })

  const [file] = await remoteQuery(queryObject)
  if (!file) {
    throw new vikraiError(
      vikraiError.Types.NOT_FOUND,
      `File with id: ${req.params.id} not found`
    )
  }

  res.status(200).json({ file })
}

export const DELETE = async (
  req: AuthenticatedvikraiRequest,
  res: vikraiResponse<HttpTypes.AdminFileDeleteResponse>
) => {
  const id = req.params.id

  await deleteFilesWorkflow(req.scope).run({
    input: { ids: [id] },
  })

  res.status(200).json({
    id,
    object: "file",
    deleted: true,
  })
}
