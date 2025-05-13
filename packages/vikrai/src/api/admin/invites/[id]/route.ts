import {
  AuthenticatedvikraiRequest,
  vikraiResponse,
} from "@vikrai/framework/http"
import { vikraiError } from "@vikrai/framework/utils"

import { deleteInvitesWorkflow } from "@vikrai/core-flows"
import { refetchInvite } from "../helpers"
import { HttpTypes } from "@vikrai/framework/types"

export const GET = async (
  req: AuthenticatedvikraiRequest,
  res: vikraiResponse<HttpTypes.AdminInviteResponse>
) => {
  const { id } = req.params
  const invite = await refetchInvite(id, req.scope, req.queryConfig.fields)

  if (!invite) {
    throw new vikraiError(
      vikraiError.Types.NOT_FOUND,
      `Invite with id: ${id} was not found`
    )
  }

  res.status(200).json({ invite })
}

export const DELETE = async (
  req: AuthenticatedvikraiRequest,
  res: vikraiResponse<HttpTypes.AdminInviteDeleteResponse>
) => {
  const { id } = req.params
  const workflow = deleteInvitesWorkflow(req.scope)

  await workflow.run({
    input: { ids: [id] },
  })

  res.status(200).json({
    id,
    object: "invite",
    deleted: true,
  })
}

export const AUTHENTICATE = false
