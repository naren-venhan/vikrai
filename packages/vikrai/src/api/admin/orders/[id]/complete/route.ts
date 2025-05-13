import { AdditionalData, HttpTypes } from "@vikrai/framework/types"
import { completeOrderWorkflow } from "@vikrai/core-flows"
import {
  ContainerRegistrationKeys,
  remoteQueryObjectFromString,
} from "@vikrai/framework/utils"
import {
  AuthenticatedvikraiRequest,
  vikraiResponse,
} from "@vikrai/framework/http"

export const POST = async (
  req: AuthenticatedvikraiRequest<AdditionalData>,
  res: vikraiResponse<HttpTypes.AdminOrderResponse>
) => {
  const remoteQuery = req.scope.resolve(ContainerRegistrationKeys.REMOTE_QUERY)
  const { id } = req.params

  await completeOrderWorkflow(req.scope).run({
    input: {
      orderIds: [id],
      additional_data: req.validatedBody.additional_data,
    },
  })

  const queryObject = remoteQueryObjectFromString({
    entryPoint: "order",
    variables: { id },
    fields: req.queryConfig.fields,
  })

  const [order] = await remoteQuery(queryObject)

  res.status(200).json({ order })
}
