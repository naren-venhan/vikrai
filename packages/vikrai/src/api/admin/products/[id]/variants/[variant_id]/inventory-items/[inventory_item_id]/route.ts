import { dismissLinksWorkflow, updateLinksWorkflow } from "@vikrai/core-flows"
import { Modules } from "@vikrai/framework/utils"
import {
  AuthenticatedvikraiRequest,
  vikraiResponse,
} from "@vikrai/framework/http"
import { refetchVariant } from "../../../../../helpers"
import { AdminUpdateVariantInventoryItemType } from "../../../../../validators"
import { HttpTypes } from "@vikrai/framework/types"

export const POST = async (
  req: AuthenticatedvikraiRequest<AdminUpdateVariantInventoryItemType>,
  res: vikraiResponse<HttpTypes.AdminProductVariantResponse>
) => {
  const variantId = req.params.variant_id
  const inventoryItemId = req.params.inventory_item_id

  await updateLinksWorkflow(req.scope).run({
    input: [
      {
        [Modules.PRODUCT]: { variant_id: variantId },
        [Modules.INVENTORY]: { inventory_item_id: inventoryItemId },
        data: { required_quantity: req.validatedBody.required_quantity },
      },
    ],
  })

  const variant = await refetchVariant(
    variantId,
    req.scope,
    req.queryConfig.fields
  )

  res.status(200).json({ variant })
}

export const DELETE = async (
  req: AuthenticatedvikraiRequest,
  res: vikraiResponse<HttpTypes.AdminProductVariantInventoryLinkDeleteResponse>
) => {
  const variantId = req.params.variant_id
  const inventoryItemId = req.params.inventory_item_id

  const {
    result: [deleted],
  } = await dismissLinksWorkflow(req.scope).run({
    input: [
      {
        [Modules.PRODUCT]: { variant_id: variantId },
        [Modules.INVENTORY]: { inventory_item_id: inventoryItemId },
      },
    ],
  })

  const parent = await refetchVariant(
    variantId,
    req.scope,
    req.queryConfig.fields
  )

  res.status(200).json({
    id: deleted as unknown as HttpTypes.AdminProductVariantInventoryLink,
    object: "variant-inventory-item-link",
    deleted: true,
    parent,
  })
}
