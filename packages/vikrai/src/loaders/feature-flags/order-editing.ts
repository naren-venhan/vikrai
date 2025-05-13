import { FlagSettings } from "@vikrai/framework/feature-flags"

const OrderEditingFeatureFlag: FlagSettings = {
  key: "order_editing",
  default_val: true,
  env_key: "vikrai_FF_ORDER_EDITING",
  description: "[WIP] Enable the order editing feature",
}

export default OrderEditingFeatureFlag

