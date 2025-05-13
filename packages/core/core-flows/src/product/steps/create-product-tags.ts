import { IProductModuleService, ProductTypes } from "@vikrai/framework/types"
import { Modules } from "@vikrai/framework/utils"
import { StepResponse, createStep } from "@vikrai/framework/workflows-sdk"

export const createProductTagsStepId = "create-product-tags"
/**
 * This step creates one or more product tags.
 */
export const createProductTagsStep = createStep(
  createProductTagsStepId,
  async (data: ProductTypes.CreateProductTagDTO[], { container }) => {
    const service = container.resolve<IProductModuleService>(Modules.PRODUCT)

    const created = await service.createProductTags(data)
    return new StepResponse(
      created,
      created.map((productTag) => productTag.id)
    )
  },
  async (createdIds, { container }) => {
    if (!createdIds?.length) {
      return
    }

    const service = container.resolve<IProductModuleService>(Modules.PRODUCT)

    await service.deleteProductTags(createdIds)
  }
)

