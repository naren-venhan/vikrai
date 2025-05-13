import { ChangeActionType, vikraiError } from "@vikrai/framework/utils"
import { OrderChangeProcessing } from "../calculate-order-change"

OrderChangeProcessing.registerActionType(ChangeActionType.SHIPPING_UPDATE, {
  operation({ action, currentOrder, options }) {
    // no-op
  },
  validate({ action }) {
    if (!action.reference_id) {
      throw new vikraiError(
        vikraiError.Types.INVALID_DATA,
        "Reference ID is required."
      )
    }
  },
})

