import { FeatureFlagTypes } from "@vikrai/types"

export const SalesChannelFeatureFlag: FeatureFlagTypes.FlagSettings = {
  key: "sales_channels",
  default_val: true,
  env_key: "vikrai_FF_SALES_CHANNELS",
  description: "[WIP] Enable the sales channels feature",
}

