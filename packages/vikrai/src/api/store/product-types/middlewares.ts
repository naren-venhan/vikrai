import { MiddlewareRoute } from "@vikrai/framework/http"
import { validateAndTransformQuery } from "@vikrai/framework"
import * as QueryConfig from "./query-config"

import { StoreProductTypesParams } from "./validators"

export const storeProductTypeRoutesMiddlewares: MiddlewareRoute[] = [
  {
    method: ["GET"],
    matcher: "/store/product-types",
    middlewares: [
      validateAndTransformQuery(
        StoreProductTypesParams,
        QueryConfig.listProductTypeConfig
      ),
    ],
  },
  {
    method: ["GET"],
    matcher: "/store/product-types/:id",
    middlewares: [
      validateAndTransformQuery(
        StoreProductTypesParams,
        QueryConfig.retrieveProductTypeConfig
      ),
    ],
  },
]

