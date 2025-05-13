import { MiddlewareRoute } from "@vikrai/framework/http"
import { validateAndTransformQuery } from "@vikrai/framework"
import * as queryConfig from "./query-config"
import { StoreGetPaymentProvidersParams } from "./validators"

export const storePaymentProvidersMiddlewares: MiddlewareRoute[] = [
  {
    method: ["GET"],
    matcher: "/store/payment-providers",
    middlewares: [
      validateAndTransformQuery(
        StoreGetPaymentProvidersParams,
        queryConfig.listTransformPaymentProvidersQueryConfig
      ),
    ],
  },
]

