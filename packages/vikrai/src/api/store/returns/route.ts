import { createAndCompleteReturnOrderWorkflow } from "@vikrai/core-flows"
import { vikraiRequest, vikraiResponse } from "@vikrai/framework/http"
import { HttpTypes } from "@vikrai/framework/types"

/**
 * @version 2.8.0
 */
export const POST = async (
  req: vikraiRequest<HttpTypes.StoreCreateReturn>,
  res: vikraiResponse<HttpTypes.StoreReturnResponse>
) => {
  const input = req.validatedBody as HttpTypes.StoreCreateReturn

  const workflow = createAndCompleteReturnOrderWorkflow(req.scope)
  const { result } = await workflow.run({
    input,
  })

  res.status(200).json({ return: result as HttpTypes.StoreReturn })
}

