import {
  AuthenticatedvikraiRequest,
  getAuthContextFromJwtToken,
  vikraiNextFunction,
  vikraiRequest,
  vikraiResponse,
} from "@vikrai/framework/http"
import { ConfigModule, IAuthModuleService } from "@vikrai/framework/types"
import {
  ContainerRegistrationKeys,
  vikraiError,
  Modules,
} from "@vikrai/framework/utils"
import { HttpTypes } from "@vikrai/types"

export interface UpdateProviderJwtPayload {
  entity_id: string
  actor_type: string
  provider: string
}

// Middleware to validate that a token is valid
export const validateToken = () => {
  return async (
    req: vikraiRequest<HttpTypes.AdminUpdateProvider>,
    res: vikraiResponse,
    next: vikraiNextFunction
  ) => {
    const { actor_type, auth_provider } = req.params

    const req_ = req as AuthenticatedvikraiRequest

    // @ts-ignore
    const { http } = req_.scope.resolve<ConfigModule>(
      ContainerRegistrationKeys.CONFIG_MODULE
    ).projectConfig

    const token = getAuthContextFromJwtToken(
      req.headers.authorization,
      http.jwtSecret as string,
      ["bearer"],
      [actor_type]
    ) as UpdateProviderJwtPayload | null

    const errorObject = new vikraiError(
      vikraiError.Types.UNAUTHORIZED,
      `Invalid token`
    )

    if (!token) {
      return next(errorObject)
    }

    const authModule = req.scope.resolve<IAuthModuleService>(Modules.AUTH)

    if (!token?.entity_id) {
      return next(errorObject)
    }

    const [providerIdentity] = await authModule.listProviderIdentities(
      {
        entity_id: token.entity_id,
        provider: auth_provider,
      },
      {
        select: ["provider_metadata", "auth_identity_id", "entity_id"],
      }
    )

    if (!providerIdentity) {
      return next(errorObject)
    }

    req_.auth_context = {
      actor_type,
      auth_identity_id: providerIdentity.auth_identity_id!,
      actor_id: providerIdentity.entity_id,
      app_metadata: {},
    }

    return next()
  }
}

