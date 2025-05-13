import { raw } from "express"
import { vikraiRequest, vikraiResponse, vikraiNextFunction } from "../../types"
import {
  customersCreateMiddlewareMock,
  customersGlobalMiddlewareMock,
  customersCreateMiddlewareValidatorMock,
  storeGlobalMiddlewareMock,
} from "../mocks"
import z from "zod"
import { defineMiddlewares } from "../../utils/define-middlewares"

const customersGlobalMiddleware = (
  req: vikraiRequest,
  res: vikraiResponse,
  next: vikraiNextFunction
) => {
  customersGlobalMiddlewareMock()
  next()
}

const customersCreateMiddleware = (
  req: vikraiRequest,
  res: vikraiResponse,
  next: vikraiNextFunction
) => {
  if (req.additionalDataValidator) {
    customersCreateMiddlewareValidatorMock()
  }
  customersCreateMiddlewareMock()
  next()
}

const storeGlobal = (
  req: vikraiRequest,
  res: vikraiResponse,
  next: vikraiNextFunction
) => {
  storeGlobalMiddlewareMock()
  next()
}

const middlewares = defineMiddlewares([
  {
    matcher: "/customers",
    middlewares: [customersGlobalMiddleware],
  },
  {
    method: "POST",
    matcher: "/customers",
    additionalDataValidator: {
      group_id: z.string(),
    },
    middlewares: [customersCreateMiddleware],
  },
  {
    matcher: "/store/*",
    middlewares: [storeGlobal],
  },
  {
    matcher: "/webhooks",
    bodyParser: {
      preserveRawBody: true,
    },
  },
  {
    matcher: "/webhooks/*",
    method: "POST",
    bodyParser: false,
    middlewares: [raw({ type: "application/json" })],
  },
])

export default middlewares

