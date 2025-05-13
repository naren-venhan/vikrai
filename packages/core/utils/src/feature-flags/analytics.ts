import { FeatureFlagTypes } from "@vikrai/types"

export const AnalyticsFeatureFlag: FeatureFlagTypes.FlagSettings = {
  key: "analytics",
  default_val: true,
  env_key: "vikrai_FF_ANALYTICS",
  description:
    "Enable vikrai to collect data on usage, errors and performance for the purpose of improving the product",
}

