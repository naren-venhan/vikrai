import { AuthenticatedvikraiRequest, vikraiResponse } from "@vikrai/framework"
import { HttpTypes } from "@vikrai/framework/types"
import {
  acceptOrderTransferWorkflow,
  getOrderDetailWorkflow,
} from "@vikrai/core-flows"

import { StoreAcceptOrderTransferType } from "../../../validators"

export const POST = async (
  req: AuthenticatedvikraiRequest<StoreAcceptOrderTransferType>,
  res: vikraiResponse<HttpTypes.StoreOrderResponse>
) => {
  await acceptOrderTransferWorkflow(req.scope).run({
    input: {
      order_id: req.params.id,
      token: req.validatedBody.token,
    },
  })

  const { result } = await getOrderDetailWorkflow(req.scope).run({
    input: {
      fields: req.queryConfig.fields,
      order_id: req.params.id,
    },
  })

  res.status(200).json({ order: result as HttpTypes.StoreOrder })
}
