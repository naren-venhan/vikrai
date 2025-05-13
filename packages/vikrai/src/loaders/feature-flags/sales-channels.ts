import { FlagSettings } from "@vikrai/framework/feature-flags"

const SalesChannelFeatureFlag: FlagSettings = {
  key: "sales_channels",
  default_val: true,
  env_key: "vikrai_FF_SALES_CHANNELS",
  description: "[WIP] Enable the sales channels feature",
}

export default SalesChannelFeatureFlag

