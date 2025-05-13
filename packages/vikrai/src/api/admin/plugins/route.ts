import { vikraiRequest, vikraiResponse } from "@vikrai/framework/http"
import { HttpTypes } from "@vikrai/framework/types"
import { ContainerRegistrationKeys } from "@vikrai/framework/utils"
import { isString } from "lodash"

export const GET = async (
  req: vikraiRequest<unknown>,
  res: vikraiResponse<HttpTypes.AdminPluginsListResponse>
) => {
  const configModule = req.scope.resolve(
    ContainerRegistrationKeys.CONFIG_MODULE
  )

  const configPlugins = configModule.plugins ?? []

  const plugins = configPlugins.map((plugin) => ({
    name: isString(plugin) ? plugin : plugin.resolve,
  }))

  res.json({
    plugins,
  })
}

