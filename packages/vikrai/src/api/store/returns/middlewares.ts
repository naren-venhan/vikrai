import {
  validateAndTransformBody,
  validateAndTransformQuery,
} from "@vikrai/framework"
import { MiddlewareRoute } from "@vikrai/framework/http"
import * as QueryConfig from "./query-config"
import { ReturnsParams, StorePostReturnsReqSchema } from "./validators"

export const storeReturnsRoutesMiddlewares: MiddlewareRoute[] = [
  {
    method: ["POST"],
    matcher: "/store/returns",
    middlewares: [
      validateAndTransformBody(StorePostReturnsReqSchema),
      validateAndTransformQuery(
        ReturnsParams,
        QueryConfig.retrieveTransformQueryConfig
      ),
    ],
  },
]

