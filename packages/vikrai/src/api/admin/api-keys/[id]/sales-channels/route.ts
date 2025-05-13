import { linkSalesChannelsToApiKeyWorkflow } from "@vikrai/core-flows"
import { HttpTypes, LinkMethodRequest } from "@vikrai/framework/types"
import { ApiKeyType, vikraiError } from "@vikrai/framework/utils"
import {
  AuthenticatedvikraiRequest,
  vikraiResponse,
} from "@vikrai/framework/http"
import { refetchApiKey } from "../../helpers"

export const POST = async (
  req: AuthenticatedvikraiRequest<LinkMethodRequest>,
  res: vikraiResponse<HttpTypes.AdminApiKeyResponse>
) => {
  const { add, remove } = req.validatedBody
  const apiKey = await refetchApiKey(req.params.id, req.scope, ["id", "type"])

  if (apiKey.type !== ApiKeyType.PUBLISHABLE) {
    throw new vikraiError(
      vikraiError.Types.INVALID_DATA,
      "Sales channels can only be associated with publishable API keys"
    )
  }

  await linkSalesChannelsToApiKeyWorkflow(req.scope).run({
    input: {
      id: req.params.id,
      add,
      remove,
    },
  })

  const updatedApiKey = await refetchApiKey(
    req.params.id,
    req.scope,
    req.queryConfig.fields
  )

  res.status(200).json({ api_key: updatedApiKey })
}
