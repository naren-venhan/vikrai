import { createLinksWorkflow } from "@vikrai/core-flows"
import { Modules } from "@vikrai/framework/utils"
import {
  AuthenticatedvikraiRequest,
  vikraiResponse,
} from "@vikrai/framework/http"
import { refetchVariant } from "../../../../helpers"
import { AdminCreateVariantInventoryItemType } from "../../../../validators"
import { HttpTypes } from "@vikrai/framework/types"

export const POST = async (
  req: AuthenticatedvikraiRequest<AdminCreateVariantInventoryItemType>,
  res: vikraiResponse<HttpTypes.AdminProductVariantResponse>
) => {
  const variantId = req.params.variant_id

  await createLinksWorkflow(req.scope).run({
    input: [
      {
        [Modules.PRODUCT]: { variant_id: variantId },
        [Modules.INVENTORY]: {
          inventory_item_id: req.validatedBody.inventory_item_id,
        },
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
