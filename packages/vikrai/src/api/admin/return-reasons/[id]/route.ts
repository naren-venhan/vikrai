import {
  deleteReturnReasonsWorkflow,
  updateReturnReasonsWorkflow,
} from "@vikrai/core-flows"
import { AdminReturnReasonResponse, HttpTypes } from "@vikrai/framework/types"
import {
  ContainerRegistrationKeys,
  vikraiError,
  remoteQueryObjectFromString,
} from "@vikrai/framework/utils"
import {
  AuthenticatedvikraiRequest,
  vikraiResponse,
  refetchEntity,
} from "@vikrai/framework/http"

export const GET = async (
  req: AuthenticatedvikraiRequest,
  res: vikraiResponse<AdminReturnReasonResponse>
) => {
  const return_reason = await refetchEntity(
    "return_reason",
    req.params.id,
    req.scope,
    req.queryConfig.fields
  )

  if (!return_reason) {
    throw new vikraiError(
      vikraiError.Types.NOT_FOUND,
      `Return reason with id: ${req.params.id} was not found`
    )
  }

  res.json({ return_reason })
}

export const POST = async (
  req: AuthenticatedvikraiRequest<HttpTypes.AdminUpdateReturnReason>,
  res: vikraiResponse<AdminReturnReasonResponse>
) => {
  const workflow = updateReturnReasonsWorkflow(req.scope)

  const { id } = req.params
  const input = {
    selector: { id },
    update: req.validatedBody,
  }

  const { result } = await workflow.run({ input })

  const variables = { id: result[0].id }

  const queryObject = remoteQueryObjectFromString({
    entryPoint: "return_reason",
    variables,
    fields: req.queryConfig.fields,
  })

  const remoteQuery = req.scope.resolve(ContainerRegistrationKeys.REMOTE_QUERY)
  const [return_reason] = await remoteQuery(queryObject)

  res.json({ return_reason })
}

export const DELETE = async (
  req: AuthenticatedvikraiRequest,
  res: vikraiResponse<HttpTypes.AdminReturnReasonDeleteResponse>
) => {
  const { id } = req.params

  const workflow = deleteReturnReasonsWorkflow(req.scope)

  const input = {
    ids: [id],
  }
  await workflow.run({ input })

  res.json({
    id,
    object: "return_reason",
    deleted: true,
  })
}
