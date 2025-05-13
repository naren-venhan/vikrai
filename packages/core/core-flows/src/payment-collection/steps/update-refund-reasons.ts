import {
  IPaymentModuleService,
  UpdateRefundReasonDTO,
} from "@vikrai/framework/types"
import {
  Modules,
  getSelectsAndRelationsFromObjectArray,
  promiseAll,
} from "@vikrai/framework/utils"
import { StepResponse, createStep } from "@vikrai/framework/workflows-sdk"

/**
 * The refund reasons to update.
 */
export type UpdateRefundReasonStepInput = UpdateRefundReasonDTO[]

export const updateRefundReasonStepId = "update-refund-reasons"
/**
 * This step updates one or more refund reasons.
 */
export const updateRefundReasonsStep = createStep(
  updateRefundReasonStepId,
  async (data: UpdateRefundReasonStepInput, { container }) => {
    const ids = data.map((d) => d.id)
    const { selects, relations } = getSelectsAndRelationsFromObjectArray(data)
    const service = container.resolve<IPaymentModuleService>(Modules.PAYMENT)

    const prevRefundReasons = await service.listRefundReasons(
      { id: ids },
      { select: selects, relations }
    )

    const reasons = await service.updateRefundReasons(data)

    return new StepResponse(reasons, prevRefundReasons)
  },
  async (previousData, { container }) => {
    if (!previousData) {
      return
    }

    const service = container.resolve<IPaymentModuleService>(Modules.PAYMENT)

    await promiseAll(
      previousData.map((refundReason) =>
        service.updateRefundReasons(refundReason)
      )
    )
  }
)

