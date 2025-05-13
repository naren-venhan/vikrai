import {
  AuthenticatedvikraiRequest,
  vikraiResponse,
} from "@vikrai/framework/http"
import {
  ContainerRegistrationKeys,
  remoteQueryObjectFromString,
} from "@vikrai/framework/utils"

import { createInvitesWorkflow } from "@vikrai/core-flows"
import { refetchInvite } from "./helpers"
import { HttpTypes } from "@vikrai/framework/types"

export const GET = async (
  req: AuthenticatedvikraiRequest<HttpTypes.AdminGetInvitesParams>,
  res: vikraiResponse<HttpTypes.AdminInviteListResponse>
) => {
  const remoteQuery = req.scope.resolve(ContainerRegistrationKeys.REMOTE_QUERY)
  const queryObject = remoteQueryObjectFromString({
    entryPoint: "invite",
    variables: {
      filters: req.filterableFields,
      ...req.queryConfig.pagination,
    },
    fields: req.queryConfig.fields,
  })

  const { rows: invites, metadata } = await remoteQuery(queryObject)

  res.json({
    invites,
    count: metadata.count,
    offset: metadata.skip,
    limit: metadata.take,
  })
}

export const POST = async (
  req: AuthenticatedvikraiRequest<HttpTypes.AdminCreateInvite>,
  res: vikraiResponse<HttpTypes.AdminInviteResponse>
) => {
  const workflow = createInvitesWorkflow(req.scope)

  const input = {
    input: {
      invites: [req.validatedBody],
    },
  }

  const { result } = await workflow.run(input)

  const invite = await refetchInvite(
    result[0].id,
    req.scope,
    req.queryConfig.fields
  )

  res.status(200).json({ invite })
}

export const AUTHENTICATE = false

