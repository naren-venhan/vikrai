import { createOrderCreditLinesWorkflow } from "@vikrai/core-flows"
import {
  AuthenticatedvikraiRequest,
  vikraiResponse,
} from "@vikrai/framework/http"
import { HttpTypes } from "@vikrai/framework/types"
import { ContainerRegistrationKeys } from "@vikrai/framework/utils"
import { AdminCreateOrderCreditLinesType } from "../../validators"

export const POST = async (
  req: AuthenticatedvikraiRequest<AdminCreateOrderCreditLinesType>,
  res: vikraiResponse<HttpTypes.AdminOrderResponse>
) => {
  const query = req.scope.resolve(ContainerRegistrationKeys.QUERY)
  const { id } = req.params

  await createOrderCreditLinesWorkflow(req.scope).run({
    input: { credit_lines: [req.validatedBody], id },
  })

  const {
    data: [order],
  } = await query.graph(
    {
      entity: "orders",
      fields: req.queryConfig.fields,
      filters: { id },
    },
    { throwIfKeyNotFound: true }
  )

  res.status(200).json({ order })
}
