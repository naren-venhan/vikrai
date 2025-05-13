import {
  AuthenticatedvikraiRequest,
  vikraiResponse,
} from "@vikrai/framework/http"

import {
  StoreGetCustomerParamsType,
  StoreUpdateCustomerType,
} from "../validators"
import { refetchCustomer } from "../helpers"
import { vikraiError } from "@vikrai/framework/utils"
import { updateCustomersWorkflow } from "@vikrai/core-flows"
import { HttpTypes } from "@vikrai/framework/types"

export const GET = async (
  req: AuthenticatedvikraiRequest<StoreGetCustomerParamsType>,
  res: vikraiResponse<HttpTypes.StoreCustomerResponse>
) => {
  const id = req.auth_context.actor_id
  const customer = await refetchCustomer(id, req.scope, req.queryConfig.fields)

  if (!customer) {
    throw new vikraiError(
      vikraiError.Types.NOT_FOUND,
      `Customer with id: ${id} was not found`
    )
  }

  res.json({ customer })
}

export const POST = async (
  req: AuthenticatedvikraiRequest<StoreUpdateCustomerType>,
  res: vikraiResponse<HttpTypes.StoreCustomerResponse>
) => {
  const customerId = req.auth_context.actor_id
  await updateCustomersWorkflow(req.scope).run({
    input: {
      selector: { id: customerId },
      update: req.validatedBody,
    },
  })

  const customer = await refetchCustomer(
    customerId,
    req.scope,
    req.queryConfig.fields
  )
  res.status(200).json({ customer })
}

