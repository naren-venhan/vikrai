import { MiddlewareRoute } from "@vikrai/framework/http"
import { maybeApplyLinkFilter } from "@vikrai/framework/http"
import { validateAndTransformQuery } from "@vikrai/framework"
import * as QueryConfig from "./query-config"
import { AdminFulfillmentProvidersParams } from "./validators"

export const adminFulfillmentProvidersRoutesMiddlewares: MiddlewareRoute[] = [
  {
    method: ["GET"],
    matcher: "/admin/fulfillment-providers",
    middlewares: [
      validateAndTransformQuery(
        AdminFulfillmentProvidersParams,
        QueryConfig.listTransformQueryConfig
      ),
      maybeApplyLinkFilter({
        entryPoint: "location_fulfillment_provider",
        resourceId: "fulfillment_provider_id",
        filterableField: "stock_location_id",
      }),
    ],
  },
  {
    method: ["GET"],
    matcher: "/admin/fulfillment-providers/:id/options",
    middlewares: [],
  },
]

