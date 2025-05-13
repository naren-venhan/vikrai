import { generateResetPasswordTokenWorkflow } from "@vikrai/core-flows"
import { ContainerRegistrationKeys } from "@vikrai/framework/utils"
import {
  AuthenticatedvikraiRequest,
  vikraiResponse,
} from "@vikrai/framework/http"
import { ResetPasswordRequestType } from "../../../validators"

export const POST = async (
  req: AuthenticatedvikraiRequest<ResetPasswordRequestType>,
  res: vikraiResponse
) => {
  const { auth_provider, actor_type } = req.params
  const { identifier } = req.validatedBody

  const { http } = req.scope.resolve(
    ContainerRegistrationKeys.CONFIG_MODULE
  ).projectConfig

  await generateResetPasswordTokenWorkflow(req.scope).run({
    input: {
      entityId: identifier,
      actorType: actor_type,
      provider: auth_provider,
      secret: http.jwtSecret as string,
    },
    throwOnError: false, // we don't want to throw on error to avoid leaking information about non-existing identities
  })

  res.sendStatus(201)
}

export const AUTHENTICATE = false
