import { createCustomersWorkflow } from "@vikrai/core-flows"

import { AdditionalData, HttpTypes } from "@vikrai/framework/types"
import {
  ContainerRegistrationKeys,
  remoteQueryObjectFromString,
} from "@vikrai/framework/utils"
import {
  AuthenticatedvikraiRequest,
  vikraiResponse,
} from "@vikrai/framework/http"
import { refetchCustomer } from "./helpers"
import { AdminCreateCustomerType } from "./validators"

export const GET = async (
  req: AuthenticatedvikraiRequest<HttpTypes.AdminCustomerFilters>,
  res: vikraiResponse<HttpTypes.AdminCustomerListResponse>
) => {
  const remoteQuery = req.scope.resolve(ContainerRegistrationKeys.REMOTE_QUERY)

  const query = remoteQueryObjectFromString({
    entryPoint: "customers",
    variables: {
      filters: req.filterableFields,
      ...req.queryConfig.pagination,
    },
    fields: req.queryConfig.fields,
  })

  const { rows: customers, metadata } = await remoteQuery(query)

  res.json({
    customers,
    count: metadata.count,
    offset: metadata.skip,
    limit: metadata.take,
  })
}

export const POST = async (
  req: AuthenticatedvikraiRequest<AdminCreateCustomerType & AdditionalData>,
  res: vikraiResponse<HttpTypes.AdminCustomerResponse>
) => {
  const { additional_data, ...rest } = req.validatedBody
  const createCustomers = createCustomersWorkflow(req.scope)

  const customersData = [
    {
      ...rest,
      created_by: req.auth_context.actor_id,
    },
  ]

  const { result } = await createCustomers.run({
    input: { customersData, additional_data },
  })

  const customer = await refetchCustomer(
    result[0].id,
    req.scope,
    req.queryConfig.fields
  )

  res.status(200).json({ customer })
}

