import { IPricingModuleService } from "@vikrai/framework/types"
import { Modules } from "@vikrai/framework/utils"
import { StepResponse, createStep } from "@vikrai/framework/workflows-sdk"

/**
 * The IDs of price lists to delete.
 */
export type DeletePriceListsStepInput = string[]

export const deletePriceListsStepId = "delete-price-lists"
/**
 * This step deletes one or more price lists.
 */
export const deletePriceListsStep = createStep(
  deletePriceListsStepId,
  async (ids: DeletePriceListsStepInput, { container }) => {
    const pricingModule = container.resolve<IPricingModuleService>(
      Modules.PRICING
    )

    await pricingModule.softDeletePriceLists(ids)

    return new StepResponse(void 0, ids)
  },
  async (idsToRestore, { container }) => {
    if (!idsToRestore?.length) {
      return
    }

    const pricingModule = container.resolve<IPricingModuleService>(
      Modules.PRICING
    )

    await pricingModule.restorePriceLists(idsToRestore)
  }
)

