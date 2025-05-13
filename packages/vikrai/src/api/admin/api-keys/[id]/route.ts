import {
  deleteApiKeysWorkflow,
  updateApiKeysWorkflow,
} from "@vikrai/core-flows"
import {
  AuthenticatedvikraiRequest,
  vikraiResponse,
} from "@vikrai/framework/http"

import { refetchApiKey } from "../helpers"
import { AdminUpdateApiKeyType } from "../validators"
import { vikraiError } from "@vikrai/framework/utils"
import { HttpTypes } from "@vikrai/framework/types"

export const GET = async (
  req: AuthenticatedvikraiRequest,
  res: vikraiResponse<HttpTypes.AdminApiKeyResponse>
) => {
  const apiKey = await refetchApiKey(
    req.params.id,
    req.scope,
    req.queryConfig.fields
  )

  if (!apiKey) {
    throw new vikraiError(
      vikraiError.Types.NOT_FOUND,
      `API Key with id: ${req.params.id} was not found`
    )
  }

  res.status(200).json({ api_key: apiKey })
}

export const POST = async (
  req: AuthenticatedvikraiRequest<AdminUpdateApiKeyType>,
  res: vikraiResponse<HttpTypes.AdminApiKeyResponse>
) => {
  await updateApiKeysWorkflow(req.scope).run({
    input: {
      selector: { id: req.params.id },
      update: req.validatedBody,
    },
  })

  const apiKey = await refetchApiKey(
    req.params.id,
    req.scope,
    req.queryConfig.fields
  )

  res.status(200).json({ api_key: apiKey })
}

export const DELETE = async (
  req: AuthenticatedvikraiRequest,
  res: vikraiResponse<HttpTypes.AdminApiKeyDeleteResponse>
) => {
  const id = req.params.id

  await deleteApiKeysWorkflow(req.scope).run({
    input: { ids: [id] },
  })

  res.status(200).json({
    id,
    object: "api_key",
    deleted: true,
  })
}
