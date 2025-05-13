import {
  AuthenticatedvikraiRequest,
  vikraiResponse,
} from "@vikrai/framework/http"
import { AdminGetPaymentParamsType } from "../validators"
import { refetchPayment } from "../helpers"
import { HttpTypes } from "@vikrai/framework/types"

export const GET = async (
  req: AuthenticatedvikraiRequest<AdminGetPaymentParamsType>,
  res: vikraiResponse<HttpTypes.AdminPaymentResponse>
) => {
  const payment = await refetchPayment(
    req.params.id,
    req.scope,
    req.queryConfig.fields
  )

  res.status(200).json({ payment })
}
