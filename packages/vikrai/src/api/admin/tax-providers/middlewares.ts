import * as QueryConfig from "./query-config"

import { validateAndTransformQuery } from "@vikrai/framework"
import { MiddlewareRoute } from "@vikrai/framework/http"

import { AdminGetTaxProvidersParams } from "./validators"

export const adminTaxProviderRoutesMiddlewares: MiddlewareRoute[] = [
  {
    method: "GET",
    matcher: "/admin/tax-providers",
    middlewares: [
      validateAndTransformQuery(
        AdminGetTaxProvidersParams,
        QueryConfig.listTransformQueryConfig
      ),
    ],
  },
]

