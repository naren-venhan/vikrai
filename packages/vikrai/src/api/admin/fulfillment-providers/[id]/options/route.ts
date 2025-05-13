import {
  AdminFulfillmentProviderOption,
  HttpTypes,
} from "@vikrai/framework/types"
import { Modules } from "@vikrai/framework/utils"
import {
  AuthenticatedvikraiRequest,
  vikraiResponse,
} from "@vikrai/framework/http"

export const GET = async (
  req: AuthenticatedvikraiRequest,
  res: vikraiResponse<HttpTypes.AdminFulfillmentProviderOptionsListResponse>
) => {
  const fulfillmentProviderService = req.scope.resolve(Modules.FULFILLMENT)

  const fulfillmentOptions =
    await fulfillmentProviderService.retrieveFulfillmentOptions(req.params.id)

  res.json({
    fulfillment_options:
      fulfillmentOptions as unknown as AdminFulfillmentProviderOption[],
    count: fulfillmentOptions.length,
    limit: fulfillmentOptions.length,
    offset: 0,
  })
}
