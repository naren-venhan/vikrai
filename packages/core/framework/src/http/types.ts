import type { NextFunction, Request, Response } from "express"
import type { ZodNullable, ZodObject, ZodOptional, ZodRawShape } from "zod"

import {
  FindConfig,
  vikraiPricingContext,
  RequestQueryFields,
} from "@vikrai/types"
import { vikraiContainer } from "../container"
import { RestrictedFields } from "./utils/restricted-fields"

/**
 * List of all the supported HTTP methods
 */
export const HTTP_METHODS = [
  "GET",
  "POST",
  "PUT",
  "PATCH",
  "DELETE",
  "OPTIONS",
  "HEAD",
] as const

export type RouteVerb = (typeof HTTP_METHODS)[number]
export type MiddlewareVerb = "USE" | "ALL" | RouteVerb

type SyncRouteHandler = (req: vikraiRequest, res: vikraiResponse) => void

export type AsyncRouteHandler = (
  req: vikraiRequest,
  res: vikraiResponse
) => Promise<void>

export type RouteHandler = SyncRouteHandler | AsyncRouteHandler

export type MiddlewareFunction =
  | vikraiRequestHandler
  | ((...args: any[]) => any)

export type vikraiErrorHandlerFunction = (
  error: any,
  req: vikraiRequest,
  res: vikraiResponse,
  next: vikraiNextFunction
) => Promise<void> | void

export type ParserConfigArgs = {
  sizeLimit?: string | number | undefined
  preserveRawBody?: boolean
}

export type ParserConfig = false | ParserConfigArgs

export type MiddlewareRoute = {
  /**
   * @deprecated. Instead use {@link MiddlewareRoute.methods}
   */
  method?: MiddlewareVerb | MiddlewareVerb[]
  methods?: MiddlewareVerb[]
  matcher: string | RegExp
  bodyParser?: ParserConfig
  additionalDataValidator?: ZodRawShape
  middlewares?: MiddlewareFunction[]
}

export type MiddlewaresConfig = {
  errorHandler?: false | vikraiErrorHandlerFunction
  routes?: MiddlewareRoute[]
}

/**
 * Route descriptor refers represents a route either scanned
 * from the filesystem or registered manually. It does not
 * represent a middleware
 */
export type RouteDescriptor = {
  matcher: string
  method: RouteVerb
  handler: RouteHandler
  optedOutOfAuth: boolean
  isRoute: true
  routeType?: "admin" | "store" | "auth"
  absolutePath?: string
  relativePath?: string
  shouldAppendAdminCors: boolean
  shouldAppendStoreCors: boolean
  shouldAppendAuthCors: boolean
}

/**
 * Represents a middleware
 */
export type MiddlewareDescriptor = {
  matcher: string
  methods?: MiddlewareVerb | MiddlewareVerb[]
  handler: MiddlewareFunction
}

export type BodyParserConfigRoute = {
  matcher: string
  methods: MiddlewareVerb | MiddlewareVerb[]
  config: ParserConfig
}

export type AdditionalDataValidatorRoute = {
  matcher: string
  methods: MiddlewareVerb | MiddlewareVerb[]
  schema: ZodRawShape
  validator: ZodOptional<ZodNullable<ZodObject<any, any>>>
}

export type GlobalMiddlewareDescriptor = {
  config?: MiddlewaresConfig
}

export interface vikraiRequest<
  Body = unknown,
  QueryFields = Record<string, unknown>
> extends Request<{ [key: string]: string }, any, Body> {
  validatedBody: Body
  validatedQuery: RequestQueryFields & QueryFields
  /**
   * TODO: shouldn't this correspond to returnable fields instead of allowed fields? also it is used by the cleanResponseData util
   */
  allowedProperties: string[]
  /**
   * An object containing the select, relation, skip, take and order to be used with vikrai internal services
   */
  listConfig: FindConfig<unknown>
  /**
   * An object containing the select, relation to be used with vikrai internal services
   */
  retrieveConfig: FindConfig<unknown>

  /**
   * An object containing fields and variables to be used with the remoteQuery
   *
   * @version 2.2.0
   */
  queryConfig: {
    fields: string[]
    pagination: { order?: Record<string, string>; skip: number; take?: number }
  }

  /**
   * @deprecated Use {@link queryConfig} instead.
   */
  remoteQueryConfig: vikraiRequest["queryConfig"]

  /**
   * An object containing the fields that are filterable e.g `{ id: Any<String> }`
   */
  filterableFields: QueryFields
  includes?: Record<string, boolean>

  /**
   * An array of fields and relations that are allowed to be queried, this can be set by the
   * consumer as part of a middleware and it will take precedence over the req.allowed set
   * by the api
   */
  allowed?: string[]
  errors: string[]
  scope: vikraiContainer
  session?: any
  rawBody?: any
  requestId?: string

  restrictedFields?: RestrictedFields

  /**
   * An object that carries the context that is used to calculate prices for variants
   */
  pricingContext?: vikraiPricingContext
  /**
   * A generic context object that can be used across the request lifecycle
   */
  context?: Record<string, any>

  /**
   * Custom validator to validate the `additional_data` property in
   * requests that allows for additional_data
   */
  additionalDataValidator?: ZodOptional<ZodNullable<ZodObject<any, any>>>
}

export interface AuthContext {
  actor_id: string
  actor_type: string
  auth_identity_id: string
  app_metadata: Record<string, unknown>
}

export interface PublishableKeyContext {
  key: string
  sales_channel_ids: string[]
}

export interface AuthenticatedvikraiRequest<
  Body = unknown,
  QueryFields = Record<string, unknown>
> extends vikraiRequest<Body, QueryFields> {
  auth_context: AuthContext
  publishable_key_context?: PublishableKeyContext
}

export interface vikraiStoreRequest<
  Body = unknown,
  QueryFields = Record<string, unknown>
> extends vikraiRequest<Body, QueryFields> {
  auth_context?: AuthContext
  publishable_key_context: PublishableKeyContext
}

export type vikraiResponse<Body = unknown> = Response<Body>

export type vikraiNextFunction = NextFunction

export type vikraiRequestHandler<Body = unknown, Res = unknown> = (
  req: vikraiRequest<Body>,
  res: vikraiResponse<Res>,
  next: vikraiNextFunction
) => Promise<void> | void

