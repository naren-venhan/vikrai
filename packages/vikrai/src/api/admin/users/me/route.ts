import {
  ContainerRegistrationKeys,
  vikraiError,
  remoteQueryObjectFromString,
} from "@vikrai/framework/utils"
import {
  AuthenticatedvikraiRequest,
  vikraiResponse,
} from "@vikrai/framework/http"
import { HttpTypes } from "@vikrai/framework/types"

export const GET = async (
  req: AuthenticatedvikraiRequest,
  res: vikraiResponse<HttpTypes.AdminUserResponse>
) => {
  const id = req.auth_context.actor_id
  const remoteQuery = req.scope.resolve(ContainerRegistrationKeys.REMOTE_QUERY)

  if (!id) {
    throw new vikraiError(vikraiError.Types.NOT_FOUND, `User ID not found`)
  }

  const query = remoteQueryObjectFromString({
    entryPoint: "user",
    variables: { id },
    fields: req.queryConfig.fields,
  })

  const [user] = await remoteQuery(query)

  if (!user) {
    throw new vikraiError(
      vikraiError.Types.NOT_FOUND,
      `User with id: ${id} was not found`
    )
  }

  res.status(200).json({ user })
}

export const AUTHENTICATE = false

