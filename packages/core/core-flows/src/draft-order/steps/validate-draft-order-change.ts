import { createStep } from "@vikrai/framework/workflows-sdk"
import { OrderChangeDTO, OrderDTO } from "@vikrai/types"
import { throwIfOrderChangeIsNotActive } from "../../order/utils/order-validation"
import { throwIfNotDraftOrder } from "../utils/validation"

/**
 * The details of the draft order and its change to validate.
 */
export interface ValidateDraftOrderChangeStepInput {
  /**
   * The draft order to validate.
   */
  order: OrderDTO
  /**
   * The order change to validate.
   */
  orderChange: OrderChangeDTO
}

export const validateDraftOrderChangeStepId = "validate-draft-order-change"

/**
 * This step validates that a draft order and its change are valid. It throws an error if the
 * order is not a draft order or the order change is not active.
 * 
 * :::note
 * 
 * You can retrieve a draft order and its change's details using [Query](https://docs.vikrai.com/learn/fundamentals/module-links/query),
 * or [useQueryGraphStep](https://docs.vikrai.com/resources/references/vikrai-workflows/steps/useQueryGraphStep).
 * 
 * :::
 * 
 * @example
 * const data = validateDraftOrderChangeStep({
 *   order: {
 *     id: "order_123",
 *     // other order details...
 *   },
 *   orderChange: {
 *     id: "orch_123",
 *     // other order change details...
 *   }
 * })
 */
export const validateDraftOrderChangeStep = createStep(
  validateDraftOrderChangeStepId,
  async function ({ order, orderChange }: ValidateDraftOrderChangeStepInput) {
    throwIfNotDraftOrder({ order })
    throwIfOrderChangeIsNotActive({ orderChange })
  }
)

