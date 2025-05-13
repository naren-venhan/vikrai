import { archiveOrderWorkflow } from "@vikrai/core-flows"
import {
  ContainerRegistrationKeys,
  remoteQueryObjectFromString,
} from "@vikrai/framework/utils"
import {
  AuthenticatedvikraiRequest,
  vikraiResponse,
} from "@vikrai/framework/http"
import { HttpTypes } from "@vikrai/framework/types"

export const POST = async (
  req: AuthenticatedvikraiRequest,
  res: vikraiResponse<HttpTypes.AdminOrderResponse>
) => {
  const remoteQuery = req.scope.resolve(ContainerRegistrationKeys.REMOTE_QUERY)
  const { id } = req.params

  await archiveOrderWorkflow(req.scope).run({
    input: { orderIds: [id] },
  })

  const queryObject = remoteQueryObjectFromString({
    entryPoint: "order",
    variables: { id },
    fields: req.queryConfig.fields,
  })

  const [order] = await remoteQuery(queryObject)

  res.status(200).json({ order })
}
