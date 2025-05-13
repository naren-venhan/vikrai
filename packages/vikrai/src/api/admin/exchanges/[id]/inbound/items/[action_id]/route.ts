import {
  removeItemReturnActionWorkflow,
  updateRequestItemReturnWorkflow,
} from "@vikrai/core-flows"
import {
  AuthenticatedvikraiRequest,
  vikraiResponse,
  refetchEntity,
} from "@vikrai/framework/http"
import { HttpTypes } from "@vikrai/framework/types"
import {
  ContainerRegistrationKeys,
  remoteQueryObjectFromString,
} from "@vikrai/framework/utils"
import { defaultAdminDetailsReturnFields } from "../../../../../returns/query-config"
import { AdminPostExchangesRequestItemsReturnActionReqSchemaType } from "../../../../validators"

export const POST = async (
  req: AuthenticatedvikraiRequest<AdminPostExchangesRequestItemsReturnActionReqSchemaType>,
  res: vikraiResponse<HttpTypes.AdminExchangeReturnResponse>
) => {
  const { id, action_id } = req.params

  const remoteQuery = req.scope.resolve(ContainerRegistrationKeys.REMOTE_QUERY)

  const [exchange] = await remoteQuery(
    remoteQueryObjectFromString({
      entryPoint: "order_exchange",
      variables: {
        id,
      },
      fields: ["id", "return_id"],
    }),
    {
      throwIfKeyNotFound: true,
    }
  )

  const { result } = await updateRequestItemReturnWorkflow(req.scope).run({
    input: {
      data: { ...req.validatedBody },
      return_id: exchange.return_id,
      exchange_id: exchange.id,
      action_id,
    },
  })

  const queryObject = remoteQueryObjectFromString({
    entryPoint: "return",
    variables: {
      id: exchange.return_id,
    },
    fields: defaultAdminDetailsReturnFields,
  })

  const [orderReturn] = await remoteQuery(queryObject)

  res.json({
    order_preview: result as unknown as HttpTypes.AdminOrderPreview,
    return: orderReturn,
  })
}

export const DELETE = async (
  req: AuthenticatedvikraiRequest,
  res: vikraiResponse<HttpTypes.AdminExchangeReturnResponse>
) => {
  const remoteQuery = req.scope.resolve(ContainerRegistrationKeys.REMOTE_QUERY)

  const { id, action_id } = req.params

  const exchange = await refetchEntity("order_exchange", id, req.scope, [
    "return_id",
  ])

  const { result: orderPreview } = await removeItemReturnActionWorkflow(
    req.scope
  ).run({
    input: {
      return_id: exchange.return_id,
      action_id,
    },
  })

  const queryObject = remoteQueryObjectFromString({
    entryPoint: "return",
    variables: {
      id: exchange.return_id,
    },
    fields: defaultAdminDetailsReturnFields,
  })

  const [orderReturn] = await remoteQuery(queryObject)

  res.json({
    order_preview: orderPreview as unknown as HttpTypes.AdminOrderPreview,
    return: orderReturn,
  })
}
