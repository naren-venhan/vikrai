import {
  AuthenticatedvikraiRequest,
  vikraiResponse,
} from "@vikrai/framework/http"

import { addOrRemoveCampaignPromotionsWorkflow } from "@vikrai/core-flows"
import { HttpTypes, LinkMethodRequest } from "@vikrai/framework/types"
import { refetchCampaign } from "../../helpers"

export const POST = async (
  req: AuthenticatedvikraiRequest<LinkMethodRequest>,
  res: vikraiResponse<HttpTypes.AdminCampaignResponse>
) => {
  const { id } = req.params
  const { add, remove } = req.validatedBody
  await addOrRemoveCampaignPromotionsWorkflow(req.scope).run({
    input: { id, add, remove },
  })

  const campaign = await refetchCampaign(
    req.params.id,
    req.scope,
    req.queryConfig.fields
  )

  res.status(200).json({ campaign })
}
