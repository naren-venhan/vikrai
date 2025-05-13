import { FulfillmentTypes } from "@vikrai/framework/types"

export type UpdateShippingOptionsInput = Required<
  Pick<FulfillmentTypes.UpdateShippingOptionDTO, "id">
> &
  FulfillmentTypes.UpdateShippingOptionDTO

