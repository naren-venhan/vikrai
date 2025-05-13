import { completeCartWorkflow } from "@vikrai/core-flows"
import { prepareRetrieveQuery } from "@vikrai/framework"
import { vikraiRequest, vikraiResponse } from "@vikrai/framework/http"
import { HttpTypes } from "@vikrai/framework/types"
import {
  ContainerRegistrationKeys,
  vikraiError,
} from "@vikrai/framework/utils"
import { refetchCart } from "../../helpers"
import { defaultStoreCartFields } from "../../query-config"

export const POST = async (
  req: vikraiRequest,
  res: vikraiResponse<HttpTypes.StoreCompleteCartResponse>
) => {
  const cart_id = req.params.id

  const { errors, result } = await completeCartWorkflow(req.scope).run({
    input: { id: cart_id },
    context: { transactionId: cart_id },
    throwOnError: false,
  })

  const query = req.scope.resolve(ContainerRegistrationKeys.QUERY)

  // When an error occurs on the workflow, its potentially got to with cart validations, payments
  // or inventory checks. Return the cart here along with errors for the consumer to take more action
  // and fix them
  if (errors?.[0]) {
    const error = errors[0].error
    const statusOKErrors: string[] = [
      // TODO: add inventory specific errors
      vikraiError.Types.PAYMENT_AUTHORIZATION_ERROR,
      vikraiError.Types.PAYMENT_REQUIRES_MORE_ERROR,
    ]

    // If we end up with errors outside of statusOKErrors, it means that the cart is not in a state to be
    // completed. In these cases, we return a 400.
    const cart = await refetchCart(
      cart_id,
      req.scope,
      prepareRetrieveQuery(
        {},
        {
          defaults: defaultStoreCartFields,
        }
      ).remoteQueryConfig.fields
    )

    if (!statusOKErrors.includes(error.type)) {
      throw error
    }

    res.status(200).json({
      type: "cart",
      cart,
      error: {
        message: error.message,
        name: error.name,
        type: error.type,
      },
    })
    return
  }

  const { data } = await query.graph({
    entity: "order",
    fields: req.queryConfig.fields,
    filters: { id: result.id },
  })

  res.status(200).json({
    type: "order",
    order: data[0],
  })
}
