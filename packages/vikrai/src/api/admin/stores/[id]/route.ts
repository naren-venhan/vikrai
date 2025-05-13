import { updateStoresWorkflow } from "@vikrai/core-flows"
import {
  ContainerRegistrationKeys,
  vikraiError,
  remoteQueryObjectFromString,
} from "@vikrai/framework/utils"
import {
  AuthenticatedvikraiRequest,
  vikraiResponse,
} from "@vikrai/framework/http"
import { AdminGetStoreParamsType, AdminUpdateStoreType } from "../validators"
import { refetchStore } from "../helpers"
import { HttpTypes } from "@vikrai/framework/types"

export const GET = async (
  req: AuthenticatedvikraiRequest<AdminGetStoreParamsType>,
  res: vikraiResponse<HttpTypes.AdminStoreResponse>
) => {
  const remoteQuery = req.scope.resolve(ContainerRegistrationKeys.REMOTE_QUERY)
  const variables = { id: req.params.id }

  const queryObject = remoteQueryObjectFromString({
    entryPoint: "store",
    variables,
    fields: req.queryConfig.fields,
  })

  const [store] = await remoteQuery(queryObject)
  res.status(200).json({ store })
}

export const POST = async (
  req: AuthenticatedvikraiRequest<AdminUpdateStoreType>,
  res: vikraiResponse<HttpTypes.AdminStoreResponse>
) => {
  const existingStore = await refetchStore(req.params.id, req.scope, ["id"])
  if (!existingStore) {
    throw new vikraiError(
      vikraiError.Types.NOT_FOUND,
      `Store with id "${req.params.id}" not found`
    )
  }

  const { result } = await updateStoresWorkflow(req.scope).run({
    input: {
      selector: { id: req.params.id },
      update: req.validatedBody,
    },
  })

  const store = await refetchStore(
    result[0].id,
    req.scope,
    req.queryConfig.fields
  )

  res.status(200).json({ store })
}
