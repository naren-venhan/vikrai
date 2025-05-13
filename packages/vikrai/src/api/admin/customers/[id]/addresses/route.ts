import { createCustomerAddressesWorkflow } from "@vikrai/core-flows"
import {
  AuthenticatedvikraiRequest,
  vikraiResponse,
} from "@vikrai/framework/http"
import {
  ContainerRegistrationKeys,
  remoteQueryObjectFromString,
} from "@vikrai/framework/utils"
import { AdminCreateCustomerAddressType } from "../../validators"
import { refetchCustomer } from "../../helpers"
import { AdditionalData, HttpTypes } from "@vikrai/framework/types"

export const GET = async (
  req: AuthenticatedvikraiRequest<HttpTypes.AdminCustomerAddressFilters>,
  res: vikraiResponse<HttpTypes.AdminCustomerAddressListResponse>
) => {
  const customerId = req.params.id
  const remoteQuery = req.scope.resolve(ContainerRegistrationKeys.REMOTE_QUERY)

  const query = remoteQueryObjectFromString({
    entryPoint: "customer_address",
    variables: {
      filters: { ...req.filterableFields, customer_id: customerId },
      ...req.queryConfig.pagination,
    },
    fields: req.queryConfig.fields,
  })

  const { rows: addresses, metadata } = await remoteQuery(query)

  res.json({
    addresses,
    count: metadata.count,
    offset: metadata.skip,
    limit: metadata.take,
  })
}

export const POST = async (
  req: AuthenticatedvikraiRequest<
    AdminCreateCustomerAddressType & AdditionalData
  >,
  res: vikraiResponse<HttpTypes.AdminCustomerResponse>
) => {
  const { additional_data, ...rest } = req.validatedBody
  const customerId = req.params.id
  const createAddresses = createCustomerAddressesWorkflow(req.scope)
  const addresses = [
    {
      ...rest,
      customer_id: customerId,
    },
  ]

  await createAddresses.run({
    input: { addresses, additional_data },
  })

  const customer = await refetchCustomer(
    customerId,
    req.scope,
    req.queryConfig.fields
  )

  res.status(200).json({ customer })
}
