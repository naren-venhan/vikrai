import { IProductModuleService } from "@vikrai/framework/types"
import { Modules } from "@vikrai/framework/utils"
import { StepResponse, createStep } from "@vikrai/framework/workflows-sdk"

/**
 * The IDs of the collections to delete.
 */
export type DeleteCollectionsStepInput = string[]

export const deleteCollectionsStepId = "delete-collections"
/**
 * This step deletes one or more collections.
 */
export const deleteCollectionsStep = createStep(
  deleteCollectionsStepId,
  async (ids: DeleteCollectionsStepInput, { container }) => {
    const service = container.resolve<IProductModuleService>(Modules.PRODUCT)

    await service.softDeleteProductCollections(ids)
    return new StepResponse(void 0, ids)
  },
  async (prevIds, { container }) => {
    if (!prevIds?.length) {
      return
    }

    const service = container.resolve<IProductModuleService>(Modules.PRODUCT)

    await service.restoreProductCollections(prevIds)
  }
)

