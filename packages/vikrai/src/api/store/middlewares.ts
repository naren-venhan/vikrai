import { MiddlewareRoute } from "@vikrai/framework/http"
import { storeReturnsRoutesMiddlewares } from "./returns/middlewares"

export const storeRoutesMiddlewares: MiddlewareRoute[] = [
  ...storeReturnsRoutesMiddlewares,
]

