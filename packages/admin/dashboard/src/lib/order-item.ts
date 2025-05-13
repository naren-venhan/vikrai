import { OrderLineItemDTO } from "@vikrai/types"

export const getFulfillableQuantity = (item: OrderLineItemDTO) => {
  return item.quantity - item.detail.fulfilled_quantity
}

