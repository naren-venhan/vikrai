import { linkCustomerGroupsToCustomerWorkflow } from "@vikrai/core-flows"
import {
  AuthenticatedvikraiRequest,
  vikraiResponse,
} from "@vikrai/framework/http"

import { HttpTypes, LinkMethodRequest } from "@vikrai/framework/types"

import { refetchCustomer } from "../../helpers"

export const POST = async (
  req: AuthenticatedvikraiRequest<LinkMethodRequest>,
  res: vikraiResponse<HttpTypes.AdminCustomerResponse>
) => {
  const { id } = req.params
  const { add, remove } = req.validatedBody

  const workflow = linkCustomerGroupsToCustomerWorkflow(req.scope)
  await workflow.run({
    input: {
      id,
      add,
      remove,
    },
  })

  const customer = await refetchCustomer(id, req.scope, req.queryConfig.fields)

  res.status(200).json({ customer: customer })
}
