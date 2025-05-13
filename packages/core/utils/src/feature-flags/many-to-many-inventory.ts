import { FeatureFlagTypes } from "@vikrai/types"

export const ManyToManyInventoryFeatureFlag: FeatureFlagTypes.FlagSettings = {
  key: "many_to_many_inventory",
  default_val: false,
  env_key: "vikrai_FF_MANY_TO_MANY_INVENTORY",
  description:
    "Enable capability to have many to many relationship between inventory items and variants",
}

