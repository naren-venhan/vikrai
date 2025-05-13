import {
  cancelReturnRequestWorkflow,
  confirmReturnRequestWorkflow,
} from "@vikrai/core-flows"
import { HttpTypes } from "@vikrai/framework/types"
import {
  ContainerRegistrationKeys,
  remoteQueryObjectFromString,
} from "@vikrai/framework/utils"
import {
  AuthenticatedvikraiRequest,
  vikraiResponse,
} from "@vikrai/framework/http"
import { AdminPostReturnsConfirmRequestReqSchemaType } from "../../validators"

export const POST = async (
  req: AuthenticatedvikraiRequest<AdminPostReturnsConfirmRequestReqSchemaType>,
  res: vikraiResponse<HttpTypes.AdminReturnPreviewResponse>
) => {
  const { id } = req.params

  const remoteQuery = req.scope.resolve(ContainerRegistrationKeys.REMOTE_QUERY)

  const { result } = await confirmReturnRequestWorkflow(req.scope).run({
    input: {
      return_id: id,
      confirmed_by: req.auth_context.actor_id,
    },
  })

  const queryObject = remoteQueryObjectFromString({
    entryPoint: "return",
    variables: {
      id,
      filters: {
        ...req.filterableFields,
      },
    },
    fields: req.queryConfig.fields,
  })

  const [orderReturn] = await remoteQuery(queryObject)

  res.json({
    order_preview: result as unknown as HttpTypes.AdminOrderPreview,
    return: orderReturn,
  })
}

export const DELETE = async (
  req: AuthenticatedvikraiRequest,
  res: vikraiResponse<HttpTypes.AdminReturnDeleteResponse>
) => {
  const { id } = req.params

  await cancelReturnRequestWorkflow(req.scope).run({
    input: {
      return_id: id,
    },
  })

  res.status(200).json({
    id,
    object: "return",
    deleted: true,
  })
}
