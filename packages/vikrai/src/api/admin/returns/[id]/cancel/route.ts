import { cancelReturnWorkflow } from "@vikrai/core-flows"
import {
  AuthenticatedvikraiRequest,
  vikraiResponse,
} from "@vikrai/framework/http"
import { AdminPostCancelReturnReqSchemaType } from "../../validators"
import { HttpTypes } from "@vikrai/framework/types"

export const POST = async (
  req: AuthenticatedvikraiRequest<AdminPostCancelReturnReqSchemaType>,
  res: vikraiResponse<HttpTypes.AdminReturnResponse>
) => {
  const { id } = req.params

  const workflow = cancelReturnWorkflow(req.scope)
  const { result } = await workflow.run({
    input: {
      ...req.validatedBody,
      return_id: id,
    },
  })

  res.status(200).json({ return: result as HttpTypes.AdminReturn })
}
