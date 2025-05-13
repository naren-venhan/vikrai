import { orderClaimAddNewItemWorkflow } from "@vikrai/core-flows"
import {
  ContainerRegistrationKeys,
  remoteQueryObjectFromString,
} from "@vikrai/framework/utils"

import {
  AuthenticatedvikraiRequest,
  vikraiResponse,
} from "@vikrai/framework/http"
import { AdminPostClaimsAddItemsReqSchemaType } from "../../../validators"
import { HttpTypes } from "@vikrai/framework/types"

export const POST = async (
  req: AuthenticatedvikraiRequest<AdminPostClaimsAddItemsReqSchemaType>,
  res: vikraiResponse<HttpTypes.AdminClaimPreviewResponse>
) => {
  const { id } = req.params

  const remoteQuery = req.scope.resolve(ContainerRegistrationKeys.REMOTE_QUERY)

  const { result } = await orderClaimAddNewItemWorkflow(req.scope).run({
    input: { ...req.validatedBody, claim_id: id },
  })

  const queryObject = remoteQueryObjectFromString({
    entryPoint: "order_claim",
    variables: {
      id,
      filters: {
        ...req.filterableFields,
      },
    },
    fields: req.queryConfig.fields,
  })

  const [orderClaim] = await remoteQuery(queryObject)

  res.json({
    order_preview: result as unknown as HttpTypes.AdminOrderPreview,
    claim: orderClaim,
  })
}
