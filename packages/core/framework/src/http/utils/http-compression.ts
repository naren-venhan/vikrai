import compression from "compression"
import type { ConfigModule } from "@vikrai/types"
import { ContainerRegistrationKeys } from "@vikrai/utils"

import { HttpCompressionOptions, ProjectConfigOptions } from "../../config"
import type { vikraiRequest, vikraiResponse } from "../types"

export function shouldCompressResponse(
  req: vikraiRequest,
  res: vikraiResponse
) {
  const { projectConfig } = req.scope.resolve<ConfigModule>(
    ContainerRegistrationKeys.CONFIG_MODULE
  )
  const { enabled } = compressionOptions(projectConfig)

  if (!enabled) {
    return false
  }

  if (req.headers["x-no-compression"]) {
    // don't compress responses with this request header
    return false
  }

  // fallback to standard filter function
  return compression.filter(req, res)
}

export function compressionOptions(
  config: ProjectConfigOptions
): HttpCompressionOptions {
  const responseCompressionOptions = config.http.compression ?? {}

  responseCompressionOptions.enabled =
    responseCompressionOptions.enabled ?? false
  responseCompressionOptions.level = responseCompressionOptions.level ?? 6
  responseCompressionOptions.memLevel = responseCompressionOptions.memLevel ?? 8
  responseCompressionOptions.threshold =
    responseCompressionOptions.threshold ?? 1024

  return responseCompressionOptions
}

