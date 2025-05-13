import {
  deleteTaxRegionsWorkflow,
  updateTaxRegionsWorkflow,
} from "@vikrai/core-flows"
import {
  AuthenticatedvikraiRequest,
  vikraiResponse,
} from "@vikrai/framework/http"
import { HttpTypes, RemoteQueryFunction } from "@vikrai/framework/types"
import {
  ContainerRegistrationKeys,
  remoteQueryObjectFromString,
} from "@vikrai/framework/utils"
import { AdminUpdateTaxRegionType } from "../validators"

export const GET = async (
  req: AuthenticatedvikraiRequest<HttpTypes.AdminUpdateTaxRegion>,
  res: vikraiResponse<HttpTypes.AdminTaxRegionResponse>
) => {
  const remoteQuery = req.scope.resolve(ContainerRegistrationKeys.REMOTE_QUERY)

  const filters = { id: req.params.id }
  const [taxRegion] = await remoteQuery(
    remoteQueryObjectFromString({
      entryPoint: "tax_region",
      variables: { filters },
      fields: req.queryConfig.fields,
    })
  )

  res.status(200).json({ tax_region: taxRegion })
}

export const POST = async (
  req: AuthenticatedvikraiRequest<AdminUpdateTaxRegionType>,
  res: vikraiResponse<HttpTypes.AdminTaxRegionResponse>
) => {
  const { id } = req.params
  const query = req.scope.resolve<RemoteQueryFunction>(
    ContainerRegistrationKeys.QUERY
  )

  await updateTaxRegionsWorkflow(req.scope).run({
    input: [
      {
        id,
        ...req.validatedBody,
      },
    ],
  })

  const {
    data: [tax_region],
  } = await query.graph(
    {
      entity: "tax_region",
      fields: req.queryConfig.fields,
      filters: { id },
    },
    { throwIfKeyNotFound: true }
  )

  return res.json({ tax_region })
}

export const DELETE = async (
  req: AuthenticatedvikraiRequest,
  res: vikraiResponse<HttpTypes.AdminTaxRegionDeleteResponse>
) => {
  const id = req.params.id

  await deleteTaxRegionsWorkflow(req.scope).run({
    input: { ids: [id] },
  })

  res.status(200).json({
    id,
    object: "tax_region",
    deleted: true,
  })
}
