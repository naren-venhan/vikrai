import { FlagSettings } from "@vikrai/framework/feature-flags"

const AnalyticsFeatureFlag: FlagSettings = {
  key: "analytics",
  default_val: true,
  env_key: "vikrai_FF_ANALYTICS",
  description:
    "Enable vikrai to collect data on usage, errors and performance for the purpose of improving the product",
}

export default AnalyticsFeatureFlag

