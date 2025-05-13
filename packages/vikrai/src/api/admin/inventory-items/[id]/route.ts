import { vikraiError } from "@vikrai/framework/utils"
import { vikraiRequest, vikraiResponse } from "@vikrai/framework/http"
import {
  deleteInventoryItemWorkflow,
  updateInventoryItemsWorkflow,
} from "@vikrai/core-flows"
import {
  AdminGetInventoryItemParamsType,
  AdminUpdateInventoryItemType,
} from "../validators"
import { refetchInventoryItem } from "../helpers"
import { HttpTypes } from "@vikrai/framework/types"

export const GET = async (
  req: vikraiRequest<AdminGetInventoryItemParamsType>,
  res: vikraiResponse<HttpTypes.AdminInventoryItemResponse>
) => {
  const { id } = req.params
  const inventoryItem = await refetchInventoryItem(
    id,
    req.scope,
    req.queryConfig.fields
  )
  if (!inventoryItem) {
    throw new vikraiError(
      vikraiError.Types.NOT_FOUND,
      `Inventory item with id: ${id} was not found`
    )
  }

  res.status(200).json({
    inventory_item: inventoryItem,
  })
}

// Update inventory item
export const POST = async (
  req: vikraiRequest<AdminUpdateInventoryItemType>,
  res: vikraiResponse<HttpTypes.AdminInventoryItemResponse>
) => {
  const { id } = req.params

  await updateInventoryItemsWorkflow(req.scope).run({
    input: {
      updates: [{ id, ...req.validatedBody }],
    },
  })

  const inventoryItem = await refetchInventoryItem(
    id,
    req.scope,
    req.queryConfig.fields
  )

  res.status(200).json({
    inventory_item: inventoryItem,
  })
}

export const DELETE = async (
  req: vikraiRequest,
  res: vikraiResponse<HttpTypes.AdminInventoryItemDeleteResponse>
) => {
  const id = req.params.id
  const deleteInventoryItems = deleteInventoryItemWorkflow(req.scope)

  await deleteInventoryItems.run({
    input: [id],
  })

  res.status(200).json({
    id,
    object: "inventory_item",
    deleted: true,
  })
}
