import { FeatureFlagTypes } from "@vikrai/types"

export const OrderEditingFeatureFlag: FeatureFlagTypes.FlagSettings = {
  key: "order_editing",
  default_val: true,
  env_key: "vikrai_FF_ORDER_EDITING",
  description: "[WIP] Enable the order editing feature",
}

